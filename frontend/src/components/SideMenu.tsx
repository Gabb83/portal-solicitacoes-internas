"use client";

import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, FilePlus, FolderOpen, User } from "lucide-react";
import SideMenuOpcao from "./SideMenuOpcao";

const itensNavegacao = [
    { nome: "Dashboard", href: "/", icon: ChartNoAxesCombined },
    { nome: "Nova Solicitação", href: "/nova-solicitacao", icon: FilePlus },
    { nome: "Gerenciar Solicitações", href: "/gerenciar-solicitacoes", icon: FolderOpen },
    { nome: "Perfil", href: "/perfil", icon: User },
];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#176b45] text-white h-screen w-64 flex flex-col justify-start p-4 shadow-xl select-none">
      <div>
        <h1 className="font-bold text-base leading-tight">Portal de Solicitações Internas</h1>
        <div className="h-px flex-1 bg-[#16794d] mt-4 mb-2" />
      </div>
      <nav className="flex flex-col gap-1.5">
        { itensNavegacao.map((idx) => {
          const isAtivo = idx.href === "/" ? pathname === "/" : pathname.startsWith(idx.href);
          return(
            <SideMenuOpcao
              key={idx.nome}
              nome={idx.nome}
              href={idx.href}
              icon={idx.icon}
              isAtivo={isAtivo}
            />
          );
        })}
      </nav>
    </aside>
  );
}