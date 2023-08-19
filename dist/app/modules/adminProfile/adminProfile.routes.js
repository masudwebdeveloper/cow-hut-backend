'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminProfileRoutes = void 0;
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middleware/auth'));
const user_1 = require('../../../enums/user');
const adminProfile_controller_1 = require('./adminProfile.controller');
const router = (0, express_1.Router)();
router.patch(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  adminProfile_controller_1.AdminProfileController.updateProfile
);
exports.AdminProfileRoutes = router;
