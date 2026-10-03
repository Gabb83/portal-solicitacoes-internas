"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApiAuth } from "@/services/api-server";
import { IPaginaSolicitacoes, ISolicitacaoApi } from "@/types/solicitacao";

export async function criarSolicitacao(formData: FormData): Promise<void> {
  console.log("🔥 SERVER ACTION EXECUTOU");

  const categoriaRaw = formData.get("categoriaId");

  const payload = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    categoriaId: categoriaRaw ? Number(categoriaRaw) : null,
  };

  console.log("📦 PAYLOAD:", payload);

  const resultado = await fetchApiAuth("/solicitacoes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log("✅ POST PARA SPRING:", resultado);

  revalidatePath("/solicitacoes");

  redirect("/gerenciar-solicitacoes");
}

export async function listarSolicitacoesAction(): Promise<IPaginaSolicitacoes> {
  return fetchApiAuth<IPaginaSolicitacoes>("/solicitacoes");
}

export async function buscarSolicitacaoAction(
  id: number
): Promise<ISolicitacaoApi> {
  return fetchApiAuth<ISolicitacaoApi>(`/solicitacoes/${id}`);
}
