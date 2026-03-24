import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  retrieveRelevantChunks,
  formatContextForLLM,
  type EmbeddingsData,
  type RetrievedChunk,
} from "@/lib/rag";
import {
  rateLimiter,
  getClientIP,
  formatTimeRemaining,
} from "@/lib/rate-limiter";

// Cache embeddings in memory after first load
let cachedEmbeddings: EmbeddingsData | null = null;

function loadEmbeddings(): EmbeddingsData {
  if (!cachedEmbeddings) {
    const filePath = join(process.cwd(), "public", "embeddings.json");
    const raw = readFileSync(filePath, "utf-8");
    cachedEmbeddings = JSON.parse(raw) as EmbeddingsData;
  }
  return cachedEmbeddings;
}

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

function buildSystemPrompt(context: string): string {
  return `You are an AI assistant for Erven Idjad's portfolio website. Answer questions about Erven based ONLY on the context provided below.

RULES:
1. Only answer questions related to Erven Idjad, his skills, experience, projects, and background.
2. If asked about unrelated topics, politely decline and redirect to portfolio-related questions.
3. Be friendly, professional, and concise.
4. If the provided context doesn't contain the answer, say so honestly — do not make things up.
5. Use markdown formatting: bullet points for lists, **bold** for emphasis, short paragraphs.

CONTEXT:
${context}`;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit check (unchanged)
    const clientIP = getClientIP(request);
    const rateLimit = rateLimiter.checkLimit(clientIP);

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      let errorMessage = "Too many requests. Please try again later.";

      if (rateLimit.reason === "minute") {
        errorMessage = `You've reached the limit of 10 requests per minute. Please wait ${timeRemaining} before trying again.`;
      } else if (rateLimit.reason === "hour") {
        errorMessage = `You've reached the limit of 50 requests per hour. Please try again in ${timeRemaining}.`;
      } else if (rateLimit.reason === "global") {
        errorMessage = `The chatbot is currently experiencing high traffic. Please try again in ${timeRemaining}.`;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          success: false,
          rateLimitExceeded: true,
          resetTime: rateLimit.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
            "Retry-After": Math.ceil(
              (rateLimit.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      console.error("DEEPSEEK_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Load embeddings and retrieve relevant chunks via keyword matching
    const embeddings = loadEmbeddings();
    const relevantChunks: RetrievedChunk[] = retrieveRelevantChunks(
      message,
      embeddings.chunks,
      5
    );

    const context = formatContextForLLM(relevantChunks);
    const systemPrompt = buildSystemPrompt(context);

    // Build messages array for DeepSeek
    const messages: DeepSeekMessage[] = [
      { role: "system", content: systemPrompt },
    ];

    // Add conversation history
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory as Array<{
        role: string;
        content: string;
      }>) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        });
      }
    }

    // Add current message
    messages.push({ role: "user", content: message });

    // Call DeepSeek chat API
    const deepseekResponse = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!deepseekResponse.ok) {
      const errorBody = await deepseekResponse.text();
      console.error("DeepSeek API error:", deepseekResponse.status, errorBody);
      return NextResponse.json(
        { error: "Failed to get response from AI. Please try again.", success: false },
        { status: 502 }
      );
    }

    const deepseekData = (await deepseekResponse.json()) as DeepSeekResponse;
    const responseText =
      deepseekData.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    // Build sources array for the UI
    const sources = relevantChunks.map((chunk) => ({
      title: chunk.title,
      category: chunk.category,
      score: chunk.score,
    }));

    // Get remaining requests
    const finalRateLimit = rateLimiter.checkLimit(clientIP);

    return NextResponse.json(
      {
        response: responseText,
        success: true,
        sources,
      },
      {
        headers: {
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": Math.max(
            0,
            finalRateLimit.remaining - 1
          ).toString(),
          "X-RateLimit-Reset": finalRateLimit.resetTime.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: "Failed to process your message. Please try again.",
        success: false,
      },
      { status: 500 }
    );
  }
}
