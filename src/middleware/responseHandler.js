/**
 * Standardized response handler
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {*} data - Response data
 * @param {object} meta - Additional metadata
 */
const sendResponse = (res, statusCode, message, data = null, meta = null) => {
  const response = {
    status: statusCode,
    message,
    ...(data !== null && { data }),
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Success response helper
 */
const successResponse = (res, message, data = null, meta = null) => {
  return sendResponse(res, 200, message, data, meta);
};

/**
 * Created response helper
 */
const createdResponse = (res, message, data = null) => {
  return sendResponse(res, 201, message, data);
};

module.exports = {
  sendResponse,
  successResponse,
  createdResponse,
};

