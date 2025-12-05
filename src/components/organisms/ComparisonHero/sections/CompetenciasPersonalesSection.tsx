"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

const COMPETENCIAS_LABELS = [
  { key: "liderazgo", label: "Liderazgo" },
  { key: "comunicacion", label: "Comunicación" },
  { key: "credibilidad", label: "Credibilidad" },
] as const;

/**
 * Competencias Personales Section
 */
export function CompetenciasPersonalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8 lg:space-y-12">
        {COMPETENCIAS_LABELS.map(({ key, label }) => (
          <div key={key}>
            <div>
              <Typography
                className="underline text-sm md:text-base lg:text-lg"
                color="primary"
                weight="600"
                variant="h5"
                align="center"
              >
                {label}
              </Typography>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3 items-center mt-2 md:mt-4 gap-2 md:gap-0">
              <Typography
                color="white"
                weight="600"
                variant="h5"
                align="center"
                className="text-xs md:text-sm lg:text-base"
              >
                {leftCandidate?.competenciasPersonales[key] || "-"}
              </Typography>
              <div className="hidden md:block w-0.5 h-16 md:h-20 lg:h-24 bg-white mx-auto"></div>
              <Typography
                color="white"
                weight="600"
                variant="h5"
                align="center"
                className="text-xs md:text-sm lg:text-base"
              >
                {rightCandidate?.competenciasPersonales[key] || "-"}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
