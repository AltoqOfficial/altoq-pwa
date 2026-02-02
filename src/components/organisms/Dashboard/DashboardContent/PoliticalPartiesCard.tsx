import Image from "next/image";
import { cn } from "@/lib/utils";

interface PoliticalPartiesCardProps {
  isDark?: boolean;
}

export function PoliticalPartiesCard({
  isDark = false,
}: PoliticalPartiesCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden transition-colors",
        isDark ? "bg-[#2a2a2a]" : "bg-[#E8E8E8]"
      )}
    >
      {/* Content */}
      <h3
        className={cn(
          "text-xl sm:text-2xl font-bold mb-3 sm:mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}
      >
        Partidos políticos
      </h3>

      {/* Image */}
      <div
        className={cn(
          "relative w-full h-24 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4",
          isDark ? "bg-[#1a1a1a]" : "bg-white"
        )}
      >
        <Image
          src="/dashboard/partidosPoliticos.webp"
          alt="Partidos políticos de Perú"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 400px"
          unoptimized
        />
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-xs sm:text-sm mb-3 sm:mb-4",
          isDark ? "text-white/60" : "text-gray-600"
        )}
      >
        Busca información detallada de los partidos políticos y planes de
        gobierno.
      </p>

      {/* Button (disabled) */}
      <button
        disabled
        className={cn(
          "w-full py-2 sm:py-2.5 px-4 text-white text-xs sm:text-sm font-semibold rounded-lg text-center cursor-not-allowed",
          isDark ? "bg-white/20" : "bg-gray-400"
        )}
      >
        Explorar partidos
      </button>

      {/* Overlay with "Próximamente" */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl",
          isDark
            ? "bg-gradient-to-b from-[#202020]/70 via-[#202020]/90 to-[#202020]/70"
            : "bg-gradient-to-b from-white/70 via-white/90 to-white/70"
        )}
      >
        <span
          className={cn(
            "text-xl sm:text-2xl font-bold tracking-wide",
            isDark ? "text-white/80" : "text-gray-700"
          )}
        >
          Próximamente
        </span>
      </div>
    </div>
  );
}
