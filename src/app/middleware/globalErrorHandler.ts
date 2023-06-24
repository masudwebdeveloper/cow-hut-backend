/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interface/error';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.error('globalErrorHandler', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(error);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessage = simplefiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplefiedError = handleCastError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplefiedError = handleZodError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error?.message : undefined,
  });
};

export default globalErrorHandler;
