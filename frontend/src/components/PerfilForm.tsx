"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Calendar, Check, Edit, Hash, User, X } from "lucide-react";
import { atualizarUsuarioAction } from "@/actions/usuarios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataCriacao: string;
}

interface PerfilFormProps {
  usuario: Usuario;
}

export default function PerfilForm({ usuario }: PerfilFormProps) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter()

  function formatarData(data: string) {
    if(!data) return "";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(data));
  }

  function cancelarEdicao() {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setErro(null);
    setEditando(false);
  }

  async function salvar() {
    if(!nome.trim() || !email.trim()) {
      setErro("Nome e e-mail são obrigatórios.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      await atualizarUsuarioAction(usuario.id, {
        nome: nome.trim(),
        email: email.trim(),
      });

      setEditando(false);
      router.refresh();
    } catch(error) {
      console.error("Erro ao atualizar usuário:", error);
      setErro("Não foi possível atualizar seus dados.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Meu Perfil
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie suas informações pessoais
          </p>
        </div>

        {!editando && (
          <button
            type="button"
            onClick={() => setEditando(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <Edit size={16} />
            Editar
          </button>
        )}
      </div>

      {erro && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Nome Completo
          </label>
          <div className="relative flex min-w-0 items-center">
            <User
              size={18}
              className="absolute left-3 shrink-0 text-gray-400"
            />
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              readOnly={!editando}
              className={`min-w-0 w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm font-medium text-gray-800 outline-none ${
                editando
                  ? "border-gray-300 bg-white focus:border-[#176b45]"
                  : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            E-mail
          </label>
          <div className="relative flex min-w-0 items-center">
            <AtSign
              size={18}
              className="absolute left-3 shrink-0 text-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editando}
              className={`min-w-0 w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm font-medium text-gray-800 outline-none ${
                editando
                  ? "border-gray-300 bg-white focus:border-[#176b45]"
                  : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            ID da Conta
          </label>
          <div className="relative flex min-w-0 items-center">
            <Hash
              size={18}
              className="absolute left-3 shrink-0 text-gray-400"
            />
            <input
              readOnly
              type="text"
              value={usuario.id.toString()}
              className="min-w-0 w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-mono text-gray-800 outline-none"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Membro desde
          </label>
          <div className="relative flex min-w-0 items-center">
            <Calendar
              size={18}
              className="absolute left-3 shrink-0 text-gray-400"
            />
            <input
              readOnly
              type="text"
              value={formatarData(usuario.dataCriacao)}
              className="min-w-0 w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-medium text-gray-800 outline-none"
            />
          </div>
        </div>
      </div>

      {editando && (
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={cancelarEdicao}
            disabled={salvando}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <X size={16} />
            Cancelar
          </button>
          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="flex items-center gap-2 rounded-lg bg-[#176b45] px-4 py-2 text-sm font-medium text-white hover:bg-[#125538] disabled:opacity-50"
          >
            <Check size={16} />
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      )}
    </>
  );
}