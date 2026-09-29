import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-[#f9f9f9] h-12 flex flex-row items-center justify-end gap-5 px-7 mb-10">
      <div className="w-26 bg-[#e7e7e7] flex flex-row items-center gap-2 border-none rounded-3xl cursor-pointer p-1 px-1.5">
        <div className="w-7 h-7 bg-[#176b45] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <Link href="/perfil" className="font-medium text-gray-800">Gabriel</Link>
      </div>
      <LogOut size={22} className="cursor-pointer"/>
    </div>
  );
}