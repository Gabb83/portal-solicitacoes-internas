"use client";

import { useState, useEffect } from "react";
import { CircleX, Funnel } from "lucide-react";

import type { ISolicitacaoApi, ISolicitacaoUpdate } from "@/types/solicitacao";
import { listarSolicitacoes, buscarSolicitacaoId, atualizarSolicitacaoId, deletarSolicitacao } from "@/services/solicitacoes";

import SolicitacoesTabela, { Solicitacao } from "@/components/gerenciamento-components/SolicitacoesTabela";
import ModalConfirmaçãoDelete from "@/components/gerenciamento-components/ModalConfirmacaoDelete";
import ModalVisualizarSolicitacao from "@/components/gerenciamento-components/ModalVisualizacao";
import ModalAtualizacaoSolicitacao from "@/components/gerenciamento-components/ModalAtualizacao";

export default function GerenciarSolicitações() {

  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [solicitacaoVisualizar, setSolicitacaoVisualizar] = useState<ISolicitacaoApi | null>(null);
  
  const [loadingVisualizar, setLoadingVisualizar] = useState(false);
  const [erroVisualizar, setErroVisualizar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [solicitacoesDeletar, setSolicitacoesDeletar] = useState<Solicitacao | null>(null);
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);

  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const [solicitacaoEditar, setSolicitacaoEditar] =
    useState<ISolicitacaoApi | null>(null);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [savingEditar, setSavingEditar] = useState(false);
  const [erroEditar, setErroEditar] = useState<string | null>(null);

  const handleAbrirModalDelete = (solicitacao: Solicitacao) => {
    setSolicitacoesDeletar(solicitacao);
    setModalOpen(true);
  }

  const handleAbrirModalEditar = async (
    solicitacao: Solicitacao
  ) => {
    setModalEditarOpen(true);
    setLoadingEditar(true);
    setErroEditar(null);
    setSolicitacaoEditar(null);

    try {
      const resposta = await buscarSolicitacaoId(
        Number(solicitacao.id)
      );

      setSolicitacaoEditar(resposta);
    } catch (error) {
      console.error(
        "Erro ao buscar solicitação para edição:",
        error
      );

      setErroEditar(
        "Não foi possível carregar os dados da solicitação."
      );
    } finally {
      setLoadingEditar(false);
    }
  };

  const handleSalvarEdicao = async (
    dados: ISolicitacaoUpdate
  ) => {
    if (!solicitacaoEditar) return;

    setSavingEditar(true);
    setErroEditar(null);

    try {
      const resposta = await atualizarSolicitacaoId(
        solicitacaoEditar.id,
        dados
      );

      console.log("Solicitação atualizada:", resposta);

      setSolicitacoes((prev) =>
        prev.map((item) => {
          if (item.id !== String(resposta.id)) {
            return item;
          }

          return {
            ...item,
            titulo: resposta.titulo,
            categoria: resposta.categoriaNome,
            status:
              resposta.status === "ABERTO"
                ? "Aberto"
                : resposta.status === "EM_ATENDIMENTO"
                  ? "Em atendimento"
                  : "Concluído",
          };
        })
      );

      setModalEditarOpen(false);
      setSolicitacaoEditar(null);

    } catch (error) {
      console.error(
        "Erro ao atualizar solicitação:",
        error
      );

      setErroEditar(
        "Não foi possível atualizar a solicitação."
      );
    } finally {
      setSavingEditar(false);
    }
  };

  const handleAbrirModalVisualizar = async (
    solicitacao: Solicitacao
  ) => {
    setModalVisualizarOpen(true);
    setLoadingVisualizar(true);
    setErroVisualizar(null);
    setSolicitacaoVisualizar(null);

    try {
      const resposta = await buscarSolicitacaoId(
        Number(solicitacao.id)
      );

      setSolicitacaoVisualizar(resposta);
    } catch(error) {
      console.error("Erro ao buscar solicitação:", error);
      setErroVisualizar(
        "Não foi possível carregar os detalhes da solicitação."
      );
    } finally {
      setLoadingVisualizar(false);
    }
  };

  const handleConfirmarDeletar = async () => {
    if(!solicitacoesDeletar) return;

    const id = solicitacoesDeletar.id;
    console.log("ID selecionado:", id);

    try {
      await deletarSolicitacao(Number(id));

      console.log("DELETE realizado!");

      setSolicitacoes((prev) => {
        console.log("Lista antes:", prev);
        const novaLista = prev.filter((item) => item.id !== id);

        console.log("Lista depois:", novaLista);
        return novaLista;
      });

      setModalOpen(false);
      setSolicitacoesDeletar(null);
    } catch (error) {
      console.error("Erro ao deletar solicitação:", error);
    }
  };

  const carregarSolicitacoes = async () => {
    try {
      const resposta = await listarSolicitacoes();

      const dadosFormatados: Solicitacao[] = resposta.content.map(
        (solicitacao) => ({
          id: String(solicitacao.id),
          codigo: String(solicitacao.id).padStart(8, "0"),
          titulo: solicitacao.titulo,
          solicitante: solicitacao.usuarioNome,
          categoria: solicitacao.categoriaNome,
          dataAbertura: new Date(
            solicitacao.dataCriacao
          ).toLocaleDateString("pt-BR"),
          status:
            solicitacao.status === "ABERTO"
              ? "Aberto"
              : solicitacao.status === "EM_ATENDIMENTO"
                ? "Em atendimento"
                : "Concluído",
        })
      );

      setSolicitacoes(dadosFormatados);
    } catch(error) {
      console.error(error);
      setErro("Não foi possível carregar as solicitações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  return (
    <div className="bg-[#f9f9f9]">
      <div className="max-w-4xl px-7 py-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Gerenciamento de Solicitações
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Nesta seção você pode gerenciar todas as solicitações. Além de buscar por filtros, visualizar, editar e deletar as solicitações cadastradas no sistema.
          </p>
        </div>
      </div>

      <section className="bg-white border-none rounded-xl p-5 mx-5 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Título
            </label>
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder="Digite o título..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categoria
            </label>
            <div className="relative flex items-center">
              <select
                defaultValue=""
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium appearance-none cursor-pointer invalid:text-gray-400"
                required
              >
                <option value="" disabled hidden>
                  Selecione uma categoria...
                </option>
                <option value="TI">TI</option>
                <option value="RH">RH</option>
                <option value="COMPRAS">Compras</option>
                <option value="FINANCEIRO">Financeiro</option>
                <option value="INFRAESTRUTURA">Infraestrutura</option>
              </select>
              <div className="absolute right-3 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div> 

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </label>
            <div className="relative flex items-center">
              <select
                defaultValue=""
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium appearance-none cursor-pointer invalid:text-gray-400"
                required
              >
                <option value="" disabled hidden>
                  Selecione um status...
                </option>
                <option value="ABERTO">Aberto</option>
                <option value="EM_ATENDIMENTO">Em atendimento</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
              <div className="absolute right-3 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div> 

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Período
            </label>
            <div className="relative flex items-center">
              <input 
                type="date"
                placeholder="Digite a data..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center sm:justify-end items-center gap-3 mt-5">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors duration-500 cursor-pointer"
          >
            <CircleX  className="w-4 h-4"/>
            Limpar Filtros
          </button>
          
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#176b45] hover:bg-[#125436] text-white font-semibold text-sm rounded-lg px-6 py-2.5 cursor-pointer transition-colors duration-500 shadow-sm"
          >
            <Funnel className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-4"></div>

        <SolicitacoesTabela
          dados={solicitacoes}
          onVisualizar={handleAbrirModalVisualizar}
          onEditar={handleAbrirModalEditar}
          onDeletar={handleAbrirModalDelete}
        />
      </section>

      <ModalConfirmaçãoDelete
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmarDeletar}
      />

      <ModalVisualizarSolicitacao
        isOpen={modalVisualizarOpen}
        solicitacoes={solicitacaoVisualizar}
        loading={loadingVisualizar}
        error={erroVisualizar}
        onClose={() => {
          setModalVisualizarOpen(false)
          setSolicitacaoVisualizar(null);
          setErroVisualizar(null);
        }}
      />

      <ModalAtualizacaoSolicitacao
        isOpen={modalEditarOpen}
        solicitacao={solicitacaoEditar}
        loading={loadingEditar}
        saving={savingEditar}
        error={erroEditar}
        onClose={() => {
          if (savingEditar) return;

          setModalEditarOpen(false);
          setSolicitacaoEditar(null);
          setErroEditar(null);
        }}
        onSave={handleSalvarEdicao}
      />
    </div>
  );
}