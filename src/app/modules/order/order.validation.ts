import { Types } from 'mongoose';
import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z
      .union([z.string(), z.instanceof(Types.ObjectId)])
      .refine(
        value => typeof value === 'string' || value instanceof Types.ObjectId,
        {
          message: 'cow must be a string or an instance of Types.ObjectId',
        }
      ),
    buyer: z
      .union([z.string(), z.instanceof(Types.ObjectId)])
      .refine(
        value => typeof value === 'string' || value instanceof Types.ObjectId,
        {
          message: 'buyer must be a string or an instance of Types.ObjectId',
        }
      ),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
