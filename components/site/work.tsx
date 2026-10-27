import { ExternalLink } from "lucide-react";
import { archiveProjects, featuredProjects } from "@/lib/data/projects";
import { profile } from "@/lib/data/profile";
import WorkExplorer from "./work-explorer";
import SectionHead from "./section-head";

export default function Work() {
  return (
    <section id="work" className="border-y bg-card/50">
      <div className="wrap py-20 md:py-28">
        <SectionHead title="Selected work, with the problem each one solved">
          Fifteen projects I would walk you through in an interview. Pick one to see what was built and
          what it runs on.
        </SectionHead>

        <WorkExplorer featured={featuredProjects} archive={archiveProjects} />

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          All repositories on GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
