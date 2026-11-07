import type { ReactNode } from "react";
import Reveal from "./reveal";

interface SectionHeadProps {
  readonly title: string;
  readonly children?: ReactNode;
  readonly className?: string;
}

// Large display title on the left, the one-line context on the right, aligned to the title's baseline.
export default function SectionHead({ title, children, className = "" }: SectionHeadProps) {
  return (
    <Reveal className={`grid gap-3 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
      <h2 className="text-3xl font-semibold leading-[1.06] sm:text-4xl lg:col-span-7">{title}</h2>
      {children && (
        <p className="max-w-[46ch] leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">
          {children}
        </p>
      )}
    </Reveal>
  );
}
