/**
 * API response utility functions for standardizing server responses
 * This file provides consistent response formatting across all API endpoints
 */

/**
 * Creates a standardized success response
 * @param {Object|Array} data - The data to return
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted success response
 */
function successResponse(data, message = "Operation successful", statusCode = 200) {
  return {
    success: true,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    data
  };
}

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} errorCode - Optional error code for frontend handling
 * @returns {Object} Formatted error response
 */
function errorResponse(message = "An error occurred", statusCode = 500, errorCode = null) {
  return {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    errorCode
  };
}

/**
 * Creates a standardized validation error response
 * @param {Array} errors - Array of validation error objects
 * @returns {Object} Formatted validation error response
 */
function validationErrorResponse(errors) {
  return {
    success: false,
    message: "Validation failed",
    statusCode: 400,
    timestamp: new Date().toISOString(),
    errors
  };
}

/**
 * Middleware for handling errors in async/await route handlers
 * @param {Function} fn - Async route handler
 * @returns {Function} Express middleware with error handling
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse
};
