"use client";

import { memo } from "react";

interface SVGFiltersProps {
  uniqueId: string;
}

/**
 * SVGFilters Component
 * Centralized SVG filter definitions for noise effects
 * Rendered once and reused across the comparison hero
 */
export const SVGFilters = memo(function SVGFilters({
  uniqueId,
}: SVGFiltersProps) {
  // Noise filter template - reusable across different colors
  const createNoiseFilter = (id: string) => (
    <filter
      key={id}
      id={id}
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
        numOctaves={2}
        result="noise"
        seed={4254}
        stitchTiles="stitch"
      />
      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
        <feFuncA
          type="discrete"
          tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
        />
      </feComponentTransfer>
      <feComposite
        operator="in"
        in2="shape"
        in="coloredNoise1"
        result="noise1Clipped"
      />
      <feFlood floodColor="rgba(255, 255, 255, 0.15)" result="color1Flood" />
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
  );

  return (
    <svg
      width="0"
      height="0"
      className="absolute pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient for Red background */}
        <linearGradient
          id={`gradientRed${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF272790" stopOpacity="1" />
          <stop offset="100%" stopColor="#202020" stopOpacity="0" />
        </linearGradient>

        {/* Gradient for Blue background */}
        <linearGradient
          id={`gradientBlue${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3E469270" stopOpacity="1" />
          <stop offset="100%" stopColor="#202020" stopOpacity="0" />
        </linearGradient>

        {/* Gradient for Left candidate name (horizontal) */}
        <linearGradient
          id={`gradientLeftName${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FF2727" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Gradient for Right candidate name (horizontal) */}
        <linearGradient
          id={`gradientRightName${uniqueId}`}
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3E4692" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Gradient for VS text */}
        <linearGradient
          id={`gradientVS${uniqueId}`}
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#A90003" />
          <stop offset="100%" stopColor="#FF2F2F" />
        </linearGradient>

        {/* Gradient for Title */}
        <linearGradient
          id={`gradientTitle${uniqueId}`}
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#A90003" />
          <stop offset="100%" stopColor="#FF2F2F" />
        </linearGradient>

        {/* Single shared noise filter - reused for all elements */}
        {createNoiseFilter(`noiseFilter${uniqueId}`)}
      </defs>
    </svg>
  );
});

/**
 * Get filter IDs based on unique identifier
 */
export function getFilterIds(uniqueId: string) {
  return {
    noiseFilter: `noiseFilter${uniqueId}`,
    gradientRed: `gradientRed${uniqueId}`,
    gradientBlue: `gradientBlue${uniqueId}`,
    gradientLeftName: `gradientLeftName${uniqueId}`,
    gradientRightName: `gradientRightName${uniqueId}`,
    gradientVS: `gradientVS${uniqueId}`,
    gradientTitle: `gradientTitle${uniqueId}`,
  };
}
