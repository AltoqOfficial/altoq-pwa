import React from "react";

import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface FAQItemProps {
  /**
   * Question text
   */
  question: string;
  /**
   * Answer text
   */
  answer: string | React.ReactNode;
  /**
   * Whether the item is expanded
   */
  isOpen: boolean;
  /**
   * Callback when toggled
   */
  onToggle: () => void;
  /**
   * Custom className for the wrapper
   */
  className?: string;
  /**
   * Custom className for the question
   */
  questionClassName?: string;
  /**
   * Custom className for the answer
   */
  answerClassName?: string;
}

/**
 * FAQItem Component (Molecule)
 * Accordion-style FAQ item with expand/collapse functionality
 *
 * This molecule combines:
 * - Clickable question header
 * - Expandable answer section
 * - Animated chevron icon
 *
 * Features:
 * - Smooth expand/collapse animation
 * - Hover states
 * - Accessible with aria-expanded
 * - Customizable styling
 * - Support for text or React nodes as answer
 *
 * @example
 * ```tsx
 * <FAQItem
 *   question="¿Qué es Altoq?"
 *   answer="Altoq es una plataforma..."
 *   isOpen={isOpen}
 *   onToggle={() => setIsOpen(!isOpen)}
 * />
 *
 * <FAQItem
 *   question="¿Cómo funciona?"
 *   answer={<div>Contenido <strong>personalizado</strong></div>}
 *   isOpen={false}
 *   onToggle={handleToggle}
 * />
 * ```
 */
export function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  className,
  questionClassName,
  answerClassName,
}: FAQItemProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md",
        className
      )}
    >
      <button
        className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-neutral-50"
        onClick={onToggle}
        aria-expanded={isOpen}
        type="button"
      >
        <Typography variant="h6" className={cn("flex-1", questionClassName)}>
          {question}
        </Typography>
        <div
          className={cn(
            "shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <svg
            className="h-5 w-5 text-primary-600"
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

      {isOpen && (
        <div className="border-t border-neutral-200 px-6 pb-6 pt-4">
          {typeof answer === "string" ? (
            <Typography
              variant="p"
              className={cn("text-neutral-600", answerClassName)}
            >
              {answer}
            </Typography>
          ) : (
            <div className={answerClassName}>{answer}</div>
          )}
        </div>
      )}
    </div>
  );
}
