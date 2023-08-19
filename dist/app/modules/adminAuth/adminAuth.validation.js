'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminAuthValidation = void 0;
const zod_1 = require('zod');
const adminAuthZodScema = zod_1.z.object({
  body: zod_1.z.object({
    phoneNumber: zod_1.z.string({
      required_error: 'phoneNumber is required',
    }),
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
  }),
});
const refeshTokenadminAuthZodScema = zod_1.z.object({
  cookies: zod_1.z.object({
    refeshToken: zod_1.z.string({
      required_error: 'refeshToken is required',
    }),
  }),
});
exports.AdminAuthValidation = {
  adminAuthZodScema,
  refeshTokenadminAuthZodScema,
};
