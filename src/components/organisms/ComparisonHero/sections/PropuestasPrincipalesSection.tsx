"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import { PROPUESTAS_PRINCIPALES_CONFIG } from "../config";
import { renderValueWithSource } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Propuestas Principales Section
 * Three-column grid with list values and source tooltips
 */
export function PropuestasPrincipalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const fields = PROPUESTAS_PRINCIPALES_CONFIG.fields!;

  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      {fields.map(({ key, label }) => (
        <div key={key} className="grid grid-cols-3 w-full gap-2 md:gap-0">
          {/* Label in center */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="600"
            className="max-w-full md:max-w-56 flex justify-center items-center mx-auto order-2 text-xs md:text-base lg:text-lg mb-2 md:mb-0"
          >
            {label}
          </Typography>

          {/* Left value */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="max-w-full md:max-w-md mx-auto order-1 text-xs md:text-sm lg:text-base flex justify-center items-center"
          >
            {renderValueWithSource(
              leftCandidate?.propuestasPrincipales[
                key as keyof typeof leftCandidate.propuestasPrincipales
              ]
            )}
          </Typography>

          {/* Right value */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-2 text-xs md:text-sm lg:text-base flex justify-center items-center"
          >
            {renderValueWithSource(
              rightCandidate?.propuestasPrincipales[
                key as keyof typeof rightCandidate.propuestasPrincipales
              ]
            )}
          </Typography>
        </div>
      ))}
    </div>
  );
}
