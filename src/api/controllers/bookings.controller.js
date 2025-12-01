const bookingService = require('../services/bookings.service');
const asyncHandler = require('../../middleware/asyncHandler');
const { successResponse } = require('../../middleware/responseHandler');
const { validate, requireFields } = require('../../middleware/validator');

/**
 * Get active booking by phone number
 */
exports.getActiveBooking = asyncHandler(async (req, res) => {
  const { phoneNo } = req.params;

  const result = await bookingService.getActiveBooking(phoneNo);
  return successResponse(res, result.message, result.data);
});

/**
 * Get toll details for a route
 */
exports.getTollDetails = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  console.log("CONTROLLER REQ QUERY:", req.query);
  const result = await bookingService.getTollDetails(req.query);
  return successResponse(res, result.message, result.data);
});

/**
 * Initialize a new cab booking
 * Steps:
 *  1. Create new booking in DB and return customer with Initiated Message
 *  2. Create new One Time Scheduler to send Push Notification to all vendors 
 *  3. Create QuoteObj for this booking
 */
exports.initCabBooking = [

  asyncHandler(async (req, res) => {
    const booking = req.body;
    validate(requireFields(['pickupAddress', 'pickupAddress', 'pickUpDate', 'pickUpTime'], booking));

    const result = await bookingService.initCabBooking(booking);
    return successResponse(res, result.message, result.data);
  }),
];


/**
 * Get cab booking list by filters
 * Returns list of active bookings based on filters
 */
exports.getCabBookingList = asyncHandler(async (req, res) => {
  const result = await bookingService.getCabBookingList(req.body);
  return successResponse(res, result.message, result.data);
});

/**
 * Get cab booking list by phone number
 */
exports.getCabBookingListByPhoneNo = asyncHandler(async (req, res) => {
  const { phoneNo } = req.query;

  const result = await bookingService.getCabBookingListByPhoneNo(phoneNo);
  return successResponse(res, result.message, result.data);
});

/**
 * Finalize booking
 */
exports.finalizeBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.finalizeBooking(req.body);
  return successResponse(res, result.message, result.data);
});