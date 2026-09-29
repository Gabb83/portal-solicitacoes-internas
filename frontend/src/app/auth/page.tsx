"use client";

import { ShieldLock, Lock, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative min-h-screen w-full overflow-hidden bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#08271d]/65" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
          <div className="card-login w-full max-w-sm p-8">
            <div className="bg-white border-none rounded-2xl mb-7 text-center p-5">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#176b45] text-white shadow-sm">
                  <ShieldLock />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bem-vindo
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Acesse ao Portal de Solicitações Internas
              </p>

              <form className="flex flex-col gap-5 mt-5">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="username"
                    className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent outline-none transition-all focus:border-[#176b45]"
                    placeholder="Usuário"
                    required
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-3 -top-2.5 px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#176b45] cursor-text"
                  >
                    Usuário
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="peer w-full rounded-lg border border-gray-300 bg-transparent pl-4 pr-11 py-3 text-gray-900 placeholder-transparent outline-none transition-all focus:border-[#176b45]"
                    placeholder="Senha"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 -top-2.5 px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#176b45] cursor-text"
                  >
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#176b45] hover:bg-[#125436] text-white font-bold rounded-lg py-3 cursor-pointer transition-colors"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-500" />
                <Lock size={20} />
                <div className="h-px flex-1 bg-gray-500" />
              </div>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Acesso restrito a usuários autorizados
              </p>
            </div>  
          </div>
          <p className="text-xs font-medium text-white/60">
            © 2026 Portal de Solicitações Internas
          </p>
        </div>
      </div>
    </div>
  );
}