"use client";

import Image from "next/image";
import { Typography } from "@/components/atoms";
import { FieldConfig } from "./types";
import {
  SourceTooltip,
  extractValue,
  extractSource,
  extractDescription,
} from "./SourceTooltip";
import type { CandidateComparisonData, SocialLinks } from "@/data";

interface MobileComparisonCardProps {
  candidate: CandidateComparisonData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | null | undefined;
  fields: FieldConfig[];
  side: "left" | "right";
  color?: string; // e.g. red for left, blue for right
  socialLinks?: SocialLinks;
}

export function MobileComparisonCard({
  candidate,
  data,
  fields,
  color = "#FF2727",
  socialLinks,
}: MobileComparisonCardProps) {
  // We can try to find specific fields to highlight if we want to match the specific layout
  // But for now, a generic robust card is best.

  // Custom rendering for header fields if they exist in the config
  // e.g. profesion, partidoActual.
  // We will filter them out of the main list if we display them in the header?
  // User asked for "Card Format".

  return (
    <div className="w-full bg-profile-gradient rounded-xl shadow-lg  relative p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6">
      {fields.find((f) => f.key === "profesion") && (
        <Typography
          font="bigShoulders"
          className="text-white/80 uppercase text-center text-xs md:text-[16px]"
        >
          {(() => {
            const raw = data?.profesion;
            const val = extractValue(raw);
            const src = extractSource(raw);
            const desc = extractDescription(raw);

            let content: React.ReactNode = "-";
            if (Array.isArray(val)) {
              if (val.length === 0) content = "-";
              else {
                content = val.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < val.length - 1 && (
                      <span
                        className="mx-2 inline-block h-[12px] w-0.5 opacity-80"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </span>
                ));
              }
            } else if (typeof val === "string") {
              content = val || "-";
            }

            return src ? (
              <SourceTooltip source={src} description={desc}>
                {content}
              </SourceTooltip>
            ) : (
              content
            );
          })()}
        </Typography>
      )}

      {/* Candidate Image Circle */}
      <div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {candidate.image && (
          <Image
            src={candidate.image}
            alt={candidate.fullName || "Candidato"}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Party Name */}
      <div className=" flex flex-col items-center text-center">
        <Typography
          font="bigShoulders"
          className="text-white text-[13px] md:text-[20px] font-light"
        >
          {candidate.shortName || "Candidato"}
        </Typography>
        <Typography
          variant="p"
          font="bigShoulders"
          className="text-white text-[7px] md:text-[12px] font-black mt-1"
        >
          {candidate.party || "Partido"}
        </Typography>
      </div>

      {/* social icons */}
      <div className="flex items-center justify-center gap-4 py-2">
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.webp"
              alt="Instagram"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </a>
        )}
        {socialLinks?.tiktok && (
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="TikTok"
          >
            <Image
              src="/icons/tiktok.webp"
              alt="TikTok"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </a>
        )}
        {socialLinks?.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Facebook"
          >
            <Image
              src="/icons/facebook.webp"
              alt="Facebook"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </a>
        )}
        {socialLinks?.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="X (Twitter)"
          >
            <Image
              src="/icons/twitter-x.webp"
              alt="X (Twitter)"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </a>
        )}
      </div>

      {/* Custom Data Layout */}
      <div className="w-full space-y-6 mt-2">
        {/* POSICIÓN */}
        <div className="flex gap-3">
          {/* Vertical Bar */}
          <div
            className="w-1.5 rounded-full bg-noise-pattern"
            style={{
              backgroundColor: color,
            }}
          />
          <div className="flex flex-col items-start text-left">
            <Typography
              variant="p"
              font="bigShoulders"
              className="text-white text-[10px] md:text-xs font-black uppercase tracking-wider mb-0.5"
            >
              IDEOLOGÍA POLÍTICA
            </Typography>
            <Typography
              font="bigShoulders"
              className="text-white text-xl md:text-3xl font-light leading-tight"
            >
              {(() => {
                const raw = candidate.ideologiaPolitica?.posicion;
                const val = extractValue(raw);
                const src = extractSource(raw);
                const desc = extractDescription(raw);
                const content = Array.isArray(val) ? val[0] : val || "-";

                return src ? (
                  <SourceTooltip source={src} description={desc}>
                    {content}
                  </SourceTooltip>
                ) : (
                  content
                );
              })()}
            </Typography>
          </div>
        </div>

        {/* NIVEL EDUCATIVO */}
        <div className="flex flex-col items-start gap-1">
          {/* Decorative Pills (Simulated based on image) */}
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-2 rounded-full opacity-80 relative overflow-hidden"
                style={{
                  background:
                    i === 4
                      ? "#3a3a3a" // Darker/empty look for the last one if needed, or all colored
                      : `repeating-linear-gradient(45deg, ${color}, ${color} 2px, transparent 2px, transparent 4px)`,
                  backgroundColor: i === 4 ? "rgba(255,255,255,0.1)" : color,
                }}
              >
                <div className="absolute inset-0 bg-noise-pattern" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full">
            {(() => {
              const raw = candidate.perfilGeneral?.nivelEducativo;
              const val = extractValue(raw);
              const src = extractSource(raw);
              const desc = extractDescription(raw);
              const items = Array.isArray(val)
                ? val
                : [val as string].filter(Boolean);

              return items.map((item, index) => {
                let title = "Educación Superior";
                let subtitle = item;
                const lower = item ? item.toLowerCase() : "";

                if (
                  lower.includes("maestría") ||
                  lower.includes("magíster") ||
                  lower.includes("mba") ||
                  lower.includes("master")
                ) {
                  title = "Magíster";
                  subtitle = item.replace(
                    /Maestría en |Magíster en |Master in /i,
                    ""
                  );
                } else if (lower.includes("bachiller")) {
                  title = "Bachiller";
                  subtitle = item.replace(/Bachiller en /i, "");
                } else if (lower.includes("licencia")) {
                  title = "Licenciado";
                  subtitle = item.replace(/Licenciado en |Licenciada en /i, "");
                } else if (item.includes("-")) {
                  const parts = item.split("-");
                  if (parts[0].trim().length < 30) {
                    title = parts[0].trim();
                    subtitle = parts.slice(1).join("-").trim();
                  }
                }

                // Clean subtitle initial dash if present (common artifact)
                if (subtitle.trim().startsWith("-")) {
                  subtitle = subtitle.trim().substring(1).trim();
                }

                return (
                  <div
                    key={index}
                    className="flex flex-col items-start text-left w-full"
                  >
                    <Typography
                      variant="h6"
                      font="bigShoulders"
                      className="text-white text-xl md:text-2xl font-light leading-none"
                    >
                      {title}
                    </Typography>
                    <SourceTooltip source={src} description={desc}>
                      <Typography
                        font="bigShoulders"
                        className="text-white/70 text-sm md:text-base font-light leading-tight text-left mt-1"
                      >
                        {subtitle}
                      </Typography>
                    </SourceTooltip>

                    {index < items.length - 1 && (
                      <div className="w-full h-px bg-white/20 mt-3 bg-noise-pattern" />
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* INTENCIÓN DE VOTO */}
        <div className="w-full">
          {(() => {
            const intencion = candidate.percepcionPublica?.intencionVoto;
            const source = intencion?.source;
            const description = intencion?.descripcion;

            const label = (
              <Typography
                variant="small"
                font="bigShoulders"
                className="text-white text-[10px] font-black uppercase tracking-wider mb-2 text-left"
              >
                INTENCIÓN DE VOTO
              </Typography>
            );

            if (source) {
              return (
                <SourceTooltip source={source} description={description}>
                  {label}
                </SourceTooltip>
              );
            }
            return label;
          })()}

          <div
            className="relative w-full h-8 md:h-10 overflow-hidden"
            style={{
              backgroundColor:
                color === "#FF2727"
                  ? "#902424"
                  : color === "#4E58B4"
                    ? "#373C6A"
                    : "#333333",
            }}
          >
            {/* Progress Bar */}
            <div
              className="h-full relative bg-noise-pattern"
              style={{
                width: `${candidate.percepcionPublica?.intencionVoto?.max || 0}%`,
                backgroundColor: color === "#FF2727" ? "#C62928" : color,
              }}
            />
            {/* Text Overlay - Centered or on bar? Image has it centered in bar area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Typography
                variant="small"
                font="bigShoulders"
                className="text-white text-lg md:text-2xl font-normal drop-shadow-md"
              >
                {candidate.percepcionPublica?.intencionVoto?.max || 0}
                <span className="font-sans">%</span>
              </Typography>
            </div>
          </div>
        </div>

        {/* HISTORIAL DE PARTIDOS */}
        {candidate.perfilGeneral?.historialPartidos &&
          candidate.perfilGeneral.historialPartidos.length > 0 && (
            <div className="w-full mt-4">
              <Typography
                variant="small"
                font="bigShoulders"
                className="text-white text-[10px] font-black uppercase tracking-wider mb-3 text-left"
              >
                HISTORIAL DE PARTIDOS
              </Typography>
              {/* Timeline Container */}
              <div className="relative">
                {/* Vertical Line with Noise Effect */}
                <div
                  className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[3px] rounded-full bg-noise-pattern"
                  style={{ backgroundColor: color }}
                />

                {/* Timeline Items */}
                <div className="flex flex-col gap-4">
                  {candidate.perfilGeneral.historialPartidos.map(
                    (partido, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {/* Circle with Tooltip */}
                        <SourceTooltip source={partido.source}>
                          <div
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full shrink-0 bg-noise-pattern cursor-pointer mt-0.5"
                            style={{ backgroundColor: color }}
                          />
                        </SourceTooltip>

                        {/* Content */}
                        <div className="flex flex-col items-start">
                          <Typography
                            font="bigShoulders"
                            className="text-white text-[11px] md:text-xs font-bold leading-none"
                          >
                            {partido.ano}
                          </Typography>
                          <Typography
                            font="bigShoulders"
                            className="text-white/90 text-sm md:text-base font-light leading-tight"
                          >
                            {partido.partido}
                          </Typography>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
