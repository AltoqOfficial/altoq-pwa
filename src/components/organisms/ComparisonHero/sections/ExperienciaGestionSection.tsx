"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Experiencia de Gestión Section
 */
export function ExperienciaGestionSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderCandidateColumn = (
    candidate: CandidateComparisonData | null,
    isLeft: boolean
  ) => {
    return (
      <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-3 items-center justify-center">
          <Typography
            font="kenyan"
            color={isLeft ? "primary" : undefined}
            className={`text-2xl md:text-3xl lg:text-5xl ${!isLeft ? "text-[#2F356E]" : ""}`}
            variant="h1"
            align="center"
          >
            {candidate?.experienciaGestion.sectorPublico.cantidad || 0}
          </Typography>
          <div className="w-12 md:w-16 lg:w-22 h-0.5 bg-white mx-auto"></div>
          <Typography
            font="kenyan"
            color="white"
            variant="h1"
            align="center"
            className="text-2xl md:text-3xl lg:text-5xl"
          >
            {candidate?.experienciaGestion.sectorPrivado.cantidad || 0}
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
          <div className="max-w-full md:max-w-sm mx-auto">
            <Typography
              color="white"
              variant="h6"
              weight="800"
              align="center"
              className="text-sm md:text-base lg:text-lg mb-2"
            >
              SECTOR PÚBLICO
            </Typography>
            <Typography
              color="white"
              align="center"
              className="text-xs md:text-sm lg:text-base"
            >
              {candidate?.experienciaGestion.sectorPublico.detalle?.map(
                (item, index) => (
                  <span key={index}>
                    {index + 1}. {item}
                    {index <
                      (candidate?.experienciaGestion.sectorPublico.detalle
                        ?.length || 0) -
                        1 && <br />}
                  </span>
                )
              ) || "-"}
            </Typography>
          </div>
          <div className="max-w-full md:max-w-sm mx-auto">
            <Typography
              color="white"
              variant="h6"
              weight="800"
              align="center"
              className="text-sm md:text-base lg:text-lg mb-2"
            >
              SECTOR PRIVADO
            </Typography>
            <Typography
              color="white"
              align="center"
              className="text-xs md:text-sm lg:text-base"
            >
              {candidate?.experienciaGestion.sectorPrivado.detalle?.map(
                (item, index) => (
                  <span key={index}>
                    {index > 0 && <br />}- {item}
                  </span>
                )
              ) || "-"}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32">
      {renderCandidateColumn(leftCandidate, true)}
      {renderCandidateColumn(rightCandidate, false)}
    </div>
  );
}
