import { z } from 'zod';
import { role } from './admin.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'role is required',
    }).optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      middleName: z.string().optional(),
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
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
