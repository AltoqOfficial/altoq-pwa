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
    const publicCount =
      candidate?.experienciaGestion.sectorPublico.cantidad || 0;
    const privateCount =
      candidate?.experienciaGestion.sectorPrivado.cantidad || 0;

    const getNumberColor = (count: number) => {
      if (count === 0) return "white";
      return isLeft ? "primary" : undefined;
    };

    const getNumberClass = (count: number) => {
      if (count === 0) return "";
      return !isLeft ? "text-[#2F356E]" : "";
    };

    return (
      <div className="w-full flex flex-col space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
        {/* Sector Público */}
        <div className="max-w-full md:max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(publicCount)}
              className={`text-2xl md:text-3xl lg:text-5xl ${getNumberClass(publicCount)}`}
              variant="h1"
              align="center"
            >
              {publicCount}
            </Typography>
            <Typography
              color="white"
              variant="h6"
              weight="800"
              align="center"
              className="text-[10px] md:text-base lg:text-lg"
            >
              SECTOR PÚBLICO
            </Typography>
          </div>
          <Typography
            color="white"
            align="center"
            className="text-[10px] md:text-sm lg:text-base"
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

        {/* Sector Privado */}
        <div className="max-w-full md:max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(privateCount)}
              className={`text-2xl md:text-3xl lg:text-5xl ${getNumberClass(privateCount)}`}
              variant="h1"
              align="center"
            >
              {privateCount}
            </Typography>
            <Typography
              color="white"
              variant="h6"
              weight="800"
              align="center"
              className="text-[10px] md:text-base lg:text-lg"
            >
              SECTOR PRIVADO
            </Typography>
          </div>
          <Typography
            color="white"
            align="center"
            className="text-[10px] md:text-sm lg:text-base"
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
    );
  };

  return (
    <div className="relative flex md:flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-16 border-t border-white">
      {renderCandidateColumn(leftCandidate, true)}
      {/* Línea divisoria central */}
      <div className=" absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/50 -translate-x-1/2" />
      {renderCandidateColumn(rightCandidate, false)}
    </div>
  );
}
