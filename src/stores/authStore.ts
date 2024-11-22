import { create } from "zustand";

import {
  login as loginAction,
  logout as logoutAction,
} from "~/action/auth.actions";

interface AuthState {
  isAuthenticated: boolean;
  token: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // hydrateAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: undefined,

  login: async (email, password) => {
    const response = await loginAction(email, password);

    if (response.success && response.token) {
      set({
        isAuthenticated: true,
        token: response.token,
      });
      localStorage.setItem("authToken", response.token);
    } else {
      console.error("Login failed:", response.error);
    }
  },

  logout: () => {
    logoutAction();
    set({
      isAuthenticated: false,
      token: undefined,
    });
    localStorage.removeItem("authToken");
  },

  // hydrateAuthState: () => {
  //   const token = localStorage.getItem("authToken");
  //   set({
  //     isAuthenticated: !!token,
  //     token,
  //   });
  // },
}));
