"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    JWT_SECRET: zod_1.z.string().min(1),
    DATABASE_URL: zod_1.z.string().min(1)
});
exports.env = envSchema.parse(process.env);
