"use server";

import { fetchApiAuth } from "@/services/api-server";

interface AtualizarUsuario {
  nome: string;
  email: string;
}

export async function atualizarUsuarioAction(
  id: number,
  dados: AtualizarUsuario
) {
  return fetchApiAuth(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}