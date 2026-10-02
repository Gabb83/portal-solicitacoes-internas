import { fetchApi } from "./api";
import { ILoginRequest, ILoginResponse } from "@/types/auth";

export async function login(dados: ILoginRequest): Promise<ILoginResponse> {
  return fetchApi<ILoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}