import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { candidatePositions } from "@/data/candidatePositions";
import {
  calculateScores,
  OptionKey,
  QuestionId,
  UserAnswers,
  questionOrder,
} from "@/lib/recommendation";

const VALID_OPTIONS: OptionKey[] = ["A", "B", "C", "D", "E"];

type ValidationResult =
  | { ok: true; answers: UserAnswers }
  | { ok: false; error: string };

const isValidOption = (value: unknown): value is OptionKey =>
  typeof value === "string" && VALID_OPTIONS.includes(value as OptionKey);

const validateAnswers = (answers: unknown): ValidationResult => {
  if (!answers || typeof answers !== "object") {
    return {
      ok: false,
      error: "answers debe ser un objeto con las claves Q1 a Q20.",
    };
  }

  const providedAnswers = answers as Record<string, unknown>;
  const normalized: Partial<UserAnswers> = {};

  for (const questionId of questionOrder) {
    const answer = providedAnswers[questionId];

    if (!isValidOption(answer)) {
      return {
        ok: false,
        error: `Respuesta invalida para ${questionId}. Usa opciones A-E.`,
      };
    }

    normalized[questionId as QuestionId] = answer;
  }

  return {
    ok: true,
    answers: normalized as UserAnswers,
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers } = body ?? {};

    const validation = validateAnswers(answers);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = calculateScores(validation.answers, candidatePositions);

    const { error } = await supabase.from("recommendation_results").insert([
      {
        answers: validation.answers,
        result,
        scores: result.candidates.map((candidate) => ({
          id: candidate.id,
          scoreTotal: candidate.scoreTotal,
          scoresBySection: candidate.scoresBySection,
        })),
        questionnaire_version: result.version.questionnaire,
      },
    ]);

    if (error) {
      console.error("Error al guardar recomendacion en Supabase:", error);
      return NextResponse.json(
        { error: "No se pudo guardar la recomendacion." },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error al procesar la recomendacion:", error);
    return NextResponse.json(
      { error: "Error al procesar la recomendacion." },
      { status: 500 }
    );
  }
}
