const DAHL_ENDPOINT = "https://inference.dahl.global/v1/chat/completions";
const DAHL_MODEL = "MiniMaxAI/MiniMax-M2.7";
const REQUEST_TIMEOUT_MS = 30_000;

export interface ChatTurn {
  readonly role: "system" | "user" | "assistant";
  readonly content: string;
}

interface DahlResponse {
  readonly choices?: ReadonlyArray<{ readonly message?: { readonly content?: string } }>;
}

export class DahlError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "DahlError";
  }
}

// MiniMax is a reasoning model and may prefix its answer with <think>...</think>.
export function stripReasoning(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/^[\s\S]*?<\/think>/i, "")
    .trim();
}

export async function completeWithDahl(messages: readonly ChatTurn[]): Promise<string> {
  const apiKey = process.env.DAHL_API_KEY;
  if (!apiKey) {
    throw new DahlError("DAHL_API_KEY is not configured");
  }

  const response = await fetch(DAHL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DAHL_MODEL,
      messages,
      temperature: 0.4,
      max_tokens: 1500,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new DahlError(`Dahl request failed: ${detail}`, response.status);
  }

  const data = (await response.json()) as DahlResponse;
  const text = stripReasoning(data.choices?.[0]?.message?.content ?? "");
  if (!text) {
    throw new DahlError("Dahl returned an empty answer");
  }
  return text;
}
