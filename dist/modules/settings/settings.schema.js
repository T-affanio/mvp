"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSettingsSchema = exports.openingHoursSchema = void 0;
const zod_1 = require("zod");
const daySchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean(),
    open: zod_1.z.string().optional(),
    close: zod_1.z.string().optional(),
})
    .refine((data) => !data.enabled || (!!data.open && !!data.close), {
    message: "Horário inválido",
});
exports.openingHoursSchema = zod_1.z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
});
exports.updateStoreSettingsSchema = zod_1.z.object({
    openingHours: exports.openingHoursSchema.optional().nullable(),
});
