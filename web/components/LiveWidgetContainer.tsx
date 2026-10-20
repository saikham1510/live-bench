"use client";

import { useEffect, useState } from "react";
import { ApiError, getLastest } from "@/lib/api";
import { toWidgetState } from "@/lib/widget-state";
import type { WidgetState } from "@/types/widget";
import { LiveWidget } from "./LiveWidget";

export function LiveWidgetContainer({ deviceId }: { deviceId: string}) {
    const [state, setState] = useState<WidgetState>({ kind: "loading"})

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const latest = await getLastest(deviceId);
                if (!cancelled) {
                    setState(toWidgetState(latest));
                }
            } catch (err) {
                if (cancelled) return;
                const message = 
                err instanceof ApiError ? err.message : "Could not reach the telemetry API.";
                setState({ kind: "error", message });
            }
        }

        load();
        const id = setInterval(load, 60_000);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [deviceId]);

    return <LiveWidget state={state} />;
}