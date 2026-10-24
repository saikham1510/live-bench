import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";
import benchPhoto from "@/public/images/bench.jpg";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-5xl space-y-16 p-4">
      <section id="top" className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm">Computer Engineering, Temasek Polytechnic</p>
          <h1 className="mt-2 text-4xl font-semibold">
            I build the whole path from sensor to screen.
          </h1>
          <Link href="/#work" className="mt-6 inline-block underline">
            See my work
          </Link>
        </div>
        <Image 
          src={benchPhoto}
          alt="ESP32 sensor board"
          placeholder="blur"
          loading="eager"
          className="h-auto w-full rounded"
        />
      </section>

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
      </section>
    </div>
  )
}