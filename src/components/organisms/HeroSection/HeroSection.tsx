"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { motion } from "framer-motion";
import { VelocityBackground } from "./components/VelocityBackground";

/**
 * HeroSection Component (Organism)
 * Main hero section with updated design matching the visual requirements.
 *
 * Features:
 * - Large rounded card container with light pink background
 * - Two-column layout
 * - Left: Hero text and CTAs
 * - Right: "Match" result card with candidate placeholder and obfuscated identity
 */
export function HeroSection() {
  const { user } = useUserProfile();
  const isAuthenticated = !!user;

  // Redirect to home (/) if authenticated (dashboard is shown there), otherwise to the original path
  const getHref = (defaultHref: string) => {
    return isAuthenticated ? "/" : defaultHref;
  };

  return (
    <section className="relative flex flex-col items-center justify-start pt-28 md:pt-40 lg:pt-48 pb-20 w-full px-4 min-h-[85vh] overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.03) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <VelocityBackground />
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wide text-neutral-600 uppercase">
            Elecciones 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-bigshoulders-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight text-neutral-900 leading-tight"
        >
          Infórmate, compara <br className="hidden md:block" /> y{" "}
          <span className="text-primary-600">decide Altoq</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-neutral-500 max-w-2xl font-medium leading-relaxed mx-auto"
        >
          Información clara, comparaciones imparciales y análisis con IA sobre
          candidatos y partidos políticos del Perú.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {isAuthenticated ? (
            <>
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  shape="pill"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-6 text-lg h-auto shadow-xl shadow-primary-600/10 hover:shadow-primary-600/20"
                >
                  Ir al Dashboard
                </Button>
              </Link>
              <Link href={getHref("/compara")} className="w-full sm:w-auto">
                <Button
                  shape="pill"
                  variant="white"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-6 text-lg h-auto border border-neutral-200 shadow-sm hover:border-neutral-300 hover:bg-neutral-50"
                >
                  Comparar candidatos
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={getHref("/compara")} className="w-full sm:w-auto">
                <Button
                  shape="pill"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-6 text-lg h-auto shadow-xl shadow-primary-600/10 hover:shadow-primary-600/20"
                >
                  Comparar candidatos
                </Button>
              </Link>

              <Button
                shape="pill"
                variant="white"
                size="lg"
                className="w-full sm:w-auto px-10 py-6 text-lg h-auto border border-neutral-200 shadow-sm hover:border-neutral-300 hover:bg-neutral-50"
                onClick={() => {
                  const target = document.getElementById("como-funciona");
                  if (target) {
                    const targetPosition =
                      target.getBoundingClientRect().top + window.scrollY;
                    const startPosition = window.scrollY;
                    const distance = targetPosition - startPosition;
                    const duration = 2000;
                    let startTime: number | null = null;
                    const easeInOutCubic = (t: number) =>
                      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    const animation = (currentTime: number) => {
                      if (startTime === null) startTime = currentTime;
                      const timeElapsed = currentTime - startTime;
                      const progress = Math.min(timeElapsed / duration, 1);
                      const easeProgress = easeInOutCubic(progress);
                      window.scrollTo(
                        0,
                        startPosition + distance * easeProgress
                      );
                      if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                      }
                    };
                    requestAnimationFrame(animation);
                  }
                }}
              >
                ¿Cómo funciona?
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {/* Visual Anchor (Mockup & Floating Elements) */}
      <div className="relative mt-16 w-full max-w-6xl flex justify-center z-10 perspectives-1000">
        <div className="relative w-full max-w-[800px] flex justify-center items-center">
          {/* Central Phone Mockup */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 w-[280px] md:w-[320px] lg:w-[360px]"
          >
            {/* Main Phone Image */}
            <Image
              src="/hero/mockup.webp"
              alt="Altoq App Interface"
              width={360}
              height={720}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Floating Element 1: Candidate Card (Left) */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-4 md:left-0 lg:-left-12 z-30 hidden sm:block"
          >
            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 w-48 -rotate-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <div className="h-2 w-20 bg-neutral-200 rounded-full mb-1"></div>
                  <div className="h-2 w-12 bg-neutral-100 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-neutral-100 rounded-full"></div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full"></div>
                <div className="h-1.5 w-3/4 bg-neutral-100 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2: Match Stats (Right) */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 -right-4 md:right-10 lg:right-0 z-10 hidden sm:block"
          >
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-neutral-100 w-40 rotate-6">
              <div className="text-center">
                <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
                  Coincidencia
                </div>
                <div className="text-4xl font-black text-primary-600">85%</div>
                <div className="mt-2 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 3: Checkmark/Badge (Bottom Left) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 left-10 md:left-20 z-30 hidden md:block"
          >
            <div className="bg-white p-3 rounded-full shadow-lg border border-neutral-50 flex items-center gap-2 pr-5">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-bold text-neutral-800 text-sm">
                Verificado
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
