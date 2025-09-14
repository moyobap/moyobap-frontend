import type { Group } from "../types";
import { mockGroups } from "../mocks/groups";

export const api = {
  getActiveGroups: async (): Promise<Group[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return mockGroups;
  },

  getGroupById: async (id: string): Promise<Group | undefined> => {
    return mockGroups.find((group) => group.id === id);
  },
};
