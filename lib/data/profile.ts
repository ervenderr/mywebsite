export const profile = {
  name: "Erven Idjad",
  role: "Software & AI Engineer",
  location: "Metro Manila, Philippines",
  workMode: "Remote, contract or full-time",
  email: "ervenidjad12@gmail.com",
  phone: "+63 981 706 8891",
  github: "https://github.com/ervenderr",
  linkedin: "https://linkedin.com/in/erven-idjad",
  site: "https://ervenderr.vercel.app",
  resumePdf: "/resume.pdf",
  headline: "I build AI products and automation that hold up in production.",
  summary:
    "Software engineer with two years of professional work across enterprise web systems, LLM products and device automation. I have shipped an attendance platform for 15,000+ employees, a natural-language analytics assistant, and an Android fleet that runs search jobs unattended.",
} as const;

export interface ProofPoint {
  readonly value: string;
  readonly label: string;
}

export const proofPoints: readonly ProofPoint[] = [
  { value: "15,000+", label: "employees on the attendance system I architected" },
  { value: "75%", label: "less HR processing time after the export pipelines shipped" },
  { value: "100+", label: "healthcare consultants guided by one LLM flow" },
  { value: "4", label: "remote AI and full-stack contracts since September 2025" },
];

export const education = {
  degree: "Bachelor's in Computer Science",
  school: "Western Mindanao State University",
  place: "Zamboanga City, Philippines",
  period: "August 2020 - May 2024",
  award: "Academic award: Best in Portfolio",
  coursework: [
    "Object-Oriented Programming",
    "Data Structures & Algorithms",
    "Software Engineering",
    "Database Systems",
    "Computer Networks",
    "Artificial Intelligence",
    "Machine Learning",
  ],
} as const;
