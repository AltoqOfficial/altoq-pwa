import React from "react";

import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "small"
  | "caption";

/**
 * Font family options based on available local fonts
 * - sohneBreit: Test Sohne Breit (weights: 300, 400, 700, 800)
 * - sohneSchmal: Test Sohne Schmal (weight: 600)
 * - kenyan: Kenyan Coffee (weights: 400, 700)
 */
type FontFamily = "sohneBreit" | "sohneSchmal" | "kenyan" | "atNameSans";

/**
 * Font weight options
 * Note: Use weights that are available for the selected font family
 */
type FontWeight = "200" | "300" | "400" | "600" | "700" | "800";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element variant (affects semantic HTML and default styling) */
  variant?: TypographyVariant;
  /** Font family to use */
  font?: FontFamily;
  /** Font weight (use weights available for the selected font) */
  weight?: FontWeight;
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Text color preset */
  color?: "primary" | "secondary" | "muted" | "inherit" | "white";
  /** Custom line height */
  lineHeight?: "tight" | "snug" | "normal" | "relaxed" | "loose";
  /** Render as a different HTML element while keeping variant styles */
  as?: TypographyVariant;
  /** Letter spacing */
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  /** Text transform */
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal";
  children: React.ReactNode;
}

/**
 * Typography Component (Atom)
 * Handles all text rendering with consistent styling across multiple font families
 *
 * @example
 * ```tsx
 * <Typography variant="h1" font="kenyan" weight="700">
 *   Big Title
 * </Typography>
 *
 * <Typography variant="p" font="sohneBreit" weight="400">
 *   Body text in Sohne Breit
 * </Typography>
 *
 * <Typography variant="span" font="sohneSchmal" weight="600">
 *   Narrow text
 * </Typography>
 * ```
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "p",
      font,
      weight,
      align = "left",
      color = "inherit",
      lineHeight,
      tracking = "normal",
      transform = "normal",
      className,
      children,
      as,
      ...props
    },
    ref
  ) => {
    // Use 'as' prop if provided, otherwise use variant
    const Component = (as || variant) as React.ElementType;

    // Responsive size variants
    const variantStyles: Record<TypographyVariant, string> = {
      h1: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
      h2: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
      h3: "text-3xl md:text-4xl lg:text-4xl xl:text-5xl",
      h4: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
      h5: "text-lg md:text-xl lg:text-2xl xl:text-3xl",
      h6: "text-base md:text-lg lg:text-xl xl:text-2xl",
      p: "text-sm md:text-base lg:text-lg",
      span: "text-sm md:text-base",
      small: "text-xs md:text-sm",
      caption: "text-xs",
    };

    // Font family mapping to Tailwind classes
    const fontFamilyStyles: Record<FontFamily, string> = {
      sohneBreit: "font-sohne-breit",
      sohneSchmal: "font-sohne-schmal",
      kenyan: "font-kenyan",
      atNameSans: "font-at-name-sans",
    };

    // Font weight styles (using numeric values for better control)
    const weightStyles: Record<FontWeight, string> = {
      "200": "font-[200]",
      "300": "font-[300]",
      "400": "font-[400]",
      "600": "font-[600]",
      "700": "font-[700]",
      "800": "font-[800]",
    };

    // Text alignment
    const alignStyles: Record<NonNullable<TypographyProps["align"]>, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    // Color presets
    const colorStyles: Record<NonNullable<TypographyProps["color"]>, string> = {
      primary: "text-primary-600",
      secondary: "text-neutral-500",
      muted: "text-neutral-100",
      white: "text-white",
      inherit: "",
    };

    // Line height options
    const lineHeightStyles: Record<
      NonNullable<TypographyProps["lineHeight"]>,
      string
    > = {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    };

    // Letter spacing
    const trackingStyles: Record<
      NonNullable<TypographyProps["tracking"]>,
      string
    > = {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    };

    // Text transform
    const transformStyles: Record<
      NonNullable<TypographyProps["transform"]>,
      string
    > = {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          font && fontFamilyStyles[font],
          weight && weightStyles[weight],
          alignStyles[align],
          colorStyles[color],
          lineHeight && lineHeightStyles[lineHeight],
          trackingStyles[tracking],
          transformStyles[transform],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
