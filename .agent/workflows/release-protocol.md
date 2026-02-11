---
description: Unified Release Protocol. Use this before deploying any feature to production. Combines Dev, QA, and Security checks.
---

# release-protocol

**Participants:** Lead Engineer, QA Lead, CISO, Head of Growth.
**Trigger:** Before `git push` to `main` or `production`.

## Steps

1. **Build Verification (Lead Engineer)**
   - Run `pnpm build`.
   - _Check:_ Must pass with ZERO Type Errors.

2. **Lint & Style (Lead Engineer)**
   - Run `pnpm lint`.
   - _Check:_ conform to `tech-architect.md` rules.

3. **Security Scan (CISO)**
   - Scan for hardcoded secrets (`grep -r "API_KEY" .`).
   - Check `package.json` for flagged dependencies.

4. **E2E Smoke Test (QA Lead)**
   - **Browser Tool**: Open `localhost:3000`.
   - **Path 1:** Go to Match -> Fill Form -> Detailed Results.
   - **Path 2:** Go to Chat -> Ask "What does candidate X propose?".
   - _Check:_ No white screens (Fatal Errors) and responsive UI.

5. **SEO Check (Head of Growth)**
   - View Page Source.
   - _Check:_ `<title>`, `<meta description>`, and open graph tags are present.

6. **Deploy**
   - Run `vercel deploy --prod` (or git push).
