import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { portfolioContext } from "@/lib/portfolio-context";
import {
  rateLimiter,
  getClientIP,
  formatTimeRemaining,
} from "@/lib/rate-limiter";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    // Check rate limit before processing
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

    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prepare the conversation history with context
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: portfolioContext }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand. I will only answer questions about Erven Idjad based on the portfolio information provided. If asked about unrelated topics, I will politely decline and redirect to portfolio-related questions.",
          },
        ],
      },
    ];

    // Add previous conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        chatHistory.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      });
    }

    // Start a chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Send the message and get the response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Get remaining requests (clientIP already declared at line 16)
    const finalRateLimit = rateLimiter.checkLimit(clientIP);

    return NextResponse.json(
      {
        response: text,
        success: true,
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
