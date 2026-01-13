import type { AnswerKey, CandidatePosition } from "@/lib/recommendation";

export const candidatePositions: CandidatePosition[] = [
  {
    id: "cand-ana-torres",
    name: "Ana Torres",
    party: "Alianza Ciudadana",
    ideology: "Centro reformista",
    photoUrl: "/images/candidates/ana-torres.jpg",
    answers: [
      1, 2, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 2, 2, 1,
    ] as AnswerKey[],
  },
  {
    id: "cand-luis-ramos",
    name: "Luis Ramos",
    party: "Renovacion Popular",
    ideology: "Liberal pro mercado",
    photoUrl: "/images/candidates/luis-ramos.jpg",
    answers: [
      2, 3, 2, 2, 4, 1, 2, 1, 3, 2, 2, 3, 3, 2, 3, 2, 2, 2, 2, 2,
    ] as AnswerKey[],
  },
  {
    id: "cand-mariela-quispe",
    name: "Mariela Quispe",
    party: "Movimiento Solidario",
    ideology: "Pro bienestar social",
    photoUrl: "/images/candidates/mariela-quispe.jpg",
    answers: [
      2, 2, 2, 3, 2, 2, 3, 2, 1, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
    ] as AnswerKey[],
  },
  {
    id: "cand-carlos-vega",
    name: "Carlos Vega",
    party: "Seguridad Nacional",
    ideology: "Orden y seguridad",
    photoUrl: "/images/candidates/carlos-vega.jpg",
    answers: [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1, 2, 2, 2, 2, 2,
    ] as AnswerKey[],
  },
  {
    id: "cand-sofia-paredes",
    name: "Sofia Paredes",
    party: "Verde Futuro",
    ideology: "Pro ambiente y derechos",
    photoUrl: "/images/candidates/sofia-paredes.jpg",
    answers: [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 3, 3, 4, 3,
    ] as AnswerKey[],
  },
];
