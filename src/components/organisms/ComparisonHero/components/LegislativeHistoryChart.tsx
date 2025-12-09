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

  return (
    <div className="flex flex-col items-center w-full">
      <Typography
        className="underline text-sm md:text-base lg:text-xl 2xl:text-2xl mb-2 lg:mb-4 2xl:mb-6"
        color="primary"
        weight="600"
        variant="h5"
        align="center"
      >
        Asistencia
      </Typography>

      <div className="flex flex-col items-center gap-0">
        {/* Chart */}
        <div className="flex-shrink-0 -mb-8 lg:-mb-12 2xl:-mb-14">
          <SourceTooltip source={chartSource}>
            <AttendanceChart
              percentage={attendancePercentage}
              label={attendanceLabel}
              color={color}
              projectsPresented={hasHistory ? projectsPresented : undefined}
              projectsApproved={hasHistory ? projectsApproved : undefined}
            />
          </SourceTooltip>
        </div>

        {/* Stats */}
        <div className="space-y-1 md:space-y-2 lg:space-y-3 2xl:space-y-4 text-center">
          {hasHistory ? (
            <>
              <Typography
                color="white"
                variant="p"
                align="center"
                weight="200"
                className="text-[10px] md:text-xs lg:text-base 2xl:text-lg"
              >
                <SourceTooltip source={source || undefined}>
                  1. Proyectos presentados: {projectsPresented}
                </SourceTooltip>
              </Typography>
              <Typography
                color="white"
                variant="p"
                align="center"
                weight="200"
                className="text-[10px] md:text-xs lg:text-base 2xl:text-lg"
              >
                <SourceTooltip source={source || undefined}>
                  2. Proyectos aprobados: {projectsApproved}
                </SourceTooltip>
              </Typography>
            </>
          ) : (
            <Typography
              color="white"
              variant="p"
              align="center"
              weight="200"
              className="max-w-[150px] md:max-w-[180px] lg:max-w-[220px] 2xl:max-w-[280px] text-[10px] md:text-xs lg:text-base 2xl:text-lg"
            >
              1. {note || "No tiene historial legislativo (no fue congresista)"}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
