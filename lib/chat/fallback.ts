import type { RetrievedChunk } from "@/lib/rag";

const MAX_CHARS = 650;

// Keep whole lines so a bullet is never cut mid-sentence.
function truncateByLines(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const lines = text.split("\n");
  const kept: string[] = [];
  let used = 0;
  for (const line of lines) {
    if (used + line.length > limit && kept.length > 0) break;
    kept.push(line);
    used += line.length + 1;
  }
  return kept.join("\n");
}

// Used when the model is unreachable: answer from the single best-matching
// section instead of failing, so visitors still get something useful.
export function buildFallbackAnswer(chunks: readonly RetrievedChunk[]): string {
  const best = chunks[0];
  if (!best) {
    return "I could not find that on this site. Try asking about Erven's experience, projects or skills, or email ervenidjad12@gmail.com.";
  }
  const body = truncateByLines(best.content, MAX_CHARS);
  const heading = best.content.startsWith(best.title) ? "" : `**${best.title}**\n`;
  return `${heading}${body}`;
}
