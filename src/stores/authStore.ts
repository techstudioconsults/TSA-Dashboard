// import Cookies from "js-cookie";
// import { create } from "zustand";

// import {
//   login as loginAction,
//   logout as logoutAction,
// } from "~/action/auth.actions";

// interface AuthState {
//   isAuthenticated: boolean;
//   token: string | undefined;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   hydrateAuthState: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   token: undefined,

//   login: async (email, password) => {
//     const response = await loginAction(email, password);
//     console.log(response);

//     if (response.success && response.token) {
//       set({
//         isAuthenticated: true,
//         token: response.token,
//       });
//       Cookies.set("authToken", response.token, {
//         expires: 7,
//         secure: true,
//         sameSite: "strict",
//       });
//     } else {
//       console.error("Login failed:", response.error);
//     }
//   },

//   logout: () => {
//     logoutAction();
//     set({
//       isAuthenticated: false,
//       token: undefined,
//     });
//     Cookies.remove("authToken");
//   },

//   hydrateAuthState: () => {
//     const token = Cookies.get("authToken");
//     set({
//       isAuthenticated: !!token,
//       token: token || undefined,
//     });
//   },
// }));

import Cookies from "js-cookie";
import { create } from "zustand";

import {
  login as loginAction,
  logout as logoutAction,
} from "~/action/auth.actions";

interface AuthState {
  isAuthenticated: boolean | undefined; // Allow undefined for initial loading state
  token: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrateAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: undefined, // Initial state to handle loading
  token: undefined,

  login: async (email, password) => {
    const response = await loginAction(email, password);

    if (response.success && response.token) {
      set({
        isAuthenticated: true,
        token: response.token,
      });
      Cookies.set("authToken", response.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
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
    Cookies.remove("authToken");
  },

  hydrateAuthState: () => {
    const token = Cookies.get("authToken");
    set({
      isAuthenticated: !!token,
      token: token || undefined,
    });
  },
}));
