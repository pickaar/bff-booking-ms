const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Request validation middleware factory
 * @param {Function} validationFn - Validation function that returns { isValid, errors }
 * @returns {Function} Express middleware
 */
const validate = (validationFn) => async (req, res, next) => {
  try {
    const { isValid, errors } = await validationFn(req);

    if (!isValid) {
      throw new APIError({
        message: 'Validation failed',
        status: httpStatus.BAD_REQUEST,
        errors,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check if required fields are present
 * @param {string[]} fields - Array of required field names
 * @param {string} source - 'body', 'query', or 'params'
 * @returns {Function} Validation function
 */
const requireFields = (fields, source = 'body') => {
  return async (req) => {
    const data = req[source] || {};
    const errors = [];

    fields.forEach((field) => {
      if (!data[field] && data[field] !== 0 && data[field] !== false) {
        errors.push(`Field '${field}' is required in ${source}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  };
};

module.exports = {
  validate,
  requireFields,
};

