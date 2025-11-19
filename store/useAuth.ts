/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";

type AuthState = {
  user: any | null;
  setUser: (u: any) => void;
  logout: () => void;
};
export const useAuth = create<AuthState>((set: any) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  setUser: (u: any) => {
    localStorage.setItem("user", JSON.stringify(u));
    set({ user: u });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
