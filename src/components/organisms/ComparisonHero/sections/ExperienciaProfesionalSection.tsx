"use client";

import Image from "next/image";
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

interface TimelineItemProps {
  startYear: string;
  endYear: string;
  description: string;
  dotColor: string;
}

/**
 * Componente para un item de la línea de tiempo horizontal continua
 */
function TimelineItem({
  startYear,
  endYear,
  description,
  dotColor,
  isLast,
}: TimelineItemProps & { isLast: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-start shrink-0 lg:flex-1 ${
        isLast ? "lg:items-end" : "lg:items-start"
      }`}
    >
      {/* Punto circular con color del candidato */}
      <div
        className="w-3 h-3 rounded-full shrink-0 z-10"
        style={{ backgroundColor: dotColor }}
      />

      {/* Contenido: años y cargo debajo del punto */}
      <div
        className={`flex flex-col min-w-[140px] lg:min-w-0 px-2 mt-2 ${
          isLast ? "lg:pr-0" : "items-start"
        }`}
      >
        <div
          className={`flex gap-1 items-center mb-1 whitespace-nowrap ${
            isLast ? "justify-end" : ""
          }`}
        >
          <Typography
            color="white"
            variant="p"
            weight="700"
            className="text-[10px] lg:text-xs"
          >
            {startYear}
          </Typography>
          <Typography
            color="white"
            variant="p"
            weight="700"
            className="text-[10px] lg:text-xs opacity-50"
          >
            -
          </Typography>
          <Typography
            color="white"
            variant="p"
            weight="700"
            className="text-[10px] lg:text-xs"
          >
            {endYear}
          </Typography>
        </div>
        <Typography
          color="white"
          variant="p"
          align="left"
          className="text-[9px] lg:text-[10px] opacity-90 leading-tight"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}

/**
 * Experiencia Profesional Section
 * Timeline design with horizontal scroll
 */
export function ExperienciaGestionSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderCandidateColumn = (
    candidate: CandidateComparisonData | null,
    isLeft: boolean
  ) => {
    const publicDetalle = candidate?.experienciaGestion.sectorPublico.detalle;
    const publicItems = (extractValue(publicDetalle) as string[]) || [];
    const publicSource =
      extractSource(publicDetalle) || candidate?.experienciaGestion.source;

    const privateDetalle = candidate?.experienciaGestion.sectorPrivado.detalle;
    const privateItems = (extractValue(privateDetalle) as string[]) || [];
    const privateSource =
      extractSource(privateDetalle) || candidate?.experienciaGestion.source;

    const sectorColor = isLeft ? "#FF2727" : "#4E58B4";

    // Función para parsear items de experiencia
    const parseExperienceItems = (items: string[]) => {
      return items.map((item) => {
        // Intentar extraer cargo y años (formato: "Primera Dama (1994-2000)")
        const match = item.match(/^(.+?)\s*\((\d{4})\s*-\s*(\d{4})\)$/);
        if (match) {
          return {
            startYear: match[2],
            endYear: match[3],
            description: match[1].trim(),
          };
        }

        // Formato alternativo: "1994-2000: Primera Dama"
        const altMatch = item.match(/(\d{4})\s*-\s*(\d{4})\s*:?\s*(.+)/);
        if (altMatch) {
          return {
            startYear: altMatch[1],
            endYear: altMatch[2],
            description: altMatch[3].trim(),
          };
        }

        // Si no tiene formato específico, usar el item como descripción
        return {
          startYear: "—",
          endYear: "—",
          description: item,
        };
      });
    };

    const publicExperiences = parseExperienceItems(publicItems);
    const privateExperiences = parseExperienceItems(privateItems);

    return (
      <div className="w-full flex flex-col space-y-8 lg:space-y-12 py-8 lg:py-16">
        {/* Imagen del candidato */}
        {candidate?.image && (
          <div className="px-4 lg:px-8">
            <div
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full p-1 inline-block"
              style={{ backgroundColor: sectorColor }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={candidate.image}
                  alt={candidate.fullName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sector Público */}
        <div className="w-full px-4 lg:px-8">
          <Typography
            color="white"
            variant="h6"
            weight="800"
            align="left"
            className="text-sm lg:text-lg mb-6 lg:mb-8"
            style={{ color: sectorColor }}
          >
            SECTOR PÚBLICO
          </Typography>

          <SourceTooltip source={publicSource}>
            {publicExperiences.length > 0 ? (
              <div className="relative mt-8">
                {/* Línea horizontal fija */}
                <div className="absolute top-[6px] left-0 w-full h-[2px] bg-white" />

                {/* Contenedor con scroll horizontal */}
                <div className="flex gap-6 overflow-x-auto lg:justify-between lg:overflow-x-visible pb-4 scrollbar-hide">
                  {publicExperiences.map((exp, index) => (
                    <TimelineItem
                      key={index}
                      startYear={exp.startYear}
                      endYear={exp.endYear}
                      description={exp.description}
                      dotColor={sectorColor}
                      isLast={index === publicExperiences.length - 1}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Typography
                color="white"
                align="left"
                className="text-xs lg:text-sm opacity-70"
              >
                Sin información disponible
              </Typography>
            )}
          </SourceTooltip>
        </div>

        {/* Sector Privado */}
        <div className="w-full px-4 lg:px-8">
          <Typography
            color="white"
            variant="h6"
            weight="800"
            align="left"
            className="text-sm lg:text-lg mb-6 lg:mb-8"
            style={{ color: sectorColor }}
          >
            SECTOR PRIVADO
          </Typography>

          <SourceTooltip source={privateSource}>
            {privateExperiences.length > 0 ? (
              <div className="relative mt-8">
                {/* Línea horizontal fija */}
                <div className="absolute top-[6px] left-0 w-full h-[2px] bg-white" />

                {/* Contenedor con scroll horizontal */}
                <div className="flex gap-6 overflow-x-auto lg:justify-between lg:overflow-x-visible pb-4 scrollbar-hide">
                  {privateExperiences.map((exp, index) => (
                    <TimelineItem
                      key={index}
                      startYear={exp.startYear}
                      endYear={exp.endYear}
                      description={exp.description}
                      dotColor={sectorColor}
                      isLast={index === privateExperiences.length - 1}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Typography
                color="white"
                align="left"
                className="text-xs lg:text-sm opacity-70"
              >
                Sin información disponible
              </Typography>
            )}
          </SourceTooltip>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-12 lg:gap-16 py-8">
      {renderCandidateColumn(leftCandidate, true)}
      {renderCandidateColumn(rightCandidate, false)}
    </div>
  );
}
