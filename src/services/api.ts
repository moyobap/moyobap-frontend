import axios from "axios";
import type { GroupFull } from "../types";

const client = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// 단일 그룹 조회
export const api = {
  async getGroupById(id: string): Promise<GroupFull | null> {
    try {
      const resp = await client.get<{ data: GroupFull }>(`/group-orders/${id}`);
      return resp.data.data;
    } catch (err) {
      console.error("그룹 조회 실패", err);
      return null;
    }
  },
};
