import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import SmoothScroll from "@/components/smooth-scroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Erven Idjad | Software Engineer Portfolio",
  description:
    "Software Engineer specializing in full-stack development with React.js, Next.js, TypeScript, and AWS. Experienced in building enterprise applications and AI-powered solutions.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "AWS",
    "TypeScript",
    "JavaScript",
    "AI/ML",
    "Erven Idjad",
    "Portfolio",
  ],
  authors: [{ name: "Erven Idjad", url: "https://ervenderr.vercel.app" }],
  creator: "Erven Idjad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ervenderr.vercel.app",
    title: "Erven Idjad | Software Engineer Portfolio",
    description:
      "Software Engineer specializing in full-stack development with React.js, Next.js, TypeScript, and AWS.",
    siteName: "Erven Idjad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erven Idjad | Software Engineer Portfolio",
    description:
      "Software Engineer specializing in full-stack development with React.js, Next.js, TypeScript, and AWS.",
    creator: "@ervenderr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
          <Sonner />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}
import "./globals.css";
