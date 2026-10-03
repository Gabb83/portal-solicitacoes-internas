import { cookies } from "next/headers";
import { buscarUsuarioId } from "@/services/usuarios";
import { Camera } from "lucide-react";
import PerfilForm from "@/components/PerfilForm";

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
            <PerfilForm usuario={usuario}/>
          </div>
        </div>
      </div>
    </div>
  );
}