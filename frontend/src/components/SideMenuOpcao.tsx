import Link from "next/link";
import { LucideIcon } from "lucide-react";

type SideMenuOpcaoProps = {
  nome: string;
  href: string;
  icon: LucideIcon;
  isAtivo?: boolean;
};

export default function SideMenuOpcao({
  nome, href, icon: Icon, isAtivo = false,
}: SideMenuOpcaoProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-500 ${
        isAtivo
          ? "bg-emerald-800/80 text-white shadow-inner"
          : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform duration-200 ${isAtivo ? "text-emerald-300 scale-110" : "text-emerald-200"}`} />
      <p>{nome}</p>
    </Link>
  )
}