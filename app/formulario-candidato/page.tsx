"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CandidateFormHero } from "@/components/organisms/CandidateFormHero";
import {
  CandidateFormWizard,
  MatchResults,
} from "@/components/organisms/CandidateFormWizard";

import { AnswerValue } from "@/components/organisms/CandidateFormWizard/types";

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

  // State to hold the first answer from the Hero section
  const [initialAnswer, setInitialAnswer] = useState<{
    questionId: string;
    value: AnswerValue;
  } | null>(null);

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
    setInitialAnswer(null);
    router.push("/");
  };

  // Show MatchResults if redirected from login with pending form
  if (showResults) {
    return <MatchResults onClose={handleCloseResults} results={[]} />;
  }

  return (
    <>
      {!isWizardOpen && (
        <CandidateFormHero
          onOptionSelect={(value) => {
            setInitialAnswer({ questionId: "Q1", value: value as AnswerValue });
            setIsWizardOpen(true);
          }}
        />
      )}

      {isWizardOpen && (
        <CandidateFormWizard
          isOpen={true} // Always true since we conditionally render the component
          onClose={() => setIsWizardOpen(false)}
          initialAnswer={initialAnswer}
        />
      )}
    </>
  );
}
