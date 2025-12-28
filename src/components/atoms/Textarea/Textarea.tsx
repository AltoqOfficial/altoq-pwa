import React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Visual variant of the textarea
   * - default: White background (for dark backgrounds)
   * - outline: Transparent background with border (for light backgrounds)
   */
  variant?: "default" | "outline";
  /**
   * Size of the textarea
   * - sm: Small textarea (min-h-20)
   * - md: Medium textarea (min-h-28)
   * - lg: Large textarea (min-h-36)
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
   * Enable auto-resize based on content
   */
  autoResize?: boolean;
}

/**
 * Textarea Component (Atom)
 * Reusable textarea field with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (default, outline)
 * - Multiple sizes (sm, md, lg)
 * - Error state with message
 * - Focus states with primary color
 * - Disabled state
 * - Optional auto-resize
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="Escribe tu mensaje..."
 *   variant="default"
 *   size="lg"
 *   rows={4}
 * />
 *
 * <Textarea
 *   placeholder="Comentarios"
 *   variant="outline"
 *   error={true}
 *   errorMessage="Este campo es requerido"
 *   autoResize
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      errorMessage,
      className,
      wrapperClassName,
      autoResize = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const baseStyles =
      "w-full rounded-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 resize-y";

    const variantStyles = {
      default:
        "bg-white text-neutral-900 placeholder:text-neutral-200 border border-neutral-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
      outline:
        "bg-white/10 text-white placeholder:text-neutral-400 border border-neutral-700 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/50 backdrop-blur-sm",
    };

    const sizeStyles = {
      sm: "min-h-20 px-3 py-2 text-sm",
      md: "min-h-28 px-4 py-3 text-base",
      lg: "min-h-36 px-4 py-3 text-base md:px-5 md:text-lg",
    };

    const errorStyles = error
      ? "border-primary-600 focus:border-primary-700 focus:ring-primary-600/20"
      : "";

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      onChange?.(e);
    };

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    return (
      <div className={cn("w-full", wrapperClassName)}>
        <textarea
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            errorStyles,
            autoResize && "resize-none overflow-hidden",
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-primary-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
