import type { LiveWidgetState } from "@/types/widget";

type Badge = { label: string; colours: string; dot: string };

const offline: Badge = { label: "Offline", colours: "bg-chip text-ink-soft", dot: "bg-muted" };

const badges = {
    loading: { label: "Connecting", colours: "bg-chip text-ink-soft", dot: "border-[1.5px] border-muted" },
    live: { label: "Live", colours: "bg-live-bg text-live", dot: "bg-live" },
    delayed: { label: "Delayed", colours: "bg-delayed-bg text-delayed", dot: "bg-delayed" },
    offline,
    waiting: offline,
    error: { label: "Can’t connect", colours: "bg-danger-bg text-danger", dot: "bg-danger" },
} satisfies Record<LiveWidgetState["kind"], Badge>;

export function StatusBadge({ kind }: { kind: LiveWidgetState["kind"] }) {
    const badge = badges[kind];

    return (
        <p
            role="status"
            className={`flex shrink-0 items-center gap-[7px] rounded-[6px] px-2.5 py-1.5 text-[13px] font-semibold ${badge.colours}`}
        >
            <span aria-hidden className={`size-2 rounded-full ${badge.dot}`} />
            {badge.label}
        </p>
    );
}