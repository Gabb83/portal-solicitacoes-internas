export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if(!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na requisição [${response.status}]: ${errorBody}`);
  }

  if(response.status === 204) {
    return undefined as T;
  }

  return response.json();
}