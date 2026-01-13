"use client";

import React, { useState, useCallback } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual variant of the input
   * - default: White background (for dark backgrounds)
   * - outline: Transparent background with border (for light backgrounds)
   * - google: Material Design style with floating label
   */
  variant?: "default" | "outline" | "google";
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
  /**
   * Label for the google variant (floating label)
   * If not provided, placeholder will be used as the label
   */
  label?: string;
}

/**
 * Input Component (Atom)
 * Reusable input field with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (default, outline, google)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 * - Floating label for google variant
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
 *
 * <Input
 *   type="text"
 *   label="Nombre"
 *   variant="google"
 *   size="lg"
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
      label,
      placeholder,
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
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    // Handle blur for google variant
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(Boolean(e.target.value));
        onBlur?.(e);
      },
      [onBlur]
    );

    // Handle change to track if input has value
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
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
      "w-full rounded-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default:
        "bg-white text-neutral-900 placeholder:text-neutral-200 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
      outline:
        "bg-transparent font-flexo rounded-[18px] text-black placeholder:text-neutral-400 border border-[#202020] backdrop-blur-sm focus:border-[#202020] focus:ring-1 focus:ring-[#202020]",
      google:
        "bg-transparent font-flexo rounded-[10px] text-black border-2 border-[#202020] focus:border-[#202020] focus:ring-0 pt-4",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-14 px-4 text-base md:px-5 md:text-lg",
    };

    // Size styles for google variant
    const googleSizeStyles = {
      sm: "h-12 px-4 text-sm",
      md: "h-14 px-4 text-base",
      lg: "h-14 px-4 text-base md:px-5 md:text-lg",
    };

    const errorStyles = error
      ? "border-primary-600 focus:border-primary-700 focus:ring-primary-600/20"
      : "";

    // Google variant with floating label using fieldset/legend for native border notch
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

            {/* Input - no border, fieldset handles it */}
            <input
              ref={ref}
              className={cn(
                baseStyles,
                "bg-transparent font-flexo rounded-[10px] text-black border-0 focus:ring-0",
                googleSizeStyles[size],
                className
              )}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              {...props}
            />
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
        <input
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            errorStyles,
            className
          )}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
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
