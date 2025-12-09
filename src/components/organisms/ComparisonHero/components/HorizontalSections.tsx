import React, { memo, useMemo, useEffect, useState } from "react";

interface HorizontalSectionsProps {
  children: React.ReactNode;
  activeIndex: number;
  direction: "left" | "right";
}

/**
 * Horizontal Sections Container (Optimized)
 * Only renders the active section and the previous one during transitions
 * Uses virtualization to reduce DOM nodes and memory usage
 */
export const HorizontalSections = memo(function HorizontalSections({
  children,
  activeIndex,
}: HorizontalSectionsProps) {
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // Track the previous index to render during transitions
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Update previous index after transition completes
  useEffect(() => {
    if (prevIndex !== activeIndex) {
      // Set up timer to clear previous index after animation
      const timer = setTimeout(() => {
        setPrevIndex(null);
      }, 500); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [activeIndex, prevIndex]);

  // Capture the previous active index when it changes
  const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex);
  if (activeIndex !== lastActiveIndex) {
    setPrevIndex(lastActiveIndex);
    setLastActiveIndex(activeIndex);
  }

  // Determine which sections to render
  const sectionsToRender = useMemo(() => {
    const indices = new Set<number>();
    indices.add(activeIndex);

    // During transition, also render the previous section
    if (prevIndex !== null && prevIndex !== activeIndex) {
      indices.add(prevIndex);
    }

    return Array.from(indices);
  }, [activeIndex, prevIndex]);

  const slideDirection = direction === "right" ? 1 : -1;

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full">
        {sectionsToRender.map((index) => {
          const child = childrenArray[index];
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={`w-full transition-all duration-500 ease-in-out ${
                isActive
                  ? "relative opacity-100 translate-x-0"
                  : "absolute top-0 left-0 opacity-0 pointer-events-none"
              }`}
              style={{
                transform: isActive
                  ? "translateX(0)"
                  : `translateX(${slideDirection * 100}%)`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
});
