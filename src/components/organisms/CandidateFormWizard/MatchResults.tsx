"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { MatchCandidate } from "@/lib/utils/political-match";
import { SourceTooltip } from "@/components/organisms/ComparisonHero/components/shared/SourceTooltip";

interface MatchResultsProps {
  results: MatchCandidate[];
  onClose: () => void;
}

const MOCK_RESULTS: MatchCandidate[] = [
  {
    id: "fp",
    name: "KEIKO FUJIMORI",
    fullName: "Keiko Sofía Fujimori Higuchi",
    score: 85,
    party: "FUERZA POPULAR",
    image: "/candidatos/keiko-fujimori.webp",
    partyLogo: "/partidos/fuerzapopular.webp",
    ideology: "Derecha Conservadora",
    reasons: [
      {
        id: 1,
        title: "SHOCK DE INVERSIÓN PUBLICA",
        match: 95,
        description:
          "Propone un agresivo plan de inversión en infraestructura para reactivar la economía a corto plazo.",
        category: "ECONOMÍA",
      },
      {
        id: 2,
        title: "MANO DURA EN SEGURIDAD",
        match: 90,
        description:
          "Coincides en la necesidad de fortalecer a la policía y aumentar las penas para delitos violentos.",
        category: "SEGURIDAD",
      },
      {
        id: 3,
        title: "APOYO AL AGRO",
        match: 85,
        description:
          "Ambos priorizan la tecnificación del agro y el apoyo directo a los pequeños productores.",
        category: "AGRICULTURA",
      },
      {
        id: 4,
        title: "PROGRAMAS SOCIALES",
        match: 89,
        description:
          "Coincidencia en fortalecimiento de programas de asistencia directa.",
        category: "SOCIAL",
      },
    ],
  },
  {
    id: "pl",
    name: "VLADIMIR CERRÓN",
    fullName: "Vladimir Roy Cerrón Rojas",
    score: 65,
    party: "PERÚ LIBRE",
    image: "/candidatos/vladimir-cerron.webp",
    partyLogo: "/partidos/perulibre.webp",
    ideology: "Izquierda Marxista",
    reasons: [],
  },
];

