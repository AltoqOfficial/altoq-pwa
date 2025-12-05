"use client";

interface AttendanceChartProps {
  percentage: number;
  label: string;
  color: string;
  projectsPresented?: number;
  projectsApproved?: number;
}

/**
 * Attendance Semi-Circle Chart Component
 * Displays a semi-circle gauge matching the design with numbers in the arc
 */
export function AttendanceChart({
  percentage,
  label,
  color,
  projectsPresented = 0,
  projectsApproved = 0,
}: AttendanceChartProps) {
  // SVG dimensions
  const width = 280;
  const height = 160;
  const centerX = width / 2;
  const centerY = height - 20;
  const outerRadius = 120;
  const innerRadius = 80;

  // Calculate the filled arc angle (percentage of 180 degrees)
  const filledAngle = (percentage / 100) * 180;

  // Helper function to convert angle to coordinates
  const polarToCartesian = (angle: number, radius: number) => {
    const angleInRadians = ((180 - angle) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY - radius * Math.sin(angleInRadians),
    };
  };

  // Create arc path
  const createArc = (
    startAngle: number,
    endAngle: number,
    outer: number,
    inner: number
  ) => {
    const start = polarToCartesian(startAngle, outer);
    const end = polarToCartesian(endAngle, outer);
    const innerStart = polarToCartesian(endAngle, inner);
    const innerEnd = polarToCartesian(startAngle, inner);

    const largeArcFlag = endAngle - startAngle > 90 ? 1 : 0;

    return `
      M ${start.x} ${start.y}
      A ${outer} ${outer} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
      L ${innerStart.x} ${innerStart.y}
      A ${inner} ${inner} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y}
      Z
    `;
  };

  // Position for the numbers in the arc
  const leftNumberPos = polarToCartesian(45, (outerRadius + innerRadius) / 2);
  const rightNumberPos = polarToCartesian(135, (outerRadius + innerRadius) / 2);

  const hasProjects = projectsPresented > 0 || projectsApproved > 0;

  return (
    <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background arc (gray/white) */}
        <path
          d={createArc(0, 180, outerRadius, innerRadius)}
          fill="rgba(254, 254, 254, 0.9)"
        />

        {/* Filled arc (colored portion) */}
        {percentage > 0 && (
          <path
            d={createArc(0, filledAngle, outerRadius, innerRadius)}
            fill={color}
          />
        )}

        {/* Numbers inside the arc - only if has projects */}
        {hasProjects && (
          <>
            <text
              x={leftNumberPos.x}
              y={leftNumberPos.y + 5}
              textAnchor="middle"
              fill="#FEFEFE"
              fontSize="24"
              fontWeight="bold"
              fontFamily="system-ui"
            >
              {projectsPresented}
            </text>
            <text
              x={rightNumberPos.x}
              y={rightNumberPos.y + 5}
              textAnchor="middle"
              fill={percentage > 0 ? "#FEFEFE" : "#333"}
              fontSize="24"
              fontWeight="bold"
              fontFamily="system-ui"
            >
              {projectsApproved}
            </text>
          </>
        )}

        {/* Center label */}
        <text
          x={centerX}
          y={centerY + 5}
          textAnchor="middle"
          fill="#FEFEFE"
          fontSize="28"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
