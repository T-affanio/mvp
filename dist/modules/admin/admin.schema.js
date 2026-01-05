"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
const zod_1 = require("zod");
exports.AdminSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    address: zod_1.z.string().min(5),
    role: zod_1.z.string().default("OWNER"),
});
