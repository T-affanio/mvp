import { z } from "zod";

export const createDeliveryAreaSchema = z.object({
  name: z.string().min(2),
  fee: z.number().min(0),
});

export type CreateDeliveryAreaDTO = z.infer<
  typeof createDeliveryAreaSchema
>;


export const updateDeliveryAreaSchema = z.object({
  name: z.string().min(2).optional(),
  fee: z.number().min(0).optional(),
});
