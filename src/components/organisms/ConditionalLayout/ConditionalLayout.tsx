"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * ConditionalLayout
 * Conditionally renders Header and Footer based on current route and auth state
 *
 * - Unauthenticated users on "/" see Header/Footer (landing page)
 * - Authenticated users on "/" see dashboard (no Header/Footer)
 * - All other routes show Header/Footer
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { user, isLoading } = useUserProfile();

  // While loading, show a minimal layout to avoid flash
  if (isLoading) {
    return <>{children}</>;
  }

  // Check if user is authenticated and on the home page (dashboard view)
  const isAuthenticatedOnHome = !!user && pathname === "/";

  // Authenticated users on "/" get their dashboard layout (no landing Header/Footer)
  if (isAuthenticatedOnHome) {
    return <>{children}</>;
  }

  // All other cases: show Header and Footer
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
