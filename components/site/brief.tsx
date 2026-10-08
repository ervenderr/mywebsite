import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, proofPoints } from "@/lib/data/profile";
import { experience } from "@/lib/data/experience";

const current = experience.find((role) => role.current);

const FACTS: ReadonlyArray<readonly [string, string]> = [
  ["Role", profile.role],
  ["Now", current ? `${current.title} at ${current.company}` : "Open to work"],
  ["Location", profile.location],
  ["Working", profile.workMode],
  ["Core stack", "TypeScript, React, Next.js, Python, FastAPI, PostgreSQL"],
  ["AI work", "LLM products, RAG, natural-language analytics, device automation"],
];

export default function Brief() {
  return (
    <section id="brief" className="bg-foreground text-background">
      <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">The 30-second version</h2>
          <dl className="mt-8 divide-y divide-background/15 border-y border-background/15">
            {FACTS.map(([term, detail]) => (
              <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 sm:grid-cols-[8rem_1fr]">
                <dt className="text-sm text-background/60">{term}</dt>
                <dd className="text-[0.95rem] leading-relaxed">{detail}</dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="secondary" size="lg" className="mt-8">
            <a href={profile.resumePdf} download>
              <Download className="mr-2 h-4 w-4" aria-hidden />
              Download resume (PDF)
            </a>
          </Button>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-6 lg:content-center">
          {proofPoints.map((point) => (
            <li key={point.label}>
              <p className="text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
                {point.value}
              </p>
              <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-background/70">
                {point.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
