export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nueva funcionalidad
        "fix", // Corrección de bugs
        "docs", // Documentación
        "style", // Cambios de estilo (formato, no CSS)
        "refactor", // Refactorización de código
        "perf", // Mejoras de rendimiento
        "test", // Agregar tests
        "build", // Cambios en build system
        "ci", // Cambios en CI/CD
        "chore", // Tareas de mantenimiento
        "revert", // Revertir commits
      ],
    ],
    "subject-case": [2, "never", ["upper-case", "pascal-case"]],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
  },
};
