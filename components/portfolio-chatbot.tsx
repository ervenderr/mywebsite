"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm Erven's AI assistant. I can tell you about:\n\n- **Professional experience** & current role\n- **Projects** like SpotMe, TaxSync PH, MediChain, and more\n- **Technical skills** & technologies\n- **Education** & background\n\nWhat would you like to know?",
};

const QUICK_PROMPTS = [
  "What projects has Erven built?",
  "What's his tech stack?",
  "Tell me about his experience",
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const userMessage = (messageText || input).trim();
    if (!userMessage || isLoading) return;

    setInput("");

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const conversationHistory = newMessages
        .slice(1)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.slice(0, -1),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.response },
        ]);
      } else {
        let errorMessage =
          "Sorry, I encountered an error. Please try again later.";
        if (response.status === 429 || data.rateLimitExceeded) {
          errorMessage =
            data.error ||
            "You've sent too many messages. Please wait a moment before trying again.";
        } else if (data.error) {
          errorMessage = data.error;
        }
        setMessages([
          ...newMessages,
          { role: "assistant", content: errorMessage },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the server. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const showQuickPrompts = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
      </button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] flex flex-col p-0 gap-0 overflow-hidden border-border/50">
          {/* Header */}
          <DialogHeader className="px-4 py-3 border-b bg-muted/30 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-sm font-semibold">
                    Erven's AI Assistant
                  </DialogTitle>
                  <DialogDescription className="text-xs mt-0">
                    Powered by Gemini AI
                  </DialogDescription>
                </div>
              </div>
              {messages.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </DialogHeader>

          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 pb-3">
            <div className="space-y-4 pt-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/80 border border-border/30 rounded-bl-md"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 text-sm leading-relaxed">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 last:mb-0 list-disc list-inside space-y-1">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 last:mb-0 list-decimal list-inside space-y-1">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-sm leading-relaxed ml-1">
                                {children}
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground">
                                {children}
                              </strong>
                            ),
                            code: ({ children }) => (
                              <code className="bg-background/50 px-1.5 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:text-primary/80"
                              >
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-base font-bold mb-2">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-sm font-bold mb-1.5">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-sm font-semibold mb-1">
                                {children}
                              </h3>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-muted/80 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            {showQuickPrompts && (
              <div className="flex flex-wrap gap-2 pt-4">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary/80 hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-background/80 p-3">
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                placeholder="Ask me about Erven..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 text-sm rounded-full border-border/50 bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/50 px-4"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="shrink-0 rounded-full h-9 w-9"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
