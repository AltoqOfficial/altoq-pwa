import React from "react";

import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Size of the label
   * - sm: Small label (text-sm)
   * - md: Medium label (text-base)
   * - lg: Large label (text-lg)
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Visual variant of the label
   * - default: Dark text (for light backgrounds)
   * - light: Light text (for dark backgrounds)
   */
  variant?: "default" | "light";
}

/**
 * Label Component (Atom)
 * Reusable label for form fields
 *
 * Features:
 * - Multiple sizes (sm, md, lg)
 * - Required indicator (asterisk)
 * - Light/dark variants
 * - Consistent styling
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   Correo electrónico
 * </Label>
 *
 * <Label htmlFor="name" size="lg" variant="light">
 *   Nombre completo
 * </Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = "md",
      required = false,
      variant = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "block font-medium transition-colors";

    const sizeStyles = {
      sm: "text-sm mb-1.5",
      md: "text-base mb-2",
      lg: "text-lg mb-2.5",
    };

    const variantStyles = {
      default: "text-neutral-900",
      light: "text-white",
    };

    return (
      <label
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-primary-600">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
