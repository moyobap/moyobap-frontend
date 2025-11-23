import axios from "axios";
import type { Group } from "../types/group";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  timeout: 10000,
});

export const groupApi = {
  async createGroup(body: {
    menuCategory: string;
    brandName: string;
    expectedAmount: number;
    maxDistance: number;
    durationMinutes: number;
  }): Promise<Group> {
    const resp = await apiClient.post<{ data: Group }>("/group-orders", body);
    return resp.data.data;
  },
  async getActiveGroups(): Promise<Group[]> {
    const resp = await apiClient.get<{ data: Group[] }>("/group-orders/active");
    return resp.data.data;
  },
};
