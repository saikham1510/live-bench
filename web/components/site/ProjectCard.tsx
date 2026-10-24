import Link from "next/link";
import { hasCaseStudy, type Project } from "@/content/projects";

function CardAction({ project }: { project: Project }) {
    if (hasCaseStudy(project)) {
        return <Link href={`/projects/${project.slug}`}>Read the case study →</Link>
    }
    if (project.featured) {
        return <span className="opacity-60">Case study coming after assessment</span>
    }
    if (project.codeUrl) {
        return (
            <a href={project.codeUrl} target="_blank" rel="noreferrer">
                Code ↗
            </a>
        );
    }
    return null;
}

export function ProjectCard({ project }: { project: Project}) {
    return (
        <article className="rounded border p-4">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm">{project.summary}</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border px-2">
                        {tag}
                    </li>
                ))}
            </ul>
            <div className="mt-3 text-sm">
                <CardAction project={project} />
            </div>
        </article>
    )
}