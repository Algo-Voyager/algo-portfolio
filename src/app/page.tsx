import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      {/* faint grid backdrop for the content below the hero */}
      <div className="relative bg-grid">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Stats />
        <Contact />
      </div>
    </main>
  );
}
