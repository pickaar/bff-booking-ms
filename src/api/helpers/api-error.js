const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');

function throwIncorrectCredentials() {
    throw new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: 'Incorrect credentials',
    });
}

function throwUnknownError(message) {
    throw new APIError({
        status: httpStatus.UNKNOWN_ERROR,
        message: message,
    });
}

function throwUserExists(message) {
    throw new APIError({
        status: httpStatus.METHOD_NOT_ALLOWED,
        message: message,
    });
}

exports.throwIncorrectCredentials = throwIncorrectCredentials;
exports.throwUnknownError = throwUnknownError;
exports.throwUserExists = throwUserExists;




