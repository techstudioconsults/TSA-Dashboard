"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAuthStore } from "~/stores/authStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, hydrateAuthState } = useAuthStore();
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect(() => {
    // Hydrate auth state on the client
    hydrateAuthState();
  }, [hydrateAuthState]);

  useEffect(() => {
    // Redirect unauthenticated users after auth state is hydrated
    if (isAuthenticated === undefined) return; // Wait for hydration
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === undefined) {
    // Show loading while auth state is being hydrated
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
