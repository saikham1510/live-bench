import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";
import { CopyEmailButton } from "@/components/site/CopyEmailButton";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <Hero />

      <section id="work">
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
      </section>

      <section id="about">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="mt-2 text-sm">[About text]</p>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="mt-2 text-sm">[Skill groups]</p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2 text-sm">[Contact form]</p>
        <div className="mt-4">
          <a href="mailto:saikham6276@gmail.com">saikham6276@gmail.com</a>
          <CopyEmailButton email="saikham6276@gmail.com" />
        </div>
      </section>
    </>
  )
}