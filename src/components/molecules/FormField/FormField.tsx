import React from "react";

import { Input, InputProps } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Select, SelectProps } from "@/components/atoms/Select";
import { Textarea, TextareaProps } from "@/components/atoms/Textarea";
import { cn } from "@/lib/utils";

type BaseFormFieldProps = {
  /**
   * Label text for the field
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Custom wrapper className
   */
  wrapperClassName?: string;
  /**
   * Custom label className
   */
  labelClassName?: string;
  /**
   * Label variant (default or light)
   */
  labelVariant?: "default" | "light";
};

type InputFormFieldProps = BaseFormFieldProps & {
  /**
   * Type of form field
   */
  type?: "input";
} & Omit<InputProps, "error" | "errorMessage">;

type TextareaFormFieldProps = BaseFormFieldProps & {
  /**
   * Type of form field
   */
  type: "textarea";
} & Omit<TextareaProps, "error" | "errorMessage">;

type SelectFormFieldProps = BaseFormFieldProps & {
  /**
   * Type of form field
   */
  type: "select";
} & Omit<SelectProps, "error" | "errorMessage">;

export type FormFieldProps =
  | InputFormFieldProps
  | TextareaFormFieldProps
  | SelectFormFieldProps;

/**
 * FormField Component (Molecule)
 * Combines Label + Input/Textarea/Select + Error message
 *
 * This molecule encapsulates the common pattern of:
 * - Label with optional required indicator
 * - Form control (input, textarea, or select)
 * - Error message display
 *
 * Features:
 * - Supports input, textarea, and select types
 * - Automatic error state handling
 * - Required field indicator
 * - Consistent spacing and styling
 * - Light/dark label variants
 *
 * @example
 * ```tsx
 * // Input field
 * <FormField
 *   label="Correo electrónico"
 *   type="input"
 *   required
 *   placeholder="tucorreo@ejemplo.com"
 *   error={errors.email}
 * />
 *
 * // Textarea field
 * <FormField
 *   label="Mensaje"
 *   type="textarea"
 *   rows={4}
 *   error={errors.message}
 * />
 *
 * // Select field
 * <FormField
 *   label="País"
 *   type="select"
 *   required
 *   options={[
 *     { value: "mx", label: "México" },
 *     { value: "es", label: "España" },
 *   ]}
 * />
 * ```
 */
export const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(
  (
    {
      label,
      required = false,
      error,
      wrapperClassName,
      labelClassName,
      labelVariant = "default",
      type = "input",
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const fieldId = React.useId();

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            variant={labelVariant}
            className={labelClassName}
          >
            {label}
          </Label>
        )}

        {type === "textarea" ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={fieldId}
            error={hasError}
            errorMessage={error}
            {...(props as Omit<TextareaProps, "error" | "errorMessage">)}
          />
        ) : type === "select" ? (
          <Select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={fieldId}
            error={hasError}
            errorMessage={error}
            {...(props as Omit<SelectProps, "error" | "errorMessage">)}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            id={fieldId}
            error={hasError}
            errorMessage={error}
            {...(props as Omit<InputProps, "error" | "errorMessage">)}
          />
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
