import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data/projects";

interface ArchiveGridProps {
  readonly items: readonly Project[];
}

export default function ArchiveGrid({ items }: ArchiveGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold">More projects</h3>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col rounded-lg border bg-card p-5">
            <h4 className="font-medium">{item.name}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {item.stack.slice(0, 4).join(", ")}
            </p>
            <div className="mt-auto flex gap-4 pt-5 text-sm">
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Demo
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                  Source
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
