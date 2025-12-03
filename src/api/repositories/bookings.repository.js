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
    // 🌟 CORRECTED: Using the new model name
    return db.vehicle_bookings.create(bookingData);
  }

  /**
   * Find booking by ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object|null>} Booking or null
   */
  async findById(bookingId) {
    // 🌟 CORRECTED: Using the new model name
    return db.vehicle_bookings.findById(toObjectId(bookingId));
  }

  /**
   * Find bookings by filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<Array>} Array of bookings
   */
  async findByFilter(filter) {
    // 🌟 CORRECTED: Using the new model name
    return db.vehicle_bookings.find(filter);
  }

  /**
  * Find acting driver bookings by filter
  * @param {Object} filter - Filter criteria
  * @returns {Promise<Array>} Array of bookings
  */
  async findActingDriverBookingsByFilter(filter) {
    // 🌟 CORRECTED: Using the new model name
    return db.acting_driver_bookings.find(filter);
  }

  /**
   * Find bookings by phone number
   * @param {number} phoneNo - Phone number
   * @returns {Promise<Array>} Array of bookings
   */
  async findByPhoneNo(phoneNo) {
    // 🌟 CORRECTED: Using the new model name
    // NOTE: This method queries an embedded user. If you use the ObjectID reference, 
    // this query field ('user.phoneNo') might be obsolete.
    return db.vehicle_bookings.find({ 'user.phoneNo': phoneNo });
  }

  /**
   * Find active booking by phone number
   * @param {number} phoneNo - Phone number
   * @returns {Promise<Array>} Array of active bookings
   */
  async findActiveBookingByPhoneNo(phoneNo) {
    // Assuming 'activecabbookings' did not change its name in the other model definition
    return db.activecabbookings.find({ 'booking.user.phoneNo': phoneNo });
  }

  /**
   * Delete booking by ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteById(bookingId) {
    // 🌟 CORRECTED: Using the new model name
    return db.vehicle_bookings.deleteOne({ _id: toObjectId(bookingId) });
  }

  /**
   * Create active booking
   * @param {Object} activeBookingData - Active booking data
   * @returns {Promise<Object>} Created active booking
   */
  async createActiveBooking(activeBookingData) {
    // Assuming 'activecabbookings' did not change its name in the other model definition
    return db.activecabbookings.create(activeBookingData);
  }
}

module.exports = new BookingsRepository();