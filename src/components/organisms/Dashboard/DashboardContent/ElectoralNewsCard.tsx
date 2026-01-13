import Image from "next/image";

export function ElectoralNewsCard() {
  return (
    <div className="relative flex flex-col bg-[#E8E8E8] rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden">
      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
        Novedades electorales
      </h3>

      {/* Image */}
      <div className="relative w-full h-24 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
        <Image
          src="/dashboard/novedadesElectorales.webp"
          alt="Novedades electorales"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          unoptimized
        />
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
        Busca información detallada de los partidos políticos y planes de
        gobierno.
      </p>

      {/* Button (disabled) */}
      <button
        disabled
        className="w-full py-2 sm:py-2.5 px-4 bg-gray-400 text-white text-xs sm:text-sm font-semibold rounded-lg text-center cursor-not-allowed"
      >
        Leer noticias
      </button>

      {/* Overlay with "Próximamente" */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-white/70 flex items-center justify-center rounded-xl sm:rounded-2xl">
        <span className="text-xl sm:text-2xl font-bold text-gray-700 tracking-wide">
          Próximamente
        </span>
      </div>
    </div>
  );
}
