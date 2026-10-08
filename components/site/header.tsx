"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import ResumeModal from "@/components/resume-modal";
import { profile } from "@/lib/data/profile";

const NAV_LINKS = [
  { href: "#brief", label: "Brief" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-base font-semibold tracking-tight" onClick={close}>
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ResumeModal
            trigger={
              <Button size="sm" className="hidden md:inline-flex">
                <FileText className="mr-2 h-4 w-4" aria-hidden />
                Resume
              </Button>
            }
          />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="wrap flex flex-col gap-1 border-t bg-background pb-4 pt-2 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-lg px-2 py-3 text-base hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <ResumeModal
            trigger={
              <Button className="mt-2 w-full" onClick={close}>
                <FileText className="mr-2 h-4 w-4" aria-hidden />
                Resume
              </Button>
            }
          />
        </nav>
      )}
    </header>
  );
}
