'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminValidation = void 0;
const zod_1 = require('zod');
const admin_constant_1 = require('./admin.constant');
const createAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
    role: zod_1.z
      .enum([...admin_constant_1.role], {
        required_error: 'role is required',
      })
      .optional(),
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'firstName is required',
      }),
      middleName: zod_1.z.string().optional(),
      lastName: zod_1.z.string({
        required_error: 'lastName is required',
      }),
    }),
    phoneNumber: zod_1.z.string({
      required_error: 'phoneNumber is required',
    }),
    address: zod_1.z.string({
      required_error: 'address is required',
    }),
  }),
});
exports.AdminValidation = {
  createAdminZodSchema,
};
