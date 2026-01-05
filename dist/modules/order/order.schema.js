"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z
    .object({
    customerName: zod_1.z.string().min(2),
    customerPhone: zod_1.z.string().min(8),
    address: zod_1.z.string().min(3).optional(),
    neighborhood: zod_1.z.string().min(2).optional(),
    deliveryType: zod_1.z.enum(["DELIVERY", "PICKUP"]),
    paymentMethod: zod_1.z.enum(["PIX", "CASH", "CARD"]),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().min(1),
    })),
})
    .superRefine((data, ctx) => {
    if (data.deliveryType === "DELIVERY") {
        if (!data.address) {
            ctx.addIssue({
                path: ["address"],
                message: "Endereço é obrigatório para entrega",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        if (!data.neighborhood) {
            ctx.addIssue({
                path: ["neighborhood"],
                message: "Bairro é obrigatório para entrega",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
});
exports.updateOrderStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["CONFIRMED", "CANCELED", "FINISHED"]),
});
