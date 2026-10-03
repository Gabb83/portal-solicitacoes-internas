import { buscarDashboardStats } from "@/services/dashboard";

export default async function Dashboard() {
  const dados = await buscarDashboardStats();
  
  const totalStatus = dados.abertos + dados.emAtendimento + dados.concluidos;
  const percentualAberto = (dados.abertos / totalStatus) * 100;
  const percentualAtendimento = (dados.emAtendimento / totalStatus) * 100;
  const limiteAberto = percentualAberto;
  const limiteAtendimento = limiteAberto + percentualAtendimento;

  return (
    <div className="min-h-full bg-[#f9f9f9]">
      <div className="w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Nesta seção você acompanhar os indicadores gerais de desempenho
            das solicitações.
          </p>
        </div>
      </div>

      <section className="mx-3 mt-2 rounded-2xl bg-white p-3 sm:mx-4 sm:p-4 lg:mx-5 lg:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Solicitações Abertas
            </label>
            <p className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800">
              {dados.abertos}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Solicitações em atendimento
            </label>
            <p className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800">
              {dados.emAtendimento}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Solicitações Concluídas
            </label>
            <p className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800">
              {dados.concluidos}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Total de Solicitações
            </label>
            <p className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800">
              {dados.totalSolicitacoes}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section className="min-w-0 rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900">
                Solicitações por status
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Distribuição das solicitações conforme o status atual.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              <div
                className="h-40 w-40 shrink-0 rounded-full sm:h-44 sm:w-44"
                style={{
                  background: `conic-gradient(
                    #176b45 0% ${limiteAberto}%,
                    #9ca3af ${limiteAberto}% ${limiteAtendimento}%,
                    #e5e7eb ${limiteAtendimento}% 100%
                  )`,
                }}
              >
                <div className="relative left-8 top-8 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white sm:left-10 sm:top-10">
                  <span className="text-2xl font-bold text-gray-900">
                    {dados.totalSolicitacoes}
                  </span>

                  <span className="text-xs text-gray-500">
                    total
                  </span>
                </div>
              </div>
              <div className="w-full space-y-4 sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-[#176b45]" />
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
                  <span className="h-3 w-3 shrink-0 rounded-full bg-gray-400" />
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
                  <span className="h-3 w-3 shrink-0 rounded-full bg-gray-200" />
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

          <section className="min-w-0 rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900">
                Solicitações por categoria
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Distribuição das solicitações por área responsável.
              </p>
            </div>
            <div className="space-y-5">
              {Object.entries(dados.porCategoria).map(([categoria, quantidade]) => {
                const maiorQuantidade = Math.max(...Object.values(dados.porCategoria));
                const percentual = maiorQuantidade > 0 ? (quantidade / maiorQuantidade) * 100 : 0;
                  
                return (
                  <div key={categoria} className="min-w-0">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-gray-700">
                        {categoria}
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-gray-900">
                        {quantidade}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#176b45] transition-all"
                        style={{
                          width: `${percentual}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}