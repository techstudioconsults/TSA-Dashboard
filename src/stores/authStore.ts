// src/stores/authStore.ts

import { create } from "zustand";

import {
  login as loginAction,
  logout as logoutAction,
} from "~/action/auth.actions";

interface AuthState {
  isAuthenticated: boolean;
  token: string | undefined; // Add a token property to store the auth token
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: undefined, // Initialize token as null

  login: async (email, password) => {
    const response = await loginAction(email, password);
    // console.log(response);

    if (response.success && response.token) {
      set({
        isAuthenticated: true,
        token: response.token, // Store the token in the state
      });
      // Optionally store token in localStorage or cookie if needed
      localStorage.setItem("authToken", response.token);
    } else {
      //   console.error("Login failed:", response.error);
    }
  },

  logout: () => {
    logoutAction();
    set({
      isAuthenticated: false,
      token: undefined, // Clear the token from the state
    });
    // Optionally remove token from localStorage if needed
    localStorage.removeItem("authToken");
  },
}));
