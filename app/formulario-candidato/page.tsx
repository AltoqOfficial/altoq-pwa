"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CandidateFormHero } from "@/components/organisms/CandidateFormHero";
import {
  CandidateFormWizard,
  MatchResults,
} from "@/components/organisms/CandidateFormWizard";

const FORM_STORAGE_KEY = "altoq_candidate_form_v2";

export default function CandidateFormPage() {
  const router = useRouter();
  const hasCheckedParams = useRef(false);

  // Check initial state for showResults
  const [showResults, setShowResults] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldShowResults =
      new URLSearchParams(window.location.search).get("showResults") === "true";
    const hasPendingForm = localStorage.getItem(FORM_STORAGE_KEY);
    return shouldShowResults && !!hasPendingForm;
  });

  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Clear URL param after initial render if showing results
  useEffect(() => {
    if (showResults && !hasCheckedParams.current) {
      hasCheckedParams.current = true;
      router.replace("/formulario-candidato", { scroll: false });
    }
  }, [showResults, router]);

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
    <>
      {!isWizardOpen && (
        <CandidateFormHero onStartClick={() => setIsWizardOpen(true)} />
      )}

      <CandidateFormWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </>
  );
}
