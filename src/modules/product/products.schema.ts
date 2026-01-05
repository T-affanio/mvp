import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  categoryId: z.string().nullable().optional(),

  variations: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().positive(),
    })
  ).min(1, "Produto precisa de pelo menos uma variação").optional(),

  images: z.array(z.string()).default([]),
});


export const updateProductSchema = createProductSchema.partial();

export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
