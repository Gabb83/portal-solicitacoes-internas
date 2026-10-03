import { fetchApiAuth } from "./api-server";
import { IDashboardStats } from "@/types/dashboard";

export async function buscarDashboardStats(): Promise<IDashboardStats> {
  return fetchApiAuth<IDashboardStats>("/dashboard/stats");
}