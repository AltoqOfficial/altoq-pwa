"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CandidateFormWizard } from "@/components/organisms/CandidateFormWizard";
import { AnswerValue } from "@/components/organisms/CandidateFormWizard/types";
import { Suspense } from "react";

function QuestionnaireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questionId = searchParams.get("q");
  const value = searchParams.get("v");

  const initialAnswer =
    questionId && value ? { questionId, value: value as AnswerValue } : null;

  return (
    <CandidateFormWizard
      isOpen={true}
      onClose={() => router.push("/formulario-candidato")}
      initialAnswer={initialAnswer}
    />
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-900" />}>
      <QuestionnaireContent />
    </Suspense>
  );
}
