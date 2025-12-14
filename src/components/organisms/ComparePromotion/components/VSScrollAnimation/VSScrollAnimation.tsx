"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { Button, Typography } from "@/components/atoms";

// ============ TYPES ============
interface Candidate {
  src: string;
  alt: string;
  zIndex: number;
  scale: number;
  offsetX?: number;
}

interface AnimationConfig {
  initialContent: [number, number, number];
  fontSize: [number, number];
  vsColor: [number, number];
  background: [number, number];
  leftCandidates: [number, number];
  rightCandidates: [number, number];
  finalContent: [number, number];
}

// ============ CONFIGURATION ============
const BASE_SIZE = 500;
const SCROLL_HEIGHT = "500vh";

const ANIMATION_TIMING: AnimationConfig = {
  initialContent: [0, 0.15, 0.25],
  fontSize: [0.15, 0.35],
  vsColor: [0.25, 0.45],
  background: [0.35, 0.5],
  leftCandidates: [0.4, 0.7],
  rightCandidates: [0.45, 0.75],
  finalContent: [0.75, 0.9],
};

const LEFT_CANDIDATES: Candidate[] = [
  {
    src: "/promotion/left/keiko_promotion.webp",
    alt: "Keiko Fujimori",
    zIndex: 30,
    scale: 1,
  },
  {
    src: "/promotion/left/butters_promotion.webp",
    alt: "Miguel Ángel del Castillo",
    zIndex: 20,
    scale: 1.8,
  },
  {
    src: "/promotion/left/acuña_promotion.webp",
    alt: "César Acuña",
    zIndex: 10,
    scale: 1.9,
    offsetX: 80,
  },
];

const RIGHT_CANDIDATES: Candidate[] = [
  {
    src: "/promotion/right/lopez_promotion.webp",
    alt: "Rafael López Aliaga",
    zIndex: 30,
    scale: 1.3,
  },
  {
    src: "/promotion/right/barnechea_promotion.webp",
    alt: "Alfredo Barnechea",
    zIndex: 20,
    scale: 1.45,
    offsetX: -80,
  },
  {
    src: "/promotion/right/alvarez_promotion.webp",
    alt: "José Williams Zapata",
    zIndex: 10,
    scale: 1.9,
    offsetX: -80,
  },
];

// ============ HOOKS ============
function useScrollAnimations(scrollYProgress: MotionValue<number>) {
  const initialContentOpacity = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.initialContent,
    [1, 1, 0]
  );

  const vsFontSize = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.fontSize,
    [400, 270]
  );

  const vsColor = useTransform(scrollYProgress, ANIMATION_TIMING.vsColor, [
    "#DC2626",
    "#FEFEFE",
  ]);

  const bgOpacity = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.background,
    [0, 1]
  );

  const leftCandidatesX = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.leftCandidates,
    [-100, 0]
  );

  const rightCandidatesX = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.rightCandidates,
    [100, 0]
  );

  const finalContentOpacity = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.finalContent,
    [0, 1]
  );

  // Opacidades de candidatos izquierda
  const leftOpacities = [
    useTransform(scrollYProgress, [0.4, 0.5], [0, 1]),
    useTransform(scrollYProgress, [0.5, 0.6], [0, 1]),
    useTransform(scrollYProgress, [0.6, 0.7], [0, 1]),
  ];

  // Opacidades de candidatos derecha
  const rightOpacities = [
    useTransform(scrollYProgress, [0.45, 0.55], [0, 1]),
    useTransform(scrollYProgress, [0.55, 0.65], [0, 1]),
    useTransform(scrollYProgress, [0.65, 0.75], [0, 1]),
  ];

  return {
    initialContentOpacity,
    vsFontSize,
    vsColor,
    bgOpacity,
    leftCandidatesX,
    rightCandidatesX,
    finalContentOpacity,
    leftOpacities,
    rightOpacities,
  };
}

// ============ SUB-COMPONENTS ============
interface CandidateImageProps {
  candidate: Candidate;
  opacity: MotionValue<number>;
  xOffset: MotionValue<number>;
  position: "left" | "right";
  isPriority?: boolean;
}

function CandidateImage({
  candidate,
  opacity,
  xOffset,
  position,
  isPriority = false,
}: CandidateImageProps) {
  const size = useMemo(
    () => Math.round(BASE_SIZE * candidate.scale),
    [candidate.scale]
  );

  return (
    <motion.div
      className={`absolute bottom-0 ${position}-0`}
      style={{
        opacity,
        zIndex: candidate.zIndex,
        x: xOffset,
        translateX: candidate.offsetX ?? 0,
      }}
    >
      <Image
        src={candidate.src}
        alt={candidate.alt}
        width={size}
        height={size}
        priority={isPriority}
      />
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export function VSScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const {
    initialContentOpacity,
    vsFontSize,
    vsColor,
    bgOpacity,
    leftCandidatesX,
    rightCandidatesX,
    finalContentOpacity,
    leftOpacities,
    rightOpacities,
  } = useScrollAnimations(scrollYProgress);

  return (
    <section
      ref={containerRef}
      className={`relative h-[${SCROLL_HEIGHT}]`}
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fondo rojo animado */}
        <motion.div
          className="absolute inset-0 bg-[#FF2727]"
          style={{ opacity: bgOpacity }}
          aria-hidden="true"
        />

        <div className="relative h-full w-full flex items-center justify-center">
          {/* Candidatos izquierda */}
          {LEFT_CANDIDATES.map((candidate, index) => (
            <CandidateImage
              key={candidate.src}
              candidate={candidate}
              opacity={leftOpacities[index]}
              xOffset={leftCandidatesX}
              position="left"
              isPriority={index === 0}
            />
          ))}

          {/* Candidatos derecha */}
          {RIGHT_CANDIDATES.map((candidate, index) => (
            <CandidateImage
              key={candidate.src}
              candidate={candidate}
              opacity={rightOpacities[index]}
              xOffset={rightCandidatesX}
              position="right"
              isPriority={index === 0}
            />
          ))}

          {/* Contenido central */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center px-4 mt-64">
            {/* Contenido inicial */}
            <motion.div
              className="absolute flex flex-col items-center gap-10 -top-64"
              style={{ opacity: initialContentOpacity }}
            >
              <Typography
                variant="h3"
                weight="600"
                className="text-neutral-500 max-w-xl"
                align="center"
              >
                Compara candidatos a la presidencia
              </Typography>
              <Button variant="secondary" size="lg" className="w-full max-w-64">
                Prueba la demo
              </Button>
            </motion.div>

            {/* VS animado */}
            <motion.h1
              className="font-kenyan font-extrabold leading-none select-none"
              style={{ color: vsColor, fontSize: vsFontSize }}
              aria-label="Versus"
            >
              VS
            </motion.h1>

            {/* Contenido final */}
            <motion.div
              className="flex flex-col items-center gap-4 mt-2"
              style={{ opacity: finalContentOpacity }}
            >
              <div className="w-64 h-0.5 bg-white mb-2" aria-hidden="true" />
              <p className="font-semibold text-white text-xl max-w-md text-center">
                ¿No te decides por alguno? Compara y descubre las debilidades y
                fortalezas de cada candidato
              </p>
              <Button variant="secondary" className="invert mt-6">
                Prueba la demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
