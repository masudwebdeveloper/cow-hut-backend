'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MyProfileController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const myProfile_service_1 = require('./myProfile.service');
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const myProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'unauthorized'
      );
    }
    const result = yield myProfile_service_1.MyProfileService.myProfile(token);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'user retrieved successfully',
      data: result,
    });
  })
);
const updateProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const updateData = req.body;
    const result = yield myProfile_service_1.MyProfileService.updateProfile(
      token,
      updateData
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'my profile update successfully',
      data: result,
    });
  })
);
exports.MyProfileController = {
  myProfile,
  updateProfile,
};
