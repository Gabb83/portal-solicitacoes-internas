import { buscarDashboardStats } from "@/services/dashboard";

export default async function Dashboard() {
  const dados = await buscarDashboardStats();

  const totalStatus =
  dados.abertos +
  dados.emAtendimento +
  dados.concluidos;

const percentualAberto =
  (dados.abertos / totalStatus) * 100;

const percentualAtendimento =
  (dados.emAtendimento / totalStatus) * 100;

const percentualConcluido =
  (dados.concluidos / totalStatus) * 100;

const limiteAberto = percentualAberto;

const limiteAtendimento =
  limiteAberto + percentualAtendimento;

  return (
    <div className="bg-[#f9f9f9]">
      <div className="max-w-4xl px-7 py-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Nesta seção você acompanhar os indicadores gerais de desempenho das solicitações.
          </p>
        </div>
      </div>
      <section className="bg-white border-none rounded-2xl p-5 mx-5 mt-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Solicitações Abertas
            </label>
            <div className="relative flex items-center">
              <p 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              >{dados.abertos}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Solicitações em atendimento
            </label>
            <div className="relative flex items-center">
              <p 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              >{dados.emAtendimento}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Solicitações Concluídas
            </label>
            <div className="relative flex items-center">
              <p 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              >{dados.concluidos}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total de Solicitações
            </label>
            <div className="relative flex items-center">
              <p 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              >{dados.totalSolicitacoes}</p>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-2xl">          
          <div className="grid grid-cols-2 gap-4 mx-5 mt-4">
            <section className="bg-white rounded-2xl p-5">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-gray-900">
                  Solicitações por status
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Distribuição das solicitações conforme o status atual.
                </p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div
                  className="w-44 h-44 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #176b45 0% ${limiteAberto}%,
                      #9ca3af ${limiteAberto}% ${limiteAtendimento}%,
                      #e5e7eb ${limiteAtendimento}% 100%
                    )`,
                  }}
                >
                  <div className="w-24 h-24 bg-white rounded-full relative top-10 left-10 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {dados.totalSolicitacoes}
                    </span>

                    <span className="text-xs text-gray-500">
                      total
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#176b45]" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Abertas
                      </p>

                      <p className="text-xs text-gray-500">
                        {dados.abertos}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Em atendimento
                      </p>
                      <p className="text-xs text-gray-500">
                        {dados.emAtendimento}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gray-200" />

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Concluídas
                      </p>

                      <p className="text-xs text-gray-500">
                        {dados.concluidos}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-5">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-gray-900">
                  Solicitações por categoria
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Distribuição das solicitações por área responsável.
                </p>
              </div>

              <div className="space-y-5">
                {Object.entries(dados.porCategoria).map(
                  ([categoria, quantidade]) => {
                    const maiorQuantidade = Math.max(
                      ...Object.values(dados.porCategoria)
                    );

                    const percentual =
                      (quantidade / maiorQuantidade) * 100;

                    return (
                      <div key={categoria}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {categoria}
                          </span>

                          <span className="text-sm font-semibold text-gray-900">
                            {quantidade}
                          </span>
                        </div>

                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#176b45] rounded-full transition-all"
                            style={{
                              width: `${percentual}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </section>
      </section>  
    </div>
  );
}