"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAuthStore } from "~/stores/authStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, hydrateAuthState } = useAuthStore();
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect(() => {
    // Hydrate authentication state when the component mounts
    hydrateAuthState();
  }, [hydrateAuthState]);

  useEffect(() => {
    if (isAuthenticated === undefined) return; // Wait until state is hydrated

    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === undefined) {
    // Display loading state while authentication state is hydrating
    return (
      <>
        <div className="mx-auto flex h-screen flex-row items-center justify-center gap-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700">
            <Image width={45} height={45} src="/icons/logo.png" alt="logo" />
          </div>
          <div className="h-6 w-6 animate-bounce rounded-full bg-blue-700 [animation-delay:-.3s]">
            <Image width={45} height={45} src="/icons/logo.png" alt="logo" />
          </div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:-.5s]">
            <Image width={45} height={45} src="/icons/logo.png" alt="logo" />
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
