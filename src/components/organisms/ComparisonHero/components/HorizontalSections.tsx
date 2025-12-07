import React from "react";

interface HorizontalSectionsProps {
  children: React.ReactNode;
  activeIndex: number;
  direction: "left" | "right";
}

/**
 * Horizontal Sections Container
 * Displays sections in a horizontal carousel with slide animations
 */
export function HorizontalSections({
  children,
  activeIndex,
  direction,
}: HorizontalSectionsProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="w-full overflow-hidden h-auto">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className="w-full shrink-0"
            style={{ minWidth: "100%" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
