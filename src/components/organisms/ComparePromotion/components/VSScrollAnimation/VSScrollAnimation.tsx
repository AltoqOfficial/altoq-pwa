"use client";

import { useRef, useMemo, useSyncExternalStore, useId, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Typography } from "@/components/atoms";
import { useUserProfile } from "@/hooks/useUserProfile";

// ============ PERFORMANCE UTILITIES ============
// Debounce utility para optimizar el resize listener
function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

// ============ NOISE BACKGROUND COMPONENT ============
interface NoiseBackgroundProps {
  opacity: MotionValue<number>;
  isMobile: boolean;
}

// Memoized NoiseBackground para evitar re-renders innecesarios
// En mobile, deshabilitamos el SVG noise filter completamente para máximo rendimiento
const NoiseBackground = memo(function NoiseBackground({
  opacity,
  isMobile,
}: NoiseBackgroundProps) {
  const uniqueId = useId();
  const filterId = `vsNoiseFilter${uniqueId}`;

  // En mobile, solo mostrar color sólido (sin SVG filter costoso)
  if (isMobile) {
    return (
      <motion.div
        className="absolute inset-0 bg-[#FF2727]"
        style={{
          opacity,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
      aria-hidden="true"
    >
      {/* Fondo rojo sólido */}
      <div className="absolute inset-0 bg-[#FF2727]" />

      {/* SVG con noise overlay - solo en desktop */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ isolation: "isolate" }}
      >
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.25 1.25"
              numOctaves={3}
              result="noise"
              seed={4254}
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="alphaNoise"
            />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA
                type="discrete"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
              />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in2="shape"
              in="coloredNoise1"
              result="noise1Clipped"
            />
            <feFlood
              floodColor="rgba(255, 255, 255, 0.15)"
              result="color1Flood"
            />
            <feComposite
              operator="in"
              in2="noise1Clipped"
              in="color1Flood"
              result="color1"
            />
            <feMerge result="effect1_noise">
              <feMergeNode in="shape" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
        </defs>

        {/* Rectángulo que cubre todo con el filtro de noise */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#FF2727"
          filter={`url(#${filterId})`}
        />
      </svg>
    </motion.div>
  );
});

// ============ TYPES ============
interface Candidate {
  src: string;
  alt: string;
  zIndex: number;
  /**
   * Escala por breakpoint. Si es un número, se usa para todos. Si es un objeto, se usa por breakpoint.
   * Ejemplo: { default: 1, md: 1.2, xl: 1.5 }
   */
  scale:
    | number
    | {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        ["2xl"]?: number;
      };
  /**
   * Offset X por breakpoint. Si es un número, se usa para todos. Si es un objeto, se usa por breakpoint.
   * Ejemplo: { default: 0, md: 20, xl: 80 }
   */
  offsetX?:
    | number
    | {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        ["2xl"]?: number;
      };
  /**
   * Offset Y por breakpoint. Si es un número, se usa para todos. Si es un objeto, se usa por breakpoint.
   * Ejemplo: { default: 0, md: -20, xl: -40 }
   */
  offsetY?:
    | number
    | {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        ["2xl"]?: number;
      };
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
const SCROLL_HEIGHT = "250dvh"; // Más corto

// Configuración para mobile
const MOBILE_CONFIG = {
  vsYOffset: -250, // Posición Y hacia arriba para el VS (más negativo = más arriba)
  contentYOffset: -250, // Posición Y hacia arriba para el contenido final
  textSize: "text-md", // Tamaño del texto de la pregunta
  buttonSize: "lg" as const, // Tamaño del botón
};

// Configuración de tamaño del VS por breakpoint
// [inicial, final] - valores en px
const VS_FONT_SIZE_CONFIG = {
  mobile: [250, 250], // < 768px (md)
  tablet: [200, 200], // >= 768px y < 1024px (md a lg)
  desktop: [200, 200], // >= 1024px (lg+)
};

const ANIMATION_TIMING: AnimationConfig = {
  initialContent: [0, 0.08, 0.13],
  fontSize: [0.08, 0.18],
  vsColor: [0.13, 0.23],
  background: [0.18, 0.25],
  leftCandidates: [0.2, 0.35],
  rightCandidates: [0.23, 0.38],
  finalContent: [0.38, 0.48],
};

const LEFT_CANDIDATES: Candidate[] = [
  {
    src: "/promotion/left/keiko_promotion.webp",
    alt: "Keiko Fujimori",
    zIndex: 30,
    scale: { default: 0.45, sm: 0.7, md: 0.6, lg: 0.55, xl: 0.6, ["2xl"]: 0.8 },
  },
  {
    src: "/promotion/left/cerron_promotion.webp",
    alt: "Vladimir Cerrón",
    zIndex: 20,
    scale: {
      default: 1.1,
      sm: 1.25,
      md: 1.1,
      lg: 0.95,
      xl: 1.05,
      ["2xl"]: 1.5,
    },
    offsetX: {
      default: 0,
      sm: 60,
      md: 40,
      lg: 0,
      xl: 0,
      ["2xl"]: 0,
    },
  },
  {
    src: "/promotion/left/acuña_promotion.webp",
    alt: "César Acuña",
    zIndex: 10,
    scale: {
      default: 1.2,
      sm: 1.25,
      md: 1.3,
      lg: 1.05,
      xl: 1.15,
      ["2xl"]: 1.6,
    },
    offsetX: {
      default: -70,
      sm: -60,
      md: -80,
      lg: 0,
      xl: 60,
      ["2xl"]: 80,
    },
    offsetY: {
      default: -270,
      sm: -320,
      md: -240,
      lg: 0,
      xl: 0,
      ["2xl"]: 0,
    },
  },
];

const RIGHT_CANDIDATES: Candidate[] = [
  {
    src: "/promotion/right/lopez_promotion.webp",
    alt: "Rafael López Aliaga",
    zIndex: 30,
    scale: {
      default: 0.55,
      sm: 0.9,
      md: 0.8,
      lg: 0.6,
      xl: 0.7,
      ["2xl"]: 1.05,
    },
  },
  {
    src: "/promotion/right/barnechea_promotion.webp",
    alt: "Alfredo Barnechea",
    zIndex: 20,
    scale: {
      default: 0.85,
      sm: 1.05,
      md: 0.95,
      lg: 0.75,
      xl: 0.85,
      ["2xl"]: 1.25,
    },
    offsetX: {
      default: 0,
      sm: 20,
      md: -60,
      lg: 0,
      xl: 0,
      ["2xl"]: 0,
    },
  },
  {
    src: "/promotion/right/alvarez_promotion.webp",
    alt: "José Williams Zapata",
    zIndex: 10,
    scale: { default: 1.3, sm: 1.4, md: 1.4, lg: 0.95, xl: 1.1, ["2xl"]: 1.6 },
    offsetX: {
      default: 80,
      sm: 100,
      md: 100,
      lg: 0,
      xl: 0,
      ["2xl"]: 0,
    },
    offsetY: {
      default: -210,
      sm: -230,
      md: -160,
      lg: 0,
      xl: 0,
      ["2xl"]: 0,
    },
  },
];

// ============ HOOKS ============
// Optimizado: en mobile, simplificamos las animaciones para mejor rendimiento
// IMPORTANTE: Siempre llamamos los mismos hooks en el mismo orden (Reglas de Hooks)
function useScrollAnimations(
  scrollYProgress: MotionValue<number>,
  isMobile: boolean
) {
  const initialContentOpacity = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.initialContent,
    [1, 1, 0]
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

  // En mobile: sin animación X (más performante)
  // En desktop: animación normal de entrada horizontal
  const leftCandidatesX = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.leftCandidates,
    isMobile ? [0, 0] : [-100, 0]
  );

  const rightCandidatesX = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.rightCandidates,
    isMobile ? [0, 0] : [100, 0]
  );

  const finalContentOpacity = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.finalContent,
    [0, 1]
  );

  // Animación de posición hacia arriba para mobile - VS
  const mobileVSY = useTransform(
    scrollYProgress,
    [ANIMATION_TIMING.vsColor[0], 1],
    [0, MOBILE_CONFIG.vsYOffset]
  );

  // Animación de posición hacia arriba para mobile - Contenido final
  const mobileContentY = useTransform(
    scrollYProgress,
    [ANIMATION_TIMING.finalContent[0], 1],
    [0, MOBILE_CONFIG.contentYOffset]
  );

  // Opacidad unificada para mobile (todos aparecen juntos)
  const allCandidatesOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3],
    [0, 1]
  );

  // SIEMPRE llamamos todos los hooks para mantener el orden estable
  // Opacidades escalonadas para desktop
  const leftOpacity0 = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);
  const leftOpacity1 = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);
  const leftOpacity2 = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);

  const rightOpacity0 = useTransform(scrollYProgress, [0.23, 0.28], [0, 1]);
  const rightOpacity1 = useTransform(scrollYProgress, [0.28, 0.33], [0, 1]);
  const rightOpacity2 = useTransform(scrollYProgress, [0.33, 0.38], [0, 1]);

  // Seleccionar qué opacidades usar basado en isMobile
  // En mobile: usamos la misma opacidad para todos (menos cálculos)
  // En desktop: usamos las opacidades escalonadas
  const leftOpacities = isMobile
    ? [allCandidatesOpacity, allCandidatesOpacity, allCandidatesOpacity]
    : [leftOpacity0, leftOpacity1, leftOpacity2];

  const rightOpacities = isMobile
    ? [allCandidatesOpacity, allCandidatesOpacity, allCandidatesOpacity]
    : [rightOpacity0, rightOpacity1, rightOpacity2];

  return {
    initialContentOpacity,
    vsColor,
    bgOpacity,
    leftCandidatesX,
    rightCandidatesX,
    finalContentOpacity,
    mobileVSY,
    mobileContentY,
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

type ResponsiveValue =
  | number
  | {
      default?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      ["2xl"]?: number;
    };

function getResponsiveValue(
  value: ResponsiveValue | undefined,
  windowWidth: number | null,
  defaultValue: number = 0
): number {
  if (value === undefined) return defaultValue;
  if (typeof value === "number") return value;
  // Si no tenemos el ancho de la ventana (SSR o antes de la hidratación), usar default
  if (windowWidth === null) return value.default ?? defaultValue;
  // Tailwind breakpoints (default, sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536)
  if (windowWidth >= 1536 && value["2xl"] !== undefined) return value["2xl"];
  if (windowWidth >= 1280 && value.xl !== undefined) return value.xl;
  if (windowWidth >= 1024 && value.lg !== undefined) return value.lg;
  if (windowWidth >= 768 && value.md !== undefined) return value.md;
  if (windowWidth >= 640 && value.sm !== undefined) return value.sm;
  return value.default ?? defaultValue;
}

function getResponsiveScale(
  scale: Candidate["scale"],
  windowWidth: number | null
): number {
  return getResponsiveValue(scale, windowWidth, 1);
}

// Hook para obtener el ancho de la ventana de forma segura para SSR
// Optimizado con debounce para evitar re-renders excesivos en resize
const windowWidthSubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  // Debounce de 100ms para evitar que el resize cause demasiados re-renders
  const debouncedCallback = debounce(callback, 100);
  window.addEventListener("resize", debouncedCallback);
  return () => window.removeEventListener("resize", debouncedCallback);
};

