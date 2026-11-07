import { proofPoints } from "@/lib/data/profile";
import Reveal from "./reveal";

export default function Brief() {
  return (
    <section id="brief" className="bg-foreground text-background">
      <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4">
        {proofPoints.map((point, i) => (
          <Reveal as="li" key={point.label} delay={i * 80} className="flex items-baseline gap-3">
            <p className="font-display text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
              {point.value}
            </p>
            <p className="max-w-[16ch] text-xs leading-snug text-background/70">{point.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
