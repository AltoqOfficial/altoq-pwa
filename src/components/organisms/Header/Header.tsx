"use client";

import Link from "next/link";

import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";

/**
 * Header Component (Organism)
 * Main navigation header that appears on all pages
 *
 * Features:
 * - Logo
 * - Navigation links
 * - CTA buttons (Únete como Voluntario, Comparar candidatos)
 * - Responsive mobile menu
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo - ✅ Now with asLink prop */}
        <Logo variant="default" asLink />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/unete"
            className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
          >
            Únete como Voluntario
          </Link>
          <Link
            href="/compara"
            className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
          >
            Comparar candidatos
          </Link>
        </nav>

        {/* CTA Buttons - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/unete">Únete</Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/compara">Comparar</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" aria-label="Abrir menú de navegación">
          {/* TODO: Add hamburger icon */}
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu - TODO: Implement mobile menu */}
    </header>
  );
}
