import { Device, Reading } from "@/types/telemetry";

export type LiveWidgetState =
    | { kind: "loading" }
    | { kind: "live"; device: Device; reading: Reading }
    | { kind: "delayed"; device: Device; reading: Reading }
    | { kind: "offline"; device: Device; reading: Reading }
    | { kind: "waiting"; device: Device }
    | { kind: "error"; cached: Reading | null };