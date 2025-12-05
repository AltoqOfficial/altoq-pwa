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
        {index + 1}. {item}
        {index < items.length - 1 && <br />}
      </span>
    ));
  };

  const renderCandidateColumn = (candidate: CandidateComparisonData | null) => (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 md:gap-0">
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="600"
          className="max-w-full md:max-w-[18rem] text-sm md:text-base lg:text-lg"
        >
          INVESTIGACIONES
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="200"
          className="max-w-full md:max-w-[18rem] flex md:justify-center items-center md:mx-auto text-xs md:text-sm lg:text-base"
        >
          {renderList(candidate?.controversias.investigaciones)}
        </Typography>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 md:gap-0">
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="600"
          className="max-w-full md:max-w-[18rem] text-sm md:text-base lg:text-lg"
        >
          EN CURSO
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="200"
          className="max-w-full md:max-w-[20rem] flex md:justify-center items-center md:mx-auto text-xs md:text-sm lg:text-base"
        >
          {renderList(candidate?.controversias.enCurso)}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32">
      {renderCandidateColumn(leftCandidate)}
      {renderCandidateColumn(rightCandidate)}
    </div>
  );
}
