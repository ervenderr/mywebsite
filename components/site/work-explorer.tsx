"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";
import { projectHasTech, techGroups } from "@/lib/data/tech";
import WorkShowcase from "./work-showcase";
import ArchiveGrid from "./archive-grid";

interface WorkExplorerProps {
  readonly featured: readonly Project[];
  readonly archive: readonly Project[];
}

const ALL = "All" as const;

function Chip({
  label,
  count,
  pressed,
  onClick,
}: {
  readonly label: string;
  readonly count: number;
  readonly pressed: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-md border px-3 py-1.5 text-sm transition-colors active:scale-[0.98]",
        pressed
          ? "border-foreground bg-foreground text-background"
          : "bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {label}{" "}
      <span className={cn("ml-1.5 text-xs tabular-nums", pressed ? "text-background/70" : "opacity-70")}>
        {count}
      </span>
    </button>
  );
}

export default function WorkExplorer({ featured, archive }: WorkExplorerProps) {
  const all = useMemo(() => [...featured, ...archive], [featured, archive]);
  const categories = useMemo(() => Array.from(new Set(all.map((p) => p.category))), [all]);
  const { languages, tools } = useMemo(() => techGroups(all), [all]);

  const [category, setCategory] = useState<string>(ALL);
  const [tool, setTool] = useState<string>(ALL);

  const matches = (project: Project) =>
    (category === ALL || project.category === category) &&
    (tool === ALL || projectHasTech(project, tool));

  const shownFeatured = featured.filter(matches);
  const shownArchive = archive.filter(matches);
  const shown = shownFeatured.length + shownArchive.length;
  const filtered = category !== ALL || tool !== ALL;

  const toggle = (current: string, next: string, set: (value: string) => void) =>
    set(current === next ? ALL : next);

  return (
    <>
      <div className="mt-10 space-y-3 rounded-lg border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="w-20 shrink-0 text-sm text-muted-foreground">Type</span>
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            <Chip label={ALL} count={all.length} pressed={category === ALL} onClick={() => setCategory(ALL)} />
            {categories.map((name) => (
              <Chip
                key={name}
                label={name}
                count={all.filter((p) => p.category === name).length}
                pressed={category === name}
                onClick={() => toggle(category, name, setCategory)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="w-20 shrink-0 text-sm text-muted-foreground">Language</span>
          <div
            role="group"
            aria-label="Filter by language"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {languages.map(({ name, count }) => (
              <Chip
                key={name}
                label={name}
                count={count}
                pressed={tool === name}
                onClick={() => toggle(tool, name, setTool)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="w-20 shrink-0 text-sm text-muted-foreground">Tools</span>
          <div
            role="group"
            aria-label="Filter by tool"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {tools.map(({ name, count }) => (
              <Chip
                key={name}
                label={name}
                count={count}
                pressed={tool === name}
                onClick={() => toggle(tool, name, setTool)}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t pt-3 text-sm text-muted-foreground">
          <p aria-live="polite">
            Showing {shown} of {all.length} projects
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setCategory(ALL);
                setTool(ALL);
              }}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {shown === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No project matches both filters. Clear one to see more.
        </p>
      ) : (
        <>
          <WorkShowcase items={shownFeatured} />
          <ArchiveGrid items={shownArchive} />
        </>
      )}
    </>
  );
}
