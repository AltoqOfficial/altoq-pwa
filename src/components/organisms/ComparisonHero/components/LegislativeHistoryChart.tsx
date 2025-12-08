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
    <div className="flex flex-col items-center w-full">
      <Typography
        className="underline text-sm md:text-base lg:text-lg mb-2"
        color="primary"
        weight="600"
        variant="h5"
        align="center"
      >
        Asistencia
      </Typography>

      <div className="flex flex-col items-center gap-2">
        {/* Chart */}
        <div className="flex-shrink-0">
          <AttendanceChart
            percentage={attendancePercentage}
            label={attendanceLabel}
            color={color}
            projectsPresented={hasHistory ? projectsPresented : undefined}
            projectsApproved={hasHistory ? projectsApproved : undefined}
          />
        </div>

        {/* Stats */}
        <div className="space-y-1 md:space-y-2 text-center">
          {hasHistory ? (
            <>
              <Typography
                color="white"
                variant="p"
                align="center"
                weight="200"
                className="text-[10px] md:text-xs lg:text-sm"
              >
                1. Proyectos presentados: {projectsPresented}
              </Typography>
              <Typography
                color="white"
                variant="p"
                align="center"
                weight="200"
                className="text-[10px] md:text-xs lg:text-sm"
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
              className="max-w-[150px] md:max-w-[180px] text-[10px] md:text-xs lg:text-sm"
            >
              1. {note || "No tiene historial legislativo (no fue congresista)"}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
