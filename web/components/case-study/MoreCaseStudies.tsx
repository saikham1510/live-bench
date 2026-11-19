import Link from "next/link";
import { getNextFeatured, hasCaseStudy } from "@/content/projects";

const card = "flex flex-col gap-1 rounded-card border border-line p-[18px] lg:gap-1.5 lg:p-[22px]";
const small = "text-[13px] text-muted lg:text-sm";
const big = "text-[17px] font-semibold lg:text-lg";

export function MoreCaseStudies({ currentSlug }: { currentSlug: string }) {
    const next = getNextFeatured(currentSlug);

    return (
        <nav
            aria-label="More case studies"
            className="grid gap-2.5 border-t border-line pt-6 lg:grid-cols-2 lg:gap-4 lg:pt-8"
        >
            <Link href="/#work" className={`${card} bg-surface hover:border-ink max-lg:order-last`}>
                <span className={small}>Back to</span>
                <span className={big}>All work</span>
            </Link>

            {next && hasCaseStudy(next) && (
                <Link href={`/projects/${next.slug}`} className={`${card} bg-surface hover:border-ink`}>
                    <span className={small}>Next case study</span>
                    <span className={big}>{next.title}</span>
                </Link>
            )}

            {next && !hasCaseStudy(next) && (
                <div className={`${card} bg-surface-alt`}>
                    <span className={small}>Next case study</span>
                    <span className={big}>{next.title}</span>
                    {next.writeupNote && <span className={small}>{next.writeupNote}</span>}
                </div>
            )}
        </nav>
    );
}