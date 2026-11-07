import { Github, Linkedin, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { profile } from "@/lib/data/profile";

const LINKS = [
  { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: profile.phone, Icon: Phone },
  { href: profile.linkedin, label: "linkedin.com/in/erven-idjad", Icon: Linkedin },
  { href: profile.github, label: "github.com/ervenderr", Icon: Github },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="border-t bg-card/50">
      <div className="wrap grid gap-10 py-10 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="max-w-[14ch] text-3xl font-semibold leading-[1.06] sm:text-4xl">
            Hiring for an AI or full-stack role?
          </h2>
          <p className="mt-5 max-w-[44ch] text-muted-foreground">
            Email is the fastest way to reach me, or send a note with the form. Remote, contract or full-time.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block break-all font-display text-xl font-semibold tracking-tight underline decoration-primary/40 decoration-2 underline-offset-8 transition-colors hover:decoration-primary sm:text-2xl"
          >
            {profile.email}
          </a>

          <ul className="mt-5 space-y-0">
            {LINKS.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-background"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-[0.95rem]">{label}</span>
                </a>
              </li>
            ))}
          </ul>

        </div>

        <div className="lg:col-span-7">
          <div className="shadow-tint rounded-lg border bg-background p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
