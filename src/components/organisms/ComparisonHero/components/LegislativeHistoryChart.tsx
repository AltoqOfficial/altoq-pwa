"use client";

import { Typography } from "@/components/atoms";
import { AttendanceChart } from "./AttendanceChart";
import { SourceTooltip } from "./shared";

interface LegislativeHistoryChartProps {
  hasHistory: boolean;
  attendancePercentage: number;
  attendanceLabel: string;
  projectsPresented: number;
  projectsApproved: number;
  note?: string;
  color: string;
  source?: string | null;
  attendanceSource?: string | null;
}

/**
 * Legislative History Chart Component
 * Displays attendance chart and legislative statistics
 * Supports source tooltips on hover
 */
export function LegislativeHistoryChart({
  hasHistory,
  attendancePercentage,
  attendanceLabel,
  projectsPresented,
  projectsApproved,
  note,
  color,
  source,
  attendanceSource,
}: LegislativeHistoryChartProps) {
  // Use attendanceSource if available, fallback to general source
  const chartSource = attendanceSource || source || undefined;

  // When there's no legislative history, show only the note (no title)
  if (!hasHistory) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[150px] md:min-h-[180px] lg:min-h-[220px] px-4">
        <Typography
          color="white"
          variant="p"
          align="center"
          weight="300"
          className="max-w-[200px] md:max-w-[250px] lg:max-w-[300px] text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed opacity-70"
        >
          {note || "No tiene historial legislativo (no fue congresista)"}
        </Typography>
      </div>
    );
  }

  // When there's legislative history, show the chart and stats
  return (
    <div className="flex flex-col items-center w-full">
      {/* Title */}
      <Typography
        className="underline text-sm md:text-base lg:text-xl 2xl:text-2xl mb-3 md:mb-4 lg:mb-6"
        color="primary"
        weight="600"
        variant="h5"
        align="center"
      >
        Asistencia
      </Typography>

      {/* Chart with Legend */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <SourceTooltip source={chartSource}>
          <AttendanceChart
            percentage={attendancePercentage}
            label={attendanceLabel}
            color={color}
            projectsPresented={projectsPresented}
            projectsApproved={projectsApproved}
          />
        </SourceTooltip>
      </div>

      {/* Stats */}
      <div className="space-y-1 md:space-y-2 lg:space-y-3 text-center">
        <Typography
          color="white"
          variant="p"
          align="center"
          weight="200"
          className="text-xs md:text-sm lg:text-base 2xl:text-lg"
        >
          <SourceTooltip source={source || undefined}>
            Proyectos presentados: {projectsPresented}
          </SourceTooltip>
        </Typography>
        <Typography
          color="white"
          variant="p"
          align="center"
          weight="200"
          className="text-xs md:text-sm lg:text-base 2xl:text-lg"
        >
          <SourceTooltip source={source || undefined}>
            Proyectos aprobados: {projectsApproved}
          </SourceTooltip>
        </Typography>
      </div>
    </div>
  );
}
