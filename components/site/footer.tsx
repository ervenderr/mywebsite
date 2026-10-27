import Logo from "./logo";
import { profile } from "@/lib/data/profile";

const LINKS = [
  { href: profile.github, label: "GitHub" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, label: "Email" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <p>
            {profile.name}, {profile.location}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="#top" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
