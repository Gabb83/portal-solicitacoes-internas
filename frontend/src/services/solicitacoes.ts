import { fetchApi } from "@/services/api";
import type { IPaginaSolicitacoes } from "@/types/solicitacao";

export async function listarSolicitacoes(): Promise<IPaginaSolicitacoes> {
  return fetchApi<IPaginaSolicitacoes>("/solicitacoes");
}