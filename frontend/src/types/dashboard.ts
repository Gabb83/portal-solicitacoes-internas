export interface IDashboardStats {
  totalSolicitacoes: number;
  abertos: number;
  emAtendimento: number;
  concluidos: number;
  porStatus: Record<string, number>;
  porCategoria: Record<string, number>;
}