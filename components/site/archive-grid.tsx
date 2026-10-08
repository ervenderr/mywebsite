"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface ArchiveGridProps {
  readonly items: readonly Project[];
}

const ALL = "All" as const;

export default function ArchiveGrid({ items }: ArchiveGridProps) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );
  const [category, setCategory] = useState<string>(ALL);

  const visible = category === ALL ? items : items.filter((item) => item.category === category);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">More projects</h3>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors active:scale-[0.98]",
                category === name
                  ? "border-foreground bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
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
