import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ChevronLeftIcon } from "@/components/site/icons";
import { TagList } from "@/components/site/TagList";
import type { CaseStudy } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import { link } from "fs";

type Props = { project: Project; caseStudy: CaseStudy };

const textLink = "text-accent underline underline-offset-4 hover:text-accent-hover";

export function CaseStudyHeader({ project, caseStudy }: Props) {
    return (
        <header className="border-b border-line bg-surface">
            <Container className="flex flex-col gap-4 pt-5 pb-8 lg:gap-7 lg:pt-10 lg:pb-14">
                <nav aria-label="Breadcrumb" className="text-[15px]">
                    {/* Desktop */}
                    <ol className="hidden lg:flex">
                        <li>
                            <Link href="/#work" className={textLink}>
                                Work
                            </Link>
                        </li>
                        <li className="text-muted">
                            <span aria-hidden="true" className="mx-1.5">/</span>
                            <span aria-current="page">{project.title}</span>
                        </li>
                    </ol>
                    {/* Phones */}
                    <Link
                        href="/#work"
                        className="inline-flex min-h-11 items-center gap-1.5 text-accent hover:text-accent-hover lg:hidden"
                    >
                        <ChevronLeftIcon />
                        All work
                    </Link>
                </nav>

                <div className="flex max-w-[900px] flex-col gap-4 lg:gap-[18px]">
                    <h1 className="text-5xl font-light tracking-tight lg:text-7xl">{project.title}</h1>
                    <p className="text-lg leading-normal text-ink-soft lg:text-[22px]">{caseStudy.lede}</p>
                    {/* Tags sit above the title on desktop and under the lede on phone */}
                    <div className="lg:order-first">
                        <TagList tags={caseStudy.tags} />
                    </div>
                </div>

                <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 lg:grid-cols-4 lg:gap-6 lg:pt-6">
                    {caseStudy.facts.map((fact) => (
                        <div key={fact.label} className="flex flex-col gap-0.5 lg:gap-1.5">
                            <dt className="text-[13px] text-muted lg:text-sm">{fact.label}</dt>
                            <dd className="text-[15px] leading-snug lg:text-base">{fact.value}</dd>
                        </div>
                    ))}
                    {caseStudy.links.length > 0 && (
                        <div className="flex flex-col gap-0.5 lg:gap-1.5">
                            <dt className="text-[13px] text-muted lg:text-sm">Links</dt>
                            <dd className="flex flex-col gap-1 text-[15px] lg:text-base">
                                {caseStudy.links.map((link) => (
                                    <a key={link.href} href={link.href} className={textLink}>
                                        {link.label}
                                    </a>
                                ))}
                            </dd>
                        </div>
                    )}
                </dl>
            </Container>
        </header>
    )
}