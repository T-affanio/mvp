import { z } from "zod";

const daySchema = z
  .object({
    enabled: z.boolean(),
    open: z.string().optional(),
    close: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.enabled || (!!data.open && !!data.close),
    {
      message: "Horário inválido",
    }
  );

export const openingHoursSchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
});

export const updateStoreSettingsSchema = z.object({
  openingHours: openingHoursSchema.optional().nullable(),
});
