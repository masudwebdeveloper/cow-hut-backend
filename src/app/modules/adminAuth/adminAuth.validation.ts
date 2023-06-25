import { z } from 'zod';

const adminAuthZodScema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const refeshTokenadminAuthZodScema = z.object({
  cookies: z.object({
    refeshToken: z.string({
      required_error: 'refeshToken is required',
    }),
  }),
});

export const AdminAuthValidation = {
  adminAuthZodScema,
  refeshTokenadminAuthZodScema,
};
