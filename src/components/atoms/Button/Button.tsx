import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-light"
    | "ghost"
    | "header-nav"
    | "header-nav-dark";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component (Atom)
 * Reusable button with multiple variants and sizes
 *
 * @param variant - Visual style: primary, secondary, outline (dark backgrounds), outline-light (light backgrounds), ghost, header-nav
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
    "inline-flex items-center justify-center rounded font-bold transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 font-sohne-breit select-none";

  const variantStyles = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline:
      "border-[0.5px] border-neutral-900 bg-white/90 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900",
    "outline-light":
      "border-[0.5px] border-neutral-200 bg-neutral-500/90 text-surface hover:border-white",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
    "header-nav":
      "bg-transparent text-neutral-900 hover:bg-neutral-50 relative overflow-hidden",
    "header-nav-dark":
      "bg-transparent text-white hover:bg-white/10 relative overflow-hidden",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-12 px-7 text-base",
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
