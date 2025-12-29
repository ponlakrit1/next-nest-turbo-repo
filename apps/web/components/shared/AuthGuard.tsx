"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      session?.error === "RefreshAccessTokenError"
    ) {
      router.replace("/");
    }
  }, [status, session]);

  if (status === "loading") return null;

  return <>{children}</>;
}
