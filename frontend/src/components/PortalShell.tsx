"use client";

import { useState } from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";

interface PortalShellProps {
  children: React.ReactNode;
}

export default function PortalShell({
  children,
}: PortalShellProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Menu */}
      <SideMenu
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
      />

      {/* Conteúdo */}
      <div className="flex flex-1 min-w-0 flex-col">
        <Header
          onAbrirMenu={() => setMenuAberto(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}