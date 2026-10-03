import { cookies } from "next/headers";

export async function fetchApiAuth<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Erro na requisição [${response.status}]: ${errorBody}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}