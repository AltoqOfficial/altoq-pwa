"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, CompareIcon, MatchIcon } from "../icons";
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
    href: "/",
    label: "Inicio",
    icon: DashboardIcon,
  },
  {
    href: "/compara",
    label: "Comparar candidatos",
    icon: CompareIcon,
  },
  {
    href: "/formulario-candidato",
    label: "Encuentra tu Match",
    icon: MatchIcon,
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
    if (href === "/") {
      return pathname === "/";
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
  const userInitial = (user?.fullName?.charAt(0) || "U").toUpperCase();

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
        {/* Close button - mobile only */}
        <div className="flex items-center justify-end lg:hidden pt-4 px-4">
          <button
            onClick={onClose}
            className={cn(
              "p-2 -mr-2 transition-colors",
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
          </ul>
        </nav>

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
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-sm">
              {userInitial}
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
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsSettingsOpen(true);
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors",
                  isDark
                    ? "text-white/70 hover:bg-white/5 hover:text-[#FF2727]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#FF2727]"
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
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Ajustes</span>
              </button>
              <div
                className={cn("h-px", isDark ? "bg-white/10" : "bg-gray-100")}
              />
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
