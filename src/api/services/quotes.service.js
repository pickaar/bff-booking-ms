const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const mongoose = require('mongoose');
const { toObjectId } = require('../../utils/mongoose');
const quotesRepository = require('../repositories/quotes.repository');
const { sendPushNotificationToUserForNewQuote } = require('../../schedulers/cabquote.scheduler');
const { MAX_QUOTE_LIMIT } = require('../helpers/constants/constant');
const { calculateNewQuoteParams } = require('../helpers/utils');
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
  const { bookingId, newQuote } = quoteObj;

  if (!bookingId) {
    throw new APIError({
      message: 'Booking Id is missing to create new Quote',
      status: httpStatus.BAD_REQUEST,
    });
  }

  if (!newQuote) {
    throw new APIError({
      message: 'New Quote data is required',
      status: httpStatus.BAD_REQUEST,
    });
  }

  // Fetch total quotes count
  const quotesCount = await quotesRepository.getQuotesCount(bookingId);

  if (quotesCount >= MAX_QUOTE_LIMIT) {
    throw new APIError({
      message: `Quotes Count reached. Maximum ${MAX_QUOTE_LIMIT} quotes allowed for this Booking`,
      status: httpStatus.BAD_REQUEST,
    });
  }

  // Convert vendor ID to ObjectId
  const vendorId = newQuote?.vendor?.vendorId;
  if (vendorId) {
    newQuote.vendor.vendorId = toObjectId(vendorId);
  }

  // Calculate quote parameters
  const { quote, bookingDetails } = newQuote;
  const calculatedQuote = await calculateNewQuoteParams(quote, bookingDetails.distance);
  
  newQuote.quote.quotedAproxAmt = calculatedQuote.quotedAproxAmt;
  newQuote.quote.save = calculatedQuote.save;

  // Insert new quote
  const quoteInsertResult = await quotesRepository.addQuote(bookingId, newQuote);

  if (!quoteInsertResult) {
    throw new APIError({
      message: 'Failed to add new quote',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  // Send notification to user for new quote
  sendPushNotificationToUserForNewQuote(bookingId, 2000);

  return {
    status: httpStatus.OK,
    message: 'Quote inserted successfully',
    data: {
      count: quotesCount + 1,
      result: quoteInsertResult,
    },
  };
};

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

  const quotesList = await quotesRepository.findByBookingId(bookingId);

  if (!quotesList) {
    throw new APIError({
      message: 'No quotes found for this booking',
      status: httpStatus.NOT_FOUND,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Quotes retrieved successfully',
    data: quotesList,
  };
};
