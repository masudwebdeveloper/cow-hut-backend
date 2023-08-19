'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = __importDefault(require('../../config'));
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError')
);
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const zod_1 = require('zod');
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError')
);
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError')
);
const globalErrorHandler = (error, req, res, next) => {
  config_1.default.node_env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.error('globalErrorHandler', error);
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessage = [];
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplefiedError = (0, handleValidationError_1.default)(error);
    statusCode =
      simplefiedError === null || simplefiedError === void 0
        ? void 0
        : simplefiedError.statusCode;
    message =
      simplefiedError === null || simplefiedError === void 0
        ? void 0
        : simplefiedError.message;
    errorMessage =
      simplefiedError === null || simplefiedError === void 0
        ? void 0
        : simplefiedError.errorMessages;
  } else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    const simplefiedError = (0, handleCastError_1.default)(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof zod_1.ZodError) {
    const simplefiedError = (0, handleZodError_1.default)(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof ApiError_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessage = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error === null || error === void 0 ? void 0 : error.message;
    errorMessage = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack:
      config_1.default.node_env !== 'production'
        ? error === null || error === void 0
          ? void 0
          : error.message
        : undefined,
  });
};
exports.default = globalErrorHandler;
