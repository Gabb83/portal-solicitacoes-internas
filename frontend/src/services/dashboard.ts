import { fetchApi } from "./api";
import { IDashboardStats } from "@/types/dashboard";

export async function buscarDashboardStats(): Promise<IDashboardStats> {
  return fetchApi<IDashboardStats>("/dashboard/stats");
}