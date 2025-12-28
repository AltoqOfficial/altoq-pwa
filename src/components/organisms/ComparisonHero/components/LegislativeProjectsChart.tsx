"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import { HistorialLegislativo } from "@/data";
import { Calendar } from "lucide-react";

interface LegislativeProjectsChartProps {
  data: HistorialLegislativo;
  partyName: string;
  color: string;
  partyLogoLetter: string;
  partyIcon?: string;
}

export function LegislativeProjectsChart({
  data,
  partyName,
  color,
  partyLogoLetter,
  partyIcon,
}: LegislativeProjectsChartProps) {
  const { stats, projects, productivityLabel } = data;

  const total = stats.presentados;

  // Calculate segments for the gauge
  // Order requested: Aprobados, Presentados, En Pleno, En Comision, Rechazados
  const segments = useMemo(() => {
    const safeTotal = total || 1;
    const radius = 40;
    const circumference = Math.PI * radius;

    let currentAngle = 0; // 0 to 1

    const dataPoints = [
      {
        value: stats.aprobados,
        color: "#3AD725", // Green
        label: "Aprobados",
      },
      {
        value: stats.otros, // Mapping 'otros' to 'Presentados' (subset) based on context
        color: "#3771C8", // Blue
        label: "Presentados",
      },
      {
        value: stats.enPleno,
        color: "#FF9A27", // Orange
        label: "En pleno",
      },
      {
        value: stats.enComision,
        color: "#FFDD55", // Yellow
        label: "En comisión",
      },
      {
        value: stats.rechazados,
        color: "#A6A6A6", // Grey
        label: "Rechazados",
      },
    ];

    return dataPoints.map((point) => {
      const ratio = point.value / safeTotal;
      const strokeDasharray = `${ratio * circumference} ${circumference}`;
      const strokeDashoffset = -currentAngle * circumference;

      const midRatio = currentAngle + ratio / 2;
      const midAngleRad = Math.PI * (1 - midRatio);

      const labelX = 50 + radius * Math.cos(midAngleRad);
      const labelY = 50 - radius * Math.sin(midAngleRad);

      currentAngle += ratio;

      return {
        ...point,
        strokeDasharray,
        strokeDashoffset,
        labelX,
        labelY,
      };
    });
  }, [stats, total]);

  return (
    <div className="flex flex-col w-full">
      {/* Header with Logo and Party */}
      <div className="flex flex-col items-center mb-4 md:mb-8">
        <div className="w-10 h-10 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 md:mb-4 border-2 md:border-4 border-white shadow-lg overflow-hidden relative bg-white">
          {partyIcon ? (
            <Image
              src={partyIcon}
              alt={partyName}
              fill
              className="object-contain p-1 md:p-2"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span className="text-xl md:text-4xl font-black text-white font-atName transform -translate-y-0.5">
                {partyLogoLetter}
              </span>
            </div>
          )}
        </div>
        <Typography
          variant="h6"
          className="text-center font-normal font-atName mb-4 md:mb-8 text-xs md:text-base lg:text-lg text-white leading-tight"
        >
          {partyName}
        </Typography>
        <Typography
          variant="h5"
          className="text-center font-black uppercase tracking-wider text-base md:text-2xl text-white font-atName"
        >
          {productivityLabel}
        </Typography>
      </div>

      {/* Gauge Chart */}
      <div className="relative w-full aspect-2/1 max-w-[280px] mx-auto mb-4 md:mb-8">
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full transform overflow-visible"
        >
          {/* Background Arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#1F2937"
            strokeWidth="12"
          />

          {/* Data Segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke={segment.color}
              strokeWidth="12"
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset} // Fixed: removed negative sign
              className="transition-all duration-500 ease-out"
            />
          ))}

          {/* Segment Values */}
          {segments.map(
            (segment, index) =>
              segment.value > 0 && (
                <text
                  key={`label-${index}`}
                  x={segment.labelX}
                  y={segment.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-[5px] font-bold"
                  style={{ textShadow: "0px 0px 2px rgba(0,0,0,0.5)" }}
                >
                  {segment.value}
                </text>
              )
          )}
        </svg>

        {/* Legend */}
      </div>

      {/* Stats List */}
      <div className="flex flex-col gap-1.5 md:gap-2 mb-6 md:mb-10 w-full px-0 md:px-4">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="flex items-center p-1.5 md:p-2 rounded border border-white/10 bg-white/5"
          >
            <div
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm mr-2 md:mr-3 shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-[10px] md:text-base text-gray-200 flex-1 leading-none">
              {segment.label}
            </span>
          </div>
        ))}
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-3 md:gap-4 w-full px-0 md:px-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex gap-0 group hover:bg-white/5 transition-colors rounded-r-lg overflow-hidden"
          >
            {/* Color Bar */}
            <div
              className="w-1 md:w-2 shrink-0"
              style={{ backgroundColor: color }}
            />

            <div className="flex flex-col py-2 px-2 md:py-3 md:px-4 gap-0.5 md:gap-1 w-full group-hover:border-transparent">
              <div
                className="text-xs md:text-base font-bold font-atName"
                style={{ color: color }}
              >
                {project.code}
              </div>
              <div className="text-white text-[10px] md:text-base leading-tight md:leading-normal line-clamp-2 md:line-clamp-none">
                {project.title}
              </div>
              {project.date && (
                <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                  <Calendar size={10} className="text-gray-400 md:hidden" />
                  <Calendar
                    size={12}
                    className="text-gray-400 hidden md:block"
                  />
                  <span className="text-[9px] md:text-xs text-gray-400">
                    {project.date}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
