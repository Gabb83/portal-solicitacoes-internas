import { fetchApi } from "./api";
import { IUsuarioPerfil } from "@/types/usuarios";

export async function buscarUsuarioId(id: number): Promise<IUsuarioPerfil> {
  return fetchApi<IUsuarioPerfil>(`/usuarios/${id}`);
}