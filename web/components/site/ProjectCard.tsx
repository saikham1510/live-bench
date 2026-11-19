import Link from "next/link";
import { hasCaseStudy, type Project } from "@/content/projects";
import { CardCover } from "./CardCover";
import { ClockIcon } from "./icons";
import { TagList } from "./TagList";

type CardProps = { project: Project };

const featuredCard = "flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface";
const featuredBody = "flex flex-1 flex-col gap-3 p-5 lg:p-6";
const featuredTitle = "text-2xl font-medium tracking-tight lg:text-title";

function CaseStudyCard({ project }: CardProps) {
    return (
        <article 
            className={`${featuredCard} relative hover:border-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent`}
        >
            {project.cover && <CardCover cover={project.cover} />}
            <div className={featuredBody}>
                <TagList tags={project.tags} />
                <h3 className={featuredTitle}>
                    <Link 
                        href={`/projects/${project.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                        {project.title}
                    </Link>
                </h3>
                <p className="leading-normal text-ink-soft">{project.summary}</p>
                <p className="text-sm text-muted">{project.meta}</p>
                <p className="mt-auto pt-2 text-[15px] font-semibold text-accent">Read the case study</p>
            </div>
        </article>
    )
}

function PendingCard({ project }: CardProps) {
    return (
        <article className={featuredCard}>
            {project.cover && <CardCover cover={project.cover} />}
            <div className={featuredBody}>
                <TagList tags={project.tags} />
                <h3 className={featuredTitle}>{project.title}</h3>
                <p className="leading-normal text-ink-soft">{project.summary}</p>
                <p className="text-sm text-muted">{project.meta}</p>
                {project.writeupNote && (
                    <p className="mt-auto flex items-center gap-2 pt-2 text-sm text-ink-soft">
                        <ClockIcon className="size-4 shrink-0 text-muted" />
                        {project.writeupNote}
                    </p>
                )}
            </div>
        </article>
    )
}

function CompactCard({ project }: CardProps) {
    return (
        <article className="flex h-full flex-col gap-2.5 rounded-card border border-line bg-surface-alt p-[18px] lg:p-[22px]">
            <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-[17px] font-semibold lg:text-lg">{project.title}</h4>
                <span className="shrink-0 text-right text-[13px] text-muted">{project.meta}</span>
            </div>
            <p className="text-[15px] leading-normal text-ink-soft">{project.summary}</p>
            <TagList tags={project.tags} />
            {project.links && project.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-x-5 text-[15px] font-medium">
                    {project.links.map((link) => (
                        <a 
                            key={link.href}
                            href={link.href}
                            className="inline-flex min-h-11 items-center text-accent hover:text-accent-hover"
                            >
                                {link.label}
                        </a>
                    ))}
                </div>
            )}
        </article>
    )
}

export function ProjectCard({ project }: CardProps) {
    if (hasCaseStudy(project)) return <CaseStudyCard project={project} />;
    if (project.featured) return <PendingCard project={project} />;
    return <CompactCard project={project} />;
}