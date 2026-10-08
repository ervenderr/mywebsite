import { Github, Linkedin, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { education, profile } from "@/lib/data/profile";

const LINKS = [
  { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
  { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: profile.phone, Icon: Phone },
  { href: profile.linkedin, label: "linkedin.com/in/erven-idjad", Icon: Linkedin },
  { href: profile.github, label: "github.com/ervenderr", Icon: Github },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="border-t bg-card/50">
      <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="max-w-[16ch] text-3xl font-semibold sm:text-4xl">
            Hiring for an AI or full-stack role?
          </h2>
          <p className="mt-4 max-w-[44ch] text-muted-foreground">
            Email is the fastest way to reach me, or send a note with the form.
          </p>

          <ul className="mt-8 space-y-1">
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

          <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-medium">Education</h3>
            <p className="mt-3 text-[0.95rem]">
              {education.degree}, {education.school}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.period}. {education.award}.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {education.coursework.join(", ")}.
            </p>
          </div>
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
