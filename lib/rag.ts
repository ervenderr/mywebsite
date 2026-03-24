// Types
export interface ChunkData {
  id: string;
  category: "personal" | "education" | "experience" | "skills" | "project" | "expertise";
  title: string;
  content: string;
  embedding: number[];
}

export interface RetrievedChunk extends ChunkData {
  score: number;
}

export interface EmbeddingsData {
  chunks: ChunkData[];
}

// --- Stopwords to ignore during matching ---
const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "both",
  "each", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "just",
  "don", "now", "and", "but", "or", "if", "while", "that", "this",
  "what", "which", "who", "whom", "these", "those", "am", "it", "its",
  "he", "she", "his", "her", "they", "them", "their", "we", "us", "our",
  "you", "your", "me", "my", "i", "about", "tell", "know", "like",
  "get", "got", "make", "made", "also", "well", "much", "many",
]);

/**
 * Tokenize text into meaningful terms
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#+.]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/**
 * Compute BM25-inspired relevance score between a query and chunk
 */
function scoreChunk(queryTokens: string[], chunk: ChunkData): number {
  const chunkText = `${chunk.title} ${chunk.content}`.toLowerCase();
  const chunkTokens = tokenize(chunkText);
  const chunkTokenSet = new Set(chunkTokens);

  // Term frequency map for the chunk
  const tf = new Map<string, number>();
  for (const token of chunkTokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }

  let score = 0;
  const uniqueQueryTokens = [...new Set(queryTokens)];

  for (const qToken of uniqueQueryTokens) {
    // Exact token match
    if (chunkTokenSet.has(qToken)) {
      const freq = tf.get(qToken) || 0;
      // BM25-style saturation: diminishing returns for repeated terms
      const k1 = 1.5;
      const termScore = (freq * (k1 + 1)) / (freq + k1);
      score += termScore;
    }

    // Partial/substring match (e.g., "react" matches "reactjs", "react.js")
    for (const cToken of chunkTokenSet) {
      if (cToken !== qToken && (cToken.includes(qToken) || qToken.includes(cToken))) {
        score += 0.3;
        break; // only count partial match once per query token
      }
    }

    // Title match bonus — title matches are strong signals
    if (chunk.title.toLowerCase().includes(qToken)) {
      score += 1.5;
    }
  }

  // Normalize by query length to keep scores between 0 and ~1
  const maxPossibleScore = uniqueQueryTokens.length * 3.5; // max per token ~3.5
  return Math.min(score / maxPossibleScore, 1);
}

/**
 * Retrieve the most relevant chunks for a query using keyword matching
 */
export function retrieveRelevantChunks(
  query: string,
  chunks: ChunkData[],
  topK: number = 5
): RetrievedChunk[] {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    // Fallback: return personal info + skills + expertise for empty/generic queries
    return chunks
      .filter((c) => ["personal", "skills", "expertise"].includes(c.category))
      .slice(0, topK)
      .map((c) => ({ ...c, score: 0.5 }));
  }

  const scored: RetrievedChunk[] = chunks.map((chunk) => ({
    ...chunk,
    score: scoreChunk(queryTokens, chunk),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Only return chunks with some relevance (score > 0)
  const relevant = scored.filter((c) => c.score > 0);

  if (relevant.length === 0) {
    // If nothing matched, return general chunks
    return chunks
      .filter((c) => ["personal", "skills", "expertise"].includes(c.category))
      .slice(0, topK)
      .map((c) => ({ ...c, score: 0.3 }));
  }

  return relevant.slice(0, topK);
}

/**
 * Format retrieved chunks into a context string for the LLM
 */
export function formatContextForLLM(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (chunk, i) =>
        `[Source ${i + 1}: ${chunk.title} (${chunk.category}, relevance: ${Math.round(chunk.score * 100)}%)]\n${chunk.content}`
    )
    .join("\n\n---\n\n");
}
