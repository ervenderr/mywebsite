import { skillGroups } from "@/lib/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="wrap py-20 md:py-28">
      <h2 className="max-w-[20ch] text-3xl font-semibold sm:text-4xl">What I work with</h2>

      <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <section key={group.name} aria-labelledby={`skills-${group.name}`}>
            <h3 id={`skills-${group.name}`} className="text-lg font-medium">
              {group.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>
            <p className="mt-4 text-[0.95rem] leading-loose">{group.items.join(", ")}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
