// export function StatusBadge() {
//     return <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">Live</span>
// }

import type { DeviceStatus } from "@/types/telemetry";

export function StatusBadge({ status }: {status: DeviceStatus }) {
    const online = status === "online";
    return (
        <span
            className={
                online
                ? "rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                : "rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600"
            }
        >
            { online ? "LIVE" : "OFFLINE" }
        </span>
    );
}