import { fetchApiAuth } from "./api-server";
import { IUsuarioPerfil } from "@/types/usuarios";

export async function buscarUsuarioId(id: number): Promise<IUsuarioPerfil> {
  return fetchApiAuth<IUsuarioPerfil>(`/usuarios/${id}`);
}