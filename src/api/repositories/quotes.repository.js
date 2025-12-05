const db = require('../../models');
const { toObjectId } = require('../../utils/mongoose');

/**
 * Quotes Repository
 * Handles all database operations for quotes
 */
class QuotesRepository {
  /**
   * Create a new quote document
   * @param {Object} quoteData - Quote data
   * @returns {Promise<Object>} Created quote document
   */
  async create(quoteData) {
    return db.vehicle_bookings_quotes.create(quoteData);
  }

  /**
   * Find quote by booking ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object|null>} Quote document or null
   */
  async findByBookingId(bookingId) {
    return db.vehicle_bookings_quotes.findOne({ bookingRefId: toObjectId(bookingId) }).lean().exec();
  }

  /**
   * Get quotes count for a booking
   * @param {string} bookingId - Booking ID
   * @returns {Promise<number>} Quotes count
   */
  async getQuotesCount(bookingId) {
    const result = await db.vehicle_bookings_quotes.aggregate([
      { $match: { bookingRefId: toObjectId(bookingId) } },
      {
        $project: {
          count: { $size: '$quotesList' },
          _id: 0,
        },
      },
    ]);

    return result[0]?.count || 0;
  }

  /**
   * Add new quote to quotes list
   * @param {string} bookingId - Booking ID
   * @param {Object} newQuote - New quote object
   * @returns {Promise<Object>} Updated quote document
   */
  async addQuote(bookingId, quote) {
    return db.vehicle_bookings_quotes.findOneAndUpdate(
      { bookingRefId: toObjectId(bookingId) },
      { $push: { quotesList: quote } },
      { upsert: false, new: true }
    );
  }

  /**
   * Delete quote document by booking ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteByBookingId(bookingId) {
    return db.cabquotes.deleteOne({ bookingRefId: toObjectId(bookingId) });
  }
}

module.exports = new QuotesRepository();

