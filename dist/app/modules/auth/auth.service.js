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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_model_1 = require('../user/user.model');
const jwtHelper_1 = require('../../../helpers/jwtHelper');
const config_1 = __importDefault(require('../../../config'));
const login = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isUserExist = yield user_model_1.User.findOne({ phoneNumber }).select(
      {
        password: 1,
        role: 1,
      }
    );
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'user not found'
      );
    }
    if (
      (isUserExist === null || isUserExist === void 0
        ? void 0
        : isUserExist.password) &&
      !(yield user_model_1.User.isPasswordMatch(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        "password doesn't match"
      );
    }
    const { id, role } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelper.createToken(
      {
        id,
        role,
      },
      config_1.default.jwt.access,
      { expiresIn: config_1.default.jwt.expires_in }
    );
    const refeshToken = jwtHelper_1.jwtHelper.createToken(
      {
        id,
        role,
      },
      config_1.default.jwt.refesh,
      { expiresIn: config_1.default.jwt.refesh_expires_in }
    );
    return {
      accessToken,
      refeshToken,
    };
  });
const refeshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelper_1.jwtHelper.verifyToken(
        token,
        config_1.default.jwt.refesh
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'invalid refesh token'
      );
    }
    const { id } = verifiedToken;
    const isUserExist = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'user not found'
      );
    }
    const { id: userId, role } = isUserExist;
    const newAccessToken = jwtHelper_1.jwtHelper.createToken(
      { id: userId, role },
      config_1.default.jwt.access,
      { expiresIn: config_1.default.jwt.expires_in }
    );
    return { accessToken: newAccessToken };
  });
exports.AuthService = {
  login,
  refeshToken,
};
