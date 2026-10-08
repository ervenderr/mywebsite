import Image from "next/image";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";

export default function Hero() {
  return (
    <section className="wrap grid min-h-[calc(100dvh-4rem)] items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="rise rise-1 text-sm text-muted-foreground">
          {profile.name}, {profile.role}, {profile.location.split(",")[0]}
        </p>

        <h1 className="rise rise-2 mt-5 max-w-[18ch] text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
          AI products that hold up in production.
        </h1>

        <p className="rise rise-3 mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          I build automation and LLM tools: attendance for 15,000+ employees, natural-language analytics,
          and an Android fleet that runs search jobs unattended.
        </p>

        <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={profile.resumePdf} download>
              <Download className="mr-2 h-4 w-4" aria-hidden />
              Download resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${profile.email}`}>
              <Mail className="mr-2 h-4 w-4" aria-hidden />
              Email me
            </a>
          </Button>
        </div>

        <a
          href="#work"
          className="rise rise-5 mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See selected work
          <ArrowDownRight className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <div className="rise rise-3 lg:col-span-5">
        <div className="shadow-tint relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border bg-card lg:max-w-none">
          <Image
            src="/images/profile-new.png"
            alt="Portrait of Erven Idjad"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
