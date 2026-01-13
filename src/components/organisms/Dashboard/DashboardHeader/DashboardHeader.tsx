"use client";

import Image from "next/image";
import Link from "next/link";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 lg:hidden">
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
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
      <Link href="/dashboard">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq"
          width={70}
          height={28}
          className="h-7 w-auto"
        />
      </Link>

      {/* Spacer for centering */}
      <div className="w-10" />
    </header>
  );
}