const windowWidthGetSnapshot = (): number | null => {
  if (typeof window === "undefined") return null;
  return window.innerWidth;
};

const windowWidthGetServerSnapshot = (): number | null => null;

function useWindowWidth(): number | null {
  return useSyncExternalStore(
    windowWidthSubscribe,
    windowWidthGetSnapshot,
    windowWidthGetServerSnapshot
  );
}

// Memoized CandidateImage para evitar re-renders innecesarios
const CandidateImage = memo(function CandidateImage({
  candidate,
  opacity,
  xOffset,
  position,
  isPriority = false,
  windowWidth,
}: CandidateImageProps & { windowWidth: number | null }) {
  // Calcular valores responsivos una sola vez
  const { size, offsetX, offsetY } = useMemo(() => {
    const scale = getResponsiveScale(candidate.scale, windowWidth);
    return {
      size: Math.round(BASE_SIZE * scale),
      offsetX: getResponsiveValue(candidate.offsetX, windowWidth, 0),
      offsetY: getResponsiveValue(candidate.offsetY, windowWidth, 0),
    };
  }, [candidate.scale, candidate.offsetX, candidate.offsetY, windowWidth]);

  return (
    <motion.div
      className={`absolute bottom-0 ${position}-0`}
      style={{
        opacity,
        zIndex: candidate.zIndex,
        x: xOffset,
        translateX: offsetX,
        translateY: offsetY,
        willChange: "transform, opacity",
        transform: "translateZ(0)", // Force GPU layer
      }}
    >
      <Image
        src={candidate.src}
        alt={candidate.alt}
        width={size}
        height={size}
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
      />
    </motion.div>
  );
});

