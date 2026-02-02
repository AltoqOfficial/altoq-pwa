"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { LandingContent } from "@/components/organisms/LandingContent";
import {
  DashboardLayout,
  DashboardContent,
} from "@/components/organisms/Dashboard";

/**
 * ConditionalHome Component
 * Renders landing page for unauthenticated users, dashboard for authenticated users
 * Preserves all existing styling and animations
 */
export function ConditionalHome() {
  const { user, isLoading } = useUserProfile();
  const isAuthenticated = !!user && !isLoading;

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated users see Dashboard
  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    );
  }

  // Unauthenticated users see Landing
  return <LandingContent />;
}
