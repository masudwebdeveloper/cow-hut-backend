'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const zod_1 = require('zod');
const authZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    phoneNumber: zod_1.z.string({
      required_error: 'phoneNumber is required',
    }),
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
  }),
});
const refeshTokenZodSchema = zod_1.z.object({
  cookies: zod_1.z.object({
    refeshToken: zod_1.z.string({
      required_error: 'phoneNumber is required',
    }),
  }),
});
exports.AuthValidation = {
  authZodSchema,
  refeshTokenZodSchema,
};
