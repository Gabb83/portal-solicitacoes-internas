import { Plus } from "lucide-react";
import { getCategorias } from "@/services/categorias";
import { criarSolicitacao } from "@/actions/solicitacoes";
import { cookies } from "next/headers";
import { buscarUsuarioId } from "@/services/usuarios";

export default async function NovaSolicicao() {
  const categorias = await getCategorias();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const usuarioId = Number(
    token.replace("session-token-", "")
  );
  
  const usuario = await buscarUsuarioId(usuarioId);
  const dataHoje = new Date().toLocaleDateString("pt-BR");
  
  return (
    <div className="bg-[#f9f9f9]">
      <div className="max-w-4xl px-7 py-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Nova Solicitação
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os campos abaixo para abrir um novo chamado no sistema.
          </p>
        </div>
      </div>

      <form 
        action={criarSolicitacao}
        className="bg-white grid border-none rounded-xl p-5 m-5 gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
              Solicitante
            </span>
            <span className="font-medium text-gray-800">{usuario.nome}</span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider block">
              Data de Abertura
            </span>
            <span className="font-medium text-gray-800">{dataHoje}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Título
              <span className="text-red-500"> *</span>
            </label>
            <div className="relative flex items-center">
              <input 
                name="titulo"
                required
                type="text"
                placeholder="Digite o título..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categoria
              <span className="text-red-500"> *</span>
            </label>
            <div className="relative flex items-center">
              <select
                name="categoriaId"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium appearance-none cursor-pointer invalid:text-gray-400"
              >
                <option value="" disabled hidden>
                  Selecione uma categoria...
                </option>
                { categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                  > 
                    {categoria.nome}
                  </option>
                ))}
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
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descrição Detalhada <span className="text-red-500">*</span>
            </label>
            <textarea
              name="descricao" 
              rows={5}
              required
              placeholder="Descreva detalhadamente a sua solicitação ou problema..."
              className="w-full resize-y px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm font-medium  min-h-30 transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors duration-500 cursor-pointer"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#176b45] hover:bg-[#125436] text-white font-semibold text-sm rounded-lg px-6 py-2.5 cursor-pointer transition-colors duration-500 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Criar Solicitação
          </button>
        </div>
      </form>
    </div>
  )
}