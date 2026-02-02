import { memo } from "react";

interface VSBadgeProps {
  gradientId: string;
  filterId: string;
  className?: string;
}

/**
 * VS Badge Component - Memoized
 */
export const VSBadge = memo(function VSBadge({
  gradientId,
  filterId,
  className = "",
}: VSBadgeProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VS"
      role="img"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={`url(#${gradientId})`}
        filter={`url(#${filterId})`}
        fontFamily="var(--font-kenyan-coffee)"
        fontWeight="600"
        fontSize="60"
      >
        VS
      </text>
    </svg>
  );
});
