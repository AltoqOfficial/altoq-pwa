"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

const IDEOLOGIA_LABELS = [
  { key: "posicion", label: "POSICIÓN" },
  { key: "economia", label: "ECONOMÍA" },
  { key: "matrimonioIgualitario", label: "MATRIMONIO IGUALITARIO" },
  { key: "aborto", label: "ABORTO" },
  { key: "seguridad", label: "SEGURIDAD" },
  { key: "ambiente", label: "AMBIENTE" },
  { key: "educacion", label: "EDUCACIÓN" },
  { key: "reformaPolitica", label: "REFORMA POLÍTICA" },
] as const;

/**
 * Ideología Política Section
 */
export function IdeologiaPoliticaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      {IDEOLOGIA_LABELS.map(({ key, label }) => (
        <div key={key} className="grid grid-cols-3 w-full gap-2 md:gap-0">
          {/* Mobile: Label first */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="600"
            className="max-w-full md:max-w-56 flex justify-center items-center mx-auto order-2 text-xs md:text-base lg:text-lg mb-2 md:mb-0"
          >
            {label}
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="max-w-full md:max-w-md mx-auto order-1 text-xs md:text-sm lg:text-base"
          >
            {leftCandidate?.ideologiaPolitica[key] || "-"}
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-2 text-xs md:text-sm lg:text-base"
          >
            {rightCandidate?.ideologiaPolitica[key] || "-"}
          </Typography>
        </div>
      ))}
    </div>
  );
}
