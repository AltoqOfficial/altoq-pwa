"use client";

import type { CandidateComparisonData } from "@/data";
import { MobileComparisonView } from "../components/shared/ComparisonView";
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
    <div className="w-full">
      <MobileComparisonView
        fields={PERFIL_GENERAL_CONFIG.fields!}
        leftData={leftCandidate?.perfilGeneral}
        rightData={rightCandidate?.perfilGeneral}
        leftCandidate={leftCandidate}
        rightCandidate={rightCandidate}
      />
    </div>
  );
}
