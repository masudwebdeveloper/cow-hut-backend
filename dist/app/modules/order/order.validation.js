"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z
            .union([zod_1.z.string(), zod_1.z.instanceof(mongoose_1.Types.ObjectId)])
            .refine(value => typeof value === 'string' || value instanceof mongoose_1.Types.ObjectId, {
            message: 'cow must be a string or an instance of Types.ObjectId',
        }),
        buyer: zod_1.z
            .union([zod_1.z.string(), zod_1.z.instanceof(mongoose_1.Types.ObjectId)])
            .refine(value => typeof value === 'string' || value instanceof mongoose_1.Types.ObjectId, {
            message: 'buyer must be a string or an instance of Types.ObjectId',
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
