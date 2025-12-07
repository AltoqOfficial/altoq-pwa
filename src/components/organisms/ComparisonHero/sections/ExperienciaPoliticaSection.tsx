"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Experiencia Política Section
 */
export function ExperienciaPoliticaSection({
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

  const renderCandidateColumn = (candidate: CandidateComparisonData | null) => (
    <div className="w-full space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 md:gap-0">
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="600"
          className="max-w-full md:max-w-[18rem] text-sm md:text-base lg:text-lg"
        >
          AÑOS DE EXPERIENCIA
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="200"
          className="max-w-full md:max-w-[18rem] flex md:justify-center items-center text-xs md:text-sm lg:text-base"
        >
          {candidate?.experienciaPolitica.anosExperiencia || "-"}
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
          CARGOS PREVIOS
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="200"
          className="max-w-full md:max-w-[20rem] flex flex-col space-y-2 md:justify-center items-start md:items-center text-xs md:text-sm lg:text-base"
        >
          {renderList(candidate?.experienciaPolitica.cargosPrevios)}
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
          CANDIDATURAS PRESIDENCIALES
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="left"
          weight="200"
          className="max-w-full md:max-w-[20rem] flex md:justify-center items-start text-xs md:text-sm lg:text-base flex-col space-y-2"
        >
          {candidate?.experienciaPolitica.candidaturasPresidenciales?.map(
            (item, index) => (
              <span key={index}>
                - {item}
                {index <
                  (candidate?.experienciaPolitica.candidaturasPresidenciales
                    ?.length || 0) -
                    1 && <br />}
              </span>
            )
          ) || "-"}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1px_1fr] gap-8 md:gap-16 lg:gap-16 border-t border-white">
      {renderCandidateColumn(leftCandidate)}
      <div className="w-0.5 h-px lg:h-auto my-8 bg-white/50" />
      {renderCandidateColumn(rightCandidate)}
    </div>
  );
}
