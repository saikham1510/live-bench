"use client";

import { useState } from "react";
import type { WidgetState } from "@/types/widget";
import { latestNeverReported, latestOffline, latestOnline } from "@/mocks/latest";
import { toWidgetState } from "@/lib/widget-state";
import { LiveWidget } from "./LiveWidget";

const demoStates: { label: string; state: WidgetState }[] = [
    { label: "Loading", state: { kind: "loading" } },
    { label: "Live", state: toWidgetState(latestOnline) },
    { label: "Offline", state: toWidgetState(latestOffline) },
    { label: "Never reported", state: toWidgetState(latestNeverReported) },
    { label: "Error", state: { kind: "error", message: "Could not reach the API."}}
];


export function WidgetDemo() {
    const [index, setIndex] = useState(0);
    const [failSensors, setFailSensors] = useState(false);

    const base = demoStates[index].state;
    const state: WidgetState = 
        failSensors && (base.kind === "live" || base.kind === "offline") && base.reading
            ? { ...base, reading: {...base.reading, temperature: null, light_level: null}}
            : base;

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-2">
                {demoStates.map((s, i) => (
                    <button
                        key={s.label}
                        onClick={() => setIndex(i)}
                        className={
                            i === index
                            ? "rounded bg-gray-900 px-3 py-1 text-sm text-white"
                            : "rounded border border-gray-300 px-3 py-1 text-sm"
                        }
                    >
                        {s.label}
                    </button>
                ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
                <input 
                    type="checkbox"
                    checked={failSensors}
                    onChange={(e) => setFailSensors(e.target.checked)}
                />
                Simulate sensor failure
            </label>
            <LiveWidget state={state} />
        </div>
    );
}