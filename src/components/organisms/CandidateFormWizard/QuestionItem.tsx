import React from "react";
import Image from "next/image";
import { Question, AnswerValue } from "./types";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  index: number;
  question: Question;
  selectedAnswer: AnswerValue;
  onChange: (value: AnswerValue) => void;
  isDark?: boolean;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  index,
  question,
  selectedAnswer,
  onChange,
  isDark = true,
}) => {
  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3
        className={cn(
          "text-lg md:text-xl font-bold mb-8 flex gap-2",
          isDark ? "text-white" : "text-neutral-900"
        )}
      >
        <span>{index}.</span>
        {question.text}
      </h3>

      {question.layout === "cards" ? (
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex flex-col items-center p-3 md:p-4 rounded-xl transition-all duration-300 group min-h-[160px] md:min-h-[200px] border-2 relative",
                selectedAnswer === opt.value
                  ? isDark
                    ? "bg-[#E0E0E0] border-[#E0E0E0] text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.02]"
                    : "bg-primary-100 border-primary-500 text-neutral-900 shadow-lg scale-[1.02]"
                  : isDark
                    ? "bg-[#2C2C2C] border-transparent text-white hover:border-neutral-500 hover:bg-[#353535]"
                    : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-primary-300 hover:bg-neutral-100"
              )}
            >
              <div
                className={cn(
                  "w-full aspect-square rounded-lg mb-4 transition-colors relative overflow-hidden flex items-center justify-center p-2",
                  selectedAnswer === opt.value
                    ? isDark
                      ? "bg-[#111111]"
                      : "bg-white"
                    : isDark
                      ? "bg-[#202020] group-hover:bg-[#252525]"
                      : "bg-white group-hover:bg-neutral-50"
                )}
              >
                {opt.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={opt.image}
                      alt={opt.description}
                      fill
                      className="object-contain transition-all duration-300"
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                  </div>
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-3xl opacity-10">
                    {opt.value}
                  </span>
                )}
              </div>
              <div className="text-center w-full">
                <p
                  className={cn(
                    "text-xs md:text-sm font-medium leading-tight text-left",
                    selectedAnswer === opt.value
                      ? isDark
                        ? "text-black font-bold"
                        : "text-neutral-900 font-bold"
                      : isDark
                        ? "text-white/80"
                        : "text-neutral-700"
                  )}
                >
                  {opt.value}) {opt.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "w-full px-6 py-5 rounded-xl text-sm font-normal border-2 transition-all duration-300 text-left relative",
                selectedAnswer === opt.value
                  ? isDark
                    ? "bg-[#E0E0E0] border-[#E0E0E0] text-black shadow-lg scale-[1.01]"
                    : "bg-primary-100 border-primary-500 text-neutral-900 shadow-lg scale-[1.01]"
                  : isDark
                    ? "bg-[#2C2C2C] border-transparent text-white hover:border-neutral-500 hover:bg-[#353535]"
                    : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-primary-300 hover:bg-neutral-100"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "font-bold text-base shrink-0",
                    selectedAnswer === opt.value
                      ? isDark
                        ? "text-black"
                        : "text-neutral-900"
                      : isDark
                        ? "text-white"
                        : "text-neutral-900"
                  )}
                >
                  {opt.value})
                </span>
                <span className="leading-relaxed">{opt.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
