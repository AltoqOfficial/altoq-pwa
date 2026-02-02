"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

interface MatchCandidate {
  id: string;
  name: string;
  fullName: string;
  image: string;
  score: number;
  party: string;
  partyLogo: string;
  ideology: string;
  reasons: RecommendationReason[];
}

interface RecommendationReason {
  id: number;
  title: string;
  match: number;
  description: string;
}

const MOCK_MATCHES: MatchCandidate[] = [
  {
    id: "acuna",
    name: "César Acuña Peralta",
    fullName: "César Acuña Peralta",
    image: "/candidatos/4.webp",
    score: 45.05,
    party: "Alianza para el Progreso",
    partyLogo: "/partidos/app.png",
    ideology: "Centro-derecha pragmática",
    reasons: [
      {
        id: 1,
        title: "Corrupción y Justicia (70% match)",
        match: 70,
        description:
          'Elegiste opciones como "Muy importante combatir corrupción" y "Mano dura en minería ilegal". Acuña ha impulsado leyes contra impunidad, pero su partido apoya formalización de minería informal con incentivos (no erradicación total, para no afectar empleo).',
      },
      {
        id: 2,
        title: "Economía y Trabajo (65% match)",
        match: 65,
        description:
          "Tu perfil empresarial se alinea con las propuestas de fomento a PYMES de Acuña. Coinciden en la necesidad de reducir la carga impositiva para nuevos emprendimientos.",
      },
    ],
  },
  {
    id: "keiko",
    name: "Keiko Fujimori Higuchi",
    fullName: "Keiko Fujimori Higuchi",
    image: "/candidatos/5.webp",
    score: 25.0,
    party: "Fuerza Popular",
    partyLogo: "/partidos/fp.png",
    ideology: "Derecha conservadora",
    reasons: [
      {
        id: 1,
        title: "Seguridad Ciudadana (85% match)",
        match: 85,
        description:
          "Tu preferencia por el fortalecimiento de las fuerzas del orden coincide con su plan de rescate de espacios públicos y mayor patrullaje integrado.",
      },
      {
        id: 2,
        title: "Institucionalidad (40% match)",
        match: 40,
        description:
          "Aunque buscas renovación total, su propuesta se basa en reformas dentro de la constitución actual, lo que genera una brecha en tu visión de cambio radical.",
      },
    ],
  },
  {
    id: "alvarez",
    name: "Carlos Álvarez",
    fullName: "Carlos Álvarez",
    image: "/candidatos/10.webp",
    score: 15.0,
    party: "País Para Todos",
    partyLogo: "/partidos/ppt.png",
    ideology: "Populismo de centro",
    reasons: [
      {
        id: 1,
        title: "Reforma del Estado (75% match)",
        match: 75,
        description:
          "Coincides en la reducción drástica de ministerios y burocracia. Propone una mano firme contra los gestores ineficientes.",
      },
    ],
  },
  {
    id: "lopez",
    name: "Rafael López-Aliaga",
    fullName: "Rafael López-Aliaga",
    image: "/candidatos/8.webp",
    score: 15.0,
    party: "Renovación Popular",
    partyLogo: "/partidos/rp.png",
    ideology: "Derecha religiosa",
    reasons: [
      {
        id: 1,
        title: "Valores y Familia (90% match)",
        match: 90,
        description:
          "Tu enfoque en la preservación de valores tradicionales se alinea perfectamente con su discurso pro-vida y pro-familia.",
      },
    ],
  },
];

