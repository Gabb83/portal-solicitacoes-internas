"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/services/api";

export async function criarSolicitacao(formData: FormData): Promise<void> {
  console.log("🔥 SERVER ACTION EXECUTOU");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const usuarioId = Number(
    token.replace("session-token-", "")
  );

  if (!usuarioId) {
    redirect("/auth");
  }

  const categoriaRaw = formData.get("categoriaId");

  const payload = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    categoriaId: categoriaRaw ? Number(categoriaRaw) : null,
    usuarioId,
  };

  console.log("📦 PAYLOAD:", payload);

  const resultado = await fetchApi("/solicitacoes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log("✅ POST PARA SPRING:", resultado);

  revalidatePath("/solicitacoes");

  redirect("/gerenciar-solicitacoes");
}