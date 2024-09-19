import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response';
import AppError from './app-error';

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status;

  if (err.isOperational) {
    return errorResponse(res, err.statusCode, err.message);
  } else {
    console.error('ERROR:', err);
    return errorResponse(res, err.statusCode, 'something went wrong!');
  }
};

export default globalErrorHandler;
