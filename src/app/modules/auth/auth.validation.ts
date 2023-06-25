import { z } from 'zod';

const authZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const refeshTokenZodSchema = z.object({
  cookies: z.object({
    refeshToken: z.string({
      required_error: 'phoneNumber is required',
    }),
  }),
});

export const AuthValidation = {
  authZodSchema,
  refeshTokenZodSchema,
};
