"use client";

import { useEffect, useState } from "react";
import { getLatest } from "@/lib/api";
import { getWidgetState } from "@/lib/widget-state";
import type { LatestResponse } from "@/types/telemetry";
import { LiveWidget } from "./LiveWidget";

function useNow(intervalMs = 10_000) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);

    return now;
}

export function LiveWidgetContainer({ deviceId }: { deviceId: string }) {
    const [latest, setLatest] = useState<LatestResponse | null>(null);
    const [failed, setFailed] = useState(false);
    const [attempt, setAttempt] = useState(0); // "Try again now" adds 1, which re-runs the effect
    const now = useNow();

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const data = await getLatest(deviceId);
                if (cancelled) return;
                setLatest(data);
                setFailed(false);
            } catch {
                // Keep the last good `latest`, so the error state can show cached values.
                if (!cancelled) setFailed(true);
            }
        }

        load();
        const id = setInterval(load, 60_000);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [deviceId, attempt]);

    const state = getWidgetState(latest, failed, now);

    return (
        <LiveWidget
            deviceId={deviceId}
            state={state}
            now={now}
            onRetry={() => setAttempt((n) => n + 1)}
        />
    );
}