import type { Project } from "./projects";

export interface TechCount {
  readonly name: string;
  readonly count: number;
}

const ALIASES: Readonly<Record<string, string>> = {
  "Tesseract.js": "Tesseract",
  "OpenAI-compatible LLM": "LLM",
  "Whisper (MLX)": "Whisper",
};

const LANGUAGES: readonly string[] = ["TypeScript", "Python", "Swift", "JavaScript", "C#"];
const MIN_TOOL_PROJECTS = 2;
const MAX_TOOLS = 12;

// "Next.js 16" and "Next.js 15" are one tool for filtering.
export function normalizeTech(name: string): string {
  const base = name.replace(/\s+\d+(\.\d+)*$/, "");
  return ALIASES[name] ?? ALIASES[base] ?? base;
}

export function projectHasTech(project: Project, tech: string): boolean {
  return project.stack.some((item) => normalizeTech(item) === tech);
}

const byCountThenName = (a: TechCount, b: TechCount) =>
  b.count - a.count || a.name.localeCompare(b.name);

export function techGroups(projects: readonly Project[]): {
  readonly languages: readonly TechCount[];
  readonly tools: readonly TechCount[];
} {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const name of new Set(project.stack.map(normalizeTech))) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  const all = [...counts].map(([name, count]) => ({ name, count }));
  return {
    languages: all.filter((t) => LANGUAGES.includes(t.name)).sort(byCountThenName),
    tools: all
      .filter((t) => !LANGUAGES.includes(t.name) && t.count >= MIN_TOOL_PROJECTS)
      .sort(byCountThenName)
      .slice(0, MAX_TOOLS),
  };
}
