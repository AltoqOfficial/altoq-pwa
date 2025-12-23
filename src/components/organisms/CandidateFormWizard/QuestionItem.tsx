import React from "react";
import { Question, AnswerValue } from "./types";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  index: number;
  question: Question;
  selectedAnswer: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  index,
  question,
  selectedAnswer,
  onChange,
}) => {
  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-white text-lg md:text-xl font-bold mb-8 flex gap-3">
        <span className="text-neutral-500">{index}.</span>
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
                "flex flex-col items-center p-3 md:p-4 rounded-xl border-2 transition-all duration-300 group min-h-[160px] md:min-h-[200px]",
                selectedAnswer === opt.value
                  ? "bg-white border-white text-neutral-900 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  : "bg-neutral-800/40 border-neutral-700/50 text-neutral-400 hover:border-neutral-500"
              )}
            >
              <div
                className={cn(
                  "w-full aspect-square rounded-lg mb-4 transition-colors relative overflow-hidden",
                  selectedAnswer === opt.value
                    ? "bg-neutral-900"
                    : "bg-neutral-800 group-hover:bg-neutral-700"
                )}
              >
                <span className="absolute inset-0 flex items-center justify-center text-3xl opacity-10">
                  {opt.value}
                </span>
              </div>
              <p className="text-[10px] md:text-sm font-bold leading-tight uppercase tracking-tight text-center">
                {opt.value}) {opt.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium border-2 transition-all duration-300",
                selectedAnswer === opt.value
                  ? "bg-white border-white text-neutral-900"
                  : "bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:bg-neutral-800"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
