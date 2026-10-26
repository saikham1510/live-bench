import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudySlugs, getProject, hasCaseStudy } from "@/content/projects";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return getCaseStudySlugs().map((slug) => ({ slug }));
}

const sections = [
    { id: "problem", heading: "The problem" },
    { id: "constraints", heading: "Constraints" },
    { id: "architecture", heading: "Architecture" },
    { id: "decisions", heading: "Key decisions" },
    { id: "bug", heading: "The hardest bug" },
    { id: "results", heading: "Results" },
    { id: "differently", heading: "What I'd do differently" },
]

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project || !hasCaseStudy(project)) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-3xl p-4">
            <nav aria-label="Breadcrumb" className="text-sm">
                <Link href="/#work">Work</Link> / {project.title}
            </nav>

            <h1 className="mt-4 text-3xl font-semibold">{project.title}</h1>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border px-2">
                        {tag}
                    </li>
                ))}
            </ul>

            {sections.map((s) => (
                <section>
                    <h2 className="text-xl font-semibold">{s.heading}</h2>
                    <p className="mt-2 text-sm">[Write-up goes here]</p>
                </section>
            ))}
        </article>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    return { title: project.title, description: project.summary };
}