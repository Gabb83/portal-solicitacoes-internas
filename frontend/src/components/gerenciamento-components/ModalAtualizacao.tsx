"use client";

import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

import type {
  ISolicitacaoApi,
  ISolicitacaoUpdate,
} from "@/types/solicitacao";

interface ModalAtualizacaoSolicitacaoProps {
  isOpen: boolean;
  solicitacao: ISolicitacaoApi | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (dados: ISolicitacaoUpdate) => Promise<void>;
}

export default function ModalAtualizacaoSolicitacao({
  isOpen,
  solicitacao,
  loading,
  saving,
  error,
  onClose,
  onSave,
}: ModalAtualizacaoSolicitacaoProps) {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [status, setStatus] =
    useState<ISolicitacaoUpdate["status"]>("ABERTO");

  useEffect(() => {
    if (!solicitacao) return;

    setTitulo(solicitacao.titulo);
    setDescricao(solicitacao.descricao);
    setCategoriaId(solicitacao.categoriaId);
    setStatus(solicitacao.status);
  }, [solicitacao]);

  if (!isOpen) return null;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await onSave({
      titulo,
      descricao,
      categoriaId,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-100">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Editar Solicitação
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Altere os dados da solicitação.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer disabled:opacity-50"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {loading ? (

          <div className="p-10 text-center text-sm text-gray-500">
            Carregando solicitação...
          </div>

        ) : !solicitacao ? (

          <div className="p-10 text-center text-sm text-gray-500">
            Solicitação não encontrada.
          </div>

        ) : (

          <form onSubmit={handleSubmit}>

            <div className="p-6 space-y-5">

              {/* Informações da solicitação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200 text-sm">

                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                    Código
                  </span>

                  <span className="font-medium text-gray-800">
                    {String(solicitacao.id).padStart(8, "0")}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                    Solicitante
                  </span>

                  <span className="font-medium text-gray-800">
                    {solicitacao.usuarioNome}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                    Data de Abertura
                  </span>

                  <span className="font-medium text-gray-800">
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(solicitacao.dataCriacao))}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
                    Status Atual
                  </span>

                  <span className="font-medium text-gray-800">
                    {solicitacao.status === "ABERTO"
                      ? "Aberto"
                      : solicitacao.status === "EM_ATENDIMENTO"
                        ? "Em atendimento"
                        : "Concluído"}
                  </span>
                </div>

              </div>

              {/* Título e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <div className="flex flex-col gap-1.5">

                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Título
                  </label>

                  <input
                    type="text"
                    value={titulo}
                    onChange={(event) =>
                      setTitulo(event.target.value)
                    }
                    required
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none focus:border-[#176b45] focus:ring-1 focus:ring-[#176b45]"
                  />

                </div>

                <div className="flex flex-col gap-1.5">

                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoria
                  </label>

                  <select
                    value={categoriaId}
                    onChange={(event) =>
                      setCategoriaId(Number(event.target.value))
                    }
                    required
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none focus:border-[#176b45] focus:ring-1 focus:ring-[#176b45] cursor-pointer"
                  >
                    <option value={1}>TI</option>
                    <option value={2}>RH</option>
                    <option value={3}>Compras</option>
                    <option value={4}>Financeiro</option>
                    <option value={5}>Infraestrutura</option>
                  </select>

                </div>
<div className="flex flex-col gap-1.5">

                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as ISolicitacaoUpdate["status"]
                    )
                  }
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none focus:border-[#176b45] focus:ring-1 focus:ring-[#176b45] cursor-pointer"
                >
                  <option value="ABERTO">
                    Aberto
                  </option>

                  <option value="EM_ATENDIMENTO">
                    Em atendimento
                  </option>

                  <option value="CONCLUIDO">
                    Concluído
                  </option>
                </select>

              </div>
              </div>

              {/* Status */}
              

              {/* Descrição */}
              <div className="flex flex-col gap-1.5">

                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Descrição Detalhada
                </label>

                <textarea
                  value={descricao}
                  onChange={(event) =>
                    setDescricao(event.target.value)
                  }
                  required
                  rows={6}
                  className="w-full resize-none px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium focus:outline-none focus:border-[#176b45] focus:ring-1 focus:ring-[#176b45]"
                />

              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

            </div>

            {/* Rodapé */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#176b45] hover:bg-[#125436] text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />

                {saving
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
