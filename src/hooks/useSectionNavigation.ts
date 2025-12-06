import { useState, useRef, useCallback } from "react";

interface UseSectionNavigationOptions {
  sections: string[];
  initialIndex?: number;
}

/**
 * Custom hook for horizontal section navigation
 * Handles navbar scrolling and section sliding with direction awareness
 */
export function useSectionNavigation({
  sections,
  initialIndex = 0,
}: UseSectionNavigationOptions) {
  const [activeNavIndex, setActiveNavIndex] = useState(initialIndex);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "right"
  );
  const navContainerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(initialIndex);

  // Scroll the navbar horizontally
  const scrollNav = useCallback((direction: "left" | "right") => {
    if (navContainerRef.current) {
      const scrollAmount = 200;
      navContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Handle section navigation click - horizontal slide
  const handleNavClick = useCallback((index: number) => {
    // Determine scroll direction based on previous and new index
    const direction = index > previousIndexRef.current ? "right" : "left";
    setScrollDirection(direction);
    previousIndexRef.current = index;
    setActiveNavIndex(index);

    // Center the active nav item in the navbar
    if (navContainerRef.current) {
      const navButtons =
        navContainerRef.current.querySelectorAll<HTMLButtonElement>("button");
      const activeButton = navButtons[index];
      if (activeButton) {
        const containerWidth = navContainerRef.current.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

        navContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  // Navigate to next section
  const goToNext = useCallback(() => {
    if (activeNavIndex < sections.length - 1) {
      handleNavClick(activeNavIndex + 1);
    }
  }, [activeNavIndex, sections.length, handleNavClick]);

  // Navigate to previous section
  const goToPrevious = useCallback(() => {
    if (activeNavIndex > 0) {
      handleNavClick(activeNavIndex - 1);
    }
  }, [activeNavIndex, handleNavClick]);

  return {
    activeNavIndex,
    scrollDirection,
    navContainerRef,
    sectionsContainerRef,
    scrollNav,
    handleNavClick,
    goToNext,
    goToPrevious,
    isFirstSection: activeNavIndex === 0,
    isLastSection: activeNavIndex === sections.length - 1,
  };
}
