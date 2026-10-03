"use client";

import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, FilePlus, FolderOpen, User, X } from "lucide-react";
import SideMenuOpcao from "./SideMenuOpcao";

const itensNavegacao = [
  { nome: "Dashboard", href: "/", icon: ChartNoAxesCombined },
  { nome: "Nova Solicitação", href: "/nova-solicitacao", icon: FilePlus },
  { nome: "Gerenciar Solicitações", href: "/gerenciar-solicitacoes", icon: FolderOpen },
  { nome: "Perfil", href: "/perfil", icon: User },
];

interface SideMenuProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function SideMenu({
  aberto, onFechar,
}: SideMenuProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed cursor-pointer inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${aberto ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onFechar}
      />

      <aside className={`bg-[#176b45] text-white h-screen w-64 flex flex-col justify-start p-4 shadow-xl select-none fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${aberto ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-bold text-base leading-tight">
              Portal de Solicitações Internas
            </h1>
            <button
              type="button"
              onClick={onFechar}
              className="md:hidden shrink-0 text-white/80 hover:text-white"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="h-px bg-[#16794d] mt-4 mb-2" />
        </div>

        <nav className="flex flex-col gap-1.5">
          {itensNavegacao.map((item) => {
            const isAtivo = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <SideMenuOpcao
                key={item.nome}
                nome={item.nome}
                href={item.href}
                icon={item.icon}
                isAtivo={isAtivo}
              />
            );
          })}
        </nav>
      </aside>
    </>
  );
}