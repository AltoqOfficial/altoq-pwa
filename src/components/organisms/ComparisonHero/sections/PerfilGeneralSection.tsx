"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

// Perfil General Labels
const PERFIL_GENERAL_LABELS = [
  { key: "edad", label: "EDAD" },
  { key: "nacimiento", label: "NACIMIENTO" },
  { key: "lugar", label: "LUGAR" },
  { key: "nivelEducativo", label: "NIVEL EDUCATIVO" },
  { key: "profesion", label: "PROFESIÓN" },
  { key: "partidoActual", label: "PARTIDO ACTUAL" },
  { key: "cambiosDePartido", label: "CAMBIOS DE PARTIDO" },
] as const;

/**
 * Perfil General Section
 */
export function PerfilGeneralSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
      {PERFIL_GENERAL_LABELS.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col md:grid md:grid-cols-3 w-full gap-2 md:gap-0"
        >
          {/* Mobile: Label first */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="600"
            className="max-w-full md:max-w-[18rem] flex justify-center items-center mx-auto order-first md:order-2 text-sm md:text-base lg:text-lg mb-2 md:mb-0"
          >
            {label}
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-2 md:order-1 text-xs md:text-sm lg:text-base"
          >
            {leftCandidate?.perfilGeneral[key] || "-"}
          </Typography>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-3 text-xs md:text-sm lg:text-base"
          >
            {rightCandidate?.perfilGeneral[key] || "-"}
          </Typography>
        </div>
      ))}
    </div>
  );
}
