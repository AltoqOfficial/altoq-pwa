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
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn(className)}>
      <div className="mx-auto px-4">
        <div>
          {/* Main Title */}
          <Typography
            variant="h1"
            font="sohneSchmal"
            className="text-[#FF2727]"
            align="center"
          >
            {title}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="span"
              font="sohneBreit"
              weight="400"
              className="text-[#fefefe] text-center"
              align="center"
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
