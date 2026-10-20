export type Formatted = { value: string; unit?: string};

export function formatTemperature(t: number | null | undefined): Formatted {
    return t === null || t === undefined ? { value: "-" } : { value: t.toFixed(1), unit: "°C" };
};

export function formatLight(l: number | null | undefined): Formatted {
    return l === null || l === undefined ? { value: "-" } : { value: String(l), unit: "%" };
}

export function formatPresence(p: boolean | null | undefined): Formatted {
    if (p === null || p === undefined) return { value: "-" };
    return { value: p ? "Present": "Empty" };
}

export function formatAgo(isoTimestamp: string, now: Date): string {
    const seconds = Math.floor((now.getTime() - new Date(isoTimestamp).getTime()) / 1000);
    if (seconds < 10) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}