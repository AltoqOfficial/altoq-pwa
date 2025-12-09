"use client";

import { Typography } from "@/components/atoms";
import { AttendanceChart } from "./AttendanceChart";

interface LegislativeHistoryChartProps {
  hasHistory: boolean;
  attendancePercentage: number;
  attendanceLabel: string;
  projectsPresented: number;
  projectsApproved: number;
  note?: string;
  color: string;
}

/**
 * Legislative History Chart Component
 * Displays attendance chart and legislative statistics
 */
export function LegislativeHistoryChart({
  hasHistory,
  attendancePercentage,
  attendanceLabel,
  projectsPresented,
  projectsApproved,
  note,
  color,
}: LegislativeHistoryChartProps) {
  return (
    <div className="flex flex-col items-center">
      <Typography
        className="underline text-sm md:text-base lg:text-lg"
        color="primary"
        weight="600"
        variant="h5"
        align="center"
      >
        Asistencia
      </Typography>

      <div className="flex justify-center my-4 md:my-6">
        <AttendanceChart
          percentage={attendancePercentage}
          label={attendanceLabel}
          color={color}
          projectsPresented={hasHistory ? projectsPresented : undefined}
          projectsApproved={hasHistory ? projectsApproved : undefined}
        />
      </div>

      <div className="space-y-1 md:space-y-2 text-center">
        {hasHistory ? (
          <>
            <Typography
              color="white"
              variant="p"
              align="center"
              weight="200"
              className="text-xs md:text-sm lg:text-base"
            >
              1. Proyectos presentados: {projectsPresented}
            </Typography>
            <Typography
              color="white"
              variant="p"
              align="center"
              weight="200"
              className="text-xs md:text-sm lg:text-base"
            >
              2. Proyectos aprobados: {projectsApproved}
            </Typography>
          </>
        ) : (
          <Typography
            color="white"
            variant="p"
            align="center"
            weight="200"
            className="max-w-[200px] md:max-w-xs text-xs md:text-sm lg:text-base"
          >
            1. {note || "No tiene historial legislativo (no fue congresista)"}
          </Typography>
        )}
      </div>
    </div>
  );
}
