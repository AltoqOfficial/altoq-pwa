"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
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
export function Header() {
  const pathname = usePathname();

  // Pages with dark backgrounds use outline-light and header-nav-dark
  // Pages with light backgrounds use outline and header-nav
  const darkBackgroundPages = ["/", "/compara"];
  const isDarkBackground = darkBackgroundPages.includes(pathname);
  const outlineVariant = isDarkBackground ? "outline-light" : "outline";
  const headerNavVariant = isDarkBackground ? "header-nav-dark" : "header-nav";

  return (
    <header
      className={cn(
        "static top-0 z-20 w-full backdrop-blur-sm",
        pathname === "/compara" && "bg-neutral-500"
      )}
    >
      {/* Mobile Layout */}
      <div className="container mx-auto flex md:hidden flex-col items-center px-4 py-4 gap-4">
        {/* Logo - Centered */}
        <Logo variant="default" asLink priority />

        {/* CTA Buttons - Horizontal with divider */}
        <div className="flex items-center gap-4 w-full justify-center">
          <div className="relative flex-1 max-w-[140px]">
            <Button
              variant={headerNavVariant}
              size="sm"
              asChild
              className="w-full rounded-none"
            >
              <a
                href={EXTERNAL_LINKS.volunteerForm}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-center leading-tight">
                  Unirme como
                  <br />
                  Voluntario
                </span>
              </a>
            </Button>
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-12 w-px",
              isDarkBackground ? "bg-white/30" : "bg-neutral-400"
            )}
          ></div>

          <div className="relative flex-1 max-w-[140px]">
            {pathname === "/compara" && (
              <span className="absolute top-0 left-0 right-0 h-1 bg-primary-600 z-10" />
            )}
            <Button
              variant={headerNavVariant}
              size="sm"
              asChild
              className="w-full rounded-none"
            >
              <Link href="/compara">
                <span className="text-center leading-tight">
                  Comparar
                  <br />
                  Candidatos
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="container mx-auto hidden md:flex h-20 items-center justify-between px-6 border-b border-white/10">
        {/* Logo */}
        <Logo variant="default" asLink priority />

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Button variant={outlineVariant} size="sm" asChild>
            <a
              href={EXTERNAL_LINKS.volunteerForm}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unirme como Voluntario
            </a>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
