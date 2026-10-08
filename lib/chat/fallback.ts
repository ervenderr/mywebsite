import type { RetrievedChunk } from "@/lib/rag";

// Used when the model is unreachable: answer straight from the retrieved facts
// instead of failing, so visitors still get something useful.
export function buildFallbackAnswer(chunks: readonly RetrievedChunk[]): string {
  const top = chunks.slice(0, 2);
  if (top.length === 0) {
    return "I could not find that on this site. Try asking about Erven's experience, projects or skills, or email ervenidjad12@gmail.com.";
  }
  const body = top.map((chunk) =>
      chunk.content.startsWith(chunk.title) ? chunk.content : `**${chunk.title}**\n${chunk.content}`).join("\n\n");
  return `The AI model is unavailable right now, so here is what the portfolio says:\n\n${body}`;
}
