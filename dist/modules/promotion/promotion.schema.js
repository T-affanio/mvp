"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotionStatusSchema = exports.createComboPromotionSchema = exports.createProductPromotionSchema = void 0;
const zod_1 = require("zod");
exports.createProductPromotionSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    discountType: zod_1.z.enum(["FIXED", "PERCENT"]),
    discountValue: zod_1.z.number().positive(),
    productIds: zod_1.z.array(zod_1.z.string().uuid()).min(1),
    startAt: zod_1.z.string().optional().nullable(),
    endAt: zod_1.z.string().optional().nullable(),
});
exports.createComboPromotionSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive(),
    })),
    startAt: zod_1.z.string().optional().nullable(),
    endAt: zod_1.z.string().optional().nullable(),
});
exports.updatePromotionStatusSchema = zod_1.z.object({
    active: zod_1.z.boolean(),
});
