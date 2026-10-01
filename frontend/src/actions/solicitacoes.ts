"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/services/api";

export async function criarSolicitacao(formData: FormData): Promise<void> {
  const categoriaRaw = formData.get('categoriaId');
  
  const payload = {
    titulo: formData.get('titulo'),
    descricao: formData.get('descricao'),
    categoriaId: categoriaRaw ? Number(categoriaRaw) : null,
    usuarioId: 2
  };

  // ✅ Chama a rota através do helper da API (aponta para http://localhost:8080/api/solicitacoes)
  await fetchApi('/solicitacoes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  revalidatePath('/solicitacoes');
  redirect('/solicitacoes');
}