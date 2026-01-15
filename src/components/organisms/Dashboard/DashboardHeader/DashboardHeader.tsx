"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:hidden transition-colors",
        isDark
          ? "bg-[#1a1a1a] border-b border-white/10"
          : "bg-white border-b border-gray-100"
      )}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className={cn(
          "p-2 -ml-2 transition-colors",
          isDark
            ? "text-white/60 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
        )}
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq"
          width={70}
          height={28}
          className={cn("h-7 w-auto", isDark && "brightness-0 invert")}
        />
      </Link>

      {/* Spacer for centering */}
      <div className="w-10" />
    </header>
  );
}
