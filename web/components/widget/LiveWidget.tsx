import { formatClock, formatDuration, secondsSince } from "@/lib/format";
import type { LiveWidgetState } from "@/types/widget";
import { ReadingTiles, SkeletonTiles } from "./ReadingTiles";
import { StatusBadge } from "./StatusBadge";

type Props = {
    deviceId: string;
    state: LiveWidgetState;
    now: Date;
    onRetry?: () => void;
};

const box = "flex flex-1 flex-col items-center justify-center gap-2 rounded-btn p-4 text-center";

function ChartSlot() {
    return (
        <div className={`${box} min-h-32 border border-dashed border-line-strong bg-surface-alt text-[13px] text-muted`}>
            24 h chart arrives with the history API
        </div>
    );
}

function Body({ state, onRetry }: { state: LiveWidgetState; onRetry?: () => void }) {
    switch (state.kind) {
        case "loading":
            return (
                <>
                    <SkeletonTiles />
                    <div className="min-h-32 flex-1 rounded-btn bg-line-soft motion-safe:animate-pulse" aria-hidden />
                </>
            );

        case "live":
        case "delayed":
            return (
                <>
                    <ReadingTiles reading={state.reading} />
                    <ChartSlot />
                </>
            );

        case "offline":
            return (
                <>
                    <ReadingTiles reading={state.reading} dimmed />
                    <ChartSlot />
                </>
            );

        case "waiting":
            return (
                <div className={`${box} border border-dashed border-line-strong`}>
                    <p className="text-base font-semibold">The sensor hasn’t reported yet</p>
                    <p className="text-sm leading-normal text-muted">
                        Readings will appear here within a minute of it coming online.
                    </p>
                </div>
            );

        case "error":
            return (
                <>
                    {state.cached && <ReadingTiles reading={state.cached} dimmed />}
                    <div className="flex flex-1 flex-col justify-center gap-2.5 rounded-btn bg-danger-bg p-4">
                        <p className="text-[15px] font-semibold text-danger">The sensor API isn’t answering</p>
                        <p className="text-sm leading-normal text-ink-soft">
                            {state.cached ? "These are the last values this page loaded. " : ""}
                            Retrying automatically.
                        </p>
                        <button
                            type="button"
                            onClick={onRetry}
                            className="min-h-11 cursor-pointer self-start rounded-btn border border-danger bg-surface px-4 text-sm font-semibold text-danger hover:bg-danger-bg"
                        >
                            Try again now
                        </button>
                    </div>
                </>
            );

        default: {
            const unhandled: never = state;
            return unhandled;
        }
    }
}

function footerText(state: LiveWidgetState, now: Date): string {
    switch (state.kind) {
        case "loading":
            return "Loading the latest reading";
        case "live":
            return `Last reading ${formatDuration(secondsSince(state.reading.timestamp, now))} ago, ${formatClock(state.reading.timestamp)}`;
        case "delayed":
            return `No new reading for ${formatDuration(secondsSince(state.reading.timestamp, now))}`;
        case "offline": {
            const lastSeen = state.device.last_seen ?? state.reading.timestamp;
            return `Last seen ${formatDuration(secondsSince(lastSeen, now))} ago, ${formatClock(lastSeen)}`;
        }
        case "waiting":
            return "Waiting for the first reading";
        case "error":
            return state.cached ? `Last reading ${formatClock(state.cached.timestamp)}` : "Retrying every 60 s";
    }
}

export function LiveWidget({ deviceId, state, now, onRetry }: Props) {
    return (
        <section
            aria-label={`Room sensor, ${deviceId}`}
            className="flex min-h-[27rem] flex-col gap-4 rounded-card border border-line bg-surface p-4 lg:p-5"
        >
            <div className="flex items-start justify-between gap-3">
                <p className="pt-1 text-[15px] font-semibold">Room sensor, {deviceId}</p>
                <StatusBadge kind={state.kind} />
            </div>

            <Body key={state.kind} state={state} onRetry={onRetry} />

            <p className="border-t border-line-soft pt-3 text-[13px] text-muted tabular-nums">{footerText(state, now)}</p>
        </section>
    );
}