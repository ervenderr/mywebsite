import Image from "next/image";
import { Download, Mail } from "lucide-react";
import Tilt from "./tilt";
import HeroScene from "./hero-scene";
import { Button } from "@/components/ui/button";
import { heroStats, profile } from "@/lib/data/profile";

export default function Hero() {
  return (
    <section className="wrap grid items-center gap-8 py-8 md:py-12 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="rise rise-1 text-sm text-muted-foreground">
          {profile.name}, {profile.role}, {profile.location.split(",")[0]}
        </p>

        <h1 className="rise rise-2 mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-[4rem]">
          AI products that hold up in production.
        </h1>

        <p className="rise rise-3 mt-4 max-w-[52ch] text-base sm:text-lg leading-relaxed text-muted-foreground">
          I build automation and LLM tools: attendance for 15,000+ employees, natural-language analytics,
          and an Android fleet that runs search jobs unattended.
        </p>

        <div className="rise rise-4 mt-6 flex flex-wrap gap-3">
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

        <dl className="rise rise-5 mt-7 grid max-w-xl grid-cols-3 gap-4 border-t pt-5 sm:gap-6">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rise rise-3 relative lg:col-span-5">
        <HeroScene />
        <Tilt max={5} className="float relative z-10 mx-auto w-full max-w-[12rem] sm:max-w-xs lg:max-w-none">
        <div className="shadow-tint relative aspect-[4/5] w-full overflow-hidden rounded-b-lg rounded-t-[999px] border bg-primary/10">
          <Image
            src="/images/profile-new.png"
            alt="Portrait of Erven Idjad"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-bottom"
          />
        </div>
        </Tilt>
      </div>
    </section>
  );
}
