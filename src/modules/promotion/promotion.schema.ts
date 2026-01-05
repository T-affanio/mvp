import { z } from "zod";

export const createProductPromotionSchema = z.object({
  name: z.string().min(1),
  discountType: z.enum(["FIXED", "PERCENT"]),
  discountValue: z.number().positive(),
  productIds: z.array(z.string().uuid()).min(1),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
});

export const createComboPromotionSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
});

export const updatePromotionStatusSchema = z.object({
  active: z.boolean(),
});
