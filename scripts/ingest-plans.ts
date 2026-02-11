import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse-fork");

dotenv.config({ path: ".env.local" });

const PLANS_DIR = path.join(process.cwd(), "src/data/planes_gobierno");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/rag_embeddings.json");

async function ingestPlans() {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error(
      "❌ Error: GOOGLE_GENERATIVE_AI_API_KEY is missing in .env.local"
    );
    process.exit(1);
  }

  if (!fs.existsSync(PLANS_DIR)) {
    console.error(`❌ Directory not found: ${PLANS_DIR}`);
    return;
  }

  const files = fs
    .readdirSync(PLANS_DIR)
    .filter((file) => file.endsWith(".pdf"));
  console.log(`🚀 Found ${files.length} PDF plans.`);

  // Clear or create output file
  fs.writeFileSync(OUTPUT_FILE, ""); // Clear file at start

  let totalChunks = 0;

  for (const file of files) {
    console.log(`Processing: ${file}...`);
    const filePath = path.join(PLANS_DIR, file);

    try {
      const dataBuffer = fs.readFileSync(filePath);

      // Suppress annoying PDF.js warnings
      const originalWarn = console.warn;
      console.warn = (...args) => {
        if (
          args[0] &&
          typeof args[0] === "string" &&
          args[0].includes("TT: undefined function")
        )
          return;
        originalWarn(...args);
      };

      const data = await pdf(dataBuffer);

      // Restore console.warn
      console.warn = originalWarn;

      // Clean text
      const text = data.text.replace(/\s+/g, " ").trim();

      // Chunking strategy: 1000 chars, 200 overlap
      const chunks = chunkText(text, 1000, 200);
      console.log(`   📝 Split into ${chunks.length} chunks.`);

      // Gemini Pay-as-you-go limit is 1500 RPM.
      // Batch size 50 is safer to avoid the 3K RPM limit if many small requests are counted.
      const BATCH_SIZE = 50;

      for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE);

        console.log(
          `   ⏳ Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`
        );

        let retries = 0;
        const MAX_RETRIES = 5;
        let success = false;

        while (!success && retries < MAX_RETRIES) {
          try {
            // Add a small delay between requests to be nice to the API
            await new Promise((resolve) =>
              setTimeout(resolve, 500 * (retries + 1))
            );

            const { embeddings: batchVectors } = await embedMany({
              model: google.embedding("gemini-embedding-001"),
              values: batch,
            });

            const batchWithMetadata = batchVectors.map((embedding, idx) => ({
              party: file.replace(" - Plan de Gobierno.pdf", ""),
              chunkIndex: i + idx,
              content: batch[idx],
              source: file,
              embedding: embedding,
            }));

            // Append to JSONL file line by line
            const jsonlData =
              batchWithMetadata.map((item) => JSON.stringify(item)).join("\n") +
              "\n";
            fs.appendFileSync(OUTPUT_FILE, jsonlData);
            totalChunks += batch.length;
            success = true;
          } catch (err: any) {
            retries++;
            console.error(
              `   ⚠️ Error in batch ${Math.floor(i / BATCH_SIZE) + 1} (Attempt ${retries}/${MAX_RETRIES}):`,
              err.message || err
            );

            if (err?.statusCode === 429) {
              const waitTime = 5000 * Math.pow(2, retries); // Exponential backoff: 10s, 20s, 40s...
              console.log(
                `   🛑 Rate limit hit. Waiting ${waitTime / 1000}s before retry...`
              );
              await new Promise((resolve) => setTimeout(resolve, waitTime));
            } else {
              // For non-rate limit errors (500s, etc), wait a bit and retry too
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }

        if (!success) {
          console.error(
            `❌ CRITICAL FAILURE: Could not process batch after ${MAX_RETRIES} attempts. Data loss for this batch.`
          );
          // In a strict environment, we might want to exit process here
          // process.exit(1);
        }
      }
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err);
    }
  }

  console.log(
    `✅ Saved ${totalChunks} total vectors incrementally to ${OUTPUT_FILE}`
  );
}

function chunkText(text: string, chunkSize: number, overlap: number): string[] {
  const chunks = [];
  let index = 0;

  while (index < text.length) {
    chunks.push(text.slice(index, index + chunkSize));
    index += chunkSize - overlap;
  }
  return chunks;
}

ingestPlans();
