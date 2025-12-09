"use client";

import type { CandidateComparisonData } from "@/data";
import { ComparisonGrid } from "../components/shared";
import { PERFIL_GENERAL_CONFIG } from "../config";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Perfil General Section
 * Uses dynamic ComparisonGrid with configuration
 */
export function PerfilGeneralSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ComparisonGrid
      fields={PERFIL_GENERAL_CONFIG.fields!}
      leftData={leftCandidate?.perfilGeneral}
      rightData={rightCandidate?.perfilGeneral}
    />
  );
}
