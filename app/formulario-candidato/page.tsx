"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CandidateFormHero } from "@/components/organisms/CandidateFormHero";
import { MatchResults } from "@/components/organisms/CandidateFormWizard";

const FORM_STORAGE_KEY = "altoq_candidate_form_v2";

export default function CandidateFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCheckedParams = useRef(false);

  // Check initial state for showResults
  const [showResults, setShowResults] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldShowResults =
      new URLSearchParams(window.location.search).get("showResults") === "true";
    const hasPendingForm = localStorage.getItem(FORM_STORAGE_KEY);
    return shouldShowResults && !!hasPendingForm;
  });

  // Clear URL param after initial render if showing results
  useEffect(() => {
    if (showResults && !hasCheckedParams.current) {
      hasCheckedParams.current = true;
      router.replace("/formulario-candidato", { scroll: false });
    }
  }, [showResults, router]);

  // ... (existing code for effect)

  const handleCloseResults = () => {
    // Clear form data and go back to hero
    localStorage.removeItem(FORM_STORAGE_KEY);
    setShowResults(false);
    router.push("/");
  };

  // Show MatchResults if redirected from login with pending form
  if (showResults) {
    return <MatchResults onClose={handleCloseResults} results={[]} />;
  }

  return (
    <CandidateFormHero
      onOptionSelect={(value) => {
        // Redirect to dedicated full-screen wizard route
        // Preserve existing params (like district)
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("q", "Q1");
        currentParams.set("v", value);
        router.push(
          `/formulario-candidato/cuestionario?${currentParams.toString()}`
        );
      }}
    />
  );
}
