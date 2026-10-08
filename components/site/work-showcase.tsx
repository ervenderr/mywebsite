"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface WorkShowcaseProps {
  readonly items: readonly Project[];
}

export default function WorkShowcase({ items }: WorkShowcaseProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        role="group"
        aria-label="Featured projects"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:col-span-3 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors active:scale-[0.98] lg:border-transparent lg:py-3",
                selected
                  ? "border-foreground bg-foreground text-background lg:border-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground lg:bg-transparent lg:hover:bg-card"
              )}
            >
              <span className="block font-medium">{item.name}</span>
              <span className={cn("hidden text-xs lg:block", selected ? "text-background/70" : "")}>
                {item.role}
              </span>
            </button>
          );
        })}
      </div>

      <article className="lg:col-span-9" aria-live="polite">
        {active.image && (
          <div className="shadow-tint relative aspect-[16/10] overflow-hidden rounded-lg border bg-card">
            <Image
              key={active.id}
              src={active.image}
              alt={active.imageAlt ?? `${active.name} screenshot`}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className={cn(
                "bg-card",
                active.category === "Mobile" || active.id === "halalchecker"
                  ? "object-contain py-3"
                  : "object-cover object-top"
              )}
            />
          </div>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="text-2xl font-semibold">{active.name}</h3>
            <p className="mt-2 text-lg text-muted-foreground">{active.tagline}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed">
              <span className="font-medium">The problem. </span>
              {active.problem}
            </p>
            <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed">
              {active.built.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 rounded-sm bg-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <p className="text-sm text-muted-foreground">Stack</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {active.stack.map((tech) => (
                <li key={tech} className="rounded-md border bg-card px-2.5 py-1 text-xs">
                  {tech}
                </li>
              ))}
            </ul>
            {active.note && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{active.note}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {active.demo && (
                <a
                  href={active.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Live demo
                </a>
              )}
              {active.repo && (
                <a
                  href={active.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-card active:scale-[0.98]"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
