import type { LatestResponse } from "@/types/telemetry";
import type { LiveWidgetState } from "@/types/widget";
import { secondsSince } from "./format";

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