"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import { COMPETENCIAS_PERSONALES_CONFIG } from "../config";
import { renderValueWithSource } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Competencias Personales Section
 * Custom styled three-column layout with underlined labels and source tooltips
 */
export function CompetenciasPersonalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const fields = COMPETENCIAS_PERSONALES_CONFIG.fields!;

  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8 lg:space-y-12">
        {fields.map(({ key, label }) => (
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
            <div className="grid grid-cols-3 items-center mt-2 md:mt-4 gap-2 md:gap-0">
              <Typography
                color="white"
                weight="600"
                variant="h5"
                align="center"
                className="text-xs md:text-sm lg:text-base"
              >
                {renderValueWithSource(
                  leftCandidate?.competenciasPersonales?.[
                    key as keyof NonNullable<
                      typeof leftCandidate.competenciasPersonales
                    >
                  ]
                )}
              </Typography>
              <div className="w-0.5 h-16 md:h-20 lg:h-24 bg-white mx-auto" />
              <Typography
                color="white"
                weight="600"
                variant="h5"
                align="center"
                className="text-xs md:text-sm lg:text-base"
              >
                {renderValueWithSource(
                  rightCandidate?.competenciasPersonales?.[
                    key as keyof NonNullable<
                      typeof rightCandidate.competenciasPersonales
                    >
                  ]
                )}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
