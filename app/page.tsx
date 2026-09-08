import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  Code2,
  Mail,
  Users2,
  Users,
  Briefcase,
  Code,
  ArrowDown,
  ChevronRight,
  Monitor,
  Server,
  Database,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import SkillBadge from "@/components/skill-badge";
import ProjectsSection from "@/components/projects-section";
import ExperienceItem from "@/components/experience-item";
import Header from "@/components/header";
import HeroBackground from "@/components/hero-background";
import AnimatedProfile from "@/components/animated-profile";
import AnimatedSkillTags from "@/components/animated-skill-tags";
import TypingEffect from "@/components/typing-effect";
import ScrollAnimation from "@/components/scroll-animation";
import SectionHeader from "@/components/section-header";
import AnimatedList from "@/components/animated-list";
import {
  fadeUpVariant,
  slideInLeftVariant,
  slideInRightVariant,
  scaleUpVariant,
} from "@/lib/animation-variants";
import PortfolioChatbot from "@/components/portfolio-chatbot";
import ResumeModal from "@/components/resume-modal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section - Redesigned with prominent profile image */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16 md:py-0">
          <HeroBackground />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left column - Profile image (moved from right to left for more prominence) */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
                  <AnimatedProfile
                    src="/images/profile-new.png"
                    alt="Erven Idjad"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Right column - Text content */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-block px-4 py-1.5 bg-primary/8 text-primary rounded-full text-sm font-medium animate-slide-up">
                  Software Engineer
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up animate-delay-100 leading-[1.1]">
                  Hi, I'm <span className="text-primary">Erven Idjad</span>
                </h1>

                <div className="text-lg md:text-xl text-muted-foreground animate-slide-up animate-delay-200">
                  I build{" "}
                  <TypingEffect
                    texts={[
                      "full-stack web applications",
                      "AI-powered products",
                      "enterprise platforms at scale",
                      "mobile experiences",
                    ]}
                    className="text-primary font-medium"
                  />
                </div>

                <AnimatedSkillTags
                  skills={[
                    "Python",
                    "TypeScript",
                    "AI-assisted engineering",
                    "React",
                    "Next.js",
                    "Cloud",
                  ]}
                  className="pt-2"
                />

                <div className="flex flex-wrap gap-3 pt-4 animate-slide-up animate-delay-400">
                  <Button asChild size="lg">
                    <Link href="#contact">Get in touch</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="group">
                    <Link href="#projects">
                      View my work
                      <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Skill categories */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-md pt-6 animate-fade-in animate-delay-500">
                  <div className="flex flex-col items-center justify-center p-3 bg-card/80 backdrop-blur-sm rounded-xl hover:bg-card transition-colors duration-300">
                    <Monitor className="h-5 w-5 text-primary mb-1.5" />
                    <span className="text-xs font-medium text-center">
                      Frontend
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card/80 backdrop-blur-sm rounded-xl hover:bg-card transition-colors duration-300">
                    <Server className="h-5 w-5 text-primary mb-1.5" />
                    <span className="text-xs font-medium text-center">
                      Backend
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card/80 backdrop-blur-sm rounded-xl hover:bg-card transition-colors duration-300">
                    <Database className="h-5 w-5 text-primary mb-1.5" />
                    <span className="text-xs font-medium text-center">
                      Database
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card/80 backdrop-blur-sm rounded-xl hover:bg-card transition-colors duration-300">
                    <Smartphone className="h-5 w-5 text-primary mb-1.5" />
                    <span className="text-xs font-medium text-center">
                      Mobile
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full w-10 h-10 p-0"
              >
                <Link href="#about">
                  <ArrowDown className="h-5 w-5" />
                  <span className="sr-only">Scroll down</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-20 py-16 bg-muted/50">
          <div className="container space-y-6">
            <SectionHeader
              title="About Me"
              subtitle="Building software that solves real problems for real people"
              className="max-w-3xl mx-auto"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center pt-8">
              <ScrollAnimation
                variants={slideInLeftVariant}
                className="space-y-4"
              >
                <p className="text-base leading-7">
                  I'm a Software Engineer who builds enterprise systems and
                  AI-powered products. Most recently at SparkSoft Solution, I
                  architected platforms serving 15,000+ employees — from
                  attendance systems with biometric integration to government ID
                  verification with end-to-end encryption.
                </p>
                <p className="text-base leading-7">
                  I have also delivered remote product work for SignalAEO and
                  Center Court Capital, spanning answer-engine visibility,
                  Android device-fleet automation, ticket-market monitoring,
                  and secondary-listing matching. I use AI-assisted engineering tools such as
                  Claude Code and OpenAI Codex responsibly to accelerate
                  research, implementation, testing, and review.
                </p>
              </ScrollAnimation>

              <ScrollAnimation
                variants={slideInRightVariant}
                className="grid grid-cols-2 gap-3"
              >
                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.1 }}
                  className="bg-card p-5 rounded-xl hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-3xl text-primary">2+</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Years Experience
                  </p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.2 }}
                  className="bg-card p-5 rounded-xl hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-3xl text-primary">20+</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Projects Shipped
                  </p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.3 }}
                  className="bg-card p-5 rounded-xl hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-3xl text-primary">15K+</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Users Served</p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.4 }}
                  className="bg-card p-5 rounded-xl hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-3xl text-primary">3</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Industries</p>
                </ScrollAnimation>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-20 py-16 container">
          <div className="space-y-6">
            <SectionHeader
              title="Skills & Technologies"
              className="max-w-3xl mx-auto"
            />

            <div className="pt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <ScrollAnimation
                  variants={fadeUpVariant}
                  className="bg-card rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Programming Languages
                  </h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="js" name="JavaScript" />,
                      <SkillBadge key="ts" name="TypeScript" />,
                      <SkillBadge key="php" name="PHP" />,
                      <SkillBadge key="python" name="Python" />,
                      <SkillBadge key="csharp" name="C#" />,
                      <SkillBadge key="html" name="HTML/CSS" />,
                      <SkillBadge key="cpp" name="C++" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  variants={fadeUpVariant}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-xl p-5 md:row-span-2"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Technologies & Frameworks
                  </h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="react" name="React.js" />,
                      <SkillBadge key="rn" name="React Native" />,
                      <SkillBadge key="next" name="Next.js" />,
                      <SkillBadge key="expo" name="Expo" />,
                      <SkillBadge key="rest" name="REST APIs" />,
                      <SkillBadge key="git" name="Git" />,
                      <SkillBadge key="tailwind" name="Tailwind CSS" />,
                      <SkillBadge key="amplify" name="AWS Amplify" />,
                      <SkillBadge key="s3" name="AWS S3" />,
                      <SkillBadge key="postgres" name="PostgreSQL" />,
                      <SkillBadge key="dynamodb" name="DynamoDB" />,
                      <SkillBadge key="supabase" name="Supabase" />,
                      <SkillBadge key="shadcn" name="Shadcn/UI" />,
                      <SkillBadge key="graphql" name="GraphQL" />,
                      <SkillBadge key="aspnet" name="ASP.NET Core" />,
                      <SkillBadge key="ef" name="Entity Framework" />,
                      <SkillBadge key="fastapi" name="FastAPI" />,
                      <SkillBadge key="prisma" name="Prisma" />,
                      <SkillBadge key="zustand" name="Zustand" />,
                      <SkillBadge key="recharts" name="Recharts" />,
                      <SkillBadge key="antd" name="Ant Design" />,
                      <SkillBadge key="vite" name="Vite" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  variants={fadeUpVariant}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data Science & ML
                  </h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="openai" name="OpenAI API" />,
                      <SkillBadge key="ollama" name="Ollama" />,
                      <SkillBadge key="llm" name="LLM Integration" />,
                      <SkillBadge key="nlp" name="NLP" />,
                      <SkillBadge key="prompt" name="Prompt Engineering" />,
                      <SkillBadge key="claude" name="Claude Code" />,
                      <SkillBadge key="codex" name="OpenAI Codex" />,
                      <SkillBadge key="hf" name="HuggingFace" />,
                      <SkillBadge key="opencv" name="OpenCV" />,
                      <SkillBadge key="yolo" name="YOLOv8" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  variants={fadeUpVariant}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    Developer Tools
                  </h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="vscode" name="Visual Studio Code" />,
                      <SkillBadge key="vitest" name="Vitest" />,
                      <SkillBadge key="playwright" name="Playwright" />,
                      <SkillBadge key="mysql" name="MySQL" />,
                      <SkillBadge key="graphql-tool" name="GraphQL" />,
                      <SkillBadge key="github" name="GitHub" />,
                      <SkillBadge key="claude-code" name="Claude Code" />,
                      <SkillBadge key="openai-codex" name="OpenAI Codex" />,
                      <SkillBadge key="cursor" name="Cursor" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-20 py-16 container">
          <div className="space-y-6">
            <SectionHeader
              title="Work Experience"
              className="max-w-3xl mx-auto"
            />

            <ScrollAnimation
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="pt-8 space-y-8"
            >
              <ScrollAnimation variants={fadeUpVariant}>
                <ExperienceItem
                  title="Software Engineer"
                  company="SparkSoft Solution, Inc."
                  period="Jun 2024 - Apr 2026"
                  description="Architected and deployed full-stack enterprise systems using Next.js 14, TypeScript, and AWS Amplify, supporting 15,000+ employees with real-time biometric integration and hardened security."
                  technologies={[
                    "Next.js 14",
                    "TypeScript",
                    "AWS Amplify",
                    "GraphQL",
                    "AWS S3",
                    "Node.js",
                    "Express",
                    "AES Encryption",
                  ]}
                  achievements={[
                    "Architected and deployed a full-stack attendance management system successfully supporting 15,000+ employees",
                    "Engineered real-time biometric hardware integrations and automated data export pipelines, reducing HR processing time by 75%",
                    "Developed a high-performance enterprise analytics dashboard with geofenced tracking and multi-format reporting",
                    "Hardened system security by building a Node.js/Express backend with AES-encrypted QR decryption, GraphQL integration, and secure S3 proxy",
                  ]}
                />
              </ScrollAnimation>

              <ScrollAnimation
                variants={fadeUpVariant}
                transition={{ delay: 0.1 }}
              >
                <ExperienceItem
                  title="Software Engineer"
                  company="SignalAEO"
                  period="May 2026 - Present · Remote"
                  description="Build and maintain an AEO visibility platform, Android device fleet, and client operations tools for local-business search performance."
                  technologies={[
                    "TypeScript",
                    "React",
                    "Node.js",
                    "PostgreSQL",
                    "Playwright",
                    "Android Automation",
                    "Stripe",
                  ]}
                  achievements={[
                    "Built cross-platform AEO monitoring and rank-quality controls across ChatGPT, Gemini, Microsoft Copilot, and Google",
                    "Developed fleet and voice-search tooling with health checks, tunnel recovery, job routing, and search-result evidence capture",
                    "Delivered role-scoped client and admin dashboards, readable reports, Stripe billing, and provider-backed email status tracking",
                  ]}
                />
              </ScrollAnimation>

              <ScrollAnimation
                variants={fadeUpVariant}
                transition={{ delay: 0.2 }}
              >
                <ExperienceItem
                  title="Software Engineer (Contract)"
                  company="Center Court Capital"
                  period="May 2026 - Aug 2026 · Remote"
                  description="Built reliable ticket-market monitoring and secondary-listing matching capabilities for internal operations."
                  technologies={[
                    "TypeScript",
                    "React",
                    "Playwright",
                    "Node.js",
                    "Automated Testing",
                    "Data Integration",
                  ]}
                  achievements={[
                    "Implemented typed polling and secondary-listing matching with section normalization, fuzzy matching, and filter UI integration",
                    "Built Playwright capture workflows and reproducible market-data research across multiple venue archetypes",
                    "Added extensive unit and integration coverage for matching, polling, and data-quality gates",
                  ]}
                />
              </ScrollAnimation>

              <ScrollAnimation
                variants={fadeUpVariant}
                transition={{ delay: 0.3 }}
              >
                <ExperienceItem
                  title="Technical SEO & AEO Web Developer"
                  company="Independent"
                  period="Oct 2025 - Jul 2026 · Remote"
                  description="Improved discoverability, crawlability, and on-page quality for a local-service website built with Next.js."
                  technologies={[
                    "Next.js",
                    "Technical SEO",
                    "Schema.org",
                    "JSON-LD",
                    "Vercel Analytics",
                    "Performance Optimization",
                  ]}
                  achievements={[
                    "Implemented canonical metadata, Open Graph data, and structured ChildCare schema for richer search and answer-engine context",
                    "Shipped sitemap and robots routes plus Google Search Console verification to support indexing and crawlability",
                    "Improved image delivery and content accuracy while adding analytics for measurement",
                  ]}
                />
              </ScrollAnimation>
            </ScrollAnimation>

            <ScrollAnimation
              variants={slideInRightVariant}
              className="text-center pt-8"
            >
              <ResumeModal
                trigger={
                  <Button>
                    View Full Resume <Download className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </ScrollAnimation>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 bg-muted/50">
          <div className="container space-y-6">
            <SectionHeader title="Education" className="max-w-3xl mx-auto" />

            <ScrollAnimation
              variants={fadeUpVariant}
              className="pt-8 max-w-3xl mx-auto"
            >
              <div className="border-l-2 border-primary/30 pl-6 pb-2 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">
                      Bachelor's in Computer Science
                    </h3>
                    <span className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      August 2020 - May 2024
                    </span>
                  </div>
                  <p className="text-lg text-primary font-medium">
                    Western Mindanao State University, Zamboanga City, PH
                  </p>
                  <p className="text-muted-foreground">
                    Academic Award: Best in Portfolio
                  </p>
                  <div className="pt-2">
                    <p className="text-muted-foreground">Key courses:</p>
                    <p className="text-muted-foreground">
                      Object-Oriented Programming, Data Structures & Algorithms,
                      Software Engineering, Database Systems, Computer Networks,
                      Artificial Intelligence, Machine Learning, Linear Algebra,
                      Discrete Mathematics
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="scroll-mt-20 py-16 relative overflow-hidden"
        >
          <div className="container">
            <SectionHeader
              title="Get In Touch"
              subtitle="Have a project in mind? Let's talk."
              className="max-w-3xl mx-auto mb-8"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollAnimation
                variants={slideInLeftVariant}
                className="space-y-4"
              >
                <div className="space-y-3 pt-4">
                  <a
                    href="mailto:ervenidjad12@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">
                        ervenidjad12@gmail.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/ervenderr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">GitHub</p>
                      <p className="text-sm font-medium">
                        github.com/ervenderr
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/erven-idjad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">LinkedIn</p>
                      <p className="text-sm font-medium">
                        linkedin.com/in/erven-idjad
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://mywebsite-rouge-one.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                      <p className="text-sm font-medium">
                        mywebsite-rouge-one.vercel.app
                      </p>
                    </div>
                  </a>
                </div>
              </ScrollAnimation>

              <ScrollAnimation
                variants={slideInRightVariant}
                className="bg-card p-6 rounded-xl transition-colors duration-300"
              >
                <ContactForm />
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/50">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Erven Idjad. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/ervenderr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Code2 className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/erven-idjad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:ervenidjad12@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://mywebsite-rouge-one.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="sr-only">Portfolio</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <PortfolioChatbot />
    </div>
  );
}
