"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import Tilt from "./tilt";
import Reveal from "./reveal";

interface ArchiveGridProps {
  readonly items: readonly Project[];
}

// One snapping row instead of a wall of cards: scroll or use the arrows.
export default function ArchiveGrid({ items }: ArchiveGridProps) {
  const track = useRef<HTMLUListElement>(null);

  if (items.length === 0) return null;

  const page = (direction: 1 | -1) =>
    track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <Reveal className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">More projects</h3>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => page(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-background active:scale-[0.96]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => page(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-background active:scale-[0.96]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
      >
        {items.map((item) => (
          <li key={item.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-2rem)/3)]">
            <Tilt max={7} className="h-full">
              <div className="flex h-full flex-col rounded-lg border bg-card p-5 transition-shadow hover:shadow-tint">
                <h4 className="font-medium">{item.name}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.tagline}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {item.stack.slice(0, 4).join(", ")}
                </p>
                <div className="mt-auto flex gap-4 pt-3 text-sm">
                  {item.demo && (
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 text-primary hover:underline"
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
                      className="inline-flex min-h-10 items-center gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </Tilt>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
