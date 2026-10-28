import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { retrieveRelevantChunks } from "@/lib/rag";
import { rateLimiter, getClientIP, formatTimeRemaining } from "@/lib/rate-limiter";
import { knowledgeChunks } from "@/lib/chat/knowledge";
import { buildMessages, removeEmDashes } from "@/lib/chat/prompt";
import { completeWithDahl } from "@/lib/chat/dahl-client";
import { buildFallbackAnswer } from "@/lib/chat/fallback";

const MAX_HISTORY_TURNS = 10;

const requestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .max(50)
    .optional()
    .default([]),
});

function rateLimitResponse(reason: string | undefined, resetTime: number, remaining: number) {
  const wait = formatTimeRemaining(resetTime);
  const messages: Record<string, string> = {
    minute: `You've reached the limit of 10 requests per minute. Please wait ${wait}.`,
    hour: `You've reached the limit of 50 requests per hour. Please try again in ${wait}.`,
    global: `The assistant is busy right now. Please try again in ${wait}.`,
  };
  return NextResponse.json(
    {
      error: messages[reason ?? ""] ?? "Too many requests. Please try again later.",
      success: false,
      rateLimitExceeded: true,
      resetTime,
    },
    {
      status: 429,
      headers: {
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": resetTime.toString(),
        "Retry-After": Math.max(1, Math.ceil((resetTime - Date.now()) / 1000)).toString(),
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const rateLimit = rateLimiter.checkLimit(clientIP);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.reason, rateLimit.resetTime, rateLimit.remaining);
  }

  let parsed: z.infer<typeof requestSchema>;
  try {
    parsed = requestSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Send a message of up to 1000 characters.", success: false },
      { status: 400 }
    );
  }

  // Retrieval only picks the fallback answer and the sources shown; the model sees everything.
  const lastUserTurn = [...parsed.conversationHistory].reverse().find((t) => t.role === "user");
  const chunks = retrieveRelevantChunks(
    `${lastUserTurn?.content ?? ""} ${parsed.message}`,
    [...knowledgeChunks],
    5
  );
  const messages = buildMessages(parsed.conversationHistory.slice(-MAX_HISTORY_TURNS), parsed.message);

  let answer: string;
  let degraded = false;
  try {
    answer = await completeWithDahl(messages);
  } catch (error) {
    console.error("Chat model call failed:", error instanceof Error ? error.message : error);
    answer = buildFallbackAnswer(chunks);
    degraded = true;
  }

  return NextResponse.json({
    response: removeEmDashes(answer),
    success: true,
    degraded,
    sources: chunks.map(({ title, category, score }) => ({ title, category, score })),
  });
}
