/**
 * FAQ Data for SEO and component usage
 * Centralized FAQ data that can be used for both the FAQ component and JSON-LD schema
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
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
      "Altoq se distingue por su enfoque en la experiencia del usuario, información verificada y herramientas interactivas como el comparador de candidatos y el test 'Mi Match Político'. Somos independientes, no partidistas, y nuestra única misión es informar.",
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
