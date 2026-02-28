"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Download,
  Code2,
  Users2,
  Mail,
  Menu,
  X,
  FileText,
} from "lucide-react";
import Link from "next/link";
import ResumeModal from "@/components/resume-modal";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl" onClick={closeMobile}>
          <span className="text-primary">Ervender</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="https://github.com/ervenderr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex hover:text-primary transition-colors"
          >
            <Code2 className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/erven-idjad"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex hover:text-primary transition-colors"
          >
            <Users2 className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:ervenidjad12@gmail.com"
            className="hidden sm:inline-flex hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <ResumeModal
            trigger={
              <Button size="sm" className="hidden md:inline-flex">
                Resume <FileText className="ml-2 h-4 w-4" />
              </Button>
            }
          />

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/40 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-72 bg-background border-l shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="text-base font-medium py-3 px-4 rounded-lg hover:bg-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t my-4" />

          <div className="flex items-center gap-4 px-4 py-2">
            <Link
              href="https://github.com/ervenderr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={closeMobile}
            >
              <Code2 className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/erven-idjad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={closeMobile}
            >
              <Users2 className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:ervenidjad12@gmail.com"
              className="hover:text-primary transition-colors"
              onClick={closeMobile}
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <ResumeModal
            trigger={
              <Button className="mx-4 mt-2" onClick={closeMobile}>
                View Resume <FileText className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </nav>
      </div>
    </header>
  );
}
