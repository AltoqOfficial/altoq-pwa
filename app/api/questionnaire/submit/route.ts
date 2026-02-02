import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import {
  QuestionnaireMapping,
  QuestionnaireSubmitRequest,
  QuestionnaireSubmitResponse,
  PlanResult,
} from "@/types/questionnaire";

export async function POST(request: Request) {
  try {
    const body: QuestionnaireSubmitRequest = await request.json();
    const { answers } = body;

    // Validación básica
    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: "No se enviaron respuestas" },
        { status: 400 }
      );
    }

    const mappingFilePath = path.join(
      process.cwd(),
      "src/data/questionnaire/mapping.json"
    );

    try {
      await fs.access(mappingFilePath);
    } catch {
      console.error(
        `Error crítico: Archivo mapping.json no encontrado en ${mappingFilePath}`
      );
      return NextResponse.json(
        { error: "Error de configuración en el servidor" },
        { status: 500 }
      );
    }

    // Cargar y parsear la "Base de Datos" JSON
    const fileContents = await fs.readFile(mappingFilePath, "utf8");
    const mappingData: QuestionnaireMapping = JSON.parse(fileContents);

    // Inicializar mapa de resultados para todos los planes
    const planResultsMap = new Map<number, PlanResult>();

    // 1. Preparar estructura base para todos los planes con puntaje 0
    mappingData.plans.forEach((plan) => {
      planResultsMap.set(plan.plan_id, {
        ...plan,
        match_score: 0,
        match_percentage: 0,
        matching_evidences: [],
      });
    });

    // 2. Algoritmo de Coincidencia (Matching)
    // Recorremos cada respuesta del usuario
    Object.entries(answers).forEach(([questionIdStr, selectedOptionKey]) => {
      const questionId = parseInt(questionIdStr, 10);

      // Buscar si existe mapeo para esta pregunta
      const questionMapping = mappingData.question_option_mappings.find(
        (q) => q.question_id === questionId
      );

      if (!questionMapping) return;

      // Buscar la opción específica que marcó el usuario (Ej: "C")
      const optionMapping = questionMapping.option_mappings.find(
        (o) => o.option_key === selectedOptionKey
      );

      if (!optionMapping) return;

      // Si hay coincidencias, sumamos puntos
      console.log(
        `\n--- Procesando Pregunta ${questionId} (Opción: ${selectedOptionKey}) ---`
      );

      const matchedPlansForQuestion: string[] = [];

      optionMapping.evidences.forEach((evidence) => {
        const planResult = planResultsMap.get(evidence.plan_id);

        if (planResult) {
          // Lógica de Puntuación: Sumamos 1 punto por cada evidencia.
          planResult.match_score += 1;

          // Guardamos la evidencia para explicarle al usuario "Por qué" hizo match
          planResult.matching_evidences.push({
            question_id: questionId,
            evidence: evidence,
          });

          // Log del puntaje acumulado para este plan
          console.log(
            `Plan [${planResult.party}] +1 pto. Total Acumulado: ${planResult.match_score}`
          );
          matchedPlansForQuestion.push(
            `${planResult.party} (${planResult.match_score})`
          );
        }
      });

      if (matchedPlansForQuestion.length === 0) {
        console.log("Ningún plan de gobierno hizo match con esta opción.");
      }
    });

    // 3. Cálculo final y ordenamiento
    const totalQuestions = Object.keys(answers).length;

    const results = Array.from(planResultsMap.values()).map((result) => {
      // Calcular porcentaje de afinidad
      // Nota: Si una sola pregunta pudiera dar múltiples puntos al mismo partido,
      // la lógica de porcentaje podría necesitar ajuste. Aquí asumimos max 1 punto por pregunta.
      const percentage =
        totalQuestions > 0
          ? Math.min(
              Math.round((result.match_score / totalQuestions) * 100),
              100
            )
          : 0;

      return {
        ...result,
        match_percentage: percentage,
      };
    });

    // Ordenar: Mayor puntaje primero
    results.sort((a, b) => b.match_score - a.match_score);

    // Responder solo con los resultados procesados
    const response: QuestionnaireSubmitResponse = {
      results,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error procesando cuestionario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
