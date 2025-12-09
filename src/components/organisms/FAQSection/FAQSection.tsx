"use client";

import { useRef, useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué es Altoq?",
    answer:
      "Altoq es una plataforma digital diseñada para ayudar a los ciudadanos peruanos a tomar decisiones informadas en las Elecciones Generales 2026. Ofrecemos herramientas para comparar candidatos, conocer sus propuestas y encontrar el candidato que mejor se alinea con tus valores.",
  },
  {
    question: "¿Cómo obtiene Altoq la información?",
    answer:
      "Recopilamos información de fuentes oficiales como el JNE (Jurado Nacional de Elecciones), declaraciones públicas de los candidatos, planes de gobierno registrados, y medios de comunicación verificados. Toda la información es contrastada y verificada por nuestro equipo.",
  },
  {
    question: "¿A qué tipo de elección votar?",
    answer:
      "Altoq cubre las Elecciones Generales 2026 en Perú, que incluyen elecciones presidenciales y congresales. Nuestra plataforma te ayudará a conocer tanto a los candidatos presidenciales como a los candidatos al congreso.",
  },
  {
    question: "¿Por qué se creó Altoq?",
    answer:
      "Altoq nace de la necesidad de empoderar a los ciudadanos con información clara, objetiva y accesible sobre los candidatos y sus propuestas. Creemos que una democracia fuerte se construye con votantes informados.",
  },
  {
    question: "¿Qué diferencia a Altoq de otras plataformas electorales?",
    answer:
      "Altoq se distingue por su enfoque en la experiencia del usuario, información verificada y herramientas interactivas como el comparador de candidatos y el test 'Mi Candidato Ideal'. Somos independientes, no partidistas, y nuestra única misión es informar.",
  },
  {
    question: "¿La información es confiable?",
    answer:
      "Sí. Toda nuestra información proviene de fuentes oficiales y verificadas. Contamos con un equipo de investigadores que contrasta la información antes de publicarla. Además, citamos nuestras fuentes para que puedas verificar por ti mismo.",
  },
  {
    question: "¿Puedo participar o dejar mi opinión?",
    answer:
      "¡Absolutamente! Puedes unirte como voluntario, enviarnos sugerencias a través de nuestra caja de sugerencias, o contactarnos directamente. Tu participación nos ayuda a mejorar la plataforma para todos los peruanos.",
  },
];

/**
 * FAQSection Component (Organism)
 * Frequently Asked Questions section with accordion
 *
 * Features:
 * - Accordion-style FAQ items
 * - Expand/collapse functionality
 * - Two-column layout (desktop)
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 faq">
      <div className="container mx-auto px-4 md:grid md:grid-cols-2 gap-4 items-start">
        {/* Section Header */}
        <div className="mb-16 flex justify-center items-center md:items-end flex-col px-2 md:px-0 order-first md:order-last">
          <Typography variant="h3" className="mb-4" weight="600" align="right">
            Preguntas <span className="text-primary-600">Frecuentes</span>
          </Typography>
          <Typography
            variant="p"
            className="max-w-2xl text-neutral-600 md:text-right text-center"
          >
            ¿Tienes dudas? Aquí respondemos las preguntas más comunes sobre
            Altoq y cómo podemos ayudarte a votar informado.
          </Typography>
        </div>
        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl order-last md:order-first">
          <div className="grid grid-cols-1 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {faqs
                .filter((_, index) => index % 2 === 0)
                .map((faq, arrayIndex) => {
                  const actualIndex = arrayIndex * 2;
                  return (
                    <FAQItem
                      key={actualIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === actualIndex}
                      onToggle={() => toggleFAQ(actualIndex)}
                    />
                  );
                })}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {faqs
                .filter((_, index) => index % 2 !== 0)
                .map((faq, arrayIndex) => {
                  const actualIndex = arrayIndex * 2 + 1;
                  return (
                    <FAQItem
                      key={actualIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === actualIndex}
                      onToggle={() => toggleFAQ(actualIndex)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden rounded-lg transition-all duration-300">
      <button
        className="flex w-full items-start justify-between gap-4 p-6 text-left "
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Typography variant="p" weight="600" className="flex-1">
          {question}
        </Typography>
        <div
          className={cn(
            "shrink-0 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180"
          )}
        >
          <svg
            className="h-5 w-5 text-[#323232]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-b border-neutral-200 px-6 pb-6 pt-4">
            <Typography variant="p" className="text-[#868686]">
              {answer}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
