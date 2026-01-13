"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, CompareIcon, SettingsIcon, UserIcon } from "../icons";
import { SettingsModal } from "../SettingsModal";
import { cn } from "@/lib/utils";
import { useLogout } from "@/components/organisms/Auth/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useTheme } from "@/contexts";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ isActive?: boolean; className?: string }>;
}

const mainNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    href: "/compara",
    label: "Comparar candidatos",
    icon: CompareIcon,
  },
];

const externalLinks = [
  {
    href: "https://twitter.com/altoqperu",
    label: "Redes sociales",
  },
  {
    href: "/unete",
    label: "Únete a nosotros",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { user, isLoading } = useUserProfile();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const handleLogout = () => {
    logout();
  };

  const displayName = isLoading ? "Cargando..." : user?.fullName || "Usuario";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-[240px] lg:w-[170px] min-h-screen flex-shrink-0 transition-all duration-300 ease-in-out",
          isDark
            ? "bg-[#1a1a1a] border-r border-white/10"
            : "bg-[#FBFBFB] border-r border-gray-100",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            "flex items-center justify-between lg:justify-center py-6 lg:py-8 px-4 lg:px-0",
            isDark ? "bg-[#151515]" : "bg-[#F0F0F0]"
          )}
        >
          <Link href="/">
            <Image
              src="/images/logo/altoq.webp"
              alt="Altoq"
              width={86}
              height={36}
              className={cn(
                "h-8 lg:h-9 w-auto",
                isDark && "brightness-0 invert"
              )}
              priority
            />
          </Link>
          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className={cn(
              "lg:hidden p-2 -mr-2 transition-colors",
              isDark
                ? "text-white/60 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            )}
            aria-label="Cerrar menú"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 py-6 lg:py-8 px-4">
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      active
                        ? isDark
                          ? "text-[#FF2727] bg-[#FF2727]/10"
                          : "text-[#FF2727] bg-red-50"
                        : isDark
                          ? "text-white/60 hover:text-[#FF2727] hover:bg-white/5"
                          : "text-[#868686] hover:text-[#FF2727] hover:bg-gray-50"
                    )}
                  >
                    <Icon isActive={active} className="flex-shrink-0" />
                    <span className="leading-tight text-[13px]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
            {/* Settings Button */}
            <li>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full",
                  isDark
                    ? "text-white/60 hover:text-[#FF2727] hover:bg-white/5"
                    : "text-[#868686] hover:text-[#FF2727] hover:bg-gray-50"
                )}
              >
                <SettingsIcon className="flex-shrink-0" />
                <span className="leading-tight text-[13px]">Ajustes</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* External Links */}
        <div
          className={cn(
            "px-4 py-4 lg:py-5 border-t",
            isDark ? "border-white/10" : "border-gray-100"
          )}
        >
          <ul className="space-y-3">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 text-xs transition-colors",
                    isDark
                      ? "text-white/50 hover:text-[#FF2727]"
                      : "text-[#868686] hover:text-[#FF2727]"
                  )}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <span>{link.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Section with Dropdown */}
        <div
          className={cn(
            "px-4 py-4 lg:py-5 border-t relative",
            isDark ? "border-white/10" : "border-gray-100"
          )}
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "flex items-center gap-3 w-full rounded-lg p-2 -m-2 transition-colors",
              isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                isDark ? "bg-white/10" : "bg-gray-200"
              )}
            >
              <UserIcon className={cn("w-4 h-4", isDark && "text-white/70")} />
            </div>
            <div className="min-w-0 text-left flex-1">
              <p
                className={cn(
                  "text-sm font-medium truncate",
                  isDark ? "text-white" : "text-gray-900"
                )}
              >
                {displayName}
              </p>
              <p
                className={cn(
                  "text-xs truncate",
                  isDark ? "text-white/50" : "text-gray-500"
                )}
              >
                {user?.email || ""}
              </p>
            </div>
            {/* Dropdown Arrow */}
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
                isDark ? "text-white/40" : "text-gray-400",
                isDropdownOpen ? "rotate-180" : ""
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={cn(
                "absolute bottom-full left-4 right-4 mb-2 rounded-lg shadow-lg overflow-hidden z-50",
                isDark
                  ? "bg-[#2a2a2a] border border-white/10"
                  : "bg-white border border-gray-100"
              )}
            >
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors disabled:opacity-50",
                  isDark
                    ? "text-white/70 hover:bg-white/5 hover:text-[#FF2727]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#FF2727]"
                )}
              >
                {/* Logout Icon */}
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
                <span>
                  {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
