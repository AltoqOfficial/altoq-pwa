"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLogout } from "@/components/organisms/Auth/hooks/useAuth";

// Rutas que tienen fondo oscuro
const DARK_BACKGROUND_ROUTES = ["/formulario-candidato"];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isLoading } = useUserProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const isAuthenticated = !!user && !isLoading;
  const isDarkBackground = DARK_BACKGROUND_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const navLinks = [
    { href: "/compara", label: "Comparar" },
    { href: "/formulario-candidato", label: "Candidato Ideal" },
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
    <header className="relative top-0 z-50 w-full backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo
          variant={isDarkBackground ? "white" : "default"}
          asLink
          priority
        />

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isDarkBackground
                  ? "text-white hover:text-white/80"
                  : "text-neutral-900 hover:text-primary-600"
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
                  "flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors",
                  isDarkBackground ? "hover:bg-white/10" : "hover:bg-gray-100"
                )}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#FF2727] flex items-center justify-center text-white font-bold text-sm">
                  {userInitial}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium max-w-[120px] truncate",
                    isDarkBackground ? "text-white" : "text-gray-900"
                  )}
                >
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
                    isDarkBackground ? "text-white/70" : "text-gray-500",
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                      >
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                      </svg>
                      Dashboard
                    </Link>
                    <div className="h-px bg-gray-100" />
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF2727] transition-colors disabled:opacity-50"
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
              className="inline-block bg-[#FF2727] hover:bg-[#E82323] text-white font-bold rounded-2xl px-6 py-3 transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
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
              isOpen
                ? "bg-neutral-900"
                : isDarkBackground
                  ? "bg-white"
                  : "bg-neutral-900"
            )}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={cn(
              "w-6 h-0.5 block transition-colors",
              isDarkBackground ? "bg-white" : "bg-neutral-900"
            )}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={cn(
              "w-6 h-0.5 block transition-colors",
              isOpen
                ? "bg-neutral-900"
                : isDarkBackground
                  ? "bg-white"
                  : "bg-neutral-900"
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

              {isAuthenticated ? (
                // Authenticated mobile menu
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-[#FF2727] flex items-center justify-center text-white font-bold">
                      {userInitial}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{displayName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full text-center bg-[#FF2727] hover:bg-[#E82323] text-white font-bold rounded-2xl px-6 py-3 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Ir al Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-center border-2 border-gray-300 text-gray-700 font-bold rounded-2xl px-6 py-3 transition-colors hover:border-[#FF2727] hover:text-[#FF2727] disabled:opacity-50"
                  >
                    {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                  </button>
                </>
              ) : (
                // Not authenticated mobile menu
                <Link
                  href="/login"
                  className="w-full text-center bg-[#FF2727] hover:bg-[#E82323] text-white font-bold rounded-2xl px-6 py-3 transition-colors"
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
