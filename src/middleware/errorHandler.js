const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const config = require('../config/configs');

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof APIError)) {
    const status = error.status || error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[status];
    error = new APIError({
      message,
      status,
      stack: config.env === 'development' ? err.stack : undefined,
    });
  }

  const response = {
    status: error.status,
    message: error.message,
    ...(config.env === 'development' && { stack: error.stack }),
  };

  if (config.env === 'development') {
    console.error('Error:', error);
  }

  res.status(error.status).json(response);
};

module.exports = errorHandler;

