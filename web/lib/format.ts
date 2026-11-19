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

// "12 s", "2 min 30 s", "2 h 14 min", "3 d 4 h"
export function formatDuration(totalSeconds: number): string {
    const s = Math.max(0, Math.floor(totalSeconds));
    if (s <60) return `${s} s`;

    const minutes = Math.floor(s / 60);
    if (minutes < 60) {
        const rest = s % 60;
        return rest ? `${minutes} min ${rest} s` : `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        const rest = minutes % 60;
        return rest ? `${hours} h ${rest} min` : `${hours} h`;
    }

    const days = Math.floor(hours / 24);
    const rest = hours % 24;
    return rest ? `${days} d ${rest} h` : `${days} d`;
}

export function secondsSince(isoTimestamp: string, now: Date): number {
    return (now.getTime() - Date.parse(isoTimestamp)) / 1000;
}

const sgtClock = new Intl.DateTimeFormat("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Singapore",
});

export function formatClock(isoTimestamp: string): string {
    return `${sgtClock.format(new Date(isoTimestamp))} SGT`;
}