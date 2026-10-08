import { ExternalLink } from "lucide-react";
import { archiveProjects, featuredProjects } from "@/lib/data/projects";
import { profile } from "@/lib/data/profile";
import WorkShowcase from "./work-showcase";
import ArchiveGrid from "./archive-grid";

export default function Work() {
  return (
    <section id="work" className="border-y bg-card/50">
      <div className="wrap py-20 md:py-28">
        <h2 className="max-w-[22ch] text-3xl font-semibold sm:text-4xl">
          Selected work, with the problem each one solved
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Six projects I would walk you through in an interview. Pick one to see what was built and
          what it runs on.
        </p>

        <WorkShowcase items={featuredProjects} />
        <ArchiveGrid items={archiveProjects} />

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          All repositories on GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
