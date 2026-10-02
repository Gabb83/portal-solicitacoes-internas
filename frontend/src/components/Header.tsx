"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UsuarioLogado {
  id: number;
  email: string;
  nome: string;
  token: string;
}

export default function Header() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuario");

    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/auth");
  }

  const nome = usuario?.nome || "Usuário";
  const inicial = nome.charAt(0).toUpperCase();

  return (
    <div className="bg-[#ffffff] h-12 flex flex-row items-center justify-end gap-5 px-7 py-4">
      <div className="w-40 bg-[#f8f8f8] flex flex-row items-center gap-2 border-none rounded-3xl cursor-pointer p-1 px-1.5">
        <div className="w-7 h-7 bg-[#176b45] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {inicial}
          </span>
        </div>

        <Link
          href="/perfil"
          className="w-20 font-medium text-gray-800"
        >
          {nome}
        </Link>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors"
        aria-label="Sair"
        title="Sair"
      >
        <LogOut size={22} />
      </button>
    </div>
  );
}