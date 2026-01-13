"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "onChange"
  > {
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
  /**
   * onChange handler - receives a synthetic event-like object
   */
  onChange?: (e: { target: { value: string; name?: string } }) => void;
}

/**
 * Select Component (Atom)
 * Custom select dropdown with multiple variants and sizes
 *
 * Features:
 * - Custom dropdown with full styling control
 * - Multiple variants (default, outline, google)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
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
      options = [],
      placeholder,
      label,
      value,
      defaultValue,
      onChange,
      disabled,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const [internalValue, setInternalValue] = useState<string>(
      (defaultValue as string) || ""
    );
    const selectedValue =
      value !== undefined ? (value as string) : internalValue;

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsFocused(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on escape key
    useEffect(() => {
      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setIsOpen(false);
          setIsFocused(false);
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const handleToggle = useCallback(() => {
      if (disabled) return;
      setIsOpen((prev) => !prev);
      setIsFocused(true);
    }, [disabled]);

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (value === undefined) {
          setInternalValue(optionValue);
        }
        setIsOpen(false);
        setIsFocused(false);

        // Trigger onChange with event-like object
        onChange?.({
          target: {
            value: optionValue,
            name,
          },
        });
      },
      [onChange, name, value]
    );

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const hasValue = Boolean(selectedValue);

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-14 px-4 text-base md:px-5 md:text-lg",
    };

    const dropdownSizeStyles = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base md:text-lg",
    };

    // Google variant with floating label
    if (variant === "google") {
      const floatingLabel = label || placeholder;
      const isFloating = isFocused || hasValue;

      return (
        <div className={cn("w-full", wrapperClassName)} ref={containerRef}>
          <div className="relative">
            {/* Hidden native select for form compatibility */}
            <select
              ref={ref || hiddenSelectRef}
              name={name}
              value={selectedValue}
              onChange={() => {}}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              {...props}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Fieldset creates the border with notch */}
            <fieldset
              className={cn(
                "absolute inset-0 pointer-events-none rounded-[10px] border-2 border-[#202020]",
                "transition-colors duration-200",
                error && "border-primary-600"
              )}
            >
              {/* Legend creates the notch in the border */}
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
                    ? "top-0 -translate-y-1/2 text-sm text-[#202020] px-1"
                    : cn(
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

            {/* Custom trigger button */}
            <button
              type="button"
              onClick={handleToggle}
              disabled={disabled}
              className={cn(
                "w-full bg-transparent font-flexo rounded-[10px] text-black border-0 focus:ring-0",
                "text-left transition-all duration-200 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                sizeStyles[size],
                className
              )}
            >
              <span className={cn(!hasValue && "text-transparent")}>
                {selectedOption?.label || placeholder}
              </span>
            </button>

            {/* Arrow icon */}
            <div
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="rgb(32 32 32)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Custom dropdown */}
            {isOpen && (
              <div
                className={cn(
                  "absolute z-50 w-full mt-1 rounded-[10px] border-2 border-[#202020]",
                  "bg-[#a99191] backdrop-blur-md shadow-lg",
                  "max-h-60 overflow-auto",
                  dropdownSizeStyles[size]
                )}
              >
                {options.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full px-4 py-3 text-left font-flexo text-[#202020]",
                      "hover:bg-[#202020]/10 transition-colors cursor-pointer",
                      selectedValue === option.value && "bg-[#202020]/10",
                      index === 0 && "rounded-t-[8px]",
                      index === options.length - 1 && "rounded-b-[8px]"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {error && errorMessage && (
            <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
          )}
        </div>
      );
    }

    // Default and outline variants
    const variantStyles = {
      default: {
        trigger:
          "bg-white text-neutral-900 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 rounded-sm",
        dropdown: "bg-white border border-neutral-200 rounded-sm shadow-lg",
        option: "hover:bg-neutral-100",
      },
      outline: {
        trigger:
          "bg-transparent font-flexo rounded-[18px] text-black border border-[#202020] focus:border-primary-600 focus:ring-2 focus:ring-primary-600/50 backdrop-blur-sm",
        dropdown:
          "bg-[#FEFEFE80] backdrop-blur-md border border-[#202020] rounded-[18px] shadow-lg",
        option: "hover:bg-[#202020]/10",
      },
    };

    const currentVariant = variantStyles[variant as "default" | "outline"];

    return (
      <div className={cn("w-full", wrapperClassName)} ref={containerRef}>
        <div className="relative">
          {/* Hidden native select for form compatibility */}
          <select
            ref={ref || hiddenSelectRef}
            name={name}
            value={selectedValue}
            onChange={() => {}}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom trigger button */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={disabled}
            className={cn(
              "w-full text-left transition-all duration-200 focus:outline-none",
              "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
              currentVariant.trigger,
              sizeStyles[size],
              error && "border-primary-600",
              className
            )}
          >
            <span className={cn(!hasValue && "text-neutral-400")}>
              {selectedOption?.label || placeholder}
            </span>
          </button>

          {/* Arrow icon */}
          <div
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke={
                  variant === "default" ? "rgb(23 23 23)" : "rgb(32 32 32)"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Custom dropdown */}
          {isOpen && (
            <div
              className={cn(
                "absolute z-50 w-full mt-1 max-h-60 overflow-auto",
                currentVariant.dropdown,
                dropdownSizeStyles[size]
              )}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors cursor-pointer",
                    variant === "default"
                      ? "text-neutral-900"
                      : "font-flexo text-[#202020]",
                    currentVariant.option,
                    selectedValue === option.value &&
                      (variant === "default"
                        ? "bg-neutral-100"
                        : "bg-[#202020]/10"),
                    index === 0 &&
                      (variant === "outline"
                        ? "rounded-t-[16px]"
                        : "rounded-t"),
                    index === options.length - 1 &&
                      (variant === "outline" ? "rounded-b-[16px]" : "rounded-b")
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
