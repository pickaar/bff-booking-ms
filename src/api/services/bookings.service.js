const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const bookingsRepository = require('../repositories/bookings.repository');
const quotesRepository = require('../repositories/quotes.repository');
const { sendPushNotificationToDrivers } = require('../../schedulers/cabbooking.scheduler');
const mockData = require('../helpers/mockData');
const { getDistance, calculatePickaarCommission, convertStringToISODate } = require('../helpers/utils');
const { convertToMongoDate } = require('../../utils/helper');
const { getRouteInformation } = require('../../utils/googleMap');

/**
 * Get active booking by phone number
 * @param {number} phoneNo - Phone number
 * @returns {Promise<Object>} Active booking details
 */
exports.getActiveBooking = async (phoneNo) => {
  if (!phoneNo) {
    throw new APIError({
      message: 'Phone number is required',
      status: httpStatus.BAD_REQUEST,
    });
  }

  const result = await bookingsRepository.findActiveBookingByPhoneNo(phoneNo);

  if (!result || result.length === 0) {
    throw new APIError({
      message: 'No active booking found',
      status: httpStatus.NOT_FOUND,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Active Cab Booking Detail',
    data: result,
  };
};

/**
 *  
 * @param {From, to }  
 * @returns 
 */

/**
 * Get toll details for a route
 * @param {Object} tollReqObj - Toll request object
 * @returns {Promise<Object>} Toll details
 */
exports.getTollDetails = async (tollReqObj) => {
  console.log("TOLL REQ OBJ:", tollReqObj);
  if (!tollReqObj || !tollReqObj.from || !tollReqObj.to) {
    throw new APIError({
      message: 'Both "from" and "to" addresses are required',
      status: httpStatus.BAD_REQUEST,
    });
  }
  const result = await getRouteInformation(tollReqObj.from, tollReqObj.to);
  
  if (!result) {
    throw new APIError({
      message: 'Toll data not available',
      status: httpStatus.NOT_FOUND,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Route Data Available',
    data: result,
  };
};

/**
 * Initialize a new cab booking
 * @param {Object} booking - Booking object
 * @returns {Promise<Object>} Created booking details
 */
exports.initCabBooking = async (booking) => {
  // Validate and convert dates

  const { pickUpDate, pickUpTime, tripType, returnDate } = booking;

  const convertedDate = await convertStringToISODate(pickUpDate, pickUpTime);
  if (!convertedDate[0]) {
    throw new APIError({
      message: convertedDate[1] || 'Date is not valid',
      status: httpStatus.BAD_REQUEST,
    });
  }

  booking.pickUpDate = convertedDate[1];

  // Handle round trip
  if (tripType === 2) {
    if (!returnDate) {
      throw new APIError({
        message: 'Round Trip should have Return date',
        status: httpStatus.BAD_REQUEST,
      });
    }

    const convertedReturnDate = await convertStringToISODate(returnDate);
    if (!convertedReturnDate[0]) {
      throw new APIError({
        message: convertedReturnDate[1] || 'Return date is not valid',
        status: httpStatus.BAD_REQUEST,
      });
    }

    booking.returnDate = convertedReturnDate[1];
  }

  // Calculate distance and commission
  const distance = getDistance(booking?.distance);
  const pickaarCommission = calculatePickaarCommission(distance);
  booking.distance = distance;
  booking.pickaarCommission = pickaarCommission;
  const convertedPickUpDate = convertToMongoDate(pickUpDate, pickUpTime);
  booking.pickUpDate = convertedPickUpDate;
  const newBookingResult = await bookingsRepository.create(booking);

  if (!newBookingResult) {
    throw new APIError({
      message: 'Failed to create new booking',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  // Send notification to drivers
  // const district = booking.pickupAddress.district;
  // await sendPushNotificationToDrivers(district, 5000);

  // Create quote document for this booking
  const quoteResult = await quotesRepository.create({
    bookingRefId: newBookingResult._id,
    quotesList: [],
  });

  if (!quoteResult) {
    throw new APIError({
      message: 'Failed to create quote document',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Successfully created New Cab Booking',
    data: newBookingResult,
  };
};

/**
 * Get cab booking list by filters
 * @param {Object} filterObj - Filter object
 * @returns {Promise<Object>} List of bookings
 */
exports.getCabBookingList = async (filterObj) => {
  const { vehicleType, distance, district, pickUpDate } = filterObj;

  const filterQuery = {};

  if (vehicleType) filterQuery.vehicleType = vehicleType;
  if (district) filterQuery['pickupAddress.district'] = district;
  if (pickUpDate) filterQuery.pickUpDate = pickUpDate;
  // Note: distance filtering can be added here if needed

  if (Object.keys(filterQuery).length === 0) {
    throw new APIError({
      message: 'Kindly pass any filter param { vehicleType, distance, district, pickUpDate } to find Cab Bookings',
      status: httpStatus.BAD_REQUEST,
    });
  }

  const queryResult = await bookingsRepository.findByFilter(filterQuery);

  return {
    status: httpStatus.OK,
    message: 'Records Found',
    data: queryResult,
  };
};

/**
 * Get cab booking list by phone number
 * @param {number} phoneNo - Phone number
 * @returns {Promise<Object>} List of bookings
 */
exports.getCabBookingListByPhoneNo = async (phoneNo) => {
  if (!phoneNo) {
    throw new APIError({
      message: 'Phone number is required',
      status: httpStatus.BAD_REQUEST,
    });
  }

  const queryResult = await bookingsRepository.findByPhoneNo(phoneNo);

  if (!queryResult || queryResult.length === 0) {
    throw new APIError({
      message: `No booking available for ${phoneNo}`,
      status: httpStatus.NOT_FOUND,
    });
  }

  return {
    status: httpStatus.OK,
    message: 'Records Found',
    data: queryResult,
  };
};

/**
 * Finalize booking
 * Moves booking from active to finalized state
 * @param {Object} reqObj - Request object containing booking, quote, and vendor
 * @returns {Promise<Object>} Finalized booking details
 */
exports.finalizeBooking = async (reqObj) => {
  const { booking, quote, vendor } = reqObj;

  if (!booking || !booking.bookingId) {
    throw new APIError({
      message: 'Booking ID is required',
      status: httpStatus.BAD_REQUEST,
    });
  }

  // Create active booking
  const activeBookingResult = await bookingsRepository.createActiveBooking({
    booking,
    quote,
    vendor,
  });

  if (!activeBookingResult) {
    throw new APIError({
      message: 'Failed to create active booking',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  const { bookingId } = booking;

  // Delete from bookings and quotes tables
  await bookingsRepository.deleteById(bookingId);
  await quotesRepository.deleteByBookingId(bookingId);

  // TODO: Integrate with vendor wallet service
  // const URL = process.env.VENDOR_WALLET_SERVICE_URL || "http://localhost:4001/api/vendor/wallet/WalletDeductAmt";
  // const walletResponse = await axios.post(URL, {
  //     vendorId: vendor.vendorId,
  //     amtToDeduct: quote.pickaarCommission
  // });

  return {
    status: httpStatus.OK,
    message: 'Booking finalized successfully',
    data: activeBookingResult,
  };
};