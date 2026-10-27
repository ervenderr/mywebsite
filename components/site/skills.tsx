import { skillGroups } from "@/lib/data/skills";
import SectionHead from "./section-head";

export default function Skills() {
  return (
    <section id="skills" className="wrap py-20 md:py-28">
      <SectionHead title="What I work with">
        The tools I reach for, grouped by the kind of problem they solve.
      </SectionHead>

      <dl className="mt-12 divide-y border-y">
        {skillGroups.map((group) => (
          <div key={group.name} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-12">
            <dt className="md:col-span-4">
              <span className="block font-display text-xl font-semibold tracking-tight">{group.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{group.note}</span>
            </dt>
            <dd className="text-[0.95rem] leading-loose md:col-span-8">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
