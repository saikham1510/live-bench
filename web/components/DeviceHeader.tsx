import { Device } from "@/types/telemetry";
import { StatusBadge } from "./StatusBadge";

export function DeviceHeader({ device }: { device: Device }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm text-gray-700">{device.device_id}</span>
      <StatusBadge status={device.status} />
    </div>
  );
}