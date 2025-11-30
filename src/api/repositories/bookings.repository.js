const db = require('../../models');
const { toObjectId } = require('../../utils/mongoose');

/**
 * Bookings Repository
 * Handles all database operations for bookings
 */
class BookingsRepository {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking data
   * @returns {Promise<Object>} Created booking
   */
  async create(bookingData) {
    return db.cabbookings.create(bookingData);
  }

  /**
   * Find booking by ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object|null>} Booking or null
   */
  async findById(bookingId) {
    return db.cabbookings.findById(toObjectId(bookingId));
  }

  /**
   * Find bookings by filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<Array>} Array of bookings
   */
  async findByFilter(filter) {
    return db.cabbookings.find(filter);
  }

  /**
   * Find bookings by phone number
   * @param {number} phoneNo - Phone number
   * @returns {Promise<Array>} Array of bookings
   */
  async findByPhoneNo(phoneNo) {
    return db.cabbookings.find({ 'user.phoneNo': phoneNo });
  }

  /**
   * Find active booking by phone number
   * @param {number} phoneNo - Phone number
   * @returns {Promise<Array>} Array of active bookings
   */
  async findActiveBookingByPhoneNo(phoneNo) {
    return db.activecabbookings.find({ 'booking.user.phoneNo': phoneNo });
  }

  /**
   * Delete booking by ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteById(bookingId) {
    return db.cabbookings.deleteOne({ _id: toObjectId(bookingId) });
  }

  /**
   * Create active booking
   * @param {Object} activeBookingData - Active booking data
   * @returns {Promise<Object>} Created active booking
   */
  async createActiveBooking(activeBookingData) {
    return db.activecabbookings.create(activeBookingData);
  }
}

module.exports = new BookingsRepository();

