import SiteHeader from "@/components/site/header";
import Hero from "@/components/site/hero";
import Brief from "@/components/site/brief";
import Experience from "@/components/site/experience";
import Work from "@/components/site/work";
import Skills from "@/components/site/skills";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";
import PortfolioChatbot from "@/components/portfolio-chatbot";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Brief />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
