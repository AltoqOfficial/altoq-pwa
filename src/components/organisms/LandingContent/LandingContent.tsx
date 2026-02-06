"use client";

import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { SuggestionsSection } from "@/components/organisms/SuggestionsSection";
import { ComparePromotion } from "@/components/organisms/ComparePromotion";
import { LogoLoop } from "@/components/organisms/LogoLoop";

/**
 * Landing Content Component
 * Contains all landing page sections for unauthenticated users
 * Includes Header at the top for proper layout
 * Preserves all animations, margins, padding exactly as original
 */
export function LandingContent() {
  return (
    <>
      {/* Header Navigation */}
      <Header position="fixed" />

      {/* Hero Section with Countdown */}
      <HeroSection />

      {/* Partner/Media Logo Loop */}
      <LogoLoop />

      {/* Candidate Comparison Promotion */}
      <ComparePromotion />

      {/* Visual Separator */}
      <div
        className="h-0.5 w-[70%] mx-auto bg-[#484848] opacity-50 my-10"
        aria-hidden="true"
      />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Suggestions Box */}
      <SuggestionsSection />
    </>
  );
}
