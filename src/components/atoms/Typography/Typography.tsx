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
  | "small";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "muted" | "inherit";
  children: React.ReactNode;
  as?: TypographyVariant;
}

/**
 * Typography Component (Atom)
 * Handles all text rendering with consistent styling
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "p",
      weight = "normal",
      align = "left",
      color = "inherit",
      className,
      children,
      as,
      ...props
    },
    ref
  ) => {
    // Use 'as' prop if provided, otherwise use variant
    const Component = (as || variant) as React.ElementType;

    const variantStyles: Record<TypographyVariant, string> = {
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
      h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
      h3: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug",
      h4: "text-xl md:text-2xl lg:text-3xl font-semibold leading-snug",
      h5: "text-lg md:text-xl lg:text-2xl font-medium leading-normal",
      h6: "text-base md:text-lg lg:text-xl font-medium leading-normal",
      p: "text-base leading-relaxed",
      span: "text-base",
      small: "text-sm leading-normal",
    };

    const weightStyles: Record<
      NonNullable<TypographyProps["weight"]>,
      string
    > = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const alignStyles: Record<NonNullable<TypographyProps["align"]>, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const colorStyles: Record<NonNullable<TypographyProps["color"]>, string> = {
      primary: "text-primary-600",
      secondary: "text-secondary-600",
      muted: "text-neutral-600",
      inherit: "",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          weightStyles[weight],
          alignStyles[align],
          colorStyles[color],
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
