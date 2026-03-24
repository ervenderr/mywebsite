/**
 * Build script to chunk portfolio context and generate embeddings.
 * Run: npx tsx scripts/build-embeddings.ts
 *
 * Note: @xenova/transformers is only used here (build time), NOT at runtime,
 * to avoid sharp native module issues in Next.js dev server on WSL2.
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { pipeline } from "@xenova/transformers";
import { portfolioContext } from "../lib/portfolio-context";
import type { ChunkData, EmbeddingsData } from "../lib/rag";

interface RawChunk {
  id: string;
  category: ChunkData["category"];
  title: string;
  content: string;
}

async function embedText(text: string): Promise<number[]> {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

function extractChunks(): RawChunk[] {
  // Strip the system prompt instructions (everything before "PERSONAL INFORMATION:")
  const contextBody = portfolioContext.substring(
    portfolioContext.indexOf("PERSONAL INFORMATION:")
  );

  const chunks: RawChunk[] = [];

  // Split by major sections
  const sections = contextBody.split(/\n(?=[A-Z][A-Z &/]+:\n)/);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    const headerMatch = trimmed.match(/^([A-Z][A-Z &/]+):\n/);
    if (!headerMatch) continue;

    const header = headerMatch[1];
    const body = trimmed.substring(headerMatch[0].length).trim();

    switch (header) {
      case "PERSONAL INFORMATION":
        chunks.push({
          id: "personal-info",
          category: "personal",
          title: "Personal Information",
          content: body,
        });
        break;

      case "EDUCATION":
        chunks.push({
          id: "education",
          category: "education",
          title: "Education",
          content: body,
        });
        break;

      case "PROFESSIONAL EXPERIENCE":
        parseExperiences(body, chunks);
        break;

      case "SKILLS & TECHNOLOGIES":
        chunks.push({
          id: "skills",
          category: "skills",
          title: "Skills & Technologies",
          content: body,
        });
        break;

      case "FEATURED PROJECTS":
        parseProjects(body, chunks);
        break;

      case "AREAS OF EXPERTISE":
        chunks.push({
          id: "expertise",
          category: "expertise",
          title: "Areas of Expertise",
          content: body,
        });
        break;

      case "STATISTICS":
        chunks.push({
          id: "statistics",
          category: "personal",
          title: "Statistics & Achievements",
          content: body,
        });
        break;

      case "SPECIALIZATIONS":
        chunks.push({
          id: "specializations",
          category: "expertise",
          title: "Specializations",
          content: body,
        });
        break;

      default:
        chunks.push({
          id: header.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: "personal",
          title: header,
          content: body,
        });
    }
  }

  return chunks;
}

function parseExperiences(body: string, chunks: RawChunk[]): void {
  const experienceBlocks = body.split(/\n(?=\d+\.\s)/);

  for (const block of experienceBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const titleMatch = trimmed.match(/^\d+\.\s+(.+?)(?:\n|$)/);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const id = `exp-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

    chunks.push({
      id,
      category: "experience",
      title: `Experience: ${title}`,
      content: trimmed,
    });
  }
}

function parseProjects(body: string, chunks: RawChunk[]): void {
  const projectBlocks = body.split(/\n(?=\d+\.\s)/);

  for (const block of projectBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const titleMatch = trimmed.match(/^\d+\.\s+(.+?)(?:\n|$)/);
    if (!titleMatch) continue;

    const projectName = titleMatch[1].split(" - ")[0].trim();
    const id = `project-${projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

    chunks.push({
      id,
      category: "project",
      title: `Project: ${projectName}`,
      content: trimmed,
    });
  }
}

async function main() {
  console.log("Extracting chunks from portfolio context...");
  const rawChunks = extractChunks();
  console.log(`Found ${rawChunks.length} chunks`);

  for (const chunk of rawChunks) {
    console.log(`  - [${chunk.category}] ${chunk.title}`);
  }

  console.log("\nGenerating embeddings with Xenova/all-MiniLM-L6-v2...");
  console.log("(First run will download the model ~22MB)\n");

  const chunks: ChunkData[] = [];

  for (let i = 0; i < rawChunks.length; i++) {
    const raw = rawChunks[i];
    process.stdout.write(
      `  Embedding ${i + 1}/${rawChunks.length}: ${raw.title}...`
    );

    const embedding = await embedText(raw.content);
    chunks.push({ ...raw, embedding });

    console.log(` done (${embedding.length} dims)`);
  }

  const output: EmbeddingsData = { chunks };
  const outputPath = join(process.cwd(), "public", "embeddings.json");

  writeFileSync(outputPath, JSON.stringify(output));

  const fileSizeKB = Math.round(
    Buffer.byteLength(JSON.stringify(output)) / 1024
  );
  console.log(`\nWrote ${outputPath} (${fileSizeKB} KB)`);
  console.log(`Total chunks: ${chunks.length}`);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
