"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLogout } from "@/components/organisms/Auth/hooks/useAuth";
import { useTheme } from "@/contexts";

// Routes that have dark backgrounds and need light-colored header elements

/**
 * Header Component Props
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [forceShow] - Force header to be visible regardless of scroll
 * @property {"default" | "transparent"} [variant="default"] - Visual variant of the header
 * @property {boolean} [isScrolled] - External control of scrolled state (overrides internal state)
 * @property {"fixed" | "static"} [position="fixed"] - Position mode of the header
 *
 * **Position Modes:**
 * - `fixed` (default): Header stays at the top of viewport.
 *   ⚠️ Components below MUST have `mt-21 md:mt-28 lg:mt-21` to compensate for header height.
 *   See: ConditionalLayout.tsx for implementation example.
 *
 * - `static`: Header is part of document flow and pushes content down naturally.
 *   ✅ No margin-top needed on components below.
 *   🔍 No z-index applied for better stacking context.
 *   Example: ComparisonHero uses static header.
 */
interface HeaderProps {
  className?: string;
  forceShow?: boolean;
  variant?: "default" | "transparent";
  isScrolled?: boolean;
  position?: "fixed" | "static";
}

/**
 * Header Component
 *
 * Main navigation header with authentication state, responsive menu, and flexible positioning.
 *
 * @example
 * // Fixed header (default) - requires margin-top on content below
 * <Header />
 *
 * @example
 * // Static header - no margin-top needed
 * <Header position="static" variant="transparent" />
 */
export function Header({
  className,
  isScrolled: externalIsScrolled,
  position = "fixed", // Default to fixed for backward compatibility
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [internalIsScrolled, setInternalIsScrolled] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Use external state if provided, otherwise use internal
  const isScrolled = externalIsScrolled ?? internalIsScrolled;

  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useUserProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
  // Force solid white header across all routes and variants
  // Now we respect theme, so it can be solid dark too
  const isTransparentState = false;

  // Text color: adapts based on background
  const textColorClass = isTransparentState
    ? "text-white"
    : isDark
      ? "text-white"
      : "text-neutral-900";

  const logoVariant = isTransparentState
    ? "white"
    : isDark
      ? "white"
      : "default";

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
        "top-0 left-0 right-0 w-full transition-all duration-300",
        // Position-specific classes
        position === "fixed" && "fixed z-50",
        position === "static" && "static",
        // Scroll-based styles (only apply when position is fixed)
        position === "fixed" && isScrolled
          ? isDark
            ? "bg-[#1a1a1a] shadow-sm border-b border-white/10 py-3"
            : "bg-white shadow-sm border-b border-neutral-100 py-3"
          : position === "static"
            ? isDark
              ? "bg-[#1a1a1a] border-b border-white/10"
              : "bg-white border-b border-gray-100"
            : isDark
              ? "bg-[#1a1a1a] border-b border-white/10 py-5"
              : "bg-white border-b border-neutral-100 py-5",
        position === "static"
          ? "py-4"
          : position === "fixed" && !isScrolled && "py-5",
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
                  : isDark
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
          {!mounted || isLoading ? (
            // Loading state or before mounting
            <div
              className={cn(
                "w-24 h-10 rounded-2xl animate-pulse",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}
            />
          ) : isAuthenticated ? (
            // Authenticated - Show user menu
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-2xl transition-all border",
                  isTransparentState
                    ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                    : isDark
                      ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
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
                    className={cn(
                      "absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-xl overflow-hidden z-50 p-1 border",
                      isDark
                        ? "bg-[#202020] border-white/10 shadow-black/50"
                        : "bg-white border-neutral-100 shadow-neutral-200/50"
                    )}
                  >
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                        isDark
                          ? "text-gray-200 hover:bg-white/10"
                          : "text-neutral-700 hover:bg-neutral-50"
                      )}
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
                    <div
                      className={cn(
                        "h-px my-1",
                        isDark ? "bg-white/10" : "bg-neutral-100"
                      )}
                    />
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors disabled:opacity-50",
                        isDark
                          ? "text-gray-200 hover:bg-red-500/10 hover:text-red-400"
                          : "text-neutral-700 hover:bg-red-50 hover:text-red-600"
                      )}
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
                        className={cn(
                          "text-neutral-400",
                          isDark
                            ? "group-hover:text-red-400"
                            : "group-hover:text-red-500"
                        )}
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
          className={cn(
            "flex md:hidden flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50 relative rounded-full transition-colors",
            isDark ? "hover:bg-white/10" : "hover:bg-black/5"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isOpen || isTransparentState
                ? isDark
                  ? "bg-white"
                  : "bg-neutral-900" // When open, adapt to menu bg or keep logical consistency
                : isDark
                  ? "bg-white"
                  : "bg-neutral-900"
            )}
            style={{
              // Override for open state which forces specific colors in original code, now we adapt
              backgroundColor: isOpen
                ? isDark
                  ? "white"
                  : "#171717"
                : undefined,
            }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isDark ? "bg-white" : "bg-neutral-900"
            )}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors rounded-full",
              isOpen || isTransparentState
                ? isDark
                  ? "bg-white"
                  : "bg-neutral-900"
                : isDark
                  ? "bg-white"
                  : "bg-neutral-900"
            )}
            style={{
              backgroundColor: isOpen
                ? isDark
                  ? "white"
                  : "#171717"
                : undefined,
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
              className={cn(
                "absolute top-20 left-4 right-4 rounded-3xl shadow-2xl border p-6 md:hidden flex flex-col gap-4 items-center overflow-hidden",
                isDark
                  ? "bg-[#202020] border-white/10 shadow-black/50"
                  : "bg-white border-neutral-100 shadow-neutral-900/20"
              )}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "w-full text-center text-lg font-medium py-3 rounded-xl transition-all",
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-neutral-600 hover:text-primary-600 hover:bg-neutral-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className={cn(
                  "w-full h-px my-2",
                  isDark ? "bg-white/10" : "bg-neutral-100"
                )}
              />

              {!mounted ? (
                // Loading state for mobile menu login button
                <div className="w-full h-14 rounded-2xl animate-pulse bg-gray-200 dark:bg-white/10" />
              ) : isAuthenticated ? (
                // Authenticated mobile menu
                <>
                  {/* User info */}
                  <div
                    className={cn(
                      "flex items-center gap-3 py-2 w-full justify-center rounded-2xl border",
                      isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-neutral-50 border-neutral-100"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                      {userInitial}
                    </div>
                    <div className="text-left">
                      <p
                        className={cn(
                          "font-bold text-sm leading-tight",
                          isDark ? "text-white" : "text-neutral-900"
                        )}
                      >
                        {displayName}
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-neutral-500"
                        )}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/"
                    className={cn(
                      "w-full text-center font-bold rounded-2xl px-6 py-3.5 transition-colors",
                      isDark
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Ir al Inicio
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={cn(
                      "w-full text-center border font-medium rounded-2xl px-6 py-3.5 transition-colors disabled:opacity-50",
                      isDark
                        ? "border-white/10 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                        : "border-neutral-200 text-neutral-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    )}
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
