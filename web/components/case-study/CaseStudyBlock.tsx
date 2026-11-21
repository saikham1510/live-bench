import type { CaseStudyBlock as Block } from "@/content/case-studies";

const card = "rounded-card border border-line bg-surface";

function Rows({ rows } : { rows: { title: React.ReactNode; text: string}[] }) {
    return (
        <dl className={`${card} divide-y divide-line-soft`}>
            {rows.map((row, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-1 px-4 py-3.5 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-5 lg:px-5 lg:py-[18px]"
                >
                    <dt className="font-semibold">{row.title}</dt>
                    <dd className="text-[15px] leading-normal text-ink-soft lg:text-base">{row.text}</dd>
                </div>
            ))}
        </dl>
    )
}

function DownArrow() {
    return (
        <svg
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden
            className="absolute top-full left-1/2 h-6 w-4 -translate-x-1/2 text-muted lg:hidden"
        >
            <path d="M8 3v16M3 14l5 6 5-6" />
        </svg>
    );
}

function RightArrow() {
    return (
        <svg
            viewBox="0 0 28 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            aria-hidden
            className="absolute top-1/2 left-full hidden h-4 w-7 -translate-y-1/2 text-muted lg:block"
        >
            <path d="M3 8h20M18 3l6 5-6 5" />
        </svg>
    );
}

export function CaseStudyBlock({ block }: { block: Block } ) {
    switch (block.kind) {
        case "text":
            return <p className="text-[17px] leading-[1.65] text-ink-soft lg:text-lg">{block.text}</p>;

        case "rows":
            return <Rows rows={block.rows} />;

        case "flow": {
            const lastIndex = block.steps.length - 1;
            return (
                <ol className={`${card} grid gap-6 p-4 lg:grid-cols-4 lg:gap-7 lg:p-7`}>
                    {block.steps.map((step, index) => (
                        <li
                            key={step.name}
                            className="relative rounded-btn border-[1.5px] border-ink px-3.5 py-2.5 text-sm leading-snug lg:py-3.5 lg:text-center"
                        >
                            <span className="block font-semibold">{step.name}</span>
                            <span className="block text-muted">{step.detail}</span>
                            {index < lastIndex && (
                                <>
                                    <DownArrow />
                                    <RightArrow />
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            )
        }

        case "decisions":
            return (
                <>
                    {/* Desktop */}
                    <table className="hidden w-full border-collapse border border-line bg-surface text-left lg:table">
                        <thead className="bg-chip">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-semibold">Choose</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Over</th>
                                <th scope="col" className="px-4 py-3 font-semibold">Because</th>
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row) => (
                                <tr key={row.chose} className="border-t border-line-soft">
                                    <td className="px-4 py-3.5 align-top font-medium">{row.chose}</td>
                                    <td className="px-4 py-3.5 align-top">{row.over}</td>
                                    <td className="px-4 py-3.5 align-top leading-normal">{row.because}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Phone */}
                    <div className="lg:hidden">
                        <Rows 
                            rows={block.rows.map((row) => ({
                                title: (
                                    <>
                                        {row.chose} <span className="font-normal text-muted">over {row.over}</span>
                                    </>
                                ),
                                text: row.because,
                            }))}
                        />
                    </div>
                </>
            )

        case "code":
            return (
                <pre tabIndex={0} className="overflow-x-auto rounded-card bg-ink p-4 font-mono text-[13px] leading-relaxed text-surface lg:px-[22px] lg:py-5 lg:text-sm">
                    <code>{block.code}</code>
                </pre>
            )

        case "stats":
            return (
                <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
                    {block.stats.map((stat) => (
                        <li key={stat.label} className={`${card} flex flex-col gap-1.5 p-3.5 p-3.5 lg:p-[18px]`}>
                            <span className="font-mono text-3xl tabular-nums lg:text-4xl">{stat.value}</span>
                            <span className="text-[13px] leading-snug text-muted lg:text-sm">{stat.label}</span>
                        </li>
                    ))}
                </ul>
            )

        case "placeholder":
            return (
                <div className="flex min-h-44 items-center justify-center rounded-btn border border-dashed border-line-strong bg-surface-alt p-3 text-center text-[13px] text-muted lg:min-h-64">
                    {block.text}
                </div>
            )

        default: {
            const unhandled: never = block;
            return unhandled;
        }
    }
}