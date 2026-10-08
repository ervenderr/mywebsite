import { ChevronDown } from "lucide-react";
import { experience } from "@/lib/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="wrap py-20 md:py-28">
      <h2 className="max-w-[20ch] text-3xl font-semibold sm:text-4xl">
        Five roles since 2024, newest first
      </h2>
      <p className="mt-4 max-w-[60ch] text-muted-foreground">
        Each row opens to the specifics. The current role is already open.
      </p>

      <div className="mt-10 divide-y border-y">
        {experience.map((role) => (
          <details key={role.id} open={role.current} className="group py-1">
            <summary className="grid cursor-pointer gap-x-8 gap-y-1 rounded-lg py-5 md:grid-cols-12 md:items-baseline">
              <span className="text-sm tabular-nums text-muted-foreground md:col-span-3">
                {role.period}
              </span>
              <span className="md:col-span-8">
                <span className="block text-lg font-medium">
                  {role.title}, {role.company}
                </span>
                <span className="mt-1 block text-[0.95rem] text-muted-foreground">
                  {role.summary}
                </span>
              </span>
              <span className="hidden justify-self-end md:col-span-1 md:block">
                <ChevronDown
                  className="chevron h-5 w-5 text-muted-foreground transition-transform"
                  aria-hidden
                />
              </span>
            </summary>

            <div className="grid gap-x-8 pb-7 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="text-sm text-muted-foreground">{role.kind}</p>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-3 text-[0.95rem] leading-relaxed">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 rounded-sm bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
