export interface ISolicitacaoApi {
  id: number;
  titulo: string;
  descricao: string;
  status: "ABERTO" | "EM_ATENDIMENTO" | "CONCLUIDO";
  categoriaId: number;
  categoriaNome: string;
  usuarioId: number;
  usuarioNome: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface IPaginaSolicitacoes {
  content: ISolicitacaoApi[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}