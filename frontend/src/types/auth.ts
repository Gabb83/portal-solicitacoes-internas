export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  id: number;
  email: string;
  nome: string;
  token: string;
}