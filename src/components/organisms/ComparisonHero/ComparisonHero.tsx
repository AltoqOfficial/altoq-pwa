"use client";

import { PageHero } from "@/components/molecules/PageHero";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import { useState } from "react";

interface Candidate {
  id: string;
  src: string;
  alt: string;
}

const candidates: Candidate[] = [
  { id: "acuna", src: "/compara/acuña.webp", alt: "Acuña" },
  { id: "nose", src: "/compara/nose.webp", alt: "Nose" },
  { id: "alvarez", src: "/compara/alvarez.webp", alt: "Alvarez" },
  { id: "philip", src: "/compara/philip.webp", alt: "Philip" },
  { id: "keiko", src: "/compara/keiko.webp", alt: "Keiko" },
  { id: "asd", src: "/compara/asd.webp", alt: "Asd" },
  { id: "labubu", src: "/compara/labubu.webp", alt: "Labubu" },
  { id: "xdxdxdxd", src: "/compara/xdxdxdxd.webp", alt: "Xdxdxdxd" },
  { id: "lopez", src: "/compara/lopez.webp", alt: "Lopez" },
];

/**
 * ComparisonHero Component (Organism)
 * Hero section for the Compare Candidates page
 *
 * Uses PageHero molecule for consistent hero section pattern
 * Allows selecting two candidates to compare:
 * - First selection: Red background (#FF2727)
 * - Second selection: Blue background (#3E4692)
 */
export function ComparisonHero() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidates((prev) => {
      // Si ya está seleccionado, lo deseleccionamos
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      }
      // Si ya hay 2 seleccionados, reemplazamos el segundo
      if (prev.length >= 2) {
        return [prev[0], candidateId];
      }
      // Agregamos el nuevo candidato
      return [...prev, candidateId];
    });
  };

  const getSelectionStyle = (candidateId: string) => {
    const index = selectedCandidates.indexOf(candidateId);
    if (index === 0) return "bg-[#FF2727]";
    if (index === 1) return "bg-[#3E4692]";
    return "";
  };

  const getImageStyle = (candidateId: string) => {
    const isSelected = selectedCandidates.includes(candidateId);
    if (isSelected) return "grayscale-0 opacity-100";
    return "grayscale opacity-40";
  };

  return (
    <div className="bg-neutral-500 flex justify-center flex-col items-center">
      <div className="justify-center grid grid-cols-3 p-12">
        <div className="relative">
          <div className="absolute inset-0 bg-[linear-gradient(1deg,rgba(32,32,32,0)_36.95%,var(--PrimaryColor,#FF2727)_62.99%)] opacity-40"></div>
          <Image
            src="/candidatos/keikoFujimori.webp"
            alt="Rafael López"
            width={578}
            height={80}
            className="relative"
          />
        </div>
        <div className="flex justify-center flex-col items-center gap-12">
          <PageHero
            title="A COMPARAR!"
            description="Una comparación política basada en datos reales. Explora quién propone más, quién tiene resultados y quién aún no lo demuestra."
            className="bg-neutral-500 max-w-[33rem]"
          />
          <div className="grid grid-cols-[200px_200px] gap-3">
            {candidates.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => handleCandidateClick(candidate.id)}
                className={`relative cursor-pointer transition-all duration-300 overflow-hidden ${getSelectionStyle(candidate.id)}`}
              >
                <Image
                  src={candidate.src}
                  alt={candidate.alt}
                  width={200}
                  height={200}
                  className={`relative z-10 transition-all duration-300 ${getImageStyle(candidate.id)}`}
                />
              </button>
            ))}
            <button className="w-[200px] h-[92px] border border-[#CECECE66] bg-neutral-400 flex items-center justify-center cursor-pointer hover:bg-neutral-300 transition-all duration-300 gap-2">
              <Typography
                variant="h4"
                className="text-white font-bold text-lg opacity-70"
                font="kenyan"
              >
                SIGUIENTE
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="8"
                viewBox="0 0 21 8"
                fill="none"
              >
                <g opacity=".7" filter="url(#a)">
                  <path
                    d="M14.61 7.92q.3-.78.66-1.44.36-.69.81-1.29H0V2.73h16.08q-.42-.6-.78-1.26-.36-.69-.66-1.47h2.28Q18.78 2.19 21 3.33v1.29q-2.22 1.08-4.08 3.3z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <filter
                    id="a"
                    x="0"
                    y="0"
                    width="21"
                    height="7.92"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.90909087657928467 0.90909087657928467"
                      stitchTiles="stitch"
                      numOctaves="3"
                      result="noise"
                      seed="8991"
                    />
                    <feComponentTransfer in="noise" result="coloredNoise1">
                      <feFuncR type="linear" slope="2" intercept="-.5" />
                      <feFuncG type="linear" slope="2" intercept="-.5" />
                      <feFuncB type="linear" slope="2" intercept="-.5" />
                      <feFuncA
                        type="discrete"
                        tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
                      />
                    </feComponentTransfer>
                    <feComposite
                      operator="in"
                      in2="shape"
                      in="coloredNoise1"
                      result="noise1Clipped"
                    />
                    <feComponentTransfer in="noise1Clipped" result="color1">
                      <feFuncA type="table" tableValues="0 0.37" />
                    </feComponentTransfer>
                    <feMerge result="effect1_noise_1981_576">
                      <feMergeNode in="shape" />
                      <feMergeNode in="color1" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[linear-gradient(1deg,rgba(32,32,32,0)_36.95%,var(--Secondary-100A,#3E4692)_62.99%)] opacity-40"></div>
          <Image
            src="/candidatos/rafaelLopez.webp"
            alt="Rafael López"
            width={2000}
            height={100}
            className="relative"
          />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="17"
        viewBox="0 0 45 17"
        fill="none"
      >
        <path
          d="M43 0L22.6852 13L2.5 0L0 2.02381L22.6852 17L45 2.02381L43 0Z"
          fill="#FEFEFE"
        />
      </svg>
      <div className="grid grid-cols-3">
        <div className="flex items-center max-w-md gap-12">
          <Image
            src="/candidatos/keikoFujimori.webp"
            alt="Rafael López"
            width={140}
            height={80}
          />
          <Typography
            font="kenyan"
            className="text-white font-bold"
            variant="h1"
          >
            Keiko Fujimori
          </Typography>
        </div>
        <div></div>
        <div className="flex items-center max-w-lg gap-12">
          <Typography
            font="kenyan"
            className="text-white font-bold"
            variant="h1"
            align="right"
          >
            Rafael López-Aliaga
          </Typography>
          <Image
            src="/candidatos/rafaelLopez.webp"
            alt="Rafael López"
            width={140}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}
