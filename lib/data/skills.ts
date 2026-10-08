export interface SkillGroup {
  readonly name: string;
  readonly note: string;
  readonly items: readonly string[];
}

// Grouped from the resume's Technical Skills block plus tools used across repos.
export const skillGroups: readonly SkillGroup[] = [
  {
    name: "AI and LLM",
    note: "Used in production work and shipped projects",
    items: ["OpenAI API", "Claude", "Ollama", "LLM integration", "RAG", "NLP", "HuggingFace", "OpenCV", "YOLOv8", "Tesseract OCR"],
  },
  {
    name: "Web and backend",
    note: "My daily stack",
    items: ["TypeScript", "React", "Next.js", "Node.js", "FastAPI", "REST APIs", "GraphQL", "Python", "PHP", "Tailwind CSS"],
  },
  {
    name: "Data and cloud",
    note: "Storage, hosting and delivery",
    items: ["PostgreSQL", "DynamoDB", "Supabase", "Prisma", "AWS Amplify", "AWS S3", "Vercel", "Docker"],
  },
  {
    name: "Automation and devices",
    note: "The less common part of my profile",
    items: ["Android automation", "ADB", "scrcpy", "Playwright", "Chrome DevTools Protocol", "Residential proxies", "GOST / SocksDroid", "Network diagnostics"],
  },
  {
    name: "Quality and tooling",
    note: "How I keep changes safe",
    items: ["Vitest", "Playwright tests", "Git", "Claude Code", "OpenAI Codex", "Cursor"],
  },
  {
    name: "Languages",
    note: "Beyond the above",
    items: ["JavaScript", "TypeScript", "Python", "C++", "PHP", "HTML / CSS"],
  },
];
