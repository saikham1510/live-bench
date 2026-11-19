import { Device, Reading } from "@/types/telemetry";

export type WidgetState = 
    | { kind: "loading"}
    | { kind: "live"; device: Device; reading: Reading | null }
    | { kind: "offline"; device: Device; reading: Reading | null }
    | { kind: "error"; message: string };

export type LiveWidgetState =
    | { kind: "loading" }
    | { kind: "live"; device: Device; reading: Reading }
    | { kind: "delayed"; device: Device; reading: Reading }
    | { kind: "offline"; device: Device; reading: Reading }
    | { kind: "waiting"; device: Device }
    | { kind: "error"; cached: Reading | null };