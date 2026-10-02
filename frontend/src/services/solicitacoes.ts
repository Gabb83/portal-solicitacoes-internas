import { fetchApi } from "@/services/api";
import type { IPaginaSolicitacoes, ISolicitacaoApi } from "@/types/solicitacao";

export async function listarSolicitacoes(): Promise<IPaginaSolicitacoes> {
  return fetchApi<IPaginaSolicitacoes>("/solicitacoes");
}

export async function buscarSolicitacaoId(id: number): Promise<ISolicitacaoApi> {
  return fetchApi<ISolicitacaoApi>(`/solicitacoes/${id}`);
}

export async function deletarSolicitacao(id: number): Promise<void> {
  return fetchApi<void>(`/solicitacoes/${id}`, {
    method: "DELETE",
  });
} 