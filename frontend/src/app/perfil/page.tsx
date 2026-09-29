import { AtSign, Calendar, Camera, Hash, Lock, LogOut, User } from "lucide-react";

export default function Perfil () {
  return(
    <div>
      <div className="flex flex-row items-center justify-end gap-2 p-2">
        <LogOut />

        <div className="w-28 bg-[#e7e7e7] flex flex-row items-center gap-1 border-none rounded-3xl cursor-pointer p-1">
          <div className="w-[30px] h-[30px] bg-[#176b45] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <p className="font-medium text-gray-800">Gabriel</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800">Meu Perfil</h2>
        <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nome Completo
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3 text-gray-400" />
              <input 
                type="text" 
                value="Gabriel Evangelista" 
                readOnly 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Usuário
            </label>
            <div className="relative flex items-center">
              <AtSign size={18} className="absolute left-3 text-gray-400" />
              <input 
                type="text" 
                value="gabriel_santos" 
                readOnly 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>
        

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        </div>
      </div>
    </div>
  );
}