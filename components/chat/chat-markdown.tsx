import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMarkdownProps {
  readonly content: string;
}

export default function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0">{children}</ol>,
        li: ({ children }) => <li className="pl-0.5">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[0.85em]">{children}</code>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words text-primary underline underline-offset-2"
          >
            {children}
          </a>
        ),
        h1: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
        h2: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
        h3: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
