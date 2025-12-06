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

  return (
    <div className="w-full border-t border-white py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Left Candidate */}
        <div className="flex flex-col items-center">
          {leftCandidate && (
            <>
              <div
                className="w-full max-w-[200px] md:max-w-xs mb-4 md:mb-6 py-1.5 md:py-2 px-3 md:px-4 rounded-full text-center"
                style={{ backgroundColor: `${leftCandidate.color}30` }}
              >
                <Typography
                  color="white"
                  variant="h6"
                  weight="600"
                  className="text-sm md:text-base"
                >
                  {leftCandidate.shortName}
                </Typography>
              </div>
              <LegislativeHistoryChart
                hasHistory={leftCandidate.historialLegislativo.tieneHistorial}
                attendancePercentage={
                  leftCandidate.historialLegislativo.asistencia.porcentaje
                }
                attendanceLabel={
                  leftCandidate.historialLegislativo.asistencia.label
                }
                note={leftCandidate.historialLegislativo.nota}
                color={leftCandidate.color}
              />
            </>
          )}
          {!leftCandidate && (
            <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
              <Typography
                color="white"
                variant="p"
                className="opacity-50 text-sm md:text-base"
              >
                Sin seleccionar
              </Typography>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:flex justify-center items-center h-full">
          <div className="w-px h-full min-h-[300px] md:min-h-[400px] bg-linear-to-b from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Right Candidate */}
        <div className="flex flex-col items-center">
          {rightCandidate && (
            <>
              <div
                className="w-full max-w-[200px] md:max-w-xs mb-4 md:mb-6 py-1.5 md:py-2 px-3 md:px-4 rounded-full text-center"
                style={{ backgroundColor: `${rightCandidate.color}30` }}
              >
                <Typography
                  color="white"
                  variant="h6"
                  weight="600"
                  className="text-sm md:text-base"
                >
                  {rightCandidate.shortName}
                </Typography>
              </div>
              <LegislativeHistoryChart
                hasHistory={rightCandidate.historialLegislativo.tieneHistorial}
                attendancePercentage={
                  rightCandidate.historialLegislativo.asistencia.porcentaje
                }
                attendanceLabel={
                  rightCandidate.historialLegislativo.asistencia.label
                }
                note={rightCandidate.historialLegislativo.nota}
                color={rightCandidate.color}
              />
            </>
          )}
          {!rightCandidate && (
            <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
              <Typography
                color="white"
                variant="p"
                className="opacity-50 text-sm md:text-base"
              >
                Sin seleccionar
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
