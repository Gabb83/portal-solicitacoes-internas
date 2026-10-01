import { fetchApi } from "./api";
import { Categoria, CategoriaSchema } from "@/types/categoria";
import { z } from "zod";

export async function getCategorias(): Promise<Categoria[]> {
  const data = await fetchApi<unknown>('/categorias', {
    next: { revalidate: 3600 },
  });

  return z.array(CategoriaSchema).parse(data);
}