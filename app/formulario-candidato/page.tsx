"use client";

import { useState } from "react";
import { CandidateFormHero } from "@/components/organisms/CandidateFormHero";
import { CandidateFormWizard } from "@/components/organisms/CandidateFormWizard";

export default function CandidateFormPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

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
