import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyBlock } from "@/components/case-study/CaseStudyBlock";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyToc } from "@/components/case-study/CaseStudyToc";
import { MobileToc } from "@/components/case-study/MobileToc";
import { Container } from "@/components/site/Container";
import { getCaseStudy } from "@/content/case-studies";
import { getCaseStudySlugs, getProject, hasCaseStudy } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project || !hasCaseStudy(project)) {
        notFound();
    }

    const caseStudy = getCaseStudy(slug);
    if (!caseStudy) {
        throw new Error(`"${slug}" is featured and shipped, but content/case-studies.ts has no entry for it.`);
    }

    const toc = caseStudy.sections.map((section, index) => ({
        id: section.id,
        label: `${index + 1}. ${section.title}`,
    }))

    return (
        <>
            <CaseStudyHeader project={project} caseStudy={caseStudy} />

            {caseStudy.liveSlot && (
                <Container className="pt-6 lg:pt-12">
                    <CaseStudyBlock block={{ kind: "placeholder", text: caseStudy.liveSlot }} />
                </Container>
            )}

            <Container className="grid grid-cols-1 gap-11 pt-6 pb-14 lg:pt-18 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-20 lg:pb-22">

                <CaseStudyToc items={toc} />
                <MobileToc items={toc} />

                <article className="flex max-w-[800px] flex-col gap-11 lg:gap-16">
                    {caseStudy.sections.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            aria-labelledby={`${section.id}-title`}
                            className="flex flex-col gap-4 lg:gap-5"
                        >
                            <h2 id={`${section.id}-title`} className="text-[27px] leading-[1.15] font-light lg:text-[32px]">
                                {index + 1}. {section.title}
                            </h2>
                            {section.blocks.map((block, blockIndex) => (
                                <CaseStudyBlock key={blockIndex} block={block} />
                            ))}
                        </section>
                    ))}
                </article>
            </Container>
        </>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    return { title: project.title, description: project.summary };
}