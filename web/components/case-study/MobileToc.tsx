import { ChevronDownIcon } from "@/components/site/icons";
import type { TocItem } from "./CaseStudyToc";

export function MobileToc({ items }: { items: TocItem[] }) {
    return (
        <details className="group rounded-card border border-line bg-surface lg:hidden">
            <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDownIcon className="size-[18px] transition-transform group-open:rotate-180" />
            </summary>
            <nav aria-label="On this page" className="border-t border-line-soft">
                <ol>
                    {items.map((item) => (
                        <li key={item.id} className="border-b border-line-soft last:border-b-0">
                            <a href={`#${item.id}`} className="flex min-h-11 items-center px-4 text-[15px] text-ink-soft">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
        </details>
    );
}