"use client";

import type { CandidateComparisonData } from "@/data";
import { LegislativeHistoryChart } from "../components/LegislativeHistoryChart";
import { Typography } from "@/components/atoms";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Historial Legislativo Section with Charts
 * Custom layout using LegislativeHistoryChart component with source tooltips
 */
export function HistorialLegislativoSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const hasData = leftCandidate || rightCandidate;

  if (!hasData) {
    return (
      <div className="w-full border-t border-white py-8 md:py-12 lg:py-16">
        <div className="text-center py-8 md:py-12">
          <Typography
            color="white"
            variant="h5"
            weight="200"
            className="opacity-50 text-sm md:text-base lg:text-lg"
          >
            Selecciona candidatos para ver el historial legislativo
          </Typography>
        </div>
      </div>
    );
  }

  const renderCandidateChart = (candidate: CandidateComparisonData | null) => {
    if (candidate) {
      return (
        <LegislativeHistoryChart
          hasHistory={candidate.historialLegislativo.tieneHistorial}
          attendancePercentage={
            candidate.historialLegislativo.asistencia.porcentaje
          }
          attendanceLabel={candidate.historialLegislativo.asistencia.label}
          projectsPresented={
            candidate.historialLegislativo.proyectosPresentados
          }
          projectsApproved={candidate.historialLegislativo.proyectosAprobados}
          note={candidate.historialLegislativo.nota}
          color={candidate.color}
          source={candidate.historialLegislativo.source}
          attendanceSource={candidate.historialLegislativo.asistencia.source}
        />
      );
    }

    return (
      <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
        <Typography
          color="white"
          variant="p"
          className="opacity-50 text-sm md:text-base"
        >
          Sin seleccionar
        </Typography>
      </div>
    );
  };

  return (
    <div className="w-full border-t border-white py-8 md:py-12 lg:py-20 2xl:py-28">
      <div className="relative flex justify-center md:grid md:grid-cols-2 gap-16 md:gap-8 lg:gap-16 2xl:gap-32 items-start">
        {/* Left Candidate */}
        <div className="flex items-center">
          {renderCandidateChart(leftCandidate)}
        </div>

        {/* Divider */}
        <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-white/50 -translate-x-1/2" />

        {/* Right Candidate */}
        <div className="flex items-center">
          {renderCandidateChart(rightCandidate)}
        </div>
      </div>
    </div>
  );
}
