import type { LatestResponse } from "@/types/telemetry";
import type { LiveWidgetState, WidgetState } from "@/types/widget";
import { secondsSince } from "./format";

export function toWidgetState({ device, reading }: LatestResponse): WidgetState {
    return device.status === "online"
    ? { kind: "live", device, reading }
    : { kind: "offline", device, reading};
}

export function getWidgetState(
    latest: LatestResponse | null,
    failed: boolean,
    now: Date,
): LiveWidgetState {
    if (failed) return { kind: "error", cached: latest?.reading ?? null };
    if (latest === null) return { kind: "loading" };

    const { device, reading } = latest;
    if (reading === null) return { kind: "waiting", device };
    if (device.status === "offline") return { kind: "offline", device, reading };

    const age = secondsSince(reading.timestamp, now);
    if (age > 2 * device.publish_interval_s) return { kind: "delayed", device, reading };

    return { kind: "live", device, reading };
}