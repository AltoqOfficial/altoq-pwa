import React from "react";

import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  /**
   * Main title text
   */
  title: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Title color
   */
  titleColor?: string;
  /**
   * Description color
   */
  descriptionColor?: string;
  /**
   * Accent color for highlighted text
   */
  accentColor?: string;
  /**
   * Accent word(s) to highlight in title
   */
  accentWords?: string[];
  /**
   * Custom className for section
   */
  className?: string;
  /**
   * Custom className for container
   */
  containerClassName?: string;
  /**
   * Custom className for title
   */
  titleClassName?: string;
  /**
   * Custom className for description
   */
  descriptionClassName?: string;
  /**
   * Vertical padding size
   */
  paddingY?: "sm" | "md" | "lg" | "xl";
  /**
   * Maximum width of content
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  /**
   * Additional content to render below description
   */
  children?: React.ReactNode;
}

/**
 * PageHero Component (Molecule)
 * Simple hero section with title and description
 *
 * This molecule provides a consistent hero section pattern:
 * - Centered layout
 * - Large responsive title
 * - Optional description
 * - Customizable colors and spacing
 * - Support for accent words in title
 *
 * Features:
 * - Multiple padding sizes
 * - Multiple max-width options
 * - Accent word highlighting
 * - Fully customizable colors
 * - Responsive font sizes
 *
 * @example
 * ```tsx
 * <PageHero
 *   title="ÚNETE A NOSOTROS"
 *   description="Forma parte del equipo..."
 *   backgroundColor="bg-white"
 *   titleColor="text-neutral-900"
 * />
 *
 * <PageHero
 *   title="A COMPARAR!"
 *   accentWords={["COMPARAR!"]}
 *   backgroundColor="bg-neutral-900"
 *   titleColor="text-white"
 *   accentColor="text-primary-600"
 * />
 * ```
 */
export function PageHero({
  title,
  description,
  backgroundColor = "bg-white",
  titleColor = "text-neutral-900",
  descriptionColor = "text-neutral-600",
  accentColor = "text-primary-600",
  accentWords = [],
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  paddingY = "lg",
  maxWidth = "4xl",
  children,
}: PageHeroProps) {
  const paddingStyles = {
    sm: "py-12",
    md: "py-16",
    lg: "py-20",
    xl: "py-24",
  };

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  // Helper function to highlight accent words in title
  const renderTitle = () => {
    if (typeof title !== "string" || accentWords.length === 0) {
      return title;
    }

    let result: React.ReactNode = title;

    accentWords.forEach((word) => {
      if (typeof result === "string") {
        const parts = result.split(word);
        result = parts.reduce<React.ReactNode[]>((acc, part, index) => {
          if (index === 0) return [part];
          return [
            ...acc,
            <span key={index} className={accentColor}>
              {word}
            </span>,
            part,
          ];
        }, []);
      }
    });

    return result;
  };

  return (
    <section
      className={cn(backgroundColor, paddingStyles[paddingY], className)}
    >
      <div className={cn("container mx-auto px-4", containerClassName)}>
        <div className={cn("mx-auto text-center", maxWidthStyles[maxWidth])}>
          {/* Main Title */}
          <Typography
            variant="h1"
            className={cn("mb-6", titleColor, titleClassName)}
            style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
          >
            {renderTitle()}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="p"
              className={cn(
                "text-lg leading-relaxed",
                descriptionColor,
                descriptionClassName
              )}
            >
              {description}
            </Typography>
          )}

          {/* Additional Content */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
