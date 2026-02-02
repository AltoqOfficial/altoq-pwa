"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type ThemeMode } from "@/contexts";
import { cn } from "@/lib/utils";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeOptions: { value: ThemeMode; label: string; description: string }[] =
  [
    {
      value: "light",
      label: "Modo Claro",
      description: "Interfaz con fondo claro",
    },
    {
      value: "dark",
      label: "Modo Oscuro",
      description: "Interfaz con fondo oscuro",
    },
    {
      value: "system",
      label: "Sistema",
      description: "Sigue la configuración de tu dispositivo",
    },
  ];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-full max-w-md rounded-2xl shadow-xl overflow-hidden",
              resolvedTheme === "dark"
                ? "bg-[#202020] text-white"
                : "bg-white text-gray-900"
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between px-6 py-4 border-b",
                resolvedTheme === "dark" ? "border-white/10" : "border-gray-100"
              )}
            >
              <h2 className="text-lg font-semibold">Configuración</h2>
              <button
                onClick={onClose}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  resolvedTheme === "dark"
                    ? "hover:bg-white/10 text-white/70 hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                )}
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3
                  className={cn(
                    "text-sm font-medium mb-1",
                    resolvedTheme === "dark" ? "text-white/90" : "text-gray-900"
                  )}
                >
                  Apariencia
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    resolvedTheme === "dark" ? "text-white/60" : "text-gray-500"
                  )}
                >
                  Selecciona el tema de la interfaz
                </p>
              </div>

              {/* Theme Options */}
              <div className="space-y-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all",
                      resolvedTheme === "dark"
                        ? theme === option.value
                          ? "bg-[#FF2727]/20 border-2 border-[#FF2727]"
                          : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                        : theme === option.value
                          ? "bg-red-50 border-2 border-[#FF2727]"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        resolvedTheme === "dark" ? "bg-white/10" : "bg-gray-200"
                      )}
                    >
                      {option.value === "light" && <SunIcon />}
                      {option.value === "dark" && <MoonIcon />}
                      {option.value === "system" && <SystemIcon />}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <p
                        className={cn(
                          "font-medium",
                          resolvedTheme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        )}
                      >
                        {option.label}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          resolvedTheme === "dark"
                            ? "text-white/60"
                            : "text-gray-500"
                        )}
                      >
                        {option.description}
                      </p>
                    </div>

                    {/* Checkmark */}
                    {theme === option.value && (
                      <div className="text-[#FF2727]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Icons
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-500"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-400"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
