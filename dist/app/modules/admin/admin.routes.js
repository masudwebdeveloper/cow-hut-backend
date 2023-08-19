'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminRoutes = void 0;
const express_1 = require('express');
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const admin_validation_1 = require('./admin.validation');
const admin_controller_1 = require('./admin.controller');
const router = (0, express_1.Router)();
router.post(
  '/create_admin',
  (0, validateRequest_1.default)(
    admin_validation_1.AdminValidation.createAdminZodSchema
  ),
  admin_controller_1.AdminController.createAdmin
);
exports.AdminRoutes = router;
