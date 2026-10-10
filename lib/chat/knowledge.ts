import type { ChunkData } from "@/lib/rag";
import { education, profile, proofPoints } from "@/lib/data/profile";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { skillGroups } from "@/lib/data/skills";

// Retrieval chunks are generated from the same data files that render the page,
// so the chatbot cannot drift from what visitors read.
function buildChunks(): readonly ChunkData[] {
  const personal: ChunkData = {
    id: "personal",
    category: "personal",
    title: "Profile and contact",
    content: [
      `${profile.name}, ${profile.role}, based in ${profile.location}. Works ${profile.workMode}.`,
      profile.summary,
      `Email: ${profile.email}. Phone: ${profile.phone}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
      `Highlights: ${proofPoints.map((p) => `${p.value} ${p.label}`).join("; ")}.`,
    ].join("\n"),
  };

  const edu: ChunkData = {
    id: "education",
    category: "education",
    title: "Education",
    content: `${education.degree}, ${education.school}, ${education.place}. ${education.period}. ${education.award}. Coursework: ${education.coursework.join(", ")}.`,
  };

  const roles: ChunkData[] = experience.map((role) => ({
    id: `role-${role.id}`,
    category: "experience",
    title: `${role.title} at ${role.company}`,
    content: [
      `${role.title} at ${role.company} (${role.period}, ${role.kind}).`,
      role.current ? "This is his current role: what he is working on now, at present, most recently." : "",
      role.summary,
      ...role.highlights.map((h) => `- ${h}`),
      `Stack: ${role.stack.join(", ")}.`,
    ]
      .filter(Boolean)
      .join("\n"),
  }));

  const skills: ChunkData = {
    id: "skills",
    category: "skills",
    title: "Skills and technologies",
    content: skillGroups.map((g) => `${g.name}: ${g.items.join(", ")}.`).join("\n"),
  };

  const work: ChunkData[] = projects.map((project) => ({
    id: `project-${project.id}`,
    category: "project",
    title: project.name,
    content: [
      `${project.name}: ${project.tagline} Role: ${project.role}.`,
      `Problem: ${project.problem}`,
      ...project.built.map((b) => `- ${b}`),
      `Stack: ${project.stack.join(", ")}.`,
      project.demo ? `Demo: ${project.demo}` : "",
      project.repo ? `Source: ${project.repo}` : "",
      project.note ?? "",
    ]
      .filter(Boolean)
      .join("\n"),
  }));

  return [personal, edu, ...roles, skills, ...work];
}

export const knowledgeChunks: readonly ChunkData[] = buildChunks();

// Always sent to the model so broad questions ("is he a fit?") see the whole career,
// not only the few chunks that matched the question's keywords.
export const careerOverview: string = [
  `${profile.name}, ${profile.role}. ${profile.summary}`,
  `Highlights: ${proofPoints.map((p) => `${p.value} ${p.label}`).join("; ")}.`,
  "Career, newest first:",
  ...experience.map((r) => `- ${r.title} at ${r.company} (${r.period}, ${r.kind}): ${r.summary}`),
  `Featured projects: ${projects.filter((p) => p.featured).map((p) => p.name).join(", ")}.`,
].join("\n");
