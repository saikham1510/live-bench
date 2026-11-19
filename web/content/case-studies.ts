import type { ProjectLink } from "./projects";
import { site } from "./site";

export type CaseStudyBlock =
    | { kind: "text"; text: string }
    | { kind: "rows"; rows: { title: string; text: string }[] }
    | { kind: "flow"; steps: { name: string; detail: string }[] }
    | { kind: "decisions"; rows: { chose: string; over: string; because: string }[] }
    | { kind: "code"; code: string }
    | { kind: "stats"; stats: { value: string; label: string }[] }
    | { kind: "placeholder"; text: string };

export type CaseStudySection = {
    id: string;
    title: string;
    blocks: CaseStudyBlock[];
};

export type CaseStudy = {
    lede: string;
    tags: string[];
    facts: { label: string; value: string }[];
    links: ProjectLink[];
    liveSlot?: string;
    sections: CaseStudySection[];
};

const caseStudies: Record<string, CaseStudy> = {
    "live-bench": {
        lede: "An ESP32 streaming room telemetry to this site, sensor to screen",
        tags: ["ESP32", "MQTT", "FastAPI", "Next.js"],
        facts: [
            { label: "Role", value: "Solo: firmware, backend, frontend, deployment" },
            { label: "Timeline", value: "Sept 2026 to present" },
            { label: "Hardware", value: "ESP32, DHT22, LDR, PIR" },
        ],
        links: [
            { label: "Code on GitHub", href: site.repoUrl }
        ],
        liveSlot: "Live readings from bench-01 go here once the device is running.",
        sections: [
            {
                id: "problem",
                title: "Problem",
                blocks: [
                    {
                        kind: "text",
                        text: "Computer Engineering is a blend of Software and Hardware. And I want to utilize what I've learned in a real-life working project. This project integrates hardware and software skills in one place.",
                    }
                ],
            },
            {
                id: "constraints",
                title: "Constraints",
                blocks: [
                    {
                        kind: "rows",
                        rows: [
                            {
                                title: "No home internet",
                                text: "The device needs stable Wi-Fi. Everything gets bench-tested at home on a phone hotspot first.",
                            },
                            {
                                title: "Rare physical access",
                                text: "If deployed on someone's else home with stable Wi-Fi, auto-reconnect on Wi-Fi and MQTT drops is a hard requirement. OTA updates are ruled out: occasional visits cost less than building them.",
                            },
                            {
                                title: "Solo",
                                text: "Built alongside the Major Project during my last semester.",
                            },
                        ],
                    },
                ],
            },
            {
                id: "architecture",
                title: "Architecture",
                blocks: [
                    {
                        kind: "text",
                        text: "Data flows one way. The device never talks to the website directly, so either end can fail without taking the other down.",
                    },
                    {
                        kind: "flow",
                        steps: [
                            { name: "ESP32", detail: "C++, PlatformIO" },
                            { name: "MQTT broker", detail: "over TLS" },
                            { name: "FastAPI", detail: "+ TimescaleDB" },
                            { name: "Next.js", detail: "REST + SSE" },
                        ],
                    },
                    { kind: "placeholder", text: "Photo: the board and sensors on the bench, labelled" },
                ],
            },
            {
                id: "decisions",
                title: "Key decisions",
                blocks: [
                    {
                        kind: "decisions",
                        rows: [
                            {
                                chose: "FastAPI",
                                over: "Node",
                                because: "Async fits one MQTT subscriber feeding many browsers, and Python bridges to the ML module for Phase 2.",
                            },
                            {
                                chose: "TimescaleDB",
                                over: "SQLite, Firebase",
                                because: "Five-minute buckets come from one time_bucket query instead of hand-written grouping.",
                            },
                            {
                                chose: "Server-sent events",
                                over: "WebSocket",
                                because: "Data only flows to the browser, and EventSource reconnects on its own, sending the last event id so the backend can replay what was missed.",
                            },
                            {
                                chose: "[Hosting choice]",
                                over: "[Alternatives]",
                                because: "[Fill in once decided.]",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bug",
                title: "The bug",
                blocks: [
                    {
                        kind: "text",
                        text: "[What broke, what I first thought it was, how I narrowed it down, and what actually fixed it.]",
                    },
                    { kind: "code", code: "// [The 5–15 lines of code where the fix lives]" },
                    { kind: "placeholder", text: "Screenshot: the bug, before and after the fix" },
                ],
            },
            {
                id: "results",
                title: "Results",
                blocks: [
                    {
                        kind: "stats",
                        stats: [
                            { value: "[99.x %]", label: "uptime over [n] days" },
                            { value: "[n]", label: "readings stored" },
                            { value: "[n] s", label: "sensor to screen, median" },
                            { value: "[9x]", label: "Lighthouse performance, mobile" },
                        ],
                    },
                    { kind: "placeholder", text: "Screenshots: the widget in its Live and Offline states" },
                ],
            },
            {
                id: "differently",
                title: "What I'd change",
                blocks: [
                    {
                        kind: "text",
                        text: "[Two or three points on what I'd design differently, and what I'd build next, e.g. the device-health page or the presence model.]",
                    },
                ],
            },
        ],
    },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies[slug];
}