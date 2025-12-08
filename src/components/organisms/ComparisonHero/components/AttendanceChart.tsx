"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AttendanceChartProps {
  percentage: number;
  label: string;
  color: string;
  projectsPresented?: number;
  projectsApproved?: number;
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
          enabled: false,
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
          size: "100%",
          hollow: {
            size: "65%",
          },
          track: {
            background: "rgba(254, 254, 254, 0.15)",
            strokeWidth: "100%",
            margin: 5,
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 700,
              color: "#FEFEFE",
              offsetY: 0,
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
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: "12px",
                  },
                },
              },
            },
          },
        },
      ],
    }),
    [color, label]
  );

  const series = [percentage];

  return (
    <div className="flex flex-col items-center w-full max-w-[140px] md:max-w-[160px] lg:max-w-[220px]">
      <div className="w-full lg:scale-125 lg:origin-center">
        <Chart
          options={chartOptions}
          series={series}
          type="radialBar"
          height={160}
        />
      </div>
    </div>
  );
}
