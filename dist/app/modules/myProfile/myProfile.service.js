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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MyProfileService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelper_1 = require('../../../helpers/jwtHelper');
const config_1 = __importDefault(require('../../../config'));
const user_model_1 = require('../user/user.model');
const admin_model_1 = require('../admin/admin.model');
const bcrypt_1 = __importDefault(require('bcrypt'));
const myProfile = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelper_1.jwtHelper.verifyToken(
        token,
        config_1.default.jwt.access
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'not right user'
      );
    }
    const { id, role } = verifiedToken;
    const user = yield user_model_1.User.findOne({ _id: id, role });
    const admin = yield admin_model_1.Admin.findOne({ _id: id, role });
    return user || admin;
  });
const updateProfile = (token, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelper_1.jwtHelper.verifyToken(
        token,
        config_1.default.jwt.access
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'invalid token'
      );
    }
    const { id, role } = verifiedToken;
    const isUserExist = yield user_model_1.User.findOne({ _id: id, role });
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'user not found'
      );
    }
    const { name, password } = payload,
      userData = __rest(payload, ['name', 'password']);
    let hashPassword = null;
    const updatedUserData = Object.assign({}, userData);
    if (password) {
      hashPassword = yield bcrypt_1.default.hash(
        password,
        Number(config_1.default.bcrypt_salt_round)
      );
      updatedUserData.password = hashPassword;
    }
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedUserData[nameKey] = name[key];
      });
    }
    const result = yield user_model_1.User.findOneAndUpdate(
      { _id: id, role },
      updatedUserData,
      {
        new: true,
      }
    );
    return result;
  });
exports.MyProfileService = {
  myProfile,
  updateProfile,
};
