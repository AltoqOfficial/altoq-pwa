"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SourceTooltipProps {
  children: React.ReactNode;
  source?: string;
  className?: string;
}

/**
 * SourceTooltip Component
 *
 * Wraps content and shows a tooltip with source link on hover (desktop) or click (mobile/tablet).
 * The tooltip appears as a speech bubble with "Fuente: {url}".
 * Uses span elements to be compatible inside Typography/p elements.
 */
export function SourceTooltip({
  children,
  source,
  className = "",
}: SourceTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!isVisible || !isMobile) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isVisible, isMobile]);

  // Calculate position to avoid overflow
  const calculatePosition = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      // If tooltip would go above viewport, show below
      return rect.top < 100 ? "bottom" : "top";
    }
    return "top";
  }, []);

  // Handle click for mobile
  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (isMobile) {
        e.preventDefault();
        e.stopPropagation();
        const newPosition = calculatePosition();
        setPosition(newPosition);
        setIsVisible((prev) => !prev);
      }
    },
    [isMobile, calculatePosition]
  );

  // Handle hover for desktop
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
      setIsVisible(true);
    }
  }, [isMobile, calculatePosition]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsVisible(false);
    }
  }, [isMobile]);

  // If no source, just render children without tooltip
  if (!source) {
    return <>{children}</>;
  }

  // Truncate URL for display - shorter on mobile
  const maxLength = isMobile ? 35 : 50;
  const displayUrl =
    source.length > maxLength ? source.substring(0, maxLength) + "..." : source;

  const isTop = position === "top";

  return (
    <span
      ref={tooltipRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content - no underline */}
      <span ref={contentRef}>{children}</span>

      {/* Tooltip */}
      <span
        className={`
          absolute z-100
          transition-all duration-200 ease-out
          ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          ${isVisible ? (isTop ? "-translate-y-1" : "translate-y-1") : "translate-y-0"}
          ${isTop ? "bottom-full mb-2" : "top-full mt-2"}
          left-1/2 -translate-x-1/2
        `}
        style={{
          width: "max-content",
          maxWidth: "min(280px, 90vw)",
        }}
      >
        <span className="relative block bg-white rounded-lg shadow-xl px-3 py-2 sm:px-3 sm:py-2.5">
          <span className="text-neutral-600 text-[10px] sm:text-xs font-medium block">
            <span className="text-neutral-400 block mb-0.5 text-[9px] sm:text-[10px]">
              Fuente:
            </span>
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 hover:underline wrap-break-word leading-snug block text-[10px] sm:text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {displayUrl}
            </a>
          </span>

          {/* Arrow */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 block
              ${
                isTop
                  ? "top-full border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"
                  : "bottom-full border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"
              }
            `}
          />
        </span>
      </span>
    </span>
  );
}

/**
 * Value with optional source
 */
export interface ValueWithSource {
  value: string;
  source?: string;
}

/**
 * Array value with optional source
 */
export interface ArrayValueWithSource {
  values: string[];
  source?: string;
}

/**
 * Check if a value has source information
 */
export function hasSource(
  value: unknown
): value is ValueWithSource | ArrayValueWithSource {
  if (!value || typeof value !== "object") return false;
  return "source" in value;
}

/**
 * Extract the display value from a potentially sourced value
 */
export function extractValue(
  value: string | string[] | ValueWithSource | ArrayValueWithSource | undefined
): string | string[] | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === "string") return value;

  if (Array.isArray(value)) return value;

  if (typeof value === "object") {
    if ("value" in value) return value.value;
    if ("values" in value) return value.values;
  }

  return undefined;
}

/**
 * Extract the source URL from a potentially sourced value
 */
export function extractSource(
  value: string | string[] | ValueWithSource | ArrayValueWithSource | undefined
): string | undefined {
  if (!value || typeof value !== "object") return undefined;

  if ("source" in value) return value.source;

  return undefined;
}
