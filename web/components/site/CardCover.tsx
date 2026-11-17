import type { ProjectCover } from "@/content/projects";

function LiveCover() {
    return (
        <div className="flex h-42 flex-col justify-between bg-ink p-5 lg:h-54">
            <div className="flex items-center justify-between gap-4 text-[13px] text-on-dark">
                <span className="flex items-center gap-2 font-semibold">
                    <span className="flex items-center gap-2 bg-on-dark" aria-hidden />
                        Bench testing
                </span>
                <span className="font-mono">bench-01</span>
            </div>
            <div className="flex flex-col gap-1.5">
                <p className="font-mono text-sm text-on-dark-link">ESP32 → MQTT → FastAPI → Next.js</p>
                <p className="text-sm text-on-dark">Live readings on this site in upcoming months</p>
            </div>
        </div>
    );
}

function FactsCover({ lines }: { lines: string[] }) {
    return (
        <ul className="flex h-42 flex-col justify-end gap-1.5 border-b border-line bg-surface-alt p-5 lg:h-54">
            {lines.map((line) => (
                <li key={line} className="font-mono text-sm text-ink-soft">
                    {line}
                </li>
            ))}
        </ul>
    );
}

export function CardCover({ cover }: { cover: ProjectCover }) {
    switch (cover.kind) {
        case "live":
            return <LiveCover />;
        case "facts":
            return <FactsCover lines={cover.lines} />;
        default: {
            const unhandled: never = cover;
            return unhandled;
        }
    }
}