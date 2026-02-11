---
description: Data Pipeline for RAG. Use this when ingesting new Government Plans (PDFs) to update the AI's knowledge base.
---

# Data Pipeline Protocol

**Participants:** AI Engineer, Chief Political Officer (CPO).
**Trigger:** New Government Plan PDF released.

## Steps

1. **Ingestion (AI Engineer)**
   - Upload PDF to `assets/documents/`.
   - Run extraction script (e.g., `npm run extract-text`).

2. **Sanitization & Audit (CIPO)**
   - Review extracted text chunks.
   - _Check:_ Are the chunks preserving context? Is the tone neutral?
   - _Action:_ Flag any "hallucination risks" (ambiguous text).

3. **Vectorization (AI Engineer)**
   - Run embedding script.
   - Upsert vectors to Database.

4. **Verification (AI Engineer)**
   - Run test query: "What does [Candidate] propose for [Topic]?"
   - _Check:_ Does the answer cite the new document correctly?
