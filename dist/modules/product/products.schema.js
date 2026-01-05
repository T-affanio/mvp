"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProductSchema = zod_1.default.object({
    name: zod_1.default.string().min(3),
    description: zod_1.default.string().min(5).optional(),
    price: zod_1.default
        .string()
        .transform(Number)
        .refine((v) => !isNaN(v), "preço deve ser um número")
        .refine((v) => v > 0, "preço deve ser maior que zero"),
    categoryId: zod_1.default.string().nullable().optional(),
    restaurantId: zod_1.default.string(),
    images: zod_1.default.array(zod_1.default.string()).default([]),
});
exports.updateProductSchema = exports.createProductSchema.partial();
