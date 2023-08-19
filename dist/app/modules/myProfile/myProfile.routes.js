'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MyProfileRoutes = void 0;
const express_1 = require('express');
const myProfile_controller_1 = require('./myProfile.controller');
const auth_1 = __importDefault(require('../../middleware/auth'));
const user_1 = require('../../../enums/user');
const router = (0, express_1.Router)();
router.get('/', myProfile_controller_1.MyProfileController.myProfile);
router.patch(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.BUYER
  ),
  myProfile_controller_1.MyProfileController.updateProfile
);
exports.MyProfileRoutes = router;
