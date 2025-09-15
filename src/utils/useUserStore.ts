import { create } from "zustand";

interface UserState {
  nickname: string;
  isLoggedIn: boolean;
  setUser: (nickname: string) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: "",
  isLoggedIn: false,

  setUser: (nickname) => {
    localStorage.setItem("nickname", nickname);
    set({ nickname, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("nickname");
    set({ nickname: "", isLoggedIn: false });
  },

  loadUserFromStorage: () => {
    const nickname = localStorage.getItem("nickname");
    if (nickname) {
      set({ nickname, isLoggedIn: true });
    }
  },
}));
