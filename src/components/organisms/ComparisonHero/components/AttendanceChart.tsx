"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AttendanceChartProps {
  percentage: number | null;
  label: string;
  color: string;
  projectsPresented?: number | null;
  projectsApproved?: number | null;
}

export function AttendanceChart({
  percentage,
  label,
  color,
}: AttendanceChartProps) {
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: "radialBar" as const,
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
        redrawOnParentResize: true,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "55%",
          },
          track: {
            background: "rgba(254, 254, 254, 0.15)",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: [color],
      stroke: {
        lineCap: "round",
      },
      labels: [label],
    }),
    [color, label]
  );

  const series = [percentage ?? 0];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Chart Container */}
      <div className="relative w-[120px] h-[70px] md:w-40 md:h-[90px] lg:w-[200px] lg:h-[110px] 2xl:w-60 2xl:h-[130px]">
        <Chart
          options={chartOptions}
          series={series}
          type="radialBar"
          width="100%"
          height="140%"
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-1 md:mt-2">
        <span
          className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-white text-xs md:text-sm lg:text-base 2xl:text-lg font-medium">
          {label}: {percentage ?? "N/A"}%
        </span>
      </div>
    </div>
  );
}