export const MatchResults: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [reasonIdx, setReasonIdx] = useState(0);
  const [prevSelectedIdx, setPrevSelectedIdx] = useState(0);
  const currentCandidate = MOCK_MATCHES[selectedIdx];

  // Reset reasonIdx when candidate changes using the render-sync pattern
  if (selectedIdx !== prevSelectedIdx) {
    setPrevSelectedIdx(selectedIdx);
    setReasonIdx(0);
  }

  const currentReason =
    currentCandidate.reasons[reasonIdx] || currentCandidate.reasons[0];

  return (
    <div className="fixed inset-0 z-[90] bg-[#202020] text-white selection:bg-primary-600/30 overflow-y-auto no-scrollbar">
      {/* Top Header - Replaces global header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-800/50 bg-[#202020]/90 backdrop-blur-xl sticky top-0 z-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2.5 text-neutral-200 hover:text-white transition-all group active:scale-95"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            Atrás
          </span>
        </button>

        <Logo variant="red" size="sm" className="h-7 sm:h-8 scale-110" />

        <button className="p-2.5 bg-[#FF0000] rounded-none hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </header>

      <main className="max-w-[95%] mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center bg-[#111111] rounded-none border border-white/5 p-6 md:p-10 lg:p-12 overflow-visible mt-12 min-h-[600px]">
          {/* Noise/Texture background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <svg width="80%" height="80%">
              <filter id="noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>

          {/* Left Content */}
          <div className="relative z-30 flex flex-col justify-center col-span-1 lg:col-span-4 w-full pointer-events-none">
            <div className="pointer-events-auto">
              <div className="mb-6">
                <p className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">
                  {selectedIdx === 0
                    ? "1ER"
                    : selectedIdx === 1
                      ? "2DO"
                      : selectedIdx === 2
                        ? "3ER"
                        : "4TO"}{" "}
                  PUESTO
                </p>
                <p className="text-white text-xs font-bold uppercase tracking-wider mt-2">
                  Tu Match Político es :
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-sohne-breit leading-[0.85] text-[#FF0000] uppercase mb-6">
                {currentCandidate.name.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>

              <div className="mt-6">
                <p className="text-white text-sm font-bold tracking-tight">
                  Compatibilidad -{" "}
                  <span className="text-white">
                    {currentCandidate.score.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================================
            CORRECCIÓN IMAGEN CANDIDATO (Middle Section)
            ====================================================================
          */}
          <div className="relative col-span-1 lg:col-span-4 h-[400px] md:h-[500px] lg:h-full z-20 pointer-events-none flex items-end justify-center lg:-mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCandidate.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                /* FIX APLICADO:
                   1. height: lg:h-[130%] -> Aumentado para que sobresalga mucho más.
                   2. width: lg:w-auto -> Deja que el ancho se adapte.
                   3. max-w-none (en la imagen abajo) -> Clave para que no se encoja.
                */
                className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-auto h-full lg:h-[130%] flex items-end justify-center"
              >
                <Image
                  src={currentCandidate.image}
                  alt={currentCandidate.name}
                  width={1200}
                  height={1400}
                  /* FIX APLICADO:
                    'max-w-none' permite que la imagen sea más ancha que su columna (col-span-4),
                    evitando que se vea pequeña y aplastada.
                  */
                  className="w-auto h-full object-contain object-bottom drop-shadow-2xl max-w-none"
                  priority
                />
                {/* Neutral Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40 blur-[50px] -z-10 rounded-full scale-x-150" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Content - Top 4 List */}
          <div className="relative z-30 flex flex-col justify-center gap-6 col-span-1 lg:col-span-4 w-full">
            <div className="text-right">
              <p className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">
                TOP 4
              </p>
              <p className="text-white text-xs font-bold uppercase tracking-wider">
                Tu tops de candidatos ideales
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {MOCK_MATCHES.map((candidate, idx) => (
                <button
                  key={candidate.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all duration-300 group text-left",
                    selectedIdx === idx
                      ? "bg-neutral-200 text-neutral-950 border-white scale-102 shadow-lg"
                      : "bg-neutral-800/50 text-white border-white/10 hover:border-white/30"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-current/20 shrink-0">
                      <Image
                        src={candidate.image}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-[11px] xl:text-xs tracking-tight truncate max-w-[100px] xl:max-w-[140px] text-white">
                      {candidate.name}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] xl:text-xs font-black tabular-nums",
                      selectedIdx === idx ? "text-neutral-950" : "text-white"
                    )}
                  >
                    {candidate.score.toFixed(2)} %
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Candidate Profile Info */}
          <section className="bg-[#111111] rounded-none border border-white/5 p-8">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-10">
              Información del candidato
            </h3>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-neutral-950 border-4 border-[#FF0000] rounded-full flex items-center justify-center p-4 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Dynamic Logo Letter */}
                    <span className="text-[#FF0000] text-5xl font-black mt-[-4px]">
                      {currentCandidate.party.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">
                    PARTIDO POLÍTICO
                  </p>
                  <p className="text-white text-xs">{currentCandidate.party}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-transparent flex items-center justify-center">
                  <div className="transform transition-transform group-hover:scale-110">
                    <svg
                      className="w-16 h-16 text-[#FF0000] drop-shadow-[0_4px_10px_rgba(255,0,0,0.3)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">
                    IDEOLOGÍA
                  </p>
                  <p className="text-white text-xs">
                    {currentCandidate.ideology}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* AI Recommendations */}
          <section className="bg-[#111111] rounded-none border border-white/5 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                Por Qué la IA te Recomienda Este Candidato
              </h3>
              <div className="flex items-center gap-4">
                <button
                  disabled={reasonIdx === 0}
                  onClick={() => setReasonIdx((p) => p - 1)}
                  className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-sm font-bold font-mono">
                  {reasonIdx + 1}
                </span>
                <button
                  disabled={reasonIdx === currentCandidate.reasons.length - 1}
                  onClick={() => setReasonIdx((p) => p + 1)}
                  className="p-2 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReason.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-3xl md:text-4xl font-black text-[#FF0000] uppercase leading-none mb-6">
                    {currentReason.title}
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    {currentReason.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Ranking Chart */}
          <section className="bg-[#111111] rounded-none border border-white/5 p-8 relative overflow-hidden">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-10">
              Dashboard Ranking de tus Candidatos
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Visual Donut Wrap */}
              <div className="relative w-64 h-64 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#171717"
                    strokeWidth="12"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="14"
                    strokeDasharray="125 251"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FF0000"
                    strokeWidth="14"
                    strokeDasharray="70 251"
                    strokeDashoffset="-125"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#990000"
                    strokeWidth="14"
                    strokeDasharray="40 251"
                    strokeDashoffset="-195"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-neutral-900 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-inner">
                    <Image
                      src={currentCandidate.image}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full mb-1 grayscale border border-white/10"
                    />
                    <p className="text-[10px] font-bold uppercase text-white leading-none">
                      {currentCandidate.name.split(" ").pop()}
                    </p>
                    <p className="text-[#FF0000] font-black text-xs tabular-nums">
                      {currentCandidate.score}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Legend Table */}
              <div className="flex-1 w-full overflow-x-auto">
                <table className="w-full text-left text-[10px] md:text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-white font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 pr-2">CANDIDATO</th>
                      <th className="pb-3 px-2 text-center">COMPATIBILIDAD%</th>
                      <th className="pb-3 pl-2 text-right">PARTIDO POLÍTICO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_MATCHES.map((cand) => (
                      <tr
                        key={cand.id}
                        className="group hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 pr-2">
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-none bg-[#FF0000] mt-1 shrink-0" />
                            <span className="font-bold uppercase text-[10px] leading-tight block w-20 transition-colors text-white">
                              {cand.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2 font-mono text-white text-center align-top pt-4">
                          {cand.score}%
                        </td>
                        <td className="py-4 pl-2 text-white uppercase font-black tracking-tighter text-right align-top pt-4">
                          {cand.party
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </td>
                      </tr>
                    ))}
                    {/* Static User 'SiCreo' Row */}
                    <tr className="group hover:bg-white/5 transition-colors text-white font-bold border-t border-white/5">
                      <td className="py-3 pr-2 pl-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-none bg-white shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase leading-none">
                              CARLOS
                            </span>
                            <span className="text-[10px] uppercase leading-none">
                              ESPÁ
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono text-[10px] text-center">
                        7%
                      </td>
                      <td className="py-3 pl-2 uppercase text-[10px] tracking-tighter text-right">
                        SICREO
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Convince vs Peru */}
          <section className="bg-[#111111] rounded-none border border-white/5 p-8 flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-10">
              ¿Cuánto te Convence vs el Perú?
            </h3>

            <div className="relative w-full max-w-[240px] aspect-[4/5] mb-8 group">
              <Image
                src={currentCandidate.image}
                alt={currentCandidate.name}
                fill
                className="object-contain object-bottom rounded-none transition-all duration-500 scale-110"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white/50 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white/50 hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full">
              <p className="text-white font-black text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                1. {currentCandidate.name}
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  TU MATCH
                </span>
                <span className="text-[10px] font-black text-white">
                  {currentCandidate.score.toFixed(2)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentCandidate.score}%` }}
                  className="h-full bg-[#FF0000]"
                />
              </div>

              {/* Added Stats */}
              <div className="w-full mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest pt-1">
                    INTENCIÓN DE VOTO NACIONAL
                  </span>
                  <span className="text-[10px] font-black text-white">
                    2.00%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF0000]"
                    style={{ width: "2%" }}
                  />
                </div>
              </div>

              <div className="w-full mt-5">
                <div className="flex items-end justify-between mb-2 gap-4">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest text-left leading-tight">
                    RECHAZO/DESCONFIANZA GENERAL EN CANDIDATOS:
                  </span>
                  <span className="text-[10px] font-black text-white shrink-0">
                    84.00%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF0000]"
                    style={{ width: "84%" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 py-12 border-t border-white/5 flex flex-col items-center gap-4 opacity-50">
        <Logo variant="white" size="sm" />
        <p className="text-[10px] font-bold text-neutral-500 tracking-[0.3em] uppercase">
          Altoq Intelligence Matching System
        </p>
      </footer>
    </div>
  );
};