// ============ MAIN COMPONENT ============
export function VSScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth !== null && windowWidth < 768; // Tailwind md breakpoint
  const router = useRouter();
  const { user } = useUserProfile();
  const isAuthenticated = !!user;

  // Get the appropriate href based on authentication status
  const getDemoHref = () => (isAuthenticated ? "/dashboard" : "/compara");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const {
    initialContentOpacity,
    vsColor,
    bgOpacity,
    leftCandidatesX,
    rightCandidatesX,
    finalContentOpacity,
    mobileVSY,
    mobileContentY,
    leftOpacities,
    rightOpacities,
  } = useScrollAnimations(scrollYProgress, isMobile);

  // Determinar qué tamaño de VS usar según el breakpoint
  const vsFontSizeConfig = useMemo(() => {
    if (windowWidth === null) return VS_FONT_SIZE_CONFIG.desktop; // SSR default
    if (windowWidth < 768) return VS_FONT_SIZE_CONFIG.mobile; // Mobile
    if (windowWidth < 1024) return VS_FONT_SIZE_CONFIG.tablet; // Tablet
    return VS_FONT_SIZE_CONFIG.desktop; // Desktop
  }, [windowWidth]);

  // Tamaño del VS según el breakpoint
  const vsFontSizeResponsive = useTransform(
    scrollYProgress,
    ANIMATION_TIMING.fontSize,
    [vsFontSizeConfig[0], vsFontSizeConfig[1]]
  );

  return (
    <section
      ref={containerRef}
      className={`relative h-[${SCROLL_HEIGHT}]`}
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fondo rojo animado con noise texture */}
        <NoiseBackground opacity={bgOpacity} isMobile={isMobile} />

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
              windowWidth={windowWidth}
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
              windowWidth={windowWidth}
            />
          ))}

          {/* Contenido central */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center px-4 mt-64">
            {/* Fondo oscuro para mejorar legibilidad en tablet/mobile */}
            <motion.div
              className="absolute -inset-x-8 -inset-y-4 -z-10 bg-black/30 rounded-3xl blur-xl lg:hidden"
              style={{
                opacity: bgOpacity,
                willChange: "opacity",
                transform: "translateZ(0)",
              }}
              aria-hidden="true"
            />

            {/* Contenido inicial */}
            <motion.div
              className="absolute flex flex-col items-center gap-10 -top-64 z-10 mx-4 md:mx-0"
              style={{
                opacity: initialContentOpacity,
                willChange: "opacity",
                transform: "translateZ(0)",
              }}
            >
              <Typography
                variant="h3"
                weight="600"
                className="text-neutral-500 max-w-xl"
                align="center"
              >
                Compara candidatos a la presidencia
              </Typography>
              <Button
                variant="secondary"
                size="lg"
                className="w-full max-w-64 cursor-pointer"
                onClick={() => router.push(getDemoHref())}
              >
                {isAuthenticated ? "Ir al Dashboard" : "¡Prueba ahora!"}
              </Button>
            </motion.div>

            {/* VS animado */}
            <motion.h1
              key={`vs-${vsFontSizeConfig[0]}-${vsFontSizeConfig[1]}`} // fuerza recreación al cambiar breakpoint
              className="font-kenyan font-extrabold leading-none select-none z-10"
              style={{
                color: vsColor,
                fontSize: vsFontSizeResponsive,
                y: isMobile ? mobileVSY : 0,
                willChange: "transform, color, font-size",
                transform: "translateZ(0)",
              }}
              aria-label="VS"
            >
              VS
            </motion.h1>

            {/* Contenido final */}
            <motion.div
              className="flex flex-col items-center gap-4 mt-2 z-10"
              style={{
                opacity: finalContentOpacity,
                y: isMobile ? mobileContentY : 0,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <div className="w-64 h-0.5 bg-white mb-2" aria-hidden="true" />
              <p
                className={`font-semibold text-white ${
                  isMobile ? MOBILE_CONFIG.textSize : "text-xl"
                } max-w-md text-center`}
              >
                ¿No te decides por alguno? Compara y descubre las debilidades y
                fortalezas de cada candidato
              </p>
              <Button
                variant="secondary"
                className="invert mt-6 cursor-pointer"
                size={isMobile ? MOBILE_CONFIG.buttonSize : undefined}
                onClick={() => router.push(getDemoHref())}
              >
                {isAuthenticated ? "Ir al Dashboard" : "¡Prueba ahora!"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
