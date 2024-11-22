"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAuthStore } from "~/stores/authStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect(() => {
    if (isAuthenticated === undefined) return;
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
