"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import {
  SourceTooltip,
  extractValue,
  extractSource,
} from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Experiencia de Gestión Section
 * Custom layout with sector counts and details with source tooltips
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
    const sectionSource = candidate?.experienciaGestion.source;

    const getNumberColor = (count: number) => {
      if (count === 0) return "white";
      return isLeft ? "primary" : undefined;
    };

    const getNumberClass = (count: number) => {
      if (count === 0) return "";
      return !isLeft ? "text-[#2F356E]" : "";
    };

    // Extract public sector details
    const publicDetalle = candidate?.experienciaGestion.sectorPublico.detalle;
    const publicItems = (extractValue(publicDetalle) as string[]) || [];
    const publicSource = extractSource(publicDetalle) || sectionSource;

    // Extract private sector details
    const privateDetalle = candidate?.experienciaGestion.sectorPrivado.detalle;
    const privateItems = (extractValue(privateDetalle) as string[]) || [];
    const privateSource = extractSource(privateDetalle) || sectionSource;

    return (
      <div className="w-full flex flex-col space-y-8 lg:space-y-16 py-8 lg:py-16 2xl:flex-row">
        {/* Sector Público */}
        <div className="max-w-full lg:max-w-sm mx-auto">
          <div className="flex 2xl:flex-col items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(publicCount)}
              className={`text-2xl lg:text-5xl ${getNumberClass(publicCount)}`}
              variant="h1"
              align="center"
            >
              <SourceTooltip source={sectionSource}>
                {publicCount}
              </SourceTooltip>
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
            <SourceTooltip source={publicSource}>
              {publicItems.length > 0
                ? publicItems.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < publicItems.length - 1 && <br />}
                    </span>
                  ))
                : "-"}
            </SourceTooltip>
          </Typography>
        </div>

        {/* Línea divisoria horizontal */}
        <div className="w-24 h-0.5 bg-white/50 mx-auto 2xl:h-0.5 translate-y-9 hidden 2xl:block" />

        {/* Sector Privado */}
        <div className="max-w-full lg:max-w-sm mx-auto">
          <div className="flex 2xl:flex-col items-center justify-center gap-2 mb-2">
            <Typography
              font="kenyan"
              color={getNumberColor(privateCount)}
              className={`text-2xl lg:text-3xl ${getNumberClass(privateCount)}`}
              variant="h1"
              align="center"
            >
              <SourceTooltip source={sectionSource}>
                {privateCount}
              </SourceTooltip>
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
            <SourceTooltip source={privateSource}>
              {privateItems.length > 0
                ? privateItems.map((item, index) => (
                    <span key={index}>
                      {index > 0 && <br />}- {item}
                    </span>
                  ))
                : "-"}
            </SourceTooltip>
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex lg:flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 border-t border-white">
      {renderCandidateColumn(leftCandidate, true)}
      {/* Línea divisoria central */}
      <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/50 -translate-x-1/2" />
      {renderCandidateColumn(rightCandidate, false)}
    </div>
  );
}
