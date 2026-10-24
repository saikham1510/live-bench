export type ProjectStatus = "shipped" | "writeup-pending";

export type Project = {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    featured: boolean;
    status: ProjectStatus;
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
    },
    {
        slug: "major-project",
        title: "Evacuee Monitoring System",
        summary: "Multi-camera computer vison system that counts, locates and profiles evacuees in emergency holding tents",
        tags: ["Python", "Computer vision", "YOLO", "Multi-camera tracking", "FastAPI", "React", "MQTT"],
        featured: true,
        status: "writeup-pending",
    },
    {
        slug: "internship",
        title: "internship project",
        summary: "what i work on",
        tags: ["Python", "C++"],
        featured: true,
        status: "writeup-pending",
    },
    {
        slug: "contract-project",
        title: "Contract project",
        summary: "what it does",
        tags: ["Python"],
        featured: false,
        status: "shipped",
    },
        {
        slug: "yummyverse",
        title: "Yummyverse: Recipe-sharing platform",
        summary: "A platform where users share, explore, inspire recipes",
        tags: ["C#", "ASP.Net"],
        featured: false,
        status: "shipped",
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