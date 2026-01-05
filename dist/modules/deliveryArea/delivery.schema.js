"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeliveryAreaSchema = exports.createDeliveryAreaSchema = void 0;
const zod_1 = require("zod");
exports.createDeliveryAreaSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    fee: zod_1.z.number().min(0),
});
exports.updateDeliveryAreaSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    fee: zod_1.z.number().min(0).optional(),
});
