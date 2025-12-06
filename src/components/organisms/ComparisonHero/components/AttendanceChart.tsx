"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

// Dynamic import to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AttendanceChartProps {
  percentage: number;
  label: string;
  color: string;
  projectsPresented?: number;
  projectsApproved?: number;
}

/**
 * Attendance Gauge Chart Component
 * Uses ApexCharts Radial Bar for semicircular gauge
 */
export function AttendanceChart({
  percentage,
  label,
  color,
  projectsPresented = 0,
  projectsApproved = 0,
}: AttendanceChartProps) {
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "radialBar",
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
              fontSize: "24px",
              fontWeight: 700,
              color: "#FEFEFE",
              offsetY: 10,
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
                    fontSize: "18px",
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
    <div className="flex flex-col items-center w-full max-w-[300px]">
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={series}
          type="radialBar"
          height={320}
        />
      </div>
    </div>
  );
}
