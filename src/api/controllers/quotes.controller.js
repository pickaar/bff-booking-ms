const quoteService = require('../services/quotes.service');
const asyncHandler = require('../../middleware/asyncHandler');
const { successResponse } = require('../../middleware/responseHandler');

/**
 * Initialize a new quote
 */
exports.initNewQuotes = asyncHandler(async (req, res) => {
  const result = await quoteService.initNewQuotes(req.body);
  return successResponse(res, result.message, result.data);
});

/**
 * Get quotes by booking ID
 */
exports.getQuotes = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  
  const result = await quoteService.getQuotes(bookingId);
  return successResponse(res, result.message, result.data);
});