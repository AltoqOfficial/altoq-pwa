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
      <div className="w-full flex flex-col space-y-8 lg:space-y-16 py-8 lg:py-16 2xl:flex-row">
        {/* Sector Público */}
        <div className="max-w-full lg:max-w-sm mx-auto ">
          <div className="flex 2xl:flex-col items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(publicCount)}
              className={`text-2xl lg:text-5xl ${getNumberClass(publicCount)}`}
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
              className="text-[10px] lg:text-4xl"
            >
              SECTOR PÚBLICO
            </Typography>
          </div>
          <Typography
            color="white"
            align="center"
            className="text-[10px] lg:text-sm"
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

        {/* Línea divisoria horizontal */}
        <div className="w-24 h-0.5 bg-white/50 mx-auto 2xl:h-0.5 translate-y-9 hidden 2xl:block" />

        {/* Sector Privado */}
        <div className="max-w-full lg:max-w-sm mx-auto">
          <div className="flex  2xl:flex-col items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(privateCount)}
              className={`text-2xl lg:text-3xl ${getNumberClass(privateCount)}`}
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
              className="text-[10px] lg:text-sm"
            >
              SECTOR PRIVADO
            </Typography>
          </div>
          <Typography
            color="white"
            align="center"
            className="text-[10px] lg:text-base"
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
    <div className="relative flex lg:flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 border-t border-white">
      {renderCandidateColumn(leftCandidate, true)}
      {/* Línea divisoria central */}
      <div className=" absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/50 -translate-x-1/2" />
      {renderCandidateColumn(rightCandidate, false)}
    </div>
  );
}
