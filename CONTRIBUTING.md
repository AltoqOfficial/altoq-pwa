# 🧭 Contributing Guidelines

¡Gracias por contribuir a este proyecto!  
Sigue estos lineamientos para mantener un flujo de trabajo ordenado, entendible y profesional.

---

## 🌱 Ramas

Usamos una convención de nombres para identificar fácilmente el propósito y relación con los issues.

**Formato:**

```
feature/{num_issue}-{short_description}
bugfix/{num_issue}
hotfix/{num_issue}
release/{version}
```

**Ejemplos:**

```
feature/36-navbar-component
bugfix/45-login-error
release/1.0.0
```

> El propósito es mantener vinculadas las ramas al *issue* correspondiente.  
> Toda rama debe crearse a partir de la rama `develop`.

---

## 💬 Issues

Todas las tareas deben ser registradas como un **issue** y seguir la plantilla obligatoria:

**Plantilla:** `Plantilla de Historia de Usuario`

**Requisitos:**

- Debe estar **vinculada a una rama**.
- Debe tener **una persona asignada**.
- Utiliza etiquetas adecuadas (`bug`, `enhancement`, `documentation`, etc.) según corresponda.

---

## ✏️ Commits (inglés obligatorio)

Usamos el estándar de **[Conventional Commits](https://github.com/pvdlg/conventional-commit-types)**.

**Formato:**

```
{type}: {verbo_infinitivo}{descripcion}{#num_issue}
```

**Ejemplos:**

```
feat: add responsive behavior #36
fix: handle null pointer exception on login #57
```

**Reglas:**

- Los mensajes deben estar **en inglés**.
- Cada commit debe representar una **unidad lógica pequeña y funcional**.
- Evita commits genéricos como `update code` o `fix bugs`.

---

## 🚀 Pull Requests (inglés obligatorio)

Toda contribución debe pasar por una **Pull Request (PR)**.

**Título:**

```
{#num_issue} {Verbo_infinito} {descripción}
```

**Ejemplo:**

```
#34 Implement user authentication service
```

**Reglas:**

- El verbo debe empezar con **mayúscula**.
- **Asignar como revisor a Tadeo.**
- **Vincular con la issue correspondiente**

- La descripción debe incluir:
  - Qué se hizo.
  - Cómo probarlo.
  - Screenshots o evidencia si aplica.

**Ejemplo de descripción:**

```
### Description
Implemented authentication service using Spring Security and JWT.
- Added `AuthController` for login and token generation.
- Configured `JwtTokenProvider` and security filters.
- Updated `application.yml` with JWT secret and expiration time.

### How to test
1. Run the backend server.
2. Send a POST request to `/api/v1/auth/login` with valid credentials.
3. Verify that a JWT token is returned in the response.
4. Use the token to access secured endpoints.

```

---

## ✅ Buenas prácticas adicionales

- Antes de hacer *push*, asegúrate de que el código **compila y pasa los tests**.
- Mantén las dependencias actualizadas.
- Usa nombres claros y descriptivos en variables, funciones y clases.
- No subas archivos innecesarios (.env, node_modules, etc.).
- Utiliza *code reviews* como oportunidad de aprendizaje y mejora.

---

**Gracias por mantener la calidad y consistencia del proyecto 💪**
