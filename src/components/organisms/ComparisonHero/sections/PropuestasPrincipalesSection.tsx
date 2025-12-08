"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

const PROPUESTAS_LABELS = [
  { key: "economico", label: "ECONÓMICO" },
  { key: "social", label: "SOCIAL" },
  { key: "ambiental", label: "AMBIENTAL" },
  { key: "institucional", label: "INSTITUCIONAL" },
  { key: "educativo", label: "EDUCATIVO" },
  { key: "salud", label: "SALUD" },
  { key: "seguridad", label: "SEGURIDAD" },
] as const;

/**
 * Propuestas Principales Section
 */
export function PropuestasPrincipalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderProposals = (proposals: string[] | undefined) => {
    if (!proposals || proposals.length === 0) return "-";
    return proposals.map((item, index) => (
      <span key={index}>
        {item}
        {index < proposals.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      {PROPUESTAS_LABELS.map(({ key, label }) => (
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
            {renderProposals(leftCandidate?.propuestasPrincipales[key])}
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-2 text-xs md:text-sm lg:text-base"
          >
            {renderProposals(rightCandidate?.propuestasPrincipales[key])}
          </Typography>
        </div>
      ))}
    </div>
  );
}
