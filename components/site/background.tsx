"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/data/experience";
import { skillGroups } from "@/lib/data/skills";
import { education } from "@/lib/data/profile";
import SectionHead from "./section-head";
import Reveal from "./reveal";

const TABS = ["Experience", "Skills", "Education"] as const;
type Tab = (typeof TABS)[number];

const BULLET = <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 rounded-sm bg-primary" />;

function ExperiencePanel() {
  const [activeId, setActiveId] = useState(experience.find((r) => r.current)?.id ?? experience[0]?.id);
  const role = experience.find((r) => r.id === activeId) ?? experience[0];
  if (!role) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div
        role="group"
        aria-label="Roles, newest first"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {experience.map((item) => {
          const selected = item.id === role.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors active:scale-[0.98] lg:border-transparent",
                selected
                  ? "border-foreground bg-foreground text-background lg:border-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground lg:bg-transparent lg:hover:bg-card"
              )}
            >
              <span className="block font-medium">{item.company}</span>
              <span className={cn("block text-xs", selected ? "text-background/70" : "")}>{item.period}</span>
            </button>
          );
        })}
      </div>

      <div key={role.id} className="swap lg:col-span-8">
        <h3 className="text-xl font-semibold">
          {role.title}, {role.company}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {role.kind} · {role.period}
        </p>
        <p className="mt-3 text-muted-foreground">{role.summary}</p>
        <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed">
          {role.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              {BULLET}
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <li key={tech} className="rounded-md border bg-card px-2.5 py-1 text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillsPanel() {
  return (
    <dl className="swap grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <div key={group.name}>
          <dt>
            <span className="block font-display text-lg font-semibold tracking-tight">{group.name}</span>
            <span className="block text-sm text-muted-foreground">{group.note}</span>
          </dt>
          <dd className="mt-2 text-[0.9rem] leading-relaxed">{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}

function EducationPanel() {
  return (
    <div className="swap max-w-2xl">
      <h3 className="text-xl font-semibold">
        {education.degree}, {education.school}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {education.period}. {education.award}.
      </p>
      <p className="mt-4 text-[0.95rem] leading-relaxed">{education.coursework.join(", ")}.</p>
    </div>
  );
}

export default function Background() {
  const [tab, setTab] = useState<Tab>("Experience");

  return (
    <section id="background" className="wrap py-10 md:py-12">
      <SectionHead title="Background">Five roles since 2024, the tools I use, and where I studied.</SectionHead>

      <Reveal className="mt-6">
        <div role="tablist" aria-label="Background" className="flex gap-1 border-b">
          {TABS.map((name) => (
            <button
              key={name}
              id={`tab-${name}`}
              role="tab"
              type="button"
              aria-selected={tab === name}
              aria-controls="background-panel"
              onClick={() => setTab(name)}
              className={cn(
                "-mb-px min-h-11 border-b-2 px-4 text-sm font-medium transition-colors",
                tab === name
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <div id="background-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="pt-6">
          {tab === "Experience" && <ExperiencePanel />}
          {tab === "Skills" && <SkillsPanel />}
          {tab === "Education" && <EducationPanel />}
        </div>
      </Reveal>
    </section>
  );
}
