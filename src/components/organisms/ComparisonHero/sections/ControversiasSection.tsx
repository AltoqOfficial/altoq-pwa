"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import { CONTROVERSIAS_CONFIG } from "../config";
import { renderValueWithSource } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Controversias Section
 * Two-column split layout with source tooltips
 */
export function ControversiasSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const fields = CONTROVERSIAS_CONFIG.fields!;

  const renderCandidateColumn = (
    candidate: CandidateComparisonData | null,
    align: "left" | "right" = "left"
  ) => {
    const isRight = align === "right";
    const textAlign = isRight ? "right" : "left";
    const flexDirection = isRight ? "lg:flex-row-reverse" : "";
    const itemsAlign = isRight
      ? "items-end lg:items-center"
      : "items-start lg:items-center";

    const data = candidate?.controversias;

    return (
      <div className="w-full space-y-8 lg:space-y-12 lg:space-y-16 py-8 lg:py-12 lg:py-16">
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className={`flex flex-col lg:grid lg:grid-cols-2 w-full gap-2 lg:gap-0 ${flexDirection}`}
          >
            <Typography
              color="white"
              variant="h6"
              align={textAlign}
              weight="600"
              className="max-w-full lg:max-w-[18rem] text-sm lg:text-base lg:text-lg"
            >
              {label}
            </Typography>
            <Typography
              color="white"
              variant="h6"
              align={textAlign}
              weight="200"
              className={`max-w-full lg:max-w-[20rem] flex lg:justify-center ${itemsAlign} lg:mx-auto text-xs lg:text-sm lg:text-base flex-col`}
            >
              {renderValueWithSource(
                data?.[key as keyof typeof data] as
                  | { values: string[]; source?: string }
                  | string[]
                  | undefined
              )}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex lg:grid lg:grid-cols-2 gap-2 lg:gap-16 lg:gap-16 border-t border-white">
      {renderCandidateColumn(leftCandidate, "left")}
      <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/50 -translate-x-1/2" />
      {renderCandidateColumn(rightCandidate, "right")}
    </div>
  );
}
