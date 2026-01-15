"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";

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
  description?: string;
  className?: string;
  /** Force tooltip to appear on a specific side: 'left' centers in left half, 'right' centers in right half */
  side?: "left" | "right";
}

/**
 * SourceTooltip Component
 *
 * Wraps content and shows a tooltip with source link on hover (desktop) or click (mobile/tablet).
 * The tooltip appears as a speech bubble with a description (if provided) and source tags.
 */
export function SourceTooltip({
  children,
  source,
  description,
  className = "",
  side,
}: SourceTooltipProps) {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  // Position state now stores absolute coordinates
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);
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
        tooltipContentRef.current &&
        tooltipContentRef.current.contains(event.target as Node)
      ) {
        return;
      }
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

  // Calculate position to avoid overflow - specialized for Portal (aligned to text edge)
  const calculatePosition = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const scrollY = window.scrollY;

      // Determine which side - use prop if provided, otherwise detect from element position
      let isLeftSide: boolean;
      if (side) {
        // Use explicit side prop
        isLeftSide = side === "left";
      } else {
        // Auto-detect from element position
        const elementCenter = rect.left + rect.width / 2;
        isLeftSide = elementCenter < viewportWidth / 2;
      }

      // Position the tooltip at the opposite edge of the text
      // Left side text (right-aligned): tooltip appears at the LEFT edge of the text
      // Right side text (left-aligned): tooltip appears at the LEFT edge of the text (where it starts)
      let anchorX: number;
      if (isLeftSide) {
        // Left candidate: tooltip at the LEFT edge of the content (far left of their text)
        anchorX = Math.max(20, rect.left);
      } else {
        // Right candidate: tooltip at the LEFT edge of their text (where text starts)
        anchorX = Math.max(20, rect.left);
      }

      // Set alignment based on which side
      // Vertical position
      const spaceAbove = rect.top;
      const tooltipHeight = 150; // Approximated max height
      const newPosition = spaceAbove < tooltipHeight + 20 ? "bottom" : "top";

      // Calculate absolute top/left for the portal container
      let top = 0;
      if (newPosition === "top") {
        top = rect.top + scrollY - 8; // 8px spacing
      } else {
        top = rect.bottom + scrollY + 8;
      }

      // Use the anchor position
      setCoords({ top, left: anchorX });
      return newPosition;
    }
    return "top";
  }, [side]);

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

  // Update position on scroll/resize if visible
  useEffect(() => {
    if (isVisible) {
      const updatePos = () => {
        const newPos = calculatePosition();
        setPosition(newPos);
      };
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }
  }, [isVisible, calculatePosition]);

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
  if (
    !source ||
    source === "" ||
    (Array.isArray(source) && source.every((s) => !s || s === ""))
  ) {
    return <>{children}</>;
  }

  // Don't render tooltip until we know if it's mobile or not (prevents hydration mismatch)
  if (isMobile === null) {
    return <span className={className}>{children}</span>;
  }

  // Normalize source to array
  const sources = Array.isArray(source) ? source : [source];

  // Helper to extract clean domain name for tags
  const getSourceLabel = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      // Remove www.
      const name = hostname.replace(/^www\./, "");
      // Get main domain part (e.g. infogob.jne.gob.pe -> infogob)
      // Special cases for known news sites could be added here
      if (name.includes("infogob")) return "INFOGOB";
      if (name.includes("rpp")) return "RPP";
      if (name.includes("elcomercio")) return "EL COMERCIO";
      if (name.includes("larepublica")) return "LA REPÚBLICA";
      if (name.includes("ipsos")) return "IPSOS";
      if (name.includes("swissinfo")) return "SWISSINFO";

      return name.split(".")[0].toUpperCase();
    } catch {
      return "FUENTE";
    }
  };

  const isTop = position === "top";

  // Transform: Align tooltip to anchor point and position vertically
  const transformX = "0"; // Align left edge of tooltip to anchor point
  const transformY = isTop ? "-100%" : "0";

  return (
    <>
      <span
        ref={tooltipRef}
        className={`relative inline-block cursor-pointer ${className}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Content - keep it relatively positioned to anchor tooltip */}
        <span ref={contentRef} className="">
          {children}
        </span>
      </span>

      {/* Portal Tooltip */}
      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipContentRef}
            className="absolute z-9999 left-0 top-0"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              width: "max-content",
              maxWidth: isMobile ? "240px" : "320px",
              transform: `translate(${transformX}, ${transformY})`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`
                relative block bg-white rounded-2xl drop-shadow-xl
                text-[#333333]
                ${isMobile ? "p-3" : "p-4"}
                text-left
                animate-tooltip-in
              `}
            >
              {/* Content Wrapper for inline flow */}
              <span className="font-atNameSans font-light text-sm leading-relaxed tracking-wide inline">
                {description ? (
                  <>
                    {description}
                    {/* Spacer before tags if description exists */}
                    <span className="inline-block w-1"></span>
                  </>
                ) : (
                  "Información verificada: "
                )}

                {/* Inline Source Tags */}
                {sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
                      inline-flex items-center justify-center
                      bg-[#666666] hover:bg-black
                      text-white text-[8px] font-sohne-breit font-bold uppercase
                      px-2.5 py-0.5 rounded-full
                      transition-colors duration-200
                      mx-1 align-middle my-0.5
                      no-underline
                    "
                    style={{ verticalAlign: "2px" }}
                  >
                    {getSourceLabel(src)}
                  </a>
                ))}
              </span>

              <span
                className={`absolute w-0 h-0 block ${
                  isTop
                    ? "top-[calc(100%-1px)] border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"
                    : "bottom-[calc(100%-1px)] border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"
                }`}
                style={{
                  left: "24px",
                  transform: "translateX(-50%)",
                }}
              />
            </span>
          </div>,
          document.body
        )}
    </>
  );
}

/**
 * Value with optional source and description
 */
export interface ValueWithSource {
  value: string | string[];
  source?: string | string[];
  description?: string;
}

/**
 * Array value with optional source and description
 */
export interface ArrayValueWithSource {
  values: string | string[];
  source?: string | string[];
  description?: string;
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
    if ("value" in value) return value.value as string | string[];
    if ("values" in value) return value.values as string | string[];
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

  if ("source" in value && !Array.isArray(value))
    return (value as ValueWithSource | ArrayValueWithSource).source;

  return undefined;
}

/**
 * Extract the description from a potentially sourced value
 */
export function extractDescription(
  value: string | string[] | ValueWithSource | ArrayValueWithSource | undefined
): string | undefined {
  if (!value || typeof value !== "object") return undefined;

  if ("description" in value && !Array.isArray(value))
    return (value as ValueWithSource | ArrayValueWithSource).description;

  return undefined;
}
