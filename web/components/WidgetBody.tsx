import type { WidgetState } from "@/types/widget";
import { DeviceHeader } from "./DeviceHeader";
import { ReadingValues } from "./ReadingValues";

export function WidgetBody({state}: {state: WidgetState}) {
    switch (state.kind) {
        case "loading":
            return <p className="text-gray-500">Connecting...</p>;

        case "live":
            return (
                <>
                    <DeviceHeader device={state.device} />
                    <ReadingValues reading={state.reading} />
                </>
            );
        case "offline":
            return (
                <div className="opacity-60">
                    <DeviceHeader device={state.device} />
                    <ReadingValues reading={state.reading} />
                    <p className="mt-2 text-sm text-gray-500">
                        Last seen {state.device.last_seen ?? "never"}
                    </p>
                </div>
            )
        case "error":
            return <p className="text-red-600">{state.message}</p>
    }
}