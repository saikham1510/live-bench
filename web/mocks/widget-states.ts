import { getWidgetState } from "@/lib/widget-state";
import type { LatestResponse, Reading } from "@/types/telemetry";
import type { LiveWidgetState } from "@/types/widget";
import { latestNeverReported, latestOnline } from "./latest";

// A frozen "now": 12 s after the contract's example reading. Every example is measured
// from this moment, so the gallery looks the same on every visit and every build.
export const MOCK_NOW = new Date("2026-09-17T09:12:12Z");

function at(timestamp: string, values: Partial<Reading> = {}): Reading {
    return { ...latestOnline.reading!, timestamp, ...values };
}

const delayed: LatestResponse = {
    device: latestOnline.device,
    reading: at("2026-09-17T09:09:42Z"),
};

const offline: LatestResponse = {
    device: { ...latestOnline.device, status: "offline", last_seen: "2026-09-17T06:58:00Z" },
    reading: at("2026-09-17T06:58:00Z", { temperature: 21.8, light_level: 12, presence: false }),
};

const oneSensorFailed: LatestResponse = {
    device: latestOnline.device,
    reading: at("2026-09-17T09:12:00Z", { temperature: null }),
};

const cachedBeforeError: LatestResponse = {
    device: latestOnline.device,
    reading: at("2026-09-17T09:04:00Z", { temperature: 23.1, light_level: 40 }),
};

export type WidgetExample = { title: string; note: string; state: LiveWidgetState };

// Each example goes through getWidgetState, the same function the real widget uses.
export const widgetExamples: WidgetExample[] = [
    {
        title: "Loading",
        note: "Before GET /latest returns. Same height as the loaded widget, so nothing jumps.",
        state: getWidgetState(null, false, MOCK_NOW),
    },
    {
        title: "Live",
        note: "status: online and the last reading is less than 2 publish intervals old.",
        state: getWidgetState(latestOnline, false, MOCK_NOW),
    },
    {
        title: "Delayed",
        note: "Still online on the server, but no reading for over 2 × publish_interval_s (120 s).",
        state: getWidgetState(delayed, false, MOCK_NOW),
    },
    {
        title: "Offline",
        note: "status: offline. Values dimmed, last seen from device.last_seen.",
        state: getWidgetState(offline, false, MOCK_NOW),
    },
    {
        title: "No readings yet",
        note: "GET /latest returned reading: null.",
        state: getWidgetState(latestNeverReported, false, MOCK_NOW),
    },
    {
        title: "Can’t connect, with cached values",
        note: "A request failed after an earlier one worked.",
        state: getWidgetState(cachedBeforeError, true, MOCK_NOW),
    },
    {
        title: "Can’t connect, nothing cached",
        note: "The very first request failed.",
        state: getWidgetState(null, true, MOCK_NOW),
    },
    {
        title: "One sensor failed",
        note: "temperature: null. A dash, never 0; the other tiles stay live.",
        state: getWidgetState(oneSensorFailed, false, MOCK_NOW),
    },
];