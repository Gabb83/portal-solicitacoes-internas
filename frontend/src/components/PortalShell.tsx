"use client";

import { useState } from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import { IUsuarioPerfil } from "@/types/usuarios";

interface PortalShellProps {
  children: React.ReactNode;
  usuario: IUsuarioPerfil;
}

export default function PortalShell({
  children,
  usuario,
}: PortalShellProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideMenu
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
      />

      <div className="flex flex-1 min-w-0 flex-col">
        <Header
          usuario={usuario}
          onAbrirMenu={() => setMenuAberto(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}