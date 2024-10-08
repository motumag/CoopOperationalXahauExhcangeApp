import { Request, Response, NextFunction } from 'express';

// Custom error class to handle status codes and error messages
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Ensure the name is 'AppError'
    this.name = this.constructor.name;
    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
// Error handling middleware
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Default error values if not explicitly provided
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
export { AppError, errorHandler };
