"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/atoms/Logo";

import { cn } from "@/lib/utils";
import { EXTERNAL_LINKS } from "@/constants";

/**
 * Header Component (Organism)
 * Main navigation header that appears on all pages
 *
 * Features:
 * - Logo (centered on mobile, left-aligned on desktop)
 * - CTA buttons (Únirme como voluntario, Comparar Candidatos)
 * - Dark background with transparency
 * - Responsive design with different layouts for mobile and desktop
 * - Dynamic outline button variant based on page background
 */
interface HeaderProps {
  forceShow?: boolean;
  className?: string;
}

export function Header({ forceShow, className }: HeaderProps) {
  const pathname = usePathname();

  // Pages with dark backgrounds use outline-light and header-nav-dark
  // Pages with light backgrounds use outline and header-nav
  const darkBackgroundPages = ["/", "/compara"];
  const isDarkBackground = darkBackgroundPages.includes(pathname);

  // Hide header on comparison page unless forced (to allow custom placement/behavior)
  if (pathname === "/compara" && !forceShow) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full backdrop-blur-sm",
        pathname === "/compara" && "bg-neutral-500",
        className
      )}
    >
      {/* Mobile Layout */}
      {/* Mobile Layout */}
      <div className="container mx-auto flex md:hidden h-16 items-center justify-between px-4 border-b border-white/10">
        {/* Logo */}
        <Logo
          variant={isDarkBackground ? "default" : "red"}
          asLink
          priority
          size="sm"
        />

        {/* CTA Links */}
        <div className="flex items-center gap-6">
          <a
            href={EXTERNAL_LINKS.volunteerForm}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-sohne-breit uppercase font-bold text-[10px] transition-colors duration-300",
              isDarkBackground
                ? "text-white hover:text-[#FF2727]"
                : "text-black hover:text-[#FF2727]"
            )}
          >
            Ser Voluntario
          </a>

          <Link
            href="/compara"
            className={cn(
              "font-sohne-breit uppercase font-bold text-[10px] transition-colors duration-300",
              pathname === "/compara"
                ? "text-[#FF2727]"
                : isDarkBackground
                  ? "text-white hover:text-[#FF2727]"
                  : "text-black hover:text-[#FF2727]"
            )}
          >
            Comparar
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="container mx-auto hidden md:flex h-20 items-center justify-between px-6 border-b border-white/10">
        {/* Logo */}
        <Logo variant="default" asLink priority />

        {/* CTA Links */}
        <div className="flex items-center gap-12 h-full">
          {/* Volunteer Link */}
          <a
            href={EXTERNAL_LINKS.volunteerForm}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-full flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            {/* Red Bar on Top - Visible on Hover */}
            <span className="absolute top-0 left-0 w-full h-1 bg-[#FF2727] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 transform origin-center" />

            <span className="font-sohne-breit uppercase font-bold text-sm text-white group-hover:text-[#FF2727] transition-colors duration-300">
              Unirme como Voluntario
            </span>
          </a>

          {/* Compare Link */}
          <Link
            href="/compara"
            className="group relative h-full flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            {/* Red Bar on Top - Visible on Hover or Active */}
            <span
              className={cn(
                "absolute top-0 left-0 w-full h-1 bg-[#FF2727] transition-all duration-300 transform origin-center",
                pathname === "/compara"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              )}
            />

            <span
              className={cn(
                "font-sohne-breit uppercase font-bold text-sm transition-colors duration-300",
                pathname === "/compara"
                  ? "text-[#FF2727]"
                  : "text-white group-hover:text-[#FF2727]"
              )}
            >
              Comparar Candidatos
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
