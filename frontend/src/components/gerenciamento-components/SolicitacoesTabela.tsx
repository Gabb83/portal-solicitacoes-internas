"use client";

import { Eye, Pen, Trash } from "lucide-react";

export interface Solicitacao {
  id: string;
  codigo: string;
  titulo: string;
  solicitante: string;
  categoria: string;
  dataAbertura: string;
  status: string;
}

interface TabelaSolicitacoesProps {
  dados: Solicitacao[];
  onVisualizar?: (solicitacao: Solicitacao) => void;
  onEditar?: (solicitacao: Solicitacao) => void;
  onDeletar: (solicitacao: Solicitacao) => void;
}

export default function SolicitacoesTabela({
  dados, onVisualizar, onEditar, onDeletar
}: TabelaSolicitacoesProps) {
  return (
    <div className="mt-5 w-full overflow-x-auto rounded-lg border border-[#f8f8f8] bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-[#f9f9f9] text-xs text-center uppercase font-semibold text-emerald-900 border-b border-[#f8f8f8]">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Solicitante</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3">Data de Abertura</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          { dados.length > 0 ? (
            dados.map((solicitacao) => (
              <tr key={solicitacao.id} className="hover:bg-emerald-50/50 transition-colors text-center">
                <td className="px-4 py-3 font-medium text-gray-900">{solicitacao.codigo}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{solicitacao.titulo}</td>
                <td className="px-4 py-3">{solicitacao.solicitante}</td>
                <td className="px-4 py-3">{solicitacao.categoria}</td>
                <td className="px-4 py-3">{solicitacao.dataAbertura}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                    {solicitacao.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 text-gray-500">
                    <button 
                      onClick={() => onVisualizar?.(solicitacao)}
                      title="Visualizar"
                      className="rounded p-1.5 hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer" 
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => (solicitacao)}
                      title="Editar"
                      className="rounded p-1.5 hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <Pen className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeletar(solicitacao)}
                      title="Excluir"
                      className="rounded p-1.5 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                Nenhuma solicitação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}