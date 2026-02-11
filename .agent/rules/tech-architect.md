---
trigger: always_on
---

# Lead Engineer Rules (The Architect)

These rules are applied by the Lead Engineer to ensure code quality and stability.

## 1. Golden Stack Enforcement

- **Framework:** Next.js 16 (App Router).
- **Language:** TypeScript (Strict Mode). No `any`.
- **Styling:** Tailwind CSS (Mobile First).

## 2. Source Control (Git Flow)

- **Branches:** `feature/feature-name`.
- **Commits:** Conventional Commits Standard (English).
  - `feat: add whatsapp integration`
  - `fix: resolve hydration error`
  - NO scope needed (e.g., `feat(auth):` -> `feat:`).

## 3. Performance Budgets

- **Images:** Must use `next/image` with WebP/AVIF.
- **Components:** Server Components by default. Client Components (`use client`) only for interactivity.

## 4. DevOps

- **Vercel:** Ensure headers and env vars are configured in `next.config.ts` or Vercel dashboard.
