import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "default" | "white" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
}

/**
 * Logo Component (Atom)
 * Displays the Altoq logo with different variants
 *
 * @param variant - Color variant: default (red), white, red
 * @param size - Size: sm (24px), md (32px), lg (48px)
 * @param className - Additional CSS classes
 * @param asLink - If true, wraps logo in Link to home
 */
export function Logo({
  variant = "default",
  size = "md",
  className,
  asLink = false,
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const colorClasses = {
    default: "text-primary-600",
    white: "text-white",
    red: "text-primary-600",
  };

  const logoContent = (
    <span
      className={cn(
        "font-bold tracking-tight",
        sizeClasses[size],
        colorClasses[variant],
        className
      )}
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      Altoq
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        aria-label="Ir a la página de inicio"
        className="inline-block"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
