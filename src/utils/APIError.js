const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(data) {
    const {
      message, errors, status, isPublic, stack,
    } = data;
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {object} data - Object.
   */
  constructor(data) {
    const {
      message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false,
    } = data;
    super({
      message, errors, status, isPublic, stack,
    });
  }
}

module.exports = APIError;
