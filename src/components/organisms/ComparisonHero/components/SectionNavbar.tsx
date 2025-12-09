"use client";

import { useId } from "react";
import { Typography } from "@/components/atoms";
import { NAV_ITEMS } from "../constants";

interface SectionNavbarProps {
  activeNavIndex: number;
  navContainerRef: React.RefObject<HTMLDivElement | null>;
  onNavClick: (index: number) => void;
  onScrollNav: (direction: "left" | "right") => void;
}

/**
 * Section Navbar Component
 * Horizontal scrollable navigation for comparison sections
 */
export function SectionNavbar({
  activeNavIndex,
  navContainerRef,
  onNavClick,
  onScrollNav,
}: SectionNavbarProps) {
  const uniqueId = useId();
  const noiseFilterNavId = `noiseFilterNav${uniqueId}`;
  const gradientNavId = `gradientNav${uniqueId}`;

  return (
    <div id="comparison-navbar" className="w-full sticky top-0 z-50 relative">
      {/* SVG Definitions for gradient and noise */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Gradient for Nav background */}
          <linearGradient id={gradientNavId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF2727" />
            <stop offset="100%" stopColor="#2F356E" />
          </linearGradient>

          {/* Noise filter for Nav */}
          <filter
            id={noiseFilterNavId}
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
        </defs>
      </svg>

      {/* Gradient background with noise */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <rect
          width="100%"
          height="100%"
          fill={`url(#${gradientNavId})`}
          filter={`url(#${noiseFilterNavId})`}
        />
      </svg>

      <nav className="flex items-center relative z-10">
        <button
          onClick={() => onScrollNav("left")}
          className="shrink-0 p-2 md:p-3 lg:p-4 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            className="w-2 h-3 md:w-3 md:h-4 lg:w-[13px] lg:h-5"
          >
            <path
              d="M12.12 2.12 4.24 10l7.88 7.88L10 20 0 10 10 0z"
              fill="#FEFEFE"
            />
          </svg>
        </button>

        <div
          ref={navContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-1 md:gap-2 py-2 md:py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              onClick={() => onNavClick(index)}
              className={`shrink-0 px-3 md:px-5 lg:px-8 py-2 md:py-3 cursor-pointer transition-all duration-300 ${
                activeNavIndex === index
                  ? "opacity-100 scale-105"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <Typography
                font="kenyan"
                weight="600"
                variant="h4"
                color="white"
                className="uppercase whitespace-nowrap text-xs md:text-sm lg:text-base"
              >
                {item}
              </Typography>
            </button>
          ))}
        </div>

        <button
          onClick={() => onScrollNav("right")}
          className="shrink-0 p-2 md:p-3 lg:p-4 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            className="w-2 h-3 md:w-3 md:h-4 lg:w-[13px] lg:h-5"
          >
            <path
              d="M0 2.12 7.88 10 0 17.88 2.12 20l10-10-10-10z"
              fill="#FEFEFE"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
