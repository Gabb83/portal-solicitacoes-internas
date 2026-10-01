"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/services/api";

export async function criarSolicitacao(formData: FormData): Promise<void> {
  console.log("🔥 SERVER ACTION EXECUTOU");

  const categoriaRaw = formData.get("categoriaId");

  const payload = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    categoriaId: categoriaRaw ? Number(categoriaRaw) : null,
    usuarioId: 1,
  };

  console.log("📦 PAYLOAD:", payload);

  const resultado = await fetchApi("/solicitacoes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log("✅ POST PARA SPRING:", resultado);

  revalidatePath("/solicitacoes");

  console.log("🔄 PATH REVALIDADO");

  redirect("/gerenciar-solicitacoes");
}