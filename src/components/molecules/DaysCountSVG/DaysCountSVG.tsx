"use client";

import { useMemo, useId } from "react";

/**
 * Calculates the number of days remaining until January 10, 2026
 */
function getDaysUntilTarget(): number {
  const now = new Date();
  const target = new Date("2026-01-12T00:00:00-05:00"); // Peru timezone (UTC-5)

  // Reset hours to get accurate day count
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays); // Never show negative days
}

/**
 * DaysCountSVG Component (Molecule)
 * Dynamic countdown SVG displaying days until target date
 *
 * This molecule combines:
 * - Dynamic day calculation
 * - SVG with gradient and noise effects
 * - Responsive sizing
 * - Unique IDs for multiple instances
 *
 * Features:
 * - Calculates days until January 12, 2026
 * - Gradient fill with noise texture
 * - iOS WebKit compatible
 * - Responsive design
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * <DaysCountSVG />
 * ```
 */
export function DaysCountSVG() {
  const daysRemaining = useMemo(() => getDaysUntilTarget(), []);
  const displayText = daysRemaining === 1 ? "DIA" : "DIAS";
  const uniqueId = useId();

  // IDs must be unique if multiple instances exist
  const filterId = `noiseFilter${uniqueId}`;
  const gradientId = `textGradient${uniqueId}`;

  return (
    <div className="mx-auto mb-11 w-full px-4">
      {/* Inline SVG with dynamic text */}
      <svg
        viewBox="0 0 700 280"
        className="w-full h-auto max-w-4xl mx-auto"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${daysRemaining} ${displayText}`}
        role="img"
        style={{ isolation: "isolate" }}
      >
        <defs>
          {/* Noise filter - iOS WebKit compatible version */}
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.25 1.25"
              numOctaves={3}
              result="noise"
              seed={4254}
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="alphaNoise"
            />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA
                type="discrete"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
              />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in2="shape"
              in="coloredNoise1"
              result="noise1Clipped"
            />
            <feFlood
              floodColor="rgba(255, 255, 255, 0.2)"
              result="color1Flood"
            />
            <feComposite
              operator="in"
              in2="noise1Clipped"
              in="color1Flood"
              result="color1"
            />
            <feMerge result="effect1_noise">
              <feMergeNode in="shape" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>

          {/* Gradient - matching original style */}
          <linearGradient
            id={gradientId}
            x1="350"
            y1="70"
            x2="350"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A90003" />
            <stop offset="1" stopColor="#FF2F2F" />
          </linearGradient>
        </defs>

        {/* Dynamic text with gradient and noise */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
          className="text-responsive-days"
        >
          {daysRemaining} {displayText}
        </text>
      </svg>
    </div>
  );
}
