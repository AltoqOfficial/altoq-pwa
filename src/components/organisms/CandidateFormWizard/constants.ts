import { Section } from "./types";

export const FORM_SECTIONS: Section[] = [
  {
    id: 1,
    title: "Corrupción y Justicia",
    description:
      "La corrupción es el tema que más moviliza al peruano promedio",
    questions: [
      {
        id: "q1_1",
        text: "¿Qué tan importante es combatir la corrupción como prioridad número uno del próximo gobierno?",
        layout: "cards",
        options: [
          {
            value: "A",
            label: "A",
            description: "Es lo más importante de todo",
          },
          {
            value: "B",
            label: "B",
            description: "Muy importante, casi lo principal",
          },
          {
            value: "C",
            label: "C",
            description: "Importante, pero hay otros temas igual de urgentes",
          },
          {
            value: "D",
            label: "D",
            description: "Importante, pero no la prioridad máxima",
          },
          {
            value: "E",
            label: "E",
            description: "Hay temas mucho más urgentes",
          },
        ],
      },
      {
        id: "q1_2",
        text: "Sobre la minería informal e ilegal, ¿qué posición te parece mejor?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Formalizar a casi todos, es fuente de trabajo",
            description: "",
          },
          {
            value: "B",
            label: "B) Regular con incentivos y algo de control",
            description: "",
          },
          {
            value: "C",
            label: "C) Mano dura pero permitir en zonas pobres",
            description: "",
          },
          {
            value: "D",
            label: "D) Erradicar por completo, aunque afecte empleo",
            description: "",
          },
          {
            value: "E",
            label: "E) Dejar como está, el Estado no debe intervenir tanto",
            description: "",
          },
        ],
      },
      {
        id: "q2_2", // Correction: was q2_2 in image mock, using q1_3 here
        text: "¿Estás a favor de la pena de muerte para ciertos delitos graves?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Sí, para terrorismo, sicariato y violación de menores",
            description: "",
          },
          {
            value: "B",
            label: "B) Sí, pero solo para casos extremos comprobados",
            description: "",
          },
          {
            value: "C",
            label: "C) Solo para terrorismo y crímenes muy graves",
            description: "",
          },
          {
            value: "D",
            label: "D) No, pero sí cadena perpetua real",
            description: "",
          },
          {
            value: "E",
            label: "E) No, nunca, bajo ninguna circunstancia",
            description: "",
          },
        ],
      },
      {
        id: "q1_4",
        text: "¿Cómo debería reformarse el sistema judicial para reducir la impunidad?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Mayor autonomía presupuestaria total",
            description: "",
          },
          {
            value: "B",
            label: "B) Elección popular de magistrados",
            description: "",
          },
          {
            value: "C",
            label: "C) Mayor control político del Congreso",
            description: "",
          },
          {
            value: "D",
            label: "D) Digitalización y penas más severas",
            description: "",
          },
          {
            value: "E",
            label: "E) No requiere reformas urgentes",
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Economía y Trabajo",
    description: "Prioridades para el crecimiento económico y empleo digno",
    questions: [
      {
        id: "q2_1",
        text: "¿Cuál debería ser el enfoque principal para reducir la pobreza?",
        layout: "cards",
        options: [
          { value: "A", label: "A", description: "Inversión privada masiva" },
          {
            value: "B",
            label: "B",
            description: "Programas sociales directos",
          },
          { value: "C", label: "C", description: "Fortalecimiento de PYMES" },
          {
            value: "D",
            label: "D",
            description: "Control de precios estatales",
          },
          { value: "E", label: "E", description: "Industrialización nacional" },
        ],
      },
      {
        id: "q2_2_new",
        text: "¿Qué opinas sobre el régimen laboral para jóvenes?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Flexibilidad total para contratar",
            description: "",
          },
          {
            value: "B",
            label: "B) Beneficios reducidos pero seguridad social",
            description: "",
          },
          {
            value: "C",
            label: "C) Mismos derechos que un adulto",
            description: "",
          },
          {
            value: "D",
            label: "D) Subsidio estatal al primer empleo",
            description: "",
          },
          {
            value: "E",
            label: "E) No debe haber regímenes especiales",
            description: "",
          },
        ],
      },
      {
        id: "q2_3",
        text: "¿Cómo manejarías la deuda externa del país?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Pago puntual para mantener crédito",
            description: "",
          },
          {
            value: "B",
            label: "B) Renegociación agresiva de tasas",
            description: "",
          },
          {
            value: "C",
            label: "C) Moratoria temporal por emergencia",
            description: "",
          },
          {
            value: "D",
            label: "D) Austeridad extrema para pagar rápido",
            description: "",
          },
          {
            value: "E",
            label: "E) Ignorar el pago y priorizar gasto social",
            description: "",
          },
        ],
      },
      {
        id: "q2_4",
        text: "¿Nivel de intervención del Estado en sectores estratégicos?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Privatización total de empresas públicas",
            description: "",
          },
          {
            value: "B",
            label: "B) Solo regulación y libre mercado",
            description: "",
          },
          {
            value: "C",
            label: "C) Alianzas público-privadas bajo control",
            description: "",
          },
          {
            value: "D",
            label: "D) Presencia estatal en minería y energía",
            description: "",
          },
          {
            value: "E",
            label: "E) Control estatal total de la economía",
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Educación y Salud",
    description: "Servicios básicos y calidad de vida",
    questions: [
      {
        id: "q3_1",
        text: "¿Enfoque prioritario para la educación pública?",
        layout: "cards",
        options: [
          { value: "A", label: "A", description: "Infraestructura moderna" },
          { value: "B", label: "B", description: "Mejores sueldos docentes" },
          { value: "C", label: "C", description: "Contenidos tecnológicos" },
          { value: "D", label: "D", description: "Vouchers educativos" },
          { value: "E", label: "E", description: "Educación técnica rural" },
        ],
      },
      {
        id: "q3_2",
        text: "¿Cómo mejorar el sistema de salud SIS/EsSalud?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Unificación total en un solo sistema",
            description: "",
          },
          {
            value: "B",
            label: "B) Mayor participación privada en gestión",
            description: "",
          },
          {
            value: "C",
            label: "C) Descentralización a centros locales",
            description: "",
          },
          {
            value: "D",
            label: "D) Aumento masivo de presupuesto basal",
            description: "",
          },
          {
            value: "E",
            label: "E) Digitalización de citas y recetas",
            description: "",
          },
        ],
      },
      {
        id: "q3_3",
        text: "¿Qué opinas sobre el enfoque de género en el currículo escolar?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Implementación total y obligatoria",
            description: "",
          },
          {
            value: "B",
            label: "B) Enfoque solo en igualdad de derechos",
            description: "",
          },
          {
            value: "C",
            label: "C) Decisión facultativa de los padres",
            description: "",
          },
          {
            value: "D",
            label: "D) Eliminación de cualquier contenido ideológico",
            description: "",
          },
          {
            value: "E",
            label: "E) No es un tema relevante actualmente",
            description: "",
          },
        ],
      },
      {
        id: "q3_4",
        text: "¿Acceso universal a vacunas y medicamentos?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Control de precios en farmacias",
            description: "",
          },
          {
            value: "B",
            label: "B) Farmacias estatales populares",
            description: "",
          },
          {
            value: "C",
            label: "C) Compras corporativas internacionales",
            description: "",
          },
          {
            value: "D",
            label: "D) Liberalización total de importaciones",
            description: "",
          },
          {
            value: "E",
            label: "E) Subsidios directos a la demanda",
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Seguridad Ciudadana",
    description: "Lucha contra la delincuencia y orden interno",
    questions: [
      {
        id: "q4_1",
        text: "Estrategia principal contra la delincuencia urbana:",
        layout: "cards",
        options: [
          { value: "A", label: "A", description: "Militares en las calles" },
          {
            value: "B",
            label: "B",
            description: "Prevención y deporte social",
          },
          { value: "C", label: "C", description: "Cámaras con IA y drones" },
          {
            value: "D",
            label: "D",
            description: "Potenciar las juntas vecinales",
          },
          {
            value: "E",
            label: "E",
            description: "Reforma total de la policía",
          },
        ],
      },
      {
        id: "q4_2",
        text: "¿Posición frente a la inmigración irregular?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Expulsión inmediata sin excepciones",
            description: "",
          },
          {
            value: "B",
            label: "B) Regularización con contrato laboral",
            description: "",
          },
          {
            value: "C",
            label: "C) Cierre total de fronteras",
            description: "",
          },
          {
            value: "D",
            label: "D) Cuotas anuales de ingreso",
            description: "",
          },
          {
            value: "E",
            label: "E) Libre tránsito bajo registro biométrico",
            description: "",
          },
        ],
      },
      {
        id: "q4_3",
        text: "¿Uso de armas por parte de civiles para defensa?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Liberalización similar a EE.UU.",
            description: "",
          },
          {
            value: "B",
            label: "B) Permitido pero con mil requisitos",
            description: "",
          },
          {
            value: "C",
            label: "C) Solo para personal capacitado",
            description: "",
          },
          {
            value: "D",
            label: "D) Prohibición total de armas civiles",
            description: "",
          },
          {
            value: "E",
            label: "E) Amnistía para entrega voluntaria",
            description: "",
          },
        ],
      },
      {
        id: "q4_4",
        text: "¿Reforma del sistema penitenciario (cárceles)?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Privatización de la gestión",
            description: "",
          },
          {
            value: "B",
            label: "B) Trabajo obligatorio para reos",
            description: "",
          },
          {
            value: "C",
            label: "C) Mejora en rehabilitación social",
            description: "",
          },
          {
            value: "D",
            label: "D) Cárceles de máxima seguridad aisladas",
            description: "",
          },
          {
            value: "E",
            label: "E) Grilletes electrónicos masivos",
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Medio Ambiente y Recursos",
    description: "Sostenibilidad y conflictos socio-ambientales",
    questions: [
      {
        id: "q5_1",
        text: "Desarrollo de proyectos mineros en cabeceras de cuenca:",
        layout: "cards",
        options: [
          { value: "A", label: "A", description: "Prohibición absoluta" },
          {
            value: "B",
            label: "B",
            description: "Permitido con estándares suizos",
          },
          {
            value: "C",
            label: "C",
            description: "Solo con licencia social total",
          },
          {
            value: "D",
            label: "D",
            description: "Prioridad a la inversión estatal",
          },
          {
            value: "E",
            label: "E",
            description: "Relocalización de comunidades",
          },
        ],
      },
      {
        id: "q5_2",
        text: "¿Posición frente al Cambio Climático?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Transición energética rápida",
            description: "",
          },
          {
            value: "B",
            label: "B) Reforestación masiva en Amazonía",
            description: "",
          },
          {
            value: "C",
            label: "C) No es prioridad frente al hambre",
            description: "",
          },
          {
            value: "D",
            label: "D) Impuestos a empresas contaminantes",
            description: "",
          },
          {
            value: "E",
            label: "E) Liderazgo regional ambiental",
            description: "",
          },
        ],
      },
      {
        id: "q5_3",
        text: "¿Gestión del agua para agricultura vs minería?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) El agua es prioridad para el agro",
            description: "",
          },
          {
            value: "B",
            label: "B) Compartición tecnológica de recursos",
            description: "",
          },
          {
            value: "C",
            label: "C) Desalinización masiva para minería",
            description: "",
          },
          {
            value: "D",
            label: "D) Libre mercado de derechos de agua",
            description: "",
          },
          {
            value: "E",
            label: "E) Estatización de todas las fuentes",
            description: "",
          },
        ],
      },
      {
        id: "q5_4",
        text: "¿Qué hacer con la explotación de hidrocarburos?",
        layout: "buttons",
        options: [
          {
            value: "A",
            label: "A) Cierre progresivo de pozos",
            description: "",
          },
          {
            value: "B",
            label: "B) Potenciar Petroperú y exploración",
            description: "",
          },
          {
            value: "C",
            label: "C) Incentivos a inversión extranjera",
            description: "",
          },
          {
            value: "D",
            label: "D) Cambio a gas natural vehicular",
            description: "",
          },
          {
            value: "E",
            label: "E) Impulso a litio y renovables",
            description: "",
          },
        ],
      },
    ],
  },
];
