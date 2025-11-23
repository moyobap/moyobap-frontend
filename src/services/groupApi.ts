import type { Group } from "../types/group";
import { apiClient } from "./auth";

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
