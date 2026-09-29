import { AtSign, Calendar, Camera, Hash, Lock, User } from "lucide-react";

export default function Perfil() {
  return (
    <div className="bg-[#f9f9f9] flex flex-col items-center justify-cente px-10">
      <div className="w-full bg-[#f8f8f8] border-none rounded-2xl p-5 m-10">
      <div className="bg-[#ffffff] border-none rounded-t-2xl">
        <div className="bg-linear-to-r from-[#176b45] to-[#209460] border-none rounded-t-2xl h-32 relative">
          <div className="-bottom-10 left-8 relative inline-block">
            <div className="w-24 h-24 bg-[#176b45] rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-md">G</div>
            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-200 text-gray-600 hover:bg-gray-50">
              <Camera size={14} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"></div>

        <div className="p-3">
          <h2 className="text-xl font-bold text-gray-800">Meu Perfil</h2>
          <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
        
          <div className="grid grid-cols-2 gap-2 mt-4">
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

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3 text-gray-400" />
                  <input 
                    type="password" 
                    value="12345678" 
                    readOnly 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID da Conta
                </label>
                <div className="relative flex items-center">
                  <Hash size={18} className="absolute left-3 text-gray-400" />
                  <input 
                    type="text" 
                    value="usr_94827103" 
                    readOnly 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Membro desde
                </label>
                <div className="relative flex items-center">
                  <Calendar size={18} className="absolute left-3 text-gray-400" />
                  <input 
                    type="text" 
                    value="15 de Janeiro de 2024" 
                    readOnly 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}