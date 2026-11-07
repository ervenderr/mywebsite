import SiteHeader from "@/components/site/header";
import Hero from "@/components/site/hero";
import Brief from "@/components/site/brief";
import Background from "@/components/site/background";
import Work from "@/components/site/work";
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
        <Work />
        <Background />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
