"use client";

import { ISolicitacaoApi } from "@/types/solicitacao";
import { X } from "lucide-react";

interface ModalVisualizarSolicitacaoProps {
  isOpen: boolean;
  solicitacoes: ISolicitacaoApi | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function ModalVisualizarSolicitacao({
  isOpen, solicitacoes, loading, error, onClose
}: ModalVisualizarSolicitacaoProps) {

  function formatarData(data: string | undefined) {
    if (!data) return "Não informada";

    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) return "Data inválida";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dataObj);
  }

  function formatarStatus(status: string | undefined) {
    const statusFormatado: Record<string, string> = {
      ABERTO: "Aberto",
      EM_ATENDIMENTO: "Em atendimento",
      CONCLUIDO: "Concluído",
    };
    return status ? statusFormatado[status] ?? status : "Não informado";
  }

  function formatarCodigo(id: number | undefined) {
    if (id === undefined) return "—";
    return String(id).padStart(8, "0");
  }

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Visualizar Solicitação
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Consulte os detalhes da solicitação.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200 text-sm">
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                Código
              </span>
              <span className="font-medium text-gray-800">
                {formatarCodigo(solicitacoes?.id)}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                Solicitante
              </span>
              <span className="font-medium text-gray-800">
                {solicitacoes?.usuarioNome}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                Data de Abertura
              </span>
              <span className="font-medium text-gray-800">
                {formatarData(solicitacoes?.dataCriacao)}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                Status
              </span>
              <span className="font-medium text-gray-800">
                {formatarStatus(solicitacoes?.status)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Título
              </label>
              <input
                type="text"
                value={solicitacoes?.titulo}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none cursor-default"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Categoria
              </label>
              <input
                type="text"
                value={solicitacoes?.categoriaNome}
                readOnly
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descrição Detalhada
            </label>
            <textarea
              value={solicitacoes?.descricao}
              readOnly
              rows={6}
              className="w-full resize-none px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none cursor-default"
            />
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}