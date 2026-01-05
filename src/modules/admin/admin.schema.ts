import { z } from "zod";

export const AdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),

  address: z.string().min(5),
  role: z.string().default("OWNER"),

});

export type AdminType = z.infer<typeof AdminSchema>;
