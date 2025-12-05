const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const mongoose = require('mongoose');
const { toObjectId } = require('../../utils/mongoose');
const quotesRepository = require('../repositories/quotes.repository');
const { sendPushNotificationToUserForNewQuote } = require('../../schedulers/cabquote.scheduler');
const { MAX_QUOTE_LIMIT } = require('../helpers/constants/constant');
const { calculateNewQuoteParams } = require('../helpers/utils');
const { getBookingById } = require('./bookings.service');
const { default: axios } = require('axios');
const bookingsRepository = require('../repositories/bookings.repository');
const { parseQuoteResponse } = require('../../utils/quoteResponseParser');
/**
 * 
 * @param {*} quote 
 * @description store new Quote.
 * @steps :
 *  1. Check length of quote max is 15 is done in mongoose ID validate function
 *  2. Insert into quote table quotesList where bookingID
 *  3. Send Notification to Customer
 */
/**
 * Initialize a new quote for a booking
 * @param {Object} quoteObj - Quote object containing bookingId and newQuote
 * @returns {Promise<Object>} Created quote details
 */
exports.initNewQuotes = async (quoteObj) => {
  try {
    const { bookingId, quote } = quoteObj;

    const requiredFields = {
      'Booking Id': bookingId,
      'Vendor Id': quote?.vendorId,
      'Vehicle Id': quote?.vehicleId,
      'New Quote data': quote,
    };

    for (const [fieldName, value] of Object.entries(requiredFields)) {
      if (!value) {
        throw new APIError({
          message: `${fieldName} is missing to create new Quote`,
          status: httpStatus.BAD_REQUEST,
        });
      }
    }

    // Step 1: Check current quotes count
    const quotesCount = await quotesRepository.getQuotesCount(bookingId);

    if (quotesCount >= MAX_QUOTE_LIMIT) {
      throw new APIError({
        message: `Quotes Count reached. Maximum ${MAX_QUOTE_LIMIT} quotes allowed for this Booking`,
        status: httpStatus.BAD_REQUEST,
      });
    }

    const bookingObjectId = toObjectId(bookingId);
    const newQuote = {}; // Create a new object to avoid modifying the original quote object directly
    const vendorObjectId = toObjectId(quote.vendorId);
    const vehicleObjectId = toObjectId(quote.vehicleId);

    newQuote.bookingRefId = bookingObjectId;
    newQuote.quote = { ...quote, vendorId: vendorObjectId, vehicleId: vehicleObjectId };

    // Fetch booking details for distance calculation and Notification
    const bookingObj = await getBookingById(bookingObjectId);

    // Calculate quote parameters
    const calculatedQuote = await calculateNewQuoteParams(quote, bookingObj.distance.value);
    newQuote.quote.finalQuotedAmount = calculatedQuote.finalQuotedAmount;
    newQuote.quote.save = calculatedQuote.save;

    // Insert new quote
    const quoteInsertResult = await quotesRepository.addQuote(bookingId, newQuote.quote);

    if (!quoteInsertResult) {
      throw new APIError({
        message: 'Failed to add new quote',
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    // Send notification to user for new quote
    // sendPushNotificationToUserForNewQuote(bookingId, 2000);

    return {
      status: httpStatus.OK,
      message: 'Quote inserted successfully',
      data: {
        count: quotesCount + 1,
        result: quoteInsertResult,
      },
    };
  } catch (error) {
    // Re-throw APIError instances, wrap others in a generic error
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError({
      message: 'Error initializing new quote',
      status: httpStatus.INTERNAL_SERVER_ERROR,
      stack: error.stack,
    });
  }
};

/**
 * Extracts unique Vendor IDs and Vehicle IDs from a list of quotes.
 * @param {Array<Object>} quoteList - The array of quote objects.
 * @returns {Object} An object containing two arrays: uniqueVendorIds and uniqueVehicleIds.
 */
const extractUniqueIds = (quoteList) => {
  const uniqueVendorIds = new Set();
  const uniqueVehicleIds = new Set();

  quoteList.forEach(quote => {
    // Assuming your quote object structure is flat or you access the ID correctly
    // Based on your vehicleModel, the vendor ID is 'vendorRefId'.
    if (quote.vendorId) {
      uniqueVendorIds.add(quote.vendorId.toString());
    }
    if (quote.vehicleId) {
      uniqueVehicleIds.add(quote.vehicleId.toString());
    }
  });

  return {
    vendorIds: Array.from(uniqueVendorIds),
    vehicleIds: Array.from(uniqueVehicleIds)
  };
};

/**
 * Simulates a batch call to the User MFE to get data for multiple IDs.
 * In a real application, this would be an actual HTTP request (e.g., using axios).
 * @param {Array<string>} vendorIds - Array of unique Vendor IDs.
 * @param {Array<string>} vehicleIds - Array of unique Vehicle IDs.
 * @returns {Object} A lookup map for vendors and vehicles.
 */
const fetchUserMFEBatchData = async (vendorIds, vehicleIds) => {
  const response = await axios.post(`${process.env.USER_MICROSERVICE_URL}/vendor/user/batch-details`, {
    vendorIds,
    vehicleIds
  });
  return response.data.data;
}
/**
 * Get quotes by booking ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise<Object>} Quotes list
 */
exports.getQuotes = async (bookingId) => {
  if (!bookingId) {
    throw new APIError({
      message: 'Booking Id is required',
      status: httpStatus.BAD_REQUEST,
    });
  }
  // 1. Fetch quotes from repository
  const quoteObj = await quotesRepository.findByBookingId(bookingId);
  const bookingObj = await bookingsRepository.findById(bookingId);
  const cleanQuoteObj = quoteObj ? quoteObj : null; // Convert to clean JS object
  const quotesList = cleanQuoteObj?.quotesList || [];

  //2. Extract Unique Vendor IDs and Vehicle IDs
  const { vendorIds, vehicleIds } = extractUniqueIds(quotesList || []);

  // 3. Batch Fetch Details from User MFE
  const { vendorMap, vehicleMap } = await fetchUserMFEBatchData(vendorIds, vehicleIds);

  // 4. Augment (Merge) the Quotes List
  const augmentedQuotes = quotesList.map(quote => {
    const vendorIdString = quote.vendorId.toString();
    const vehicleIdString = quote.vehicleId.toString();

    // Find the details using the lookup maps
    const vendorDetails = vendorMap[vendorIdString] || { name: 'Unknown Vendor' };
    const vehicleDetails = vehicleMap[vehicleIdString] || { vehicleName: 'Unknown Vehicle' };

    // Return the original quote combined with the new details
    const parsedQuote = parseQuoteResponse(quote, vendorDetails, vehicleDetails, bookingObj);
    return parsedQuote;

  });

  if (!augmentedQuotes || augmentedQuotes.length === 0) {
    throw new APIError({
      message: 'No quotes found for this booking',
      status: httpStatus.NOT_FOUND,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Quotes retrieved successfully',
    data: augmentedQuotes,
  };
};
