// useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!sessionStorage.getItem("authToken"), // Check token existence at startup
  token: sessionStorage.getItem("authToken"),

  login: (token) => {
    sessionStorage.setItem("authToken", token); // Save token to localStorage
    set({ isAuthenticated: true, token });
  },

  logout: () => {
    sessionStorage.removeItem("authToken"); // Remove token from localStorage
    set({ isAuthenticated: false, token: null });
  },
}));
