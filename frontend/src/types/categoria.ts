import { z } from "zod";

export const CategoriaSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

export type Categoria = z.infer<typeof CategoriaSchema>;