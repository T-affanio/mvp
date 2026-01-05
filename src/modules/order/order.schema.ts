import { z } from "zod";

export const createOrderSchema = z
  .object({
    customerName: z.string().min(2),
    customerPhone: z.string().min(8),

    address: z.string().min(3).optional(),
    neighborhood: z.string().min(2).optional(),

    deliveryType: z.enum(["DELIVERY", "PICKUP"]),
    paymentMethod: z.enum(["PIX", "CASH", "CARD"]),

    items: z.array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === "DELIVERY") {
      if (!data.address) {
        ctx.addIssue({
          path: ["address"],
          message: "Endereço é obrigatório para entrega",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.neighborhood) {
        ctx.addIssue({
          path: ["neighborhood"],
          message: "Bairro é obrigatório para entrega",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

 

export const updateOrderStatusSchema = z.object({
  status: z.enum(["CONFIRMED", "CANCELED", "FINISHED"]),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusDTO = z.infer<typeof updateOrderStatusSchema>;
