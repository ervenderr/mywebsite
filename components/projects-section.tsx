"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/project-card";
import ProjectCardMulti from "@/components/project-card-multi";
import ScrollAnimation from "@/components/scroll-animation";
import SectionHeader from "@/components/section-header";
import { scaleUpVariant, fadeInVariant } from "@/lib/animation-variants";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    // Project 1: GuestPulse
    {
      type: "single",
      title: "GuestPulse - AI Analytics Assistant",
      description:
        "A sophisticated AI hotel analytics assistant that translates natural language into complex SQL queries and real-time visualizations. Features a 3-level deterministic routing engine with O(1) keyword indexing and LLM integration via Ollama/OpenAI.",
      tags: [
        "Next.js 15",
        "TypeScript",
        "PostgreSQL",
        "Ollama",
        "OpenAI",
        "Recharts",
        "Vitest",
        "AI/NLP",
      ],
      imageUrl: "/images/projects/guestpulse.png",
      role: "AI/Analytics Engineer",
    },
    // Project 2: SpotMe
    {
      type: "single",
      title: "SpotMe - Nearby Micro-Favor App",
      description:
        "A cross-platform mobile app connecting people needing quick help with nearby strangers within a 200m radius. Features panic button broadcasting, bounty-based task acceptance, QR code verification, real-time flash chat, and a karma-based trust system with glassmorphic UI.",
      tags: [
        "React Native",
        "Expo",
        "TypeScript",
        "Supabase",
        "PostGIS",
        "Zustand",
        "Real-time Chat",
        "Mobile",
      ],
      imageUrl: "/images/projects/spotme.png",
      demoUrl: "https://github.com/ervenderr/spotme",
      repoUrl: "https://github.com/ervenderr/spotme",
      role: "Full Stack Developer",
    },
    // Project 3: TaxSync PH
    {
      type: "single",
      title: "TaxSync PH - Tax & Business Management",
      description:
        "A full-stack tax compliance and business management platform for Philippine businesses featuring OCR receipt scanning, multi-platform sales tracking, expense management, automated tax calculations, bookkeeping, and interactive analytics dashboards.",
      tags: [
        "Next.js 16",
        "TypeScript",
        "Supabase",
        "Tesseract.js",
        "Recharts",
        "Tailwind CSS",
        "OCR",
        "FinTech",
      ],
      imageUrl: "/images/projects/taxsync-ph.png",
      demoUrl: "https://github.com/ervenderr/taxsync-ph",
      repoUrl: "https://github.com/ervenderr/taxsync-ph",
      role: "Full Stack Developer",
    },
    // Project 4: MediChain

    {
      type: "multi",
      title: "MediChain - Digital Health Wallet",
      description:
        "A modern, secure digital health records management system featuring comprehensive health record management, QR code sharing, emergency access, file attachments, and enhanced security with JWT authentication, hCaptcha bot protection, and rate limiting.",
      tags: [
        "Next.js 15",
        "TypeScript",
        "ASP.NET Core 8",
        "PostgreSQL",
        "Tailwind CSS",
        "React Query",
        "JWT",
        "Healthcare",
      ],
      imageUrls: [
        "/images/projects/medi1.png",
        "/images/projects/medi2.png",
        "/images/projects/medi3.png",
        "/images/projects/medi4.png",
      ],
      demoUrl: "https://medichain-health.vercel.app/",
      repoUrl: "https://github.com/ervenderr/MediChain",
      role: "Full Stack Developer",
    },
    // Project 4: Kitcha
    {
      type: "single",
      title: "Kitcha - Smart Grocery & Meal Planner",
      description:
        "A full-stack, AI-powered grocery and meal planning application that helps users manage pantry inventory, plan meals, track budgets, and reduce food waste. Features AI-powered recipe suggestions, automated meal planning, and smart notifications.",
      tags: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Google Gemini AI",
        "Express",
        "Tailwind CSS",
      ],
      imageUrl: "/images/projects/kitcha.png",
      demoUrl: "https://kitcha-ai.vercel.app/",
      repoUrl: "https://github.com/ervenderr/Smart-Grocery-Meal-Planner",
      role: "Full Stack Developer",
    },
    // Project 5: QC Employee ID
    {
      type: "single",
      title: "QC Employee ID Verification System",
      description:
        "Enterprise-grade ID verification system for Quezon City Hall featuring QR code scanning with AES encryption, dual-parameter authentication, reCAPTCHA protection, and AWS integration. Serves 15,000+ government employees with advanced security middleware.",
      tags: [
        "Node.js",
        "Express",
        "React.js",
        "AWS S3",
        "GraphQL",
        "QR Code",
        "Security",
        "Encryption",
      ],
      imageUrl: "/images/projects/qc-id-verification.png",
      demoUrl: "https://www.hrmd.quezoncity.gov.ph/verify-QC-employee-ID",
      role: "Full Stack Developer (SparkSoft)",
    },
    // Project 6: Fake News Detection
    {
      type: "single",
      title: "AI-Powered Fake News Detection System",
      description:
        "An intelligent system that detects fake news and tracks source credibility using advanced NLP and machine learning algorithms with real-time monitoring and comprehensive analytics dashboard.",
      tags: [
        "Python",
        "AI/ML",
        "NLP",
        "Fake News Detection",
        "Source Credibility",
        "Real-time Monitoring",
      ],
      imageUrl: "/images/projects/aiphisingdetection.png",
      demoUrl:
        "https://github.com/ervenderr/AI-Powered-Fake-News-Detection-System-with-Source-Credibility-Tracking",
      repoUrl:
        "https://github.com/ervenderr/AI-Powered-Fake-News-Detection-System-with-Source-Credibility-Tracking",
      role: "AI/ML Engineer",
    },
    // Project 7: Mae's Childcare
    {
      type: "single",
      title: "Mae's Childcare Website",
      description:
        "A modern, responsive website for a licensed childcare center featuring bilingual education programs, enrollment management, and parent communication tools.",
      tags: [
        "React.js",
        "Next.js",
        "Responsive Design",
        "Education",
        "Parent Portal",
        "UI/UX",
      ],
      imageUrl: "/images/projects/maeschildcare.png",
      demoUrl: "https://www.maeschildcare.com/",
      repoUrl: "https://github.com/ervenderr/maeschildcare",
      role: "Full Stack Developer",
    },
    // Project 8: Smart Entry Gate
    {
      type: "single",
      title: "Smart Entry Gate Security System",
      description:
        "An automated security system with 95% accuracy in facial and license plate recognition using OpenCV, YOLOv8, and Tesseract_OCR. Thesis project with real-world implementation.",
      tags: [
        "Python",
        "OpenCV",
        "YOLOv8",
        "Tesseract_OCR",
        "SQLite3",
        "Computer Vision",
        "AI",
      ],
      imageUrl: "/images/projects/smart-entry.png",
      demoUrl: "https://github.com/ervenderr",
      repoUrl: "https://github.com/ervenderr",
      role: "AI/ML Engineer (Thesis Project)",
    },
    // Project 9: Fraud Detection
    {
      type: "single",
      title: "Fraud Detection in Job Postings",
      description:
        "An NLP and Machine Learning system that detects fraudulent job postings by analyzing text content and extracting relevant features with 92% accuracy.",
      tags: [
        "Python",
        "scikit-learn",
        "NLP",
        "Flask",
        "pandas",
        "nltk",
        "Machine Learning",
      ],
      imageUrl: "/images/projects/fraud-detection.png",
      demoUrl:
        "https://github.com/ervenderr/Fraud-Detection-in-Job-Postings-using-NLP-and-Machine-Learning",
      repoUrl:
        "https://github.com/ervenderr/Fraud-Detection-in-Job-Postings-using-NLP-and-Machine-Learning",
      role: "Machine Learning Engineer",
    },
    // Project 10: Philippine Legal Assistant
    {
      type: "single",
      title: "Philippine Legal Assistant",
      description:
        "A comprehensive legal research tool that combines NLP and ML to analyze Philippine legal documents, providing intelligent search and question-answering capabilities.",
      tags: [
        "Python",
        "FastAPI",
        "Next.js",
        "NLP",
        "ML",
        "PDF Processing",
        "Legal Tech",
      ],
      imageUrl: "/images/projects/legal-assistant.png",
      demoUrl: "https://github.com/ervenderr",
      repoUrl: "https://github.com/ervenderr",
      role: "Full Stack Developer",
    },
    // Project 11: Repair Management
    {
      type: "single",
      title: "Repair Management Dashboard",
      description:
        "A comprehensive admin dashboard for installation and repair management system with real-time tracking, client management, and service analytics.",
      tags: [
        "React.js",
        "Dashboard",
        "Analytics",
        "Client Management",
        "Real-time Tracking",
      ],
      imageUrl: "/images/projects/repair-dashboard.png",
      demoUrl: "https://github.com/ervenderr",
      repoUrl: "https://github.com/ervenderr",
      role: "Frontend Developer",
    },
    // Project 12: Netflix Clone
    {
      type: "single",
      title: "Netflix Clone",
      description:
        "A pixel-perfect Netflix clone with user authentication, video streaming, personalized recommendations, and responsive design across all devices.",
      tags: [
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Prisma",
        "MongoDB",
        "Authentication",
      ],
      imageUrl: "/images/projects/netflix-clone.png",
      demoUrl: "https://github.com/ervenderr/Netflix-Clone",
      repoUrl: "https://github.com/ervenderr/Netflix-Clone",
      role: "Full Stack Developer",
    },
    // Project 13: Library Management
    {
      type: "single",
      title: "Library Management System",
      description:
        "A comprehensive library management system with book cataloging, member management, borrowing system, and automated fine calculations.",
      tags: [
        "PHP",
        "MySQL",
        "JavaScript",
        "Bootstrap",
        "Library Management",
        "Automation",
      ],
      imageUrl: "/images/projects/library-system.png",
      demoUrl: "https://github.com/ervenderr",
      repoUrl: "https://github.com/ervenderr",
      role: "Full Stack Developer",
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="scroll-mt-20 py-16 bg-muted/50">
      <div className="container space-y-6">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of my recent work and personal projects"
          className="max-w-3xl mx-auto"
        />

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8"
        >
          {visibleProjects.map((project, index) => (
            <ScrollAnimation key={index} variants={scaleUpVariant}>
              {project.type === "multi" ? (
                <ProjectCardMulti
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrls={project.imageUrls || []}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  role={project.role}
                />
              ) : (
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrl={project.imageUrl || ""}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  role={project.role}
                />
              )}
            </ScrollAnimation>
          ))}
        </ScrollAnimation>

        <div className="flex flex-col items-center gap-4 pt-8">
          {projects.length > 6 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="min-w-[200px]"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  See More Projects <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}

          <ScrollAnimation variants={fadeInVariant}>
            <Button asChild variant="outline">
              <Link
                href="https://github.com/ervenderr"
                target="_blank"
                rel="noopener noreferrer"
              >
                View more on GitHub <Code2 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