export function MatchResults({ results, onClose }: MatchResultsProps) {
  const displayedResults = results.length > 0 ? results : MOCK_RESULTS;
  // Default to first candidate's ID
  const [selectedId, setSelectedId] = useState<string>(
    displayedResults[0]?.id || ""
  );
  const [reasonIdx, setReasonIdx] = useState(0);
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  // Update selectedId if results change (e.g. initial load)
  useEffect(() => {
    // DEBUG LOGS
    const ids = displayedResults.map((r) => r.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      console.error(
        "DUPLICATE IDS FOUND IN MATCH RESULTS:",
        ids.filter((item, index) => ids.indexOf(item) !== index)
      );
    }
  }, [displayedResults]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAllMatches) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAllMatches]);

  // DEBUG: Check order and selection
  useEffect(() => {
    console.log(
      "MatchResults mounted/updated. Results order:",
      displayedResults.map((r) => `${r.id}:${r.name}:${r.score}`)
    );
  }, [displayedResults]);

  // Filter results based on search
  const filteredResults = displayedResults.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topMatches = displayedResults.slice(0, 4);
  const currentCandidate =
    displayedResults.find((r) => r.id === selectedId) || displayedResults[0];

  // Logic: If searching, show all matches. If not, respect "Show More" toggle
  const listToShow = searchQuery
    ? filteredResults
    : isListExpanded
      ? displayedResults
      : displayedResults.slice(0, 4);

  if (!currentCandidate) return null;

  const currentReasons = currentCandidate.reasons || [];
  const currentReason =
    currentReasons.length > 0
      ? currentReasons[reasonIdx % Math.min(3, currentReasons.length)]
      : null;

  console.log(
    "Render: SelectedId",
    selectedId,
    "ID:",
    currentCandidate?.id,
    "Name:",
    currentCandidate?.name
  );

  const currentCandidateIndex = displayedResults.findIndex(
    (c) => c.id === selectedId
  );

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#FF0000] selection:text-white pb-20">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        {/* Header */}
        <header className="mb-8 md:mb-12 border-b border-white/10 pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-[#FF0000]" />
              <h2 className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
                Resultados del Análisis
              </h2>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              HACES MATCH CON
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#FF0000] to-white italic mt-1">
                {currentCandidate.name}
              </span>
            </h1>
          </div>

          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full hover:bg-white/10 transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">
              Cerrar
            </span>
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
              className="text-white/60 group-hover:text-white"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </header>

        {/* Top Section: Main Match & Details */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mb-4">
          {/* Left Column: Candidate Card */}
          <section className="relative group perspective-1000">
            <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0 aspect-3/4 overflow-hidden bg-transparent transition-all duration-500">
              {/* Background Elements - Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF0000]/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Candidate Image */}
              <Image
                src={currentCandidate.image}
                alt={currentCandidate.name}
                fill
                className="object-cover object-top transition-all duration-700 group-hover:scale-105"
                priority
              />

              {/* Faded Gradient Mask (Vignette + Bottom Fade) */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50 opacity-50" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3 rounded shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      Match #{currentCandidateIndex + 1}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black uppercase leading-none mb-1">
                      {currentCandidate.name}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">
                      Partido
                    </p>
                    <p className="text-sm font-bold uppercase truncate">
                      {currentCandidate.party}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">
                      Ideología
                    </p>
                    <p className="text-sm font-bold uppercase line-clamp-2 leading-tight">
                      {currentCandidate.ideology}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector de Candidatos (Top 4) */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {topMatches.map((candidate) => {
                const isSelected = selectedId === candidate.id;
                return (
                  <button
                    key={candidate.id}
                    onClick={() => {
                      setSelectedId(candidate.id);
                      const len = candidate.reasons?.length || 0;
                      setReasonIdx(Math.min(reasonIdx, len > 0 ? len - 1 : 0));
                    }}
                    className={`relative aspect-square group overflow-hidden border transition-all duration-300 ${
                      isSelected
                        ? "border-[#FF0000] opacity-100"
                        : "border-white/10 opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                    <span
                      className={`absolute bottom-1 right-1 text-[10px] font-black ${
                        candidate.score >= 60
                          ? "text-emerald-500"
                          : candidate.score >= 40
                            ? "text-amber-500"
                            : "text-red-500"
                      }`}
                    >
                      {candidate.score}%
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Right Column: Reasoning & Stats */}
          <section className="flex flex-col gap-8">
            {/* AI Reasoning Module */}
            <div className="flex-1 bg-[#111111] border border-white/5 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4 relative z-10">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0000]"></span>
                  </span>
                  <h3 className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-widest">
                    Por qué la IA te recomienda
                  </h3>
                </div>

                {currentReasons.length > 0 && (
                  <div className="flex items-center gap-4">
                    <button
                      disabled={reasonIdx === 0}
                      onClick={() => setReasonIdx((p) => Math.max(0, p - 1))}
                      className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
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
                      {(reasonIdx % Math.min(3, currentReasons.length)) + 1} /{" "}
                      {Math.min(3, currentReasons.length)}
                    </span>
                    <button
                      disabled={
                        reasonIdx >= Math.min(3, currentReasons.length) - 1
                      }
                      onClick={() => setReasonIdx((p) => p + 1)}
                      className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
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
                )}
              </div>

              <div className="relative z-10 min-h-[200px]">
                {!currentReason ? (
                  <div className="text-white/50 italic">
                    No hay detalles específicos disponibles para este candidato.
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReason.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentReason.category && (
                        <span className="inline-block px-3 py-1 mb-4 rounded border border-[#FF0000]/30 text-[#FF0000] text-[10px] font-black uppercase tracking-widest bg-[#FF0000]/5">
                          {currentReason.category}
                        </span>
                      )}

                      <h4 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-6 tracking-tight">
                        {currentReason.title}
                      </h4>
                      <p className="text-white text-sm md:text-base leading-relaxed">
                        <SourceTooltip
                          description={currentReason.explanation}
                          source={currentReason.sourceUrl}
                          className="underline decoration-dashed decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
                        >
                          {currentReason.description}
                        </SourceTooltip>
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* View All Matches Button */}
                {currentReasons.length > 3 && (
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => setShowAllMatches(true)}
                      className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                    >
                      <span>Ver las {currentReasons.length} coincidencias</span>
                      <span className="p-1 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Feedback Section */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                  ¿Estás de acuerdo con este resultado?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedback("like")}
                    className={`p-2 rounded-full border transition-all ${
                      feedback === "like"
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-white/40 hover:text-white hover:border-white/40"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setFeedback("dislike")}
                    className={`p-2 rounded-full border transition-all ${
                      feedback === "dislike"
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-white/40 hover:text-white hover:border-white/40"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Party Logo & Match Score */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111111] border border-white/5 p-6 flex flex-col items-center justify-center text-center gap-4 group hover:border-[#FF0000]/30 transition-colors">
                <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center p-2">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={currentCandidate.partyLogo}
                      alt={currentCandidate.party}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  Partido Oficial
                </span>
              </div>

              <div
                className={`bg-[#111111] border p-6 flex flex-col items-center justify-center text-center text-white relative overflow-hidden group transition-colors ${
                  currentCandidate.score >= 60
                    ? "border-emerald-500/30 hover:border-emerald-500"
                    : currentCandidate.score >= 40
                      ? "border-amber-500/30 hover:border-amber-500"
                      : "border-red-500/30 hover:border-red-500"
                }`}
              >
                <div
                  className={`absolute inset-0 transition-colors ${
                    currentCandidate.score >= 60
                      ? "bg-emerald-500/5 group-hover:bg-emerald-500/10"
                      : currentCandidate.score >= 40
                        ? "bg-amber-500/5 group-hover:bg-amber-500/10"
                        : "bg-red-500/5 group-hover:bg-red-500/10"
                  }`}
                />
                <span
                  className={`text-6xl md:text-7xl font-black tracking-tighter leading-none relative z-10 ${
                    currentCandidate.score >= 60
                      ? "text-emerald-500"
                      : currentCandidate.score >= 40
                        ? "text-amber-500"
                        : "text-red-500"
                  }`}
                >
                  {currentCandidate.score}%
                </span>
                <span className="text-xs font-black uppercase tracking-widest relative z-10 mt-2 text-white/60">
                  Índice de Afinidad
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          {/* Ranking Chart */}
          <section className="bg-[#111111] rounded-none border border-white/5 p-8 relative overflow-hidden">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-10">
              Dashboard Ranking de tus Candidatos
            </h3>

            <div className="flex flex-col md:flex-row items-start gap-12">
              {/* Candidate Quick Stats Panel */}
              <div className="w-full md:w-64 shrink-0 flex flex-col gap-4 bg-white/5 rounded-xl p-4 border border-white/10 md:sticky md:top-4 self-start">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={currentCandidate.image}
                      alt={currentCandidate.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm leading-tight">
                      {currentCandidate.name}
                    </h4>
                    <p className="text-[#FF0000] text-xs font-bold uppercase tracking-wider">
                      {currentCandidate.party}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Stat 1: Ideology */}
                  <div>
                    <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">
                      Ideología
                    </p>
                    <div className="bg-black/40 rounded px-2 py-1.5 border-l-2 border-[#FF0000]">
                      <span className="text-white text-xs font-medium uppercase">
                        {currentCandidate.ideology}
                      </span>
                    </div>
                  </div>

                  {/* Stat 2: Controversies / Legal */}
                  <div>
                    <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">
                      Legal / Controversias
                    </p>
                    <div
                      className={`rounded px-2 py-1.5 border-l-2 ${
                        (currentCandidate.controversies || 0) > 0
                          ? "bg-[#FF0000]/10 border-[#FF0000]"
                          : "bg-emerald-500/10 border-emerald-500"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold uppercase ${
                          (currentCandidate.controversies || 0) > 0
                            ? "text-[#FF0000]"
                            : "text-emerald-500"
                        }`}
                      >
                        {(currentCandidate.controversies || 0) > 0
                          ? `${currentCandidate.controversies} Casos Registrados`
                          : "Sin Antecedentes"}
                      </span>
                    </div>
                  </div>

                  {/* Stat 3: Education */}
                  {currentCandidate.education && (
                    <div>
                      <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">
                        Formación
                      </p>
                      <div className="bg-white/5 rounded px-2 py-2 border-l-2 border-white/20">
                        <p className="text-white text-xs leading-snug">
                          {currentCandidate.education}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Stat 4: Experience */}
                  {currentCandidate.politicalExperience && (
                    <div>
                      <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">
                        Trayectoria
                      </p>
                      <div className="bg-white/5 rounded px-2 py-2 border-l-2 border-white/20">
                        <p className="text-white text-xs leading-snug">
                          {currentCandidate.politicalExperience ===
                            "0 Cambios de Partido" ||
                          currentCandidate.politicalExperience === "0"
                            ? "Militancia Estable"
                            : currentCandidate.politicalExperience}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Match Count Badge */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/10">
                      <span className="text-[10px] font-bold text-white/60 uppercase">
                        Coincidencias
                      </span>
                      <span className="text-lg font-black text-white">
                        {((currentCandidate.score / 100) * 20).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Candidates List */}
              <div className="w-full lg:flex-1 lg:min-w-0 min-w-0">
                {/* Search Bar */}
                <div className="mb-6 relative group pr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-white/40 group-focus-within:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="BUSCAR CANDIDATO O PARTIDO..."
                    className="w-full bg-[#111111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/50 focus:bg-white/5 transition-all uppercase tracking-wide font-bold"
                  />
                </div>

                <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-6">
                  <span className="text-xs text-white/50 uppercase tracking-widest font-bold">
                    {searchQuery
                      ? `Resultados (${filteredResults.length})`
                      : `Ranking de Coincidencias (${displayedResults.length})`}
                  </span>
                </div>

                <div
                  className={`space-y-2 pr-2 overflow-y-auto transition-all duration-500 ease-in-out ${
                    isListExpanded || searchQuery
                      ? "max-h-[600px]"
                      : "max-h-[300px]"
                  } 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-white/5
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-white/20
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:hover:bg-white/40
                    transition-colors`}
                >
                  {listToShow.map((cand) => {
                    const isActive = cand.id === currentCandidate.id;
                    // Find original index for global ranking number
                    const globalIdx = displayedResults.findIndex(
                      (r) => r.id === cand.id
                    );

                    return (
                      <div
                        key={cand.id}
                        onClick={() => setSelectedId(cand.id)}
                        className={`group flex items-center gap-4 cursor-pointer p-3 rounded-lg transition-colors border ${
                          isActive
                            ? "bg-white/5 border-white/10"
                            : "hover:bg-white/5 border-transparent border-b-white/5"
                        }`}
                      >
                        <span
                          className={`text-xl font-black w-8 tabular-nums ${
                            isActive ? "text-[#FF0000]" : "text-white/20"
                          }`}
                        >
                          {(globalIdx + 1).toString().padStart(2, "0")}
                        </span>

                        <div
                          className={`w-10 h-10 relative shrink-0 transition-all ${
                            isActive
                              ? "grayscale-0 opacity-100 scale-110"
                              : "grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={cand.image}
                            alt={cand.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5
                            className={`font-bold text-sm truncate uppercase tracking-tight transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-white/60 group-hover:text-white"
                            }`}
                          >
                            {cand.name}
                          </h5>
                          <p className="text-white/40 text-[10px] uppercase tracking-wider truncate">
                            {cand.party}
                          </p>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-lg font-black ${isActive ? "text-[#FF0000]" : "text-neutral-500"}`}
                          >
                            {cand.score}%
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {listToShow.length === 0 && (
                    <div className="text-center py-8 text-white/30 text-xs uppercase tracking-widest font-bold">
                      No se encontraron resultados
                    </div>
                  )}
                </div>

                {!searchQuery && displayedResults.length > 4 && (
                  <button
                    onClick={() => setIsListExpanded(!isListExpanded)}
                    className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-all mb-4"
                  >
                    {isListExpanded
                      ? "Mostrar menos"
                      : `Mostrar más (${displayedResults.length - 4})`}
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Realidad vs Algoritmo */}
          <section className="bg-[#111111] rounded-xl border border-white/5 p-6 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  Contexto Nacional
                </h3>
              </div>
              <h2 className="text-white text-xl font-black uppercase tracking-tight leading-none">
                Realidad vs <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF0000] to-white/60">
                  Algoritmo
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* User Score */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    Tu Afinidad
                  </span>
                  <span className="text-emerald-500 font-black text-lg">
                    {currentCandidate.score}%
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentCandidate.score}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* National Score (Real Data) */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                    Aprobación Nacional
                  </span>
                  <span className="text-white/40 font-black text-lg">
                    {currentCandidate.intencionVoto || 2}%
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${currentCandidate.intencionVoto || 2}%`,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-white/20 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs leading-relaxed">
                <strong className="text-white uppercase">Dato Curioso:</strong>{" "}
                Tu compatibilidad es un{" "}
                <span className="text-emerald-500 font-bold">
                  {currentCandidate.score -
                    (currentCandidate.intencionVoto || 2)}
                  % mayor
                </span>{" "}
                que el promedio nacional. Esto indica que tus propuestas
                preferidas coinciden con este candidato, aunque sea impopular en
                encuestas generales.
              </p>
            </div>
            {/* Disclaimer */}
            <div className="lg:col-span-3 mt-8 border-t border-white/10 pt-8 pb-4 text-center">
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-2">
                Descargo de Responsabilidad
              </p>
              <p className="text-white/40 text-xs max-w-2xl mx-auto leading-relaxed">
                Estos resultados son generados por un algoritmo experimental
                basado en el análisis semántico de los planes de gobierno
                oficiales. No representan una verdad absoluta ni una
                recomendación de voto vinculante. La política es compleja y
                personal; te invitamos a usar esta herramienta como un punto de
                partida para tu propia investigación.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* All Matches Modal */}
      <AnimatePresence>
        {showAllMatches && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setShowAllMatches(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-white/10 w-full max-w-2xl max-h-[85vh] rounded-none shadow-2xl relative flex flex-col overflow-hidden"
            >
              <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.2);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.4);
                }
              `}</style>

              {/* Header (Static) */}
              <div className="bg-[#111111] z-10 p-6 md:p-8 border-b border-white/10 flex justify-between items-center shrink-0">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider italic">
                  Todas las coincidencias{" "}
                  <span className="text-[#FF0000] not-italic">
                    ({currentReasons.length})
                  </span>
                </h3>
                <button
                  onClick={() => setShowAllMatches(false)}
                  className="text-white/50 hover:text-white transition-colors p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 space-y-10 overflow-y-auto custom-scrollbar flex-1">
                {currentReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="border-b border-white/5 last:border-0 pb-10 last:pb-0"
                  >
                    {reason.category && (
                      <span className="inline-block px-3 py-1 mb-3 rounded border border-[#FF0000]/30 text-[#FF0000] text-[10px] font-black uppercase tracking-widest bg-[#FF0000]/5">
                        {reason.category}
                      </span>
                    )}
                    <h5 className="text-xl md:text-2xl font-black text-white uppercase leading-tight mb-3">
                      {reason.title}
                    </h5>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                      <SourceTooltip
                        description={reason.explanation}
                        source={reason.sourceUrl}
                        className="underline decoration-dashed decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
                      >
                        {reason.description}
                      </SourceTooltip>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
