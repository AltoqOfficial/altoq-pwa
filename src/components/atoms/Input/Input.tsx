import React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual variant of the input
   * - default: White background (for dark backgrounds)
   * - outline: Transparent background with border (for light backgrounds)
   */
  variant?: "default" | "outline";
  /**
   * Size of the input
   * - sm: Small input (h-9)
   * - md: Medium input (h-11)
   * - lg: Large input (h-14)
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
}

/**
 * Input Component (Atom)
 * Reusable input field with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (default, outline)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="tucorreo@ejemplo.com"
 *   variant="default"
 *   size="lg"
 * />
 *
 * <Input
 *   type="text"
 *   placeholder="Ingresa tu nombre"
 *   variant="outline"
 *   error={true}
 *   errorMessage="Este campo es requerido"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      errorMessage,
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "w-full rounded-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default:
        "bg-white text-neutral-900 placeholder:text-neutral-200 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
      outline:
        "bg-transparent font-flexo rounded-[18px] text-black placeholder:text-neutral-400 border border-[#202020] backdrop-blur-sm focus:border-[#202020] focus:ring-1 focus:ring-[#202020]",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-4 text-base md:px-5 md:text-lg",
    };

    const errorStyles = error
      ? "border-primary-600 focus:border-primary-700 focus:ring-primary-600/20"
      : "";

    return (
      <div className={cn("w-full", wrapperClassName)}>
        <input
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            errorStyles,
            className
          )}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
