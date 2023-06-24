import { z } from 'zod';
import { breed, category, label, location } from './cow.constants';
import { Types } from 'mongoose';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.string({
      required_error: 'age is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    weight: z.string({
      required_error: 'weight is required',
    }),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z
      .union([z.string(), z.instanceof(Types.ObjectId)])
      .refine(
        value => typeof value === 'string' || value instanceof Types.ObjectId,
        {
          message: 'seller must be a string or an instance of Types.ObjectId',
        }
      ),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    price: z.string().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.string().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z
      .union([z.string(), z.instanceof(Types.ObjectId)])
      .refine(
        value => typeof value === 'string' || value instanceof Types.ObjectId,
        {
          message: 'seller must be a string or an instance of Types.ObjectId',
        }
      )
      .optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
