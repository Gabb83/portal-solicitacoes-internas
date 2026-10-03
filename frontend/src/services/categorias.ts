import { fetchApiAuth } from "./api-server";
import { Categoria, CategoriaSchema } from "@/types/categoria";
import { z } from "zod";

export async function getCategorias(): Promise<Categoria[]> {
  const data = await fetchApiAuth<unknown>("/categorias", {
    next: { revalidate: 3600 },
  });

  return z.array(CategoriaSchema).parse(data);
}