"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLogout } from "@/components/organisms/Auth/hooks/useAuth";

// Routes that have dark backgrounds and need light-colored header elements
const DARK_BACKGROUND_ROUTES = ["/compara"];

interface HeaderProps {
  className?: string;
  forceShow?: boolean;
  variant?: "default" | "transparent";
  isScrolled?: boolean; // Allow external control of scrolled state
}

export function Header({
  className,
  forceShow,
  variant = "default",
  isScrolled: externalIsScrolled,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [internalIsScrolled, setInternalIsScrolled] = useState(false);

  // Use external state if provided, otherwise use internal
  const isScrolled = externalIsScrolled ?? internalIsScrolled;

  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isLoading } = useUserProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // Scroll handler for sticky effect (only if no external state controlled)
  useEffect(() => {
    if (externalIsScrolled !== undefined) return;

    const handleScroll = () => {
      setInternalIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalIsScrolled]);

  const isAuthenticated = !!user && !isLoading;
  const isDarkBackground = DARK_BACKGROUND_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Determine styles based on scroll and background
  const isTransparentState =
    !isScrolled && (isDarkBackground || variant === "transparent");

  // Text color: Dark if scrolled or on light bg, White if on dark bg/transparent variant AND not scrolled
  const textColorClass = isTransparentState ? "text-white" : "text-neutral-900";
  const logoVariant = isTransparentState ? "white" : "default";

  const navLinks = [
    { href: "/compara", label: "Comparar Candidatos" },
    { href: "/formulario-candidato", label: "Encuentra tu Match" },
    { href: "/#como-funciona", label: "¿Cómo funciona?" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsOpen(false);
    logout();
  };

  // Get first name or initial
  const displayName = user?.fullName?.split(" ")[0] || "Usuario";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3"
          : "bg-transparent py-5",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo
          variant={logoVariant}
          asLink
          priority
          className="transition-transform duration-300 hover:scale-105"
        />

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all hover:-translate-y-0.5",
                textColorClass,
                isTransparentState
                  ? "hover:text-white/80"
                  : "hover:text-primary-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:block">
          {isLoading ? (
            // Loading state
            <div className="w-24 h-10 bg-gray-200 rounded-2xl animate-pulse" />
          ) : isAuthenticated ? (
            // Authenticated - Show user menu
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-2xl transition-all border",
                  isTransparentState
                    ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                    : "border-neutral-200 bg-white hover:border-neutral-300 text-neutral-900"
                )}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {userInitial}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate">
                  {displayName}
                </span>
                {/* Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "transition-transform duration-200",
                    isUserMenuOpen ? "rotate-180" : ""
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden z-50 p-1"
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-400"
                      >
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                      </svg>
                      Inicio
                    </Link>
                    <div className="h-px bg-neutral-100 my-1" />
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-400 group-hover:text-red-500"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Not authenticated - Show login button
            <Link
              href="/login"
              className={cn(
                "inline-block font-bold rounded-2xl px-6 py-2.5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20",
                "bg-primary-500 hover:bg-primary-600 text-white"
              )}
            >
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50 relative rounded-full hover:bg-black/5 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isOpen || isTransparentState ? "bg-white" : "bg-neutral-900"
            )}
            style={{
              backgroundColor: isOpen
                ? isTransparentState
                  ? "white"
                  : "#171717"
                : isTransparentState
                  ? "white"
                  : "#171717",
            }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isOpen || isTransparentState ? "bg-white" : "bg-neutral-900"
            )}
            style={{
              backgroundColor: isOpen
                ? isTransparentState
                  ? "white"
                  : "#171717"
                : isTransparentState
                  ? "white"
                  : "#171717",
            }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isOpen || isTransparentState ? "bg-white" : "bg-neutral-900"
            )}
            style={{
              backgroundColor: isOpen
                ? isTransparentState
                  ? "white"
                  : "#171717"
                : isTransparentState
                  ? "white"
                  : "#171717",
            }}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl shadow-neutral-900/20 border border-neutral-100 p-6 md:hidden flex flex-col gap-4 items-center overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full text-center text-lg font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 py-3 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full h-px bg-neutral-100 my-2" />

              {isAuthenticated ? (
                // Authenticated mobile menu
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 py-2 bg-neutral-50 w-full justify-center rounded-2xl border border-neutral-100">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                      {userInitial}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm text-neutral-900 leading-tight">
                        {displayName}
                      </p>
                      <p className="text-xs text-neutral-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/"
                    className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl px-6 py-3.5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Ir al Inicio
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-center border font-medium border-neutral-200 text-neutral-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-2xl px-6 py-3.5 transition-colors disabled:opacity-50"
                  >
                    {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                  </button>
                </>
              ) : (
                // Not authenticated mobile menu
                <Link
                  href="/login"
                  className="w-full text-center bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl px-6 py-3.5 transition-colors shadow-lg shadow-primary-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
