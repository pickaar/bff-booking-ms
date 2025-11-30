const mongoose = require('mongoose');

/**
 * Convert string to MongoDB ObjectId
 * @param {string|ObjectId} id - ID to convert
 * @returns {ObjectId} MongoDB ObjectId
 * @throws {Error} If id is invalid
 */
const toObjectId = (id) => {
  if (!id) {
    throw new Error('ID is required');
  }

  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }

  throw new Error(`Invalid ObjectId: ${id}`);
};

/**
 * Check if a string is a valid ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  toObjectId,
  isValidObjectId,
};

