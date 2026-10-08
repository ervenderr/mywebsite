import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import SmoothScroll from "@/components/smooth-scroll";
import { profile } from "@/lib/data/profile";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const TITLE = `${profile.name} | Software and AI Engineer`;
const DESCRIPTION =
  "Software and AI engineer in the Philippines. Built an attendance platform for 15,000+ employees, LLM analytics assistants and Android automation. React, Next.js, TypeScript, Python.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "LLM",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Android automation",
    "Erven Idjad",
  ],
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.site,
    title: TITLE,
    description: DESCRIPTION,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.site,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: "Zamboanga City", addressCountry: "PH" },
  alumniOf: "Western Mindanao State University",
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <Sonner />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}
