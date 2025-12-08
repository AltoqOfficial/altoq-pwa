import React from "react";

interface HorizontalSectionsProps {
  children: React.ReactNode;
  activeIndex: number;
  direction: "left" | "right";
}

/**
 * Horizontal Sections Container
 * Displays only the active section with fade animation
 * Each section has its own natural height based on content
 */
export function HorizontalSections({
  children,
  activeIndex,
  direction,
}: HorizontalSectionsProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full">
        {childrenArray.map((child, index) => {
          const isActive = index === activeIndex;
          const isEntering = isActive;

          // Determinar la dirección de la animación
          const slideDirection = direction === "right" ? 1 : -1;

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
}
