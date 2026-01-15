"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import {
  DashboardContent,
  DashboardLayout,
} from "@/components/organisms/Dashboard";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { SuggestionsSection } from "@/components/organisms/SuggestionsSection";
import { ComparePromotion } from "@/components/organisms/ComparePromotion";
import { LogoLoop } from "@/components/organisms/LogoLoop";

/**
 * Conditional Home Component
 * Renders landing page for unauthenticated users
 * Renders dashboard for authenticated users
 */
export function ConditionalHome() {
  const { user, isLoading } = useUserProfile();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  // Authenticated user - show dashboard
  if (user) {
    return (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    );
  }

  // Unauthenticated user - show landing page
  return (
    <>
      {/* Hero Section with Countdown */}
      <HeroSection />

      {/* Partner/Media Logo Loop */}
      <LogoLoop />

      {/* Candidate Comparison Promotion */}
      <ComparePromotion />

      {/* Visual Separator */}
      <div
        className="h-0.5 w-[70%] mx-auto bg-[#484848] opacity-50 my-32"
        aria-hidden="true"
      />

      {/* Frequently Asked Questions - with FAQ Schema */}
      <FAQSection />

      {/* Suggestions Box */}
      <SuggestionsSection />
    </>
  );
}
