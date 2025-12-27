import React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  /**
   * Visual variant of the select
   * - default: White background (for dark backgrounds)
   * - outline: Transparent background with border (for light backgrounds)
   */
  variant?: "default" | "outline";
  /**
   * Size of the select
   * - sm: Small select (h-9)
   * - md: Medium select (h-11)
   * - lg: Large select (h-14)
   */
  size?: "sm" | "md" | "lg";
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Custom wrapper className for the container
   */
  wrapperClassName?: string;
  /**
   * Options for the select
   */
  options?: Array<{ value: string; label: string }>;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Select Component (Atom)
 * Reusable select dropdown with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (default, outline)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 * - Custom arrow icon
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="Selecciona una opción"
 *   variant="default"
 *   size="lg"
 *   options={[
 *     { value: "1", label: "Opción 1" },
 *     { value: "2", label: "Opción 2" },
 *   ]}
 * />
 *
 * <Select
 *   placeholder="Selecciona..."
 *   variant="outline"
 *   error={true}
 *   errorMessage="Este campo es requerido"
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      errorMessage,
      className,
      wrapperClassName,
      options,
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "w-full rounded-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10 cursor-pointer";

    const variantStyles = {
      default:
        "bg-white text-neutral-900 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
      outline:
        "bg-white/10 text-white border border-neutral-700 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/50 backdrop-blur-sm",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-4 text-base md:px-5 md:text-lg",
    };

    const errorStyles = error
      ? "border-primary-600 focus:border-primary-700 focus:ring-primary-600/20"
      : "";

    // Custom arrow icon inline
    const arrowIconColor = variant === "outline" ? "white" : "rgb(23 23 23)"; // neutral-900
    const backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='${encodeURIComponent(arrowIconColor)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="relative">
          <select
            ref={ref}
            style={{ backgroundImage }}
            className={cn(
              baseStyles,
              variantStyles[variant],
              sizeStyles[size],
              errorStyles,
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>
        </div>
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
