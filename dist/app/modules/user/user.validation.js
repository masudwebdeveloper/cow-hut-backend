'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const user_constants_1 = require('./user.constants');
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z
      .string({
        required_error: 'password is required',
      })
      .optional(),
    role: zod_1.z.enum([...user_constants_1.role], {
      required_error: 'role is required',
    }),
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'firstName is required',
      }),
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
    budget: zod_1.z.string({
      required_error: 'budget is required',
    }),
    income: zod_1.z.string({
      required_error: 'income is required',
    }),
  }),
});
const updateUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum([...user_constants_1.role]).optional(),
    name: zod_1.z
      .object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
      })
      .optional(),
    phoneNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    budget: zod_1.z.string().optional(),
    income: zod_1.z.string().optional(),
  }),
});
exports.UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
