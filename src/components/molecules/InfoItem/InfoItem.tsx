import React from "react";

import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface InfoItemProps {
  /**
   * Label text (left side)
   */
  label: string;
  /**
   * Value text (right side)
   */
  value: string | React.ReactNode;
  /**
   * Whether to show the bottom border
   */
  showBorder?: boolean;
  /**
   * Custom className for wrapper
   */
  className?: string;
  /**
   * Custom className for label
   */
  labelClassName?: string;
  /**
   * Custom className for value
   */
  valueClassName?: string;
  /**
   * Layout direction
   */
  layout?: "horizontal" | "vertical";
}

/**
 * InfoItem Component (Molecule)
 * Label-value pair display for information lists
 *
 * This molecule displays a label and value pair with:
 * - Consistent spacing
 * - Optional border
 * - Horizontal or vertical layout
 * - Customizable styling
 *
 * Features:
 * - Horizontal (default) or vertical layout
 * - Optional bottom border
 * - Support for React nodes as value
 * - Responsive design
 *
 * @example
 * ```tsx
 * <InfoItem
 *   label="Edad"
 *   value="48 años"
 * />
 *
 * <InfoItem
 *   label="Profesión"
 *   value="Administradora de empresas"
 *   showBorder={false}
 * />
 *
 * <InfoItem
 *   label="Partido"
 *   value={<strong>Fuerza Popular</strong>}
 *   layout="vertical"
 * />
 * ```
 */
export function InfoItem({
  label,
  value,
  showBorder = true,
  className,
  labelClassName,
  valueClassName,
  layout = "horizontal",
}: InfoItemProps) {
  return (
    <div
      className={cn(
        "py-2",
        showBorder && "border-b border-neutral-100",
        layout === "horizontal"
          ? "flex justify-between items-center gap-4"
          : "space-y-1",
        className
      )}
    >
      <Typography
        variant="small"
        className={cn(
          "font-medium text-neutral-700",
          layout === "horizontal" && "shrink-0",
          labelClassName
        )}
      >
        {label}
      </Typography>
      {typeof value === "string" ? (
        <Typography
          variant="small"
          className={cn(
            "text-neutral-900",
            layout === "horizontal" && "text-right",
            valueClassName
          )}
        >
          {value}
        </Typography>
      ) : (
        <div
          className={cn(
            layout === "horizontal" && "text-right",
            valueClassName
          )}
        >
          {value}
        </div>
      )}
    </div>
  );
}
