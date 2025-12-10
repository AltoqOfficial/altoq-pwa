"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";

// Global state to track active tooltip and notify others to close
let activeTooltipId: string | null = null;
const tooltipListeners = new Set<(id: string | null) => void>();

function setActiveTooltip(id: string | null) {
  activeTooltipId = id;
  tooltipListeners.forEach((listener) => listener(id));
}

function subscribeToTooltipChanges(listener: (id: string | null) => void) {
  tooltipListeners.add(listener);
  return () => {
    tooltipListeners.delete(listener);
  };
}

interface SourceTooltipProps {
  children: React.ReactNode;
  source?: string | string[];
  className?: string;
}

/**
 * SourceTooltip Component
 *
 * Wraps content and shows a tooltip with source link on hover (desktop) or click (mobile/tablet).
 * The tooltip appears as a speech bubble with "Fuente: {url}".
 * Uses span elements to be compatible inside Typography/p elements.
 * Only one tooltip can be open at a time.
 */
export function SourceTooltip({
  children,
  source,
  className = "",
}: SourceTooltipProps) {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const tooltipContentRef = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Subscribe to global tooltip changes - close if another tooltip opens
  useEffect(() => {
    const unsubscribe = subscribeToTooltipChanges((activeId) => {
      if (activeId !== tooltipId && isVisible) {
        setIsVisible(false);
      }
    });
    return unsubscribe;
  }, [tooltipId, isVisible]);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!isVisible || isMobile !== true) return;

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
      const viewportWidth = window.innerWidth;
      const tooltipWidth = isMobile === true ? 200 : 400; // Approximate tooltip width

      // Calculate horizontal offset to keep tooltip within viewport
      const elementCenter = rect.left + rect.width / 2;
      const tooltipLeft = elementCenter - tooltipWidth / 2;
      const tooltipRight = elementCenter + tooltipWidth / 2;

      let offset = 0;
      const padding = 8; // Padding from viewport edges

      if (tooltipLeft < padding) {
        // Tooltip would overflow on the left
        offset = padding - tooltipLeft;
      } else if (tooltipRight > viewportWidth - padding) {
        // Tooltip would overflow on the right
        offset = viewportWidth - padding - tooltipRight;
      }

      setHorizontalOffset(offset);

      // If tooltip would go above viewport, show below
      return rect.top < 100 ? "bottom" : "top";
    }
    return "top";
  }, [isMobile]);

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  }, []);

  // Show tooltip with delay
  const showTooltip = useCallback(() => {
    const newPosition = calculatePosition();
    setPosition(newPosition);
    setIsVisible(true);
    setActiveTooltip(tooltipId); // Notify other tooltips to close
  }, [calculatePosition, tooltipId]);

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    if (activeTooltipId === tooltipId) {
      setActiveTooltip(null);
    }
  }, [tooltipId]);

  // Handle click for mobile
  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (isMobile === true) {
        e.preventDefault();
        e.stopPropagation();
        if (isVisible) {
          hideTooltip();
        } else {
          showTooltip();
        }
      }
    },
    [isMobile, isVisible, showTooltip, hideTooltip]
  );

  // Handle hover for desktop
  const handleMouseEnter = useCallback(() => {
    if (isMobile === false) {
      // Cancel any pending hide timeout
      clearAllTimeouts();

      // Add delay before showing tooltip (prevents flicker when passing over multiple items)
      showTimeoutRef.current = setTimeout(() => {
        showTooltip();
      }, 100); // 100ms delay before showing
    }
  }, [isMobile, clearAllTimeouts, showTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile === false) {
      // Cancel any pending show timeout
      clearAllTimeouts();

      // Add delay before hiding to allow mouse to move to tooltip
      hideTimeoutRef.current = setTimeout(() => {
        hideTooltip();
      }, 150); // 150ms delay before hiding
    }
  }, [isMobile, clearAllTimeouts, hideTooltip]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (activeTooltipId === tooltipId) {
        setActiveTooltip(null);
      }
    };
  }, [clearAllTimeouts, tooltipId]);

  // If no source, just render children without tooltip
  if (!source) {
    return <>{children}</>;
  }

  // Don't render tooltip until we know if it's mobile or not (prevents hydration mismatch)
  if (isMobile === null) {
    return <span className={className}>{children}</span>;
  }

  // Normalize source to array
  const sources = Array.isArray(source) ? source : [source];
  const hasMultipleSources = sources.length > 1;

  // Truncate URL for display - shorter on mobile
  // Adjust for two-digit numbers (10+)
  const hasTwoDigitNumbers = sources.length >= 10;
  const maxLength = isMobile ? (hasTwoDigitNumbers ? 26 : 28) : 45;
  const truncateUrl = (url: string) =>
    url.length > maxLength ? url.substring(0, maxLength) + "..." : url;

  const isTop = position === "top";

  return (
    <span
      ref={tooltipRef}
      className={`relative inline-block cursor-pointer  ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content - no underline */}
      <span ref={contentRef}>{children}</span>

      {/* Tooltip */}
      <span
        ref={tooltipContentRef}
        className={`
          absolute z-100
          transition-all duration-200 ease-out
          ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          ${isVisible ? (isTop ? "-translate-y-1" : "translate-y-1") : "translate-y-0"}
          ${isTop ? "bottom-full mb-2" : "top-full mt-2"}
          left-1/2
        `}
        style={{
          width: "max-content",
          maxWidth: isMobile ? "min(200px, 85vw)" : "min(400px, 90vw)",
          transform: `translateX(calc(-50% + ${horizontalOffset}px)) ${isVisible ? (isTop ? "translateY(-4px)" : "translateY(4px)") : ""}`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className={`relative block bg-white rounded-lg shadow-xl ${isMobile ? "px-3 py-2.5" : "px-4 py-3"}`}
        >
          <span className="text-neutral-600 font-medium block">
            <span
              className={`text-neutral-400 block ${isMobile ? "mb-1 text-[10px]" : "mb-2 text-xs"}`}
            >
              {hasMultipleSources ? `Fuentes (${sources.length}):` : "Fuente:"}
            </span>
            <span
              className={`block ${isMobile ? "space-y-0.5" : "space-y-2"} max-h-32 overflow-y-auto`}
            >
              {sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-primary-600 hover:text-primary-700 hover:underline wrap-break-word block ${isMobile ? "text-[10px] leading-tight" : "text-sm leading-relaxed"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {hasMultipleSources && `${idx + 1}. `}
                  {truncateUrl(src)}
                </a>
              ))}
            </span>
          </span>

          {/* Arrow - offset inversely to keep it pointing at content */}
          <span
            className={`absolute w-0 h-0 block ${isTop ? "top-full border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" : "bottom-full border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"}`}
            style={{
              left: `calc(50% - ${horizontalOffset}px)`,
              transform: "translateX(-50%)",
            }}
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
  source?: string | string[];
}

/**
 * Array value with optional source
 */
export interface ArrayValueWithSource {
  values: string[];
  source?: string | string[];
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
): string | string[] | undefined {
  if (!value || typeof value !== "object") return undefined;

  if ("source" in value) return value.source;

  return undefined;
}
