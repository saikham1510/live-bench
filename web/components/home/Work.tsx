import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/projects";
import { Section } from "./Section"

export function Work() {
    const featured = projects.filter((p) => p.featured);
    const more = projects.filter((p) => !p.featured);

    return (
        <Section
            id="work"
            title="Work"
            intro="Case studies tell the full story. Smaller projects link straight to the code."
            tone="surface"
        >
            <ul className="grid gap-6 lg:grid-cols-3">
                {featured.map((project) => (
                    <li key={project.slug}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>

            {more.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">More projects</h3>
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {more.map((project) => (
                            <li key={project.slug}>
                                <ProjectCard project={project} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </Section>
    )
}