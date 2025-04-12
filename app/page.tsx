import { Button } from "@/components/ui/button"
import {
  Download,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Coffee,
  Users,
  Briefcase,
  Code,
  ArrowDown,
  ChevronRight,
  Monitor,
  Server,
  Database,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ExperienceItem from "@/components/experience-item"
import { ThemeToggle } from "@/components/theme-toggle"
import HeroBackground from "@/components/hero-background"
import AnimatedProfile from "@/components/animated-profile"
import AnimatedSkillTags from "@/components/animated-skill-tags"
import TypingEffect from "@/components/typing-effect"
import ScrollAnimation from "@/components/scroll-animation"
import SectionHeader from "@/components/section-header"
import AnimatedList from "@/components/animated-list"
import {
  fadeUpVariant,
  slideInLeftVariant,
  slideInRightVariant,
  scaleUpVariant,
  fadeInVariant,
} from "@/lib/animation-variants"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary">Ervender</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="https://github.com/ervenderr" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/erven-idjad" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:ervenidjad12@gmail.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/resume.pdf" target="_blank">
                Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Redesigned with prominent profile image */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16 md:py-0">
          <HeroBackground />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left column - Profile image (moved from right to left for more prominence) */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
                  <AnimatedProfile src="/images/profile-new.png" alt="Erven Idjad" className="w-full h-full" />
                </div>
              </div>

              {/* Right column - Text content */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium animate-slide-up">
                  Software Engineer
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up animate-delay-100">
                  Hi, I'm <span className="text-primary">Erven Idjad</span>
                </h1>

                <div className="text-xl md:text-2xl text-muted-foreground animate-slide-up animate-delay-200">
                  I specialize in{" "}
                  <TypingEffect
                    texts={[
                      "building exceptional digital experiences",
                      "developing full-stack web applications",
                      "creating AI-powered solutions",
                      "transforming ideas into reality",
                    ]}
                    className="text-primary font-medium"
                  />
                </div>

                <AnimatedSkillTags skills={["React.js", "Next.js", "TypeScript", "AWS", "AI"]} className="pt-2" />

                <div className="flex flex-wrap gap-4 pt-4 animate-slide-up animate-delay-400">
                  <Button asChild size="lg" className="group relative overflow-hidden">
                    <Link href="#contact">
                      <span className="relative z-10">Get in touch</span>
                      <span className="absolute inset-0 bg-primary/80 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="group">
                    <Link href="#projects">
                      View my work
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Skill categories */}
                <div className="grid grid-cols-4 gap-4 max-w-md pt-6 animate-fade-in animate-delay-500">
                  <div className="flex flex-col items-center justify-center p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-background/90 transition-colors">
                    <Monitor className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs text-center">Frontend</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-background/90 transition-colors">
                    <Server className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs text-center">Backend</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-background/90 transition-colors">
                    <Database className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs text-center">Database</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-background/90 transition-colors">
                    <Smartphone className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs text-center">Mobile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
              <Button variant="ghost" size="sm" asChild className="rounded-full w-10 h-10 p-0">
                <Link href="#about">
                  <ArrowDown className="h-5 w-5" />
                  <span className="sr-only">Scroll down</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-muted/50">
          <div className="container space-y-6">
            <SectionHeader
              title="About Me"
              subtitle="A passionate software engineer with a focus on creating impactful solutions"
              className="max-w-3xl mx-auto"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center pt-8">
              <ScrollAnimation variants={slideInLeftVariant} className="space-y-4">
                <p>
                  I'm a Junior Software Engineer at SparkSoft Solution, Inc., specializing in full-stack development
                  with React.js, Next.js, and AWS technologies. With a strong foundation in computer science, I
                  transform complex problems into elegant, user-friendly solutions.
                </p>
                <p>
                  My expertise spans from developing AI-powered security systems to building responsive web
                  applications. I'm driven by a passion for clean code, innovative solutions, and continuous learning.
                  Let's create something amazing together!
                </p>
              </ScrollAnimation>

              <ScrollAnimation variants={slideInRightVariant} className="grid grid-cols-2 gap-4">
                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.1 }}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-4xl text-primary">2+</h3>
                  </div>
                  <p className="text-muted-foreground">Years Experience</p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.2 }}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-4xl text-primary">18</h3>
                  </div>
                  <p className="text-muted-foreground">Projects Completed</p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.3 }}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-4xl text-primary">5</h3>
                  </div>
                  <p className="text-muted-foreground">Clients Served</p>
                </ScrollAnimation>

                <ScrollAnimation
                  variants={scaleUpVariant}
                  transition={{ delay: 0.4 }}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-4xl text-primary">1000+</h3>
                  </div>
                  <p className="text-muted-foreground">Cups of Coffee</p>
                </ScrollAnimation>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 container">
          <div className="space-y-6">
            <SectionHeader
              title="Skills & Technologies"
              subtitle="The tools and technologies I use to bring products to life"
              className="max-w-3xl mx-auto"
            />

            <div className="pt-8">
              <div className="space-y-6">
                <ScrollAnimation variants={fadeUpVariant}>
                  <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="js" name="JavaScript" />,
                      <SkillBadge key="php" name="PHP" />,
                      <SkillBadge key="python" name="Python" />,
                      <SkillBadge key="html" name="HTML/CSS" />,
                      <SkillBadge key="cpp" name="C++" />,
                      <SkillBadge key="ts" name="TypeScript" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation variants={fadeUpVariant} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-semibold mb-4">Technologies & Frameworks</h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="react" name="React.js" />,
                      <SkillBadge key="next" name="Next.js" />,
                      <SkillBadge key="rest" name="REST APIs" />,
                      <SkillBadge key="git" name="Git" />,
                      <SkillBadge key="bootstrap" name="Bootstrap" />,
                      <SkillBadge key="tailwind" name="Tailwind CSS" />,
                      <SkillBadge key="amplify" name="AWS Amplify" />,
                      <SkillBadge key="s3" name="S3" />,
                      <SkillBadge key="shadcn" name="Shadcn" />,
                      <SkillBadge key="graphql" name="GraphQL" />,
                      <SkillBadge key="opencv" name="OpenCV" />,
                      <SkillBadge key="yolo" name="YOLOv8" />,
                      <SkillBadge key="flask" name="Flask" />,
                      <SkillBadge key="fastapi" name="FastAPI" />,
                      <SkillBadge key="prisma" name="Prisma" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation variants={fadeUpVariant} transition={{ delay: 0.2 }}>
                  <h3 className="text-xl font-semibold mb-4">Data Science & ML</h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="sklearn" name="scikit-learn" />,
                      <SkillBadge key="pandas" name="pandas" />,
                      <SkillBadge key="nltk" name="nltk" />,
                      <SkillBadge key="tesseract" name="Tesseract OCR" />,
                      <SkillBadge key="cv" name="Computer Vision" />,
                      <SkillBadge key="nlp" name="NLP" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>

                <ScrollAnimation variants={fadeUpVariant} transition={{ delay: 0.3 }}>
                  <h3 className="text-xl font-semibold mb-4">Developer Tools</h3>
                  <AnimatedList
                    items={[
                      <SkillBadge key="vscode" name="Visual Studio Code" />,
                      <SkillBadge key="intellij" name="IntelliJ" />,
                      <SkillBadge key="mysql" name="MySQL" />,
                      <SkillBadge key="github" name="GitHub" />,
                      <SkillBadge key="copilot" name="Copilot" />,
                      <SkillBadge key="cursor" name="Cursor" />,
                      <SkillBadge key="sqlite" name="SQLite3" />,
                      <SkillBadge key="mongodb" name="MongoDB" />,
                      <SkillBadge key="jupyter" name="Jupyter Notebook" />,
                    ]}
                    className="flex flex-wrap gap-2"
                  />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 bg-muted/50">
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
              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Smart Entry Gate Security System"
                  description="An automated security system with 95% accuracy in facial and license plate recognition using OpenCV, YOLOv8, and Tesseract_OCR."
                  tags={["Python", "OpenCV", "YOLOv8", "Tesseract_OCR", "SQLite3", "ttkbootstrap"]}
                  imageUrl="/images/projects/smart-entry.png"
                  demoUrl="https://github.com/ervenderr"
                  repoUrl="https://github.com/ervenderr"
                  role="Full Stack Developer (Thesis Project)"
                />
              </ScrollAnimation>

              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Fraud Detection in Job Postings"
                  description="An NLP and Machine Learning system that detects fraudulent job postings by analyzing text content and extracting relevant features."
                  tags={["Python", "scikit-learn", "NLP", "Flask", "pandas", "nltk"]}
                  imageUrl="/images/projects/fraud-detection.png"
                  demoUrl="https://github.com/ervenderr/Fraud-Detection-in-Job-Postings-using-NLP-and-Machine-Learning"
                  repoUrl="https://github.com/ervenderr/Fraud-Detection-in-Job-Postings-using-NLP-and-Machine-Learning"
                  role="Machine Learning Engineer"
                />
              </ScrollAnimation>

              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Philippine Legal Assistant"
                  description="A comprehensive legal research tool that combines NLP and ML to analyze Philippine legal documents, providing intelligent search and question-answering capabilities."
                  tags={["Python", "FastAPI", "Next.js", "NLP", "ML", "PDF Processing"]}
                  imageUrl="/images/projects/legal-assistant.png"
                  demoUrl="https://github.com/ervenderr"
                  repoUrl="https://github.com/ervenderr"
                  role="Full Stack Developer"
                />
              </ScrollAnimation>

              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Netflix Clone"
                  description="A clone of Netflix built using modern web technologies to mimic the look and functionality of the popular streaming service, including user authentication and video playback."
                  tags={["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "MongoDB"]}
                  imageUrl="/images/projects/netflix-clone.png"
                  demoUrl="https://github.com/ervenderr/Netflix-Clone"
                  repoUrl="https://github.com/ervenderr/Netflix-Clone"
                  role="Frontend Developer"
                />
              </ScrollAnimation>

              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Installation and Repair Management System"
                  description="A robust system for managing client bookings with a PHP backend integrated with MySQL database, featuring secure authentication and dynamic booking forms."
                  tags={["PHP", "JavaScript", "jQuery", "HTML/CSS", "Bootstrap", "MySQL"]}
                  imageUrl="/images/projects/repair-system.png"
                  demoUrl="https://github.com/ervenderr"
                  repoUrl="https://github.com/ervenderr"
                  role="Full Stack Developer"
                />
              </ScrollAnimation>

              <ScrollAnimation variants={scaleUpVariant}>
                <ProjectCard
                  title="Recipe Finder Application"
                  description="A web application that allows users to search for recipes based on ingredients, dietary restrictions, and meal types, providing detailed cooking instructions and nutritional information."
                  tags={["JavaScript", "React", "API Integration", "CSS", "Responsive Design"]}
                  imageUrl="/images/projects/recipe-finder.png"
                  demoUrl="https://github.com/ervenderr"
                  repoUrl="https://github.com/ervenderr"
                  role="Frontend Developer"
                />
              </ScrollAnimation>
            </ScrollAnimation>

            <ScrollAnimation variants={fadeInVariant} className="text-center pt-8">
              <Button asChild variant="outline">
                <Link href="https://github.com/ervenderr" target="_blank" rel="noopener noreferrer">
                  View more on GitHub <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 container">
          <div className="space-y-6">
            <SectionHeader
              title="Work Experience"
              subtitle="My professional journey and career highlights"
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
                  title="Junior Software Engineer"
                  company="SparkSoft Solution, Inc."
                  period="Oct 2024 - Present"
                  description="Assigned to the HRIS for Government, focusing on the admin-side where HR manages attendance, leaves, PSB, PDS, Payroll, and thousands of employee records."
                  technologies={["React.js", "Next.js", "AWS Amplify", "GraphQL", "S3", "GitHub Copilot"]}
                  achievements={[
                    "Designed and implemented admin-side features that improved attendance and biometrics management",
                    "Enhanced AWS Amplify implementation, leading to faster and more secure API interactions",
                    "Spearheaded the design and development of an intuitive UI/UX for the Attendance module",
                    "Integrated AI-powered GitHub Copilot, accelerating development speed by 70% and reducing code errors",
                  ]}
                />
              </ScrollAnimation>

              <ScrollAnimation variants={fadeUpVariant} transition={{ delay: 0.1 }}>
                <ExperienceItem
                  title="Software Engineer Trainee"
                  company="SparkSoft Solution, Inc."
                  period="June 2024 - Oct 2024"
                  description="Completed an intensive self-learning phase in the first month, mastering key technologies and tools including AWS Amplify, GraphQL, S3 bucket, React.js, Vite, Ant Design, and GitHub Copilot."
                  technologies={["React.js", "Next.js", "AWS Amplify", "GraphQL", "S3", "Ant Design"]}
                  achievements={[
                    "Demonstrated proficiency by developing a full-stack cat adoption application utilizing the newly acquired tech stack",
                    "Led the employee POV of the attendance module, delivering a responsive and user-friendly interface",
                    "Played a key role in migrating legacy React codebase to Next.js, improving maintainability and performance",
                    "Contributed to the design and implementation of user-friendly interfaces for efficient employee attendance management",
                  ]}
                />
              </ScrollAnimation>

              <ScrollAnimation variants={fadeUpVariant} transition={{ delay: 0.2 }}>
                <ExperienceItem
                  title="IT Intern"
                  company="Knowles Training Institute"
                  period="March 2024 - May 2024"
                  description="Enhanced website security, reducing breaches by monitoring and blocking suspicious IP addresses. Improved user experience on company websites using WordPress and Elementor."
                  technologies={["WordPress", "Elementor", "Web Security"]}
                  achievements={[
                    "Enhanced website security, reducing breaches by monitoring and blocking suspicious IP addresses",
                    "Improved user experience on company websites using WordPress and Elementor",
                    "Streamlined troubleshooting and issue resolution processes through effective collaboration",
                    "Ensured high-quality deployments by conducting thorough testing and quality assurance checks",
                  ]}
                />
              </ScrollAnimation>
            </ScrollAnimation>

            <ScrollAnimation variants={fadeInVariant} className="text-center pt-8">
              <Button asChild>
                <Link href="/resume.pdf" target="_blank">
                  Download Full Resume <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 bg-muted/50">
          <div className="container space-y-6">
            <SectionHeader
              title="Education"
              subtitle="My academic background and achievements"
              className="max-w-3xl mx-auto"
            />

            <ScrollAnimation variants={fadeUpVariant} className="pt-8 max-w-3xl mx-auto">
              <div className="border-l-4 border-primary pl-6 pb-2 relative">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">Bachelor's in Computer Science</h3>
                    <span className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      August 2020 - May 2024
                    </span>
                  </div>
                  <p className="text-lg text-primary font-medium">
                    Western Mindanao State University, Zamboanga City, PH
                  </p>
                  <p className="text-muted-foreground">Academic award, Best in Portfolio</p>
                  <div className="pt-2">
                    <p className="text-muted-foreground">Key courses:</p>
                    <p className="text-muted-foreground">
                      OOP, Data Structures, Algorithm, Software Engineering, Database System, Linear Algebra, Discrete
                      Mathematics
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="container">
            <SectionHeader
              title="Get In Touch"
              subtitle="Have a project in mind or want to discuss potential opportunities? Feel free to reach out!"
              className="max-w-3xl mx-auto mb-8"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollAnimation variants={slideInLeftVariant} className="space-y-4">
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:ervenidjad12@gmail.com" className="hover:text-primary transition-colors">
                      ervenidjad12@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-primary" />
                    <a
                      href="https://github.com/ervenderr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      github.com/ervenderr
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a
                      href="https://linkedin.com/in/erven-idjad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      linkedin.com/in/erven-idjad
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <a
                      href="https://ervenderr.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      ervenderr.vercel.app
                    </a>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variants={slideInRightVariant} className="bg-background p-6 rounded-lg shadow-sm">
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
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/erven-idjad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
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
              href="https://ervenderr.vercel.app"
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
    </div>
  )
}
