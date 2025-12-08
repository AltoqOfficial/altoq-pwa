"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Controversias Section
 */
export function ControversiasSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return "-";
    return items.map((item, index) => (
      <span key={index}>
        {item}
        {index < items.length - 1 && <br />}
      </span>
    ));
  };

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

    return (
      <div className="w-full space-y-8 lg:space-y-12 lg:space-y-16 py-8 lg:py-12 lg:py-16">
        <div
          className={`flex flex-col lg:grid lg:grid-cols-2 w-full gap-2 lg:gap-0 ${flexDirection}`}
        >
          <Typography
            color="white"
            variant="h6"
            align={textAlign}
            weight="600"
            className="max-w-full lg:max-w-[18rem] text-sm lg:text-base lg:text-lg"
          >
            INVESTIGACIONES
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align={textAlign}
            weight="200"
            className={`max-w-full lg:max-w-[18rem] flex lg:justify-center ${itemsAlign} lg:mx-auto text-xs lg:text-sm lg:text-base`}
          >
            {renderList(candidate?.controversias.investigaciones)}
          </Typography>
        </div>
        <div
          className={`flex flex-col lg:grid lg:grid-cols-2 w-full gap-2 lg:gap-0 ${flexDirection}`}
        >
          <Typography
            color="white"
            variant="h6"
            align={textAlign}
            weight="600"
            className="max-w-full lg:max-w-[18rem] text-sm lg:text-base lg:text-lg"
          >
            EN CURSO
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align={textAlign}
            weight="200"
            className={`max-w-full lg:max-w-[20rem] flex lg:justify-center ${itemsAlign} lg:mx-auto text-xs lg:text-sm lg:text-base flex-col`}
          >
            {renderList(candidate?.controversias.enCurso)}
          </Typography>
        </div>
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
