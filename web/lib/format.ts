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