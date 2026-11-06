import { site } from "./site";

export const hero = {
  eyebrow: "Computer Engineering, Temasek Polytechnic",
  title: "I build the whole path from sensor to screen.",
  intro:
    "Live Bench is an ESP32 with temperature, light and presence sensors. Its readings travel over MQTT to a FastAPI backend and onto this page. I’m writing every layer, and the live feed goes up here in December.",
  photoAlt: "[Describe the photo in one sentence, e.g. An ESP32 board wired to three sensors on a breadboard]",
  photoCaption: "The Live Bench prototype. Live readings replace this photo in December.",
};

export const signalPathHeading = "How a reading gets here";

export const signalPath = [
  {
    title: "ESP32 and sensors [planned]",
    body: "DHT22, LDR and PIR. Publishes every 60 s and buffers through Wi-Fi drops.",
  },
  {
    title: "MQTT broker [planned]",
    body: "TLS and per-device credentials. A retained message says online or offline.",
  },
  {
    title: "FastAPI and TimescaleDB [planned]",
    body: "Stores each reading and marks the device offline after 3 silent minutes.",
  },
  {
    title: "Next.js, this page [planned]",
    body: "Loads the latest reading, then listens for new ones over server-sent events.",
  },
];

export const about = {
  paragraphs: [
    `I’m ${site.name}, a Computer Engineering student at Temasek Polytechnic. I like projects where the hardware and the software have to agree with each other, which is why most of my work touches both.`,
  ],
  facts: [
    { label: "Right now", value: "Working on Major Project at Temasek Polytechnic, until February" },
    { label: "Looking for", value: "Junior Embedded / Full-stack Software Engineering roles from 2027 April" },
    { label: "Studying", value: "Diploma in Computer Engineering (T13), graduating 2027" },
  ],
};

type ShownIn = { label: string; href?: string };

type SkillGroup = {
  title: string;
  skills: string[];
  shownIn: ShownIn[];
};

export const skillsIntro =
  "Grouped the same way the Live Bench stack is layered, with the project that proves each one.";

export const skillGroups: SkillGroup[] = [
  {
    title: "Firmware and electronics",
    skills: ["C", "C++", "Arduino", "PlatformIO", "ESP32", "Sensor circuits"],
    shownIn: [{ label: "Live Bench", href: "/projects/live-bench" }],
  },
  {
    title: "Backend and data",
    skills: ["Python", "FastAPI", "MQTT", "PostgreSQL", "TimescaleDB"],
    shownIn: [{ label: "Live Bench", href: "/projects/live-bench" }, { label: "[Major Project]" }],
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Tailwind"],
    shownIn: [{ label: "Live Bench" }],
  },
  {
    title: "Tooling and ops",
    skills: ["Git", "Linux", "TLS"],
    shownIn: [{ label: "Live Bench", href: "/projects/live-bench" }],
  },
];

export const contact = {
  intro:
    "Open to full-time roles in embedded and full-stack work from April 2027. I reply within two working days.",
};