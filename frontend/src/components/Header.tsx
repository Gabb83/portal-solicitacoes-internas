"use client";

import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UsuarioLogado {
  id: number;
  email: string;
  nome: string;
  token: string;
}

interface HeaderProps {
  onAbrirMenu: () => void;
}

export default function Header({
  onAbrirMenu,
}: HeaderProps) {
  const router = useRouter();

  const [usuario, setUsuario] =
    useState<UsuarioLogado | null>(null);

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
    <header className="bg-white h-12 flex items-center justify-between gap-4 px-4 sm:px-7">

      {/* Botão mobile */}
      <button
        type="button"
        onClick={onAbrirMenu}
        className="md:hidden text-gray-700 hover:text-[#176b45] transition-colors"
        aria-label="Abrir menu"
        title="Abrir menu"
      >
        <Menu size={24} />
      </button>

      {/* Usuário */}
      <div className="ml-auto flex items-center gap-3">

        <Link
          href="/perfil"
          className="flex items-center gap-2 bg-[#f8f8f8] rounded-3xl p-1 px-1.5 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {/* Foto / Inicial */}
          <div className="w-7 h-7 shrink-0 bg-[#176b45] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {inicial}
            </span>
          </div>

          {/* Nome */}
          <span className="font-medium text-gray-800 truncate pr-2 max-w-32 sm:max-w-40">
            {nome}
          </span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors shrink-0"
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={22} />
        </button>

      </div>
    </header>
  );
}