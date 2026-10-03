import { cookies } from "next/headers";
import { AtSign, Calendar, Camera, Hash, User } from "lucide-react";

import { buscarUsuarioId } from "@/services/usuarios";

export default async function Perfil() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64url").toString()
  );

  const usuarioId = Number(payload.sub);

  const usuario = await buscarUsuarioId(usuarioId);

  function formatarData(data: string) {
    if (!data) return "";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(data));
  }

  return (
    <div className="min-h-full bg-[#f9f9f9] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-[#f8f8f8] p-2 sm:p-4 lg:p-5">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-24 bg-linear-to-r from-[#176b45] to-[#209460] sm:h-32">
            <div className="absolute left-4 top-14 sm:left-8 sm:top-20">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#176b45] text-2xl font-bold text-white shadow-md sm:h-24 sm:w-24 sm:text-3xl">
                  {usuario.nome
                    ? usuario.nome.charAt(0).toUpperCase()
                    : "?"}
                </div>

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow hover:bg-gray-50"
                >
                  <Camera size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-14 sm:px-6 sm:pb-7 sm:pt-16 lg:px-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Meu Perfil
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Gerencie suas informações pessoais
              </p>
            </div>

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
                    readOnly
                    type="text"
                    value={usuario.nome}
                    className="min-w-0 w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-medium text-gray-800 outline-none"
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
                    readOnly
                    type="text"
                    value={usuario.email}
                    className="min-w-0 w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm font-medium text-gray-800 outline-none"
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
          </div>
        </div>
      </div>
    </div>
  );
}