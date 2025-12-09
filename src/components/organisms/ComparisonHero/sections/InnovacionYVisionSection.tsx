"use client";

import type { CandidateComparisonData } from "@/data";
import { ListComparisonLayout } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Innovación y Visión Section
 * Uses ListComparisonLayout for simple list display
 */
export function InnovacionYVisionSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ListComparisonLayout
      leftCandidate={leftCandidate}
      rightCandidate={rightCandidate}
      dataKey="innovacionYVision"
    />
  );
}
