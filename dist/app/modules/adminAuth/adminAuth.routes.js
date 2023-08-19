'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminAuthRoutes = void 0;
const express_1 = require('express');
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const adminAuth_validation_1 = require('./adminAuth.validation');
const adminAuth_controller_1 = require('./adminAuth.controller');
const router = (0, express_1.Router)();
router.post(
  '/login',
  (0, validateRequest_1.default)(
    adminAuth_validation_1.AdminAuthValidation.adminAuthZodScema
  ),
  adminAuth_controller_1.AdminAuthController.adminAuthLogin
);
router.post(
  '/refesh_token',
  (0, validateRequest_1.default)(
    adminAuth_validation_1.AdminAuthValidation.refeshTokenadminAuthZodScema
  ),
  adminAuth_controller_1.AdminAuthController.refeshTokenAdminAuth
);
exports.AdminAuthRoutes = router;
