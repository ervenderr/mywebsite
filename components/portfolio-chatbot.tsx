"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ChatMarkdown from "@/components/chat/chat-markdown";

interface Message {
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly degraded?: boolean;
}

const INTRO: Message = {
  role: "assistant",
  content:
    "Ask about Erven's experience, projects or skills. Answers come from this portfolio, so you can check them against the page.",
};

const QUICK_PROMPTS = [
  "What is Erven working on now?",
  "Which project best shows his AI work?",
  "Is he a fit for a senior full-stack role?",
] as const;

const GENERIC_ERROR = "That did not go through. Try again, or email ervenidjad12@gmail.com.";

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<readonly Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || isLoading) return;

    const history = messages.slice(1).map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, conversationHistory: history }),
      });
      const data = await response.json();
      const reply: Message = data.success
        ? { role: "assistant", content: data.response, degraded: Boolean(data.degraded) }
        : { role: "assistant", content: data.error || GENERIC_ERROR };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: GENERIC_ERROR }]);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setMessages([INTRO]);
    setInput("");
  };

  const showPrompts = messages.length === 1 && !isLoading;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ask about Erven"
        className="shadow-tint fixed bottom-4 right-4 z-30 inline-flex h-12 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:bottom-6 sm:right-6"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Ask about Erven
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex h-[min(640px,calc(100dvh-2rem))] max-w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[480px]">
          <DialogHeader className="flex-row items-center justify-between space-y-0 border-b px-5 py-4 pr-12 text-left">
            <div>
              <DialogTitle className="text-base font-semibold">Ask about Erven</DialogTitle>
              <DialogDescription className="mt-0.5 text-xs">
                Answers come from this portfolio
              </DialogDescription>
            </div>
            {messages.length > 1 && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" aria-hidden />
                Clear
              </button>
            )}
          </DialogHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5" aria-live="polite">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={index} className="flex justify-end">
                  <p className="max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div key={index} className="text-sm leading-relaxed">
                  <ChatMarkdown content={message.content} />
                  {message.degraded && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Shown straight from the portfolio because the AI model is offline.
                    </p>
                  )}
                </div>
              )
            )}

            {isLoading && (
              <p className="text-sm text-muted-foreground motion-safe:animate-pulse">Thinking</p>
            )}

            {showPrompts && (
              <ul className="space-y-2 pt-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <li key={prompt}>
                    <button
                      type="button"
                      onClick={() => send(prompt)}
                      className="w-full rounded-lg border bg-card px-3.5 py-2.5 text-left text-sm transition-colors hover:border-foreground/40 active:scale-[0.99]"
                    >
                      {prompt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              maxLength={1000}
              placeholder="Type a question"
              className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send question"
              className={cn(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity active:scale-[0.97]",
                "disabled:opacity-40"
              )}
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
