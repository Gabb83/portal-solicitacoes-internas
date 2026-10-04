"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApiAuth } from "@/services/api-server";
import { IPaginaSolicitacoes, ISolicitacaoApi, ISolicitacaoUpdate } from "@/types/solicitacao";

export async function criarSolicitacao(formData: FormData): Promise<void> {
  const categoriaRaw = formData.get("categoriaId");

  const payload = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    categoriaId: categoriaRaw ? Number(categoriaRaw) : null,
  };
  
  const resultado = await fetchApiAuth("/solicitacoes", {
    method: "POST",
    body: JSON.stringify(payload),
  });


  revalidatePath("/solicitacoes");
  redirect("/gerenciar-solicitacoes");
}

export async function buscarSolicitacaoAction(
  id: number
): Promise<ISolicitacaoApi> {
  return fetchApiAuth<ISolicitacaoApi>(`/solicitacoes/${id}`);
}

export async function atualizarSolicitacaoAction(
  id: number,
  solicitacao: ISolicitacaoUpdate
): Promise<ISolicitacaoApi> {
  return fetchApiAuth<ISolicitacaoApi>(`/solicitacoes/${id}`, {
    method: "PUT",
    body: JSON.stringify(solicitacao),
  });
}

export async function deletarSolicitacaoAction(id: number): Promise<{sucesso: true} | {sucesso: false; erro: string}> { 
  try { 
    await fetchApiAuth<void>(`/solicitacoes/${id}`, {
      method: "DELETE", 
    }); 
    
    return { sucesso: true }; 
  } catch (error) {
    if( error instanceof Error && error.message.includes("[403]")) {
      return { sucesso: false, erro: "Não é possível excluir uma solicitação que está em atendimento ou já foi concluída.", }; 
    }

    console.error("Erro ao excluir solicitação:", error); 
    return { sucesso: false, erro: "Não foi possível excluir a solicitação.", }; 
  }
}

export async function listarSolicitacoesAction(
  filtros?: {
    titulo?: string;
    categoriaId?: number;
    status?: string;
    dataInicio?: string;
    dataFim?: string;
  }
): Promise<IPaginaSolicitacoes> {
  const params = new URLSearchParams();

  if(filtros?.titulo) {
    params.set("titulo", filtros.titulo);
  }

  if(filtros?.categoriaId) {
    params.set("categoriaId", String(filtros.categoriaId));
  }

  if(filtros?.status) {
    params.set("status", filtros.status);
  }

  if(filtros?.dataInicio) {
    params.set("dataInicio", filtros.dataInicio);
  }

  if(filtros?.dataFim) {
    params.set("dataFim", filtros.dataFim);
  }

  const query = params.toString();

  return fetchApiAuth<IPaginaSolicitacoes>(
    `/solicitacoes${query ? `?${query}` : ""}`
  );
}