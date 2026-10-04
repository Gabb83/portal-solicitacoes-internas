"use server";

import { cookies } from "next/headers";
import { ILoginResponse } from "@/types/auth";

export async function autenticar(
  email: string, senha: string
): Promise<{ sucesso: true } | { sucesso: false; erro: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, senha,
      }),
      cache: "no-store",
    });

    if(!response.ok) {
      return {
        sucesso: false,
        erro: "E-mail ou senha inválidos.",
      };
    }

    const usuario: ILoginResponse = await response.json();
    const cookieStore = await cookies();

    cookieStore.set("token", usuario.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { sucesso: true };
  } catch (error) {
    console.error("Erro ao autenticar:", error);

    return {
      sucesso: false,
      erro: "Não foi possível realizar o login.",
    };
  }
}

export async function sair(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}