"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "default" | "white" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
  priority?: boolean;
  quality?: number;
}

/**
 * Logo Component (Atom)
 * Displays the Altoq logo with different variants
 *
 * @param variant - Color variant: default (red), white, red
 * @param size - Size: sm (96x32px), md (128x42px), lg (192x64px)
 * @param className - Additional CSS classes
 * @param asLink - If true, wraps logo in Link to home
 * @param priority - If true, preloads the image (use for above-the-fold logos)
 * @param quality - Image quality (1-100), defaults to 100
 */
export function Logo({
  variant = "default",
  size = "md",
  className,
  asLink = false,
  priority = false,
  quality = 100,
}: LogoProps) {
  const pathname = usePathname();
  const isComparaPage = pathname === "/compara";

  const sizeConfig = {
    sm: { width: 96, height: 32, className: "w-24 h-8" },
    md: { width: 128, height: 42, className: "w-32 h-[42px]" },
    lg: { width: 192, height: 64, className: "w-48 h-16" },
  };

  const filterClasses = {
    default: "",
    white: "brightness-0 invert",
    red: "",
  };

  // En /compara, forzar el logo a blanco, a menos que se especifique rojo explícitamente
  const appliedFilter =
    isComparaPage && variant !== "red"
      ? "brightness-0 invert"
      : filterClasses[variant];

  const logoContent = (
    <Image
      src="/images/logo/altoq.webp"
      alt="Altoq"
      width={sizeConfig[size].width}
      height={sizeConfig[size].height}
      priority={priority}
      quality={quality}
      className={cn(
        sizeConfig[size].className,
        appliedFilter,
        "object-contain",
        className
      )}
    />
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
