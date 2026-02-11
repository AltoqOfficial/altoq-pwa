"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Logo } from "@/components/atoms/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useUserProfile();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <Logo variant="white" size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 selection:bg-primary-500/30">
      {children}
    </div>
  );
}
