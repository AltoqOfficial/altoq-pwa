"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useUserProfile } from "@/hooks/useUserProfile";

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

  // Redirect to dashboard if authenticated, otherwise to the original path
  const getHref = (defaultHref: string) => {
    return isAuthenticated ? "/dashboard" : defaultHref;
  };

  return (
    <section className="relative flex items-center justify-center min-h-auto lg:min-h-[85vh] w-full px-4 container mx-auto mb-10 mt-24 md:mt-28 lg:mt-0">
      <div className="w-full bg-primary-50/50 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 overflow-hidden shadow-sm">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl space-y-6 md:space-y-8 z-10 text-center lg:text-left">
          <h1 className="font-bigshoulders-black text-3xl sm:text-4xl md:text-2xl lg:text-[5rem] font-bold tracking-tight text-neutral-900 leading-[1.1] lg:leading-[0.95] lg:-ml-1">
            Entérate, compara y decide mejor con{" "}
            <span className="ml-1 text-primary-600">Altoq</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
            Información clara, comparaciones imparciales y análisis con IA sobre
            candidatos y partidos políticos del Perú.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
            {isAuthenticated ? (
              <Link href="/">
                <Button className="font-flexo-bold rounded-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 md:py-4 h-auto text-base md:text-lg w-full sm:w-auto shadow-xl shadow-primary-600/20 transition-all hover:scale-105">
                  Ir al Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                className="font-flexo-bold rounded-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 md:py-4 h-auto text-base md:text-lg w-full sm:w-auto shadow-xl shadow-primary-600/20 transition-all hover:scale-105"
                onClick={() => {
                  const target = document.getElementById("como-funciona");
                  if (target) {
                    const targetPosition =
                      target.getBoundingClientRect().top + window.scrollY;
                    const startPosition = window.scrollY;
                    const distance = targetPosition - startPosition;
                    const duration = 2000; // 2.5 seconds for smooth scroll
                    let startTime: number | null = null;

                    const easeInOutCubic = (t: number) => {
                      return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    };

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
            )}

            <Link
              href={getHref("/compara")}
              className="px-6 py-4 font-bold text-neutral-900 hover:text-primary-600 transition-colors text-base md:text-lg"
            >
              Comparar candidatos
            </Link>
          </div>
        </div>

        {/* Right Content - Match Card */}
        <div className="flex-1 w-full max-w-[540px] flex flex-col items-end z-10 transition-transform hover:scale-[1.01] duration-500">
          <div className="w-full relative shadow-2xl rounded-2xl md:rounded-4xl overflow-hidden group">
            <Image
              src="/hero/mockup.webp"
              alt="Match candidate preview"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="mt-4 flex justify-center lg:justify-end w-full px-2">
            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-400 font-medium opacity-60 text-center lg:text-right">
              Sin afiliación política · Datos públicos · Transparencia total
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
