export interface Role {
  readonly id: string;
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly kind: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly current?: boolean;
}

// Source of truth: resume (Erven_Idjad resume-4.pdf), newest first.
export const experience: readonly Role[] = [
  {
    id: "appstango",
    company: "Appstango",
    title: "Software / AI Engineer",
    period: "April 2026 - Present",
    kind: "Contract, remote",
    current: true,
    summary:
      "Search-visibility monitoring and Android device automation, built to run unattended.",
    highlights: [
      "Built AEO visibility monitoring and reporting across ChatGPT, Gemini, Microsoft Copilot and Google, with rank-quality controls and evidence capture.",
      "Engineered geo-targeted mobile proxy and VPN workflows: residential proxy routing, GOST/SocksDroid tunnelling, session rotation, exit-IP validation and location alignment.",
      "Built and operated an Android device fleet: ADB/mDNS provisioning, self-healing watchdogs, remote recovery, health monitoring and scalable job dispatch.",
      "Customised scrcpy-based audio capture for voice-search automation: virtual-microphone routing, deterministic speech injection, transcript validation and CAPTCHA-aware result handling.",
    ],
    stack: ["TypeScript", "Android / ADB", "scrcpy", "GOST", "Residential proxies", "Playwright"],
  },
  {
    id: "center-court",
    company: "Center Court Capital",
    title: "Full Stack Developer",
    period: "May 2026 - September 2026",
    kind: "Contract, remote",
    summary:
      "Ticket-market monitoring and secondary-listing matching for internal operations.",
    highlights: [
      "Built polling and secondary-listing matching workflows with section normalisation, fuzzy matching and a filter UI.",
      "Created Playwright capture workflows and reproducible market-data research across multiple venue types.",
      "Added unit and integration coverage for matching, polling and data-quality safeguards.",
    ],
    stack: ["TypeScript", "React", "Playwright", "Node.js"],
  },
  {
    id: "sparksoft",
    company: "SparkSoft Solution, Inc.",
    title: "Software Engineer",
    period: "June 2024 - April 2026",
    kind: "Remote",
    summary:
      "Enterprise workforce systems for government and large employers, from biometrics to analytics.",
    highlights: [
      "Architected and deployed a full-stack attendance management system on Next.js 14, TypeScript and AWS Amplify, supporting 15,000+ employees.",
      "Engineered real-time biometric hardware integrations and automated data-export pipelines, cutting HR administrative processing time by 75%.",
      "Developed an enterprise analytics dashboard with geofenced tracking and multi-format reporting for workforce optimisation.",
      "Hardened security with a Node.js/Express backend, AES-encrypted QR decryption, GraphQL integration and a secure S3 proxy for sensitive data.",
    ],
    stack: ["Next.js 14", "TypeScript", "AWS Amplify", "GraphQL", "S3", "Express", "AES"],
  },
  {
    id: "guestpuls",
    company: "GuestPuls",
    title: "AI / Analytics Engineer",
    period: "December 2025 - February 2026",
    kind: "Contract, remote",
    summary:
      "A natural-language analytics assistant that lets non-technical hotel staff query their own data.",
    highlights: [
      "Built an AI hotel analytics assistant on Next.js 15 and PostgreSQL that turns plain-English questions into SQL and live visualisations.",
      "Designed a 3-level deterministic routing engine with O(1) keyword indexing and fuzzy matching, classifying queries across 7 specialised handlers and 4 hotel datasets.",
      "Added an LLM layer (Ollama / OpenAI) for context-aware reasoning, narrative insights and follow-up suggestions.",
      "Built a semantic catalog with typo detection and 17 paraphrase patterns for natural-language understanding.",
    ],
    stack: ["Next.js 15", "PostgreSQL", "Ollama", "OpenAI", "Recharts", "Vitest"],
  },
  {
    id: "mindscript",
    company: "MindScript Technologies LLC",
    title: "Full Stack Developer",
    period: "September 2025 - November 2025",
    kind: "Contract, remote",
    summary:
      "A medical consultation platform where Claude is constrained by deterministic logic.",
    highlights: [
      "Engineered a medical consultation platform integrating Claude, with system prompts and deterministic logic flows guiding the AI for 100+ healthcare consultants.",
      "Built high-performance FastAPI endpoints for fast retrieval and clean communication between the LLM and the frontend.",
      "Implemented localisation so the AI and the platform support multiple languages for patient-consultant interactions.",
      "Refactored a legacy React codebase into a clean, modular architecture, improving maintainability and reducing bug reports.",
    ],
    stack: ["Claude", "FastAPI", "Python", "React", "i18n"],
  },
] as const;
