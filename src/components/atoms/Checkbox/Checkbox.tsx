import React from "react";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /**
   * Label text for the checkbox
   */
  label?: React.ReactNode;
  /**
   * Size of the checkbox
   * - sm: Small checkbox (16px)
   * - md: Medium checkbox (20px)
   * - lg: Large checkbox (24px)
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
   * Custom label className
   */
  labelClassName?: string;
  /**
   * Custom wrapper className
   */
  wrapperClassName?: string;
}

/**
 * Checkbox Component (Atom)
 * Reusable checkbox with label support
 *
 * Features:
 * - Multiple sizes (sm, md, lg)
 * - Label support with custom styling
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Acepto los términos y condiciones"
 *   size="md"
 * />
 *
 * <Checkbox
 *   label={<span>Acepto recibir <strong>novedades</strong></span>}
 *   error={true}
 *   errorMessage="Debes aceptar para continuar"
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "md",
      error = false,
      errorMessage,
      className,
      labelClassName,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const baseStyles =
      "rounded border-2 transition-all duration-200 cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const sizeStyles = {
      sm: "w-4 h-4",
      md: "w-6 h-6 min-[460px]:w-7 min-[460px]:h-7 min-[530px]:w-6 min-[530px]:h-6 md:w-5 md:h-5",
      lg: "w-8 h-8 min-[460px]:w-7 min-[460px]:h-7 min-[530px]:w-6 min-[530px]:h-6 md:w-6 md:h-6",
    };

    const colorStyles = error
      ? "border-primary-600 text-primary-600"
      : "border-neutral-400 text-primary-600 checked:border-primary-600 checked:bg-primary-600 hover:border-neutral-300";

    const labelSizeStyles = {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-lg",
    };

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        <div className="flex items-start md:items-center gap-2 sm:gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(baseStyles, sizeStyles[size], colorStyles, className)}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "cursor-pointer select-none text-surface transition-colors font-sohne-breit",
                labelSizeStyles[size],
                error && "text-primary-600",
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
