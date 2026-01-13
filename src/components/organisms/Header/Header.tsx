"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/compara", label: "Comparar" },
    { href: "/candidato-ideal", label: "Candidato Ideal" },
    { href: "/#como-funciona", label: "¿Cómo funciona?" },
    { href: "/sugerencias", label: "Sugerencias" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="relative top-0 z-50 w-full backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo variant="default" asLink priority />

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                "text-neutral-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login Button - Right Desktop */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-block bg-[#FF2727] hover:bg-[#E82323] text-white font-bold rounded-2xl px-6 py-3 transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors",
              isOpen ? "bg-neutral-900" : "bg-neutral-900"
            )}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 block bg-neutral-900 transition-colors"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors",
              isOpen ? "bg-neutral-900" : "bg-neutral-900"
            )}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 w-full bg-white shadow-lg border-t border-neutral-100 p-6 md:hidden flex flex-col gap-4 items-center"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-neutral-900 hover:text-primary-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full h-px bg-neutral-100 my-2" />
              <Link
                href="/login"
                className="w-full text-center bg-[#FF2727] hover:bg-[#E82323] text-white font-bold rounded-2xl px-6 py-3 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
