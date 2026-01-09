"use client";

import React, { useState, useCallback } from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * Visual variant of the select
   * - default: White background (for dark backgrounds)
   * - outline: Transparent background with border (for light backgrounds)
   * - google: Material Design style with floating label
   */
  variant?: "default" | "outline" | "google";
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
  /**
   * Label for the google variant (floating label)
   * If not provided, placeholder will be used as the label
   */
  label?: string;
}

/**
 * Select Component (Atom)
 * Reusable select dropdown with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (default, outline, google)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 * - Custom arrow icon
 * - Floating label for google variant
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
 *
 * <Select
 *   label="País"
 *   variant="google"
 *   size="lg"
 *   options={[
 *     { value: "pe", label: "Perú" },
 *     { value: "co", label: "Colombia" },
 *   ]}
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
      label,
      children,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    // Internal state for google variant
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));

    // Handle focus for google variant
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLSelectElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    // Handle blur for google variant
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLSelectElement>) => {
        setIsFocused(false);
        setHasValue(Boolean(e.target.value));
        onBlur?.(e);
      },
      [onBlur]
    );

    // Handle change to track if select has value
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHasValue(Boolean(e.target.value));
        onChange?.(e);
      },
      [onChange]
    );

    // Update hasValue when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(Boolean(value));
      }
    }, [value]);

    const baseStyles =
      "w-full rounded-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 appearance-none bg-no-repeat bg-right pr-10 cursor-pointer";

    const variantStyles = {
      default:
        "bg-white text-neutral-900 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
      outline:
        "bg-transparent font-flexo rounded-[18px] text-black border border-[#202020] focus:border-primary-600 focus:ring-2 focus:ring-primary-600/50 backdrop-blur-sm",
      google:
        "bg-transparent font-flexo rounded-[10px] text-black border-0 focus:ring-0",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-14 px-4 text-base md:px-5 md:text-lg",
    };

    const errorStyles = error
      ? "border-primary-600 focus:border-primary-700 focus:ring-primary-600/20"
      : "";

    // Custom arrow icon inline
    const arrowIconColor =
      variant === "outline" || variant === "google"
        ? "rgb(32 32 32)"
        : "rgb(23 23 23)";
    const backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='${encodeURIComponent(arrowIconColor)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

    // Google variant with floating label
    if (variant === "google") {
      const floatingLabel = label || placeholder;
      const isFloating = isFocused || hasValue;

      return (
        <div className={cn("w-full", wrapperClassName)}>
          <div className="relative">
            {/* Fieldset creates the border with notch */}
            <fieldset
              className={cn(
                "absolute inset-0 pointer-events-none rounded-[10px] border-2 border-[#202020]",
                "transition-colors duration-200",
                error && "border-primary-600"
              )}
            >
              {/* Legend creates the notch in the border - only renders content when floating */}
              <legend
                className={cn(
                  "ml-2 text-sm font-flexo text-transparent select-none h-0",
                  "transition-[max-width,padding] duration-200 overflow-hidden whitespace-nowrap",
                  isFloating ? "max-w-full px-1" : "max-w-0 px-0"
                )}
              >
                {floatingLabel}
              </legend>
            </fieldset>

            {/* Visible floating label */}
            {floatingLabel && (
              <label
                className={cn(
                  "absolute left-3 transition-all duration-200 pointer-events-none font-flexo z-10",
                  isFloating
                    ? // Floating state - label moves up to the border notch
                      "top-0 -translate-y-1/2 text-sm text-[#202020] px-1"
                    : // Default state - label is centered as placeholder
                      cn(
                        "top-1/2 -translate-y-1/2 text-neutral-400",
                        size === "sm" && "text-sm",
                        size === "md" && "text-base",
                        size === "lg" && "text-base md:text-lg"
                      ),
                  error && isFloating && "text-primary-600"
                )}
              >
                {floatingLabel}
              </label>
            )}

            {/* Select - no border, fieldset handles it */}
            <select
              ref={ref}
              style={{ backgroundImage }}
              className={cn(
                baseStyles,
                variantStyles.google,
                sizeStyles[size],
                className
              )}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...props}
            >
              {/* Empty placeholder option for controlled behavior */}
              {placeholder && !hasValue && (
                <option value="" disabled hidden>
                  {""}
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

    // Default and outline variants
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
            value={value}
            defaultValue={defaultValue}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
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
