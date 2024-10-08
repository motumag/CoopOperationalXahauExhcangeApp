"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
// Custom error class to handle status codes and error messages
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the name is 'AppError'
        this.name = this.constructor.name;
        // Maintains proper stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Default error values if not explicitly provided
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
exports.errorHandler = errorHandler;
