"use client";

import Image from "next/image";
import type { CandidateComparisonData } from "@/data";
import { Typography } from "@/components/atoms";
import { renderValueWithSource } from "../components/shared/utils";
import type { FieldConfig } from "../components/shared";
import { IDEOLOGIA_POLITICA_CONFIG } from "../config";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Ideología Política Section
 * Uses dynamic ComparisonGrid with configuration
 */
export function IdeologiaPoliticaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const { fields } = IDEOLOGIA_POLITICA_CONFIG;

  return (
    <div className="relative w-full py-8 lg:py-12">
      {/* Cabecera con imágenes */}
      <div className="relative flex justify-between items-start mb-12 px-2 lg:px-8">
        {/* Candidato Izquierda */}
        <div className="flex-1 flex justify-end pr-4 lg:pr-12">
          {leftCandidate?.image && (
            <div className="relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#FF2727]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={leftCandidate.image}
                    alt={leftCandidate.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidato Derecha */}
        <div className="flex-1 flex justify-start pl-4 lg:pl-12">
          {rightCandidate?.image && (
            <div className="relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#4E58B4]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={rightCandidate.image}
                    alt={rightCandidate.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de temas con línea vertical */}
      <div className="relative space-y-8 lg:space-y-12">
        {/* Línea vertical central que va desde el primer al último punto */}
        <div className="absolute left-1/2 top-4 bottom-4 lg:top-8 lg:bottom-[-10px] w-[2px] bg-white -translate-x-1/2" />

        {fields?.map((field: FieldConfig) => (
          <div key={field.key} className="relative flex items-center">
            {/* Punto central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white z-10" />

            {/* Lado Izquierdo */}
            <div className="flex-1 text-right pr-3 lg:pr-4">
              <Typography
                color="white"
                className="text-[9px] text-right lg:text-sm font-atName font-black uppercase mb-1 tracking-wider"
                style={{ color: "#FF2727" }}
              >
                {field.label}
              </Typography>
              <Typography
                color="white"
                className="text-[12px] text-right lg:text-base font-atName font-light leading-tight"
              >
                {renderValueWithSource(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (leftCandidate?.ideologiaPolitica as any)?.[field.key]
                )}
              </Typography>
            </div>

            {/* Lado Derecho */}
            <div className="flex-1 text-left pl-3 lg:pl-4">
              <Typography
                color="white"
                className="text-[9px] lg:text-sm font-atName font-black uppercase mb-1 tracking-wider"
                style={{ color: "#4E58B4" }}
              >
                {field.label}
              </Typography>
              <Typography
                color="white"
                className="text-[12px] lg:text-base font-atName font-light leading-tight"
              >
                {renderValueWithSource(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (rightCandidate?.ideologiaPolitica as any)?.[field.key]
                )}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
