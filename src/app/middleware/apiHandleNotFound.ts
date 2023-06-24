import { RequestHandler } from 'express';
import httpStatus from 'http-status';

const apiHandleNotFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not Found',
      },
    ],
  });
  next();
};

export default apiHandleNotFound;
