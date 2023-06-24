import { z } from 'zod';
import { role } from './user.constants';
const createUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'password is required',
      })
      .optional(),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.string({
      required_error: 'budget is required',
    }),
    income: z.string({
      required_error: 'income is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.string().optional(),
    income: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
