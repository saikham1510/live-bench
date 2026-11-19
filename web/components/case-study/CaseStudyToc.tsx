"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function CaseStudyToc({ items }: { items: TocItem[] }) {
    const [activeId, setActiveId] = useState(items[0]?.id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                }
            },
            { rootMargin: "-96px 0px -50% 0px" },
        );

        for (const item of items) {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        }

        return () => observer.disconnect();
    }, [items]);

    return (
        <nav aria-label="On this page" className="sticky top-24 hidden flex-col lg:flex">
            <p className="pb-2.5 text-sm font-semibold">On this page</p>
            <ol>
                {items.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`}
                            aria-current={item.id === activeId ? "true" : undefined}
                            onClick={() => setActiveId(item.id)}
                            className="block border-l-2 border-line py-2 pl-3.5 text-[15px] text-ink-soft hover:text-ink aria-[current=true]:font-semibold aria-[current=true]:text-ink"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}