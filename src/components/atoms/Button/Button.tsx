import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component (Atom)
 * Reusable button with multiple variants and sizes
 *
 * @param variant - Visual style: primary, secondary, outline, ghost
 * @param size - Button size: sm, md, lg
 * @param asChild - If true, merges props with child element
 * @param className - Additional CSS classes
 */
export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600",
    secondary:
      "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",
    outline:
      "border-2 border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white focus:ring-neutral-900",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <Comp
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
