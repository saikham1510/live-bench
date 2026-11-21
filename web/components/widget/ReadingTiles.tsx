import { formatClock } from "@/lib/format";
import type { Reading } from "@/types/telemetry";

const grid = "grid grid-cols-3 gap-2";
const tile = "flex flex-col gap-1 rounded-btn bg-canvas px-2.5 py-2.5 lg:px-3";
const label = "text-xs text-muted";
const number = "font-mono text-2xl leading-none tabular-nums lg:text-[26px]";
const unit = "font-sans text-sm font-medium lg:text-[15px]";

function Failed({ at }: { at: string }) {
    return (
        <>
            <span className={`${number} text-muted`}>–</span>
            <span className="text-xs leading-snug text-muted">No response at {formatClock(at)}</span>
        </>
    );
}

type Props = { reading: Reading; dimmed?: boolean };

export function ReadingTiles({ reading, dimmed = false }: Props) {
    const { temperature, light_level, presence, timestamp } = reading;
    const ink = dimmed ? "text-muted" : "";

    return (
        <dl className={grid}>
            <div className={tile}>
                <dt className={label}>Temperature</dt>
                <dd className="flex flex-col gap-1">
                    {temperature === null ? (
                        <Failed at={timestamp} />
                    ) : (
                        <span className={`${number} ${ink}`}>
                            {temperature.toFixed(1)}
                            <span className={unit}> °C</span>
                        </span>
                    )}
                </dd>
            </div>

            <div className={tile}>
                <dt className={label}>Light</dt>
                <dd className="flex flex-col gap-1">
                    {light_level === null ? (
                        <Failed at={timestamp} />
                    ) : (
                        <span className={`${number} ${dimmed ? "text-muted" : "text-light-reading"}`}>
                            {light_level}
                            <span className={unit}> %</span>
                        </span>
                    )}
                </dd>
            </div>

            <div className={tile}>
                <dt className={label}>Room presence</dt>
                <dd className="flex flex-col gap-1">
                    {presence === null ? (
                        <Failed at={timestamp} />
                    ) : (
                        <span className={`text-base leading-tight font-medium ${ink}`}>
                            {presence ? "Someone’s in" : "Empty"}
                        </span>
                    )}
                </dd>
            </div>
        </dl>
    );
}

export function SkeletonTiles() {
    return (
        <div className={grid} aria-hidden>
            {["Temperature", "Light", "Room presence"].map((name) => (
                <div key={name} className={tile}>
                    <span className={label}>{name}</span>
                    <span className="h-7 w-2/3 rounded bg-line-soft motion-safe:animate-pulse" />
                </div>
            ))}
        </div>
    );
}