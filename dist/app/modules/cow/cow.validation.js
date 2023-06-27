"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constants_1 = require("./cow.constants");
const mongoose_1 = require("mongoose");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        age: zod_1.z.string({
            required_error: 'age is required',
        }),
        price: zod_1.z.string({
            required_error: 'price is required',
        }),
        location: zod_1.z.enum([...cow_constants_1.location], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.enum([...cow_constants_1.breed], {
            required_error: 'breed is required',
        }),
        weight: zod_1.z.string({
            required_error: 'weight is required',
        }),
        label: zod_1.z.enum([...cow_constants_1.label]).optional(),
        category: zod_1.z.enum([...cow_constants_1.category], {
            required_error: 'category is required',
        }),
        seller: zod_1.z
            .union([zod_1.z.string(), zod_1.z.instanceof(mongoose_1.Types.ObjectId)])
            .refine(value => typeof value === 'string' || value instanceof mongoose_1.Types.ObjectId, {
            message: 'seller must be a string or an instance of Types.ObjectId',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        location: zod_1.z.enum([...cow_constants_1.location]).optional(),
        breed: zod_1.z.enum([...cow_constants_1.breed]).optional(),
        weight: zod_1.z.string().optional(),
        label: zod_1.z.enum([...cow_constants_1.label]).optional(),
        category: zod_1.z.enum([...cow_constants_1.category]).optional(),
        seller: zod_1.z
            .union([zod_1.z.string(), zod_1.z.instanceof(mongoose_1.Types.ObjectId)])
            .refine(value => typeof value === 'string' || value instanceof mongoose_1.Types.ObjectId, {
            message: 'seller must be a string or an instance of Types.ObjectId',
        })
            .optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
