import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";
import { CopyEmailButton } from "@/components/site/CopyEmailButton";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/home/Section";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <Hero />

      <Section 
        id="work"
        title="Work"
        intro="Case studies tell the full story. Smaller projects link straight to the code."
        tone="surface"
      >
        <h2 className="text-2xl font-semibold">Work</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <h3 className="mt-8 font-semibold">More projects</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {more.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <About />

      <Skills />

      <Contact />
    </>
  )
}