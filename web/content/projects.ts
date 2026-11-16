export type ProjectStatus = "shipped" | "writeup-pending";
export type ProjectLink = { label: string; href: string };

export type ProjectCover =
    | { kind: "live" }
    | { kind: "facts"; lines: string[] };

export type Project = {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    featured: boolean;
    status: ProjectStatus;
    meta: string;
    cover?: ProjectCover;
    writeupNote?: string;
    links?: ProjectLink[];
    codeUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "live-bench",
        title: "Live Bench",
        summary: "An ESP32 streaming room telemetry to this site, sensor to screen.",
        tags: ["ESP32", "MQTT", "FastAPI", "Next.js"],
        featured: true,
        status: "shipped",
        meta: "Solo project",
        cover: { kind: "live" },
    },
    {
        slug: "evacuee-monitoring",
        title: "Evacuee Monitoring System",
        summary: "Multi-camera computer vison system that counts, locates and profiles evacuees in emergency holding tents",
        tags: ["Python", "Computer vision", "YOLO", "FastAPI", "React", "MQTT"],
        featured: true,
        status: "writeup-pending",
        meta: "Final-year Major Project, team of 3 students",
        cover: {
            kind: "facts",
            lines: ["2 cameras, 1 headcount", "Re-identification across views", "Edge device: Jetson Orin NX"],
        },
        writeupNote: "Case study after assessment",
    },
    {
        slug: "robot-fleet-integration",
        title: "CBM internship, Open-RMF project",
        summary: "Connected an existing Central Management Task System to Open-RMF: tasks travel over MQTT to robots in a Gazebo simulation, which carry them out and report progress back.",
        tags: ["Python", "C++", "ROS 2", "Open-RMF", "MQTT"],
        featured: true,
        status: "writeup-pending",
        meta: "Y3 Internship Project",
        cover: {
            kind: "facts",
            lines: ["ROS 2 Humble on Ubuntu 22.04", "Open-RMF fleet management", "Gazebo multi-robot simulation"],
        },
        writeupNote: "Case study in progress"
    },
    {
        slug: "meeting-note-taker",
        title: "Meeting note-taker",
        summary: "A Windows app that transcribes meetings locally with MERaLiON, chosen for local accents, then summarises them with Qwen. Built with one teammate on top of the open-source TalkTrack application.",
        tags: ["Python"],
        featured: false,
        status: "shipped",
        meta: "CBM contract extension, 2027"
    },
    {    
        slug: "smart-bakery",
        title: "Smart Bakery",
        summary:
        "Monitors and controls temperature and humidity in a commercial bakery. Built for the IoT module.",
        tags: ["IoT", "Linux", "Python", "Raspberry Pi"],
        featured: false,
        status: "shipped",
        meta: "Y2 IoT Project",
    },
    {
        slug: "yummyverse",
        title: "Yummyverse: Recipe-sharing platform",
        summary: "A recipe-sharing web app where users post, explore and get inspired by each other’s recipes. Built for the Full Stack Development module.",
        tags: ["C#", "ASP.Net", "SQL Server"],
        featured: false,
        status: "shipped",
        meta: "Y2 Full Stack Development Project",
        links: [{ label: "Code", href: "https://github.com/saikham1510/YummyVerse" }],
        codeUrl: "https://github.com/saikham1510/YummyVerse",
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function hasCaseStudy(project: Project): boolean {
    return project.featured && project.status === "shipped";
}

export function getCaseStudySlugs(): string[] {
    return projects.filter(hasCaseStudy).map((p) => p.slug);
}