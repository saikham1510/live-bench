export const site = {
    name: "Sai Kham",
    email: "saikham6276@gmail.com",
    description:
        "Computer Engineering student at Temasek Polytechnic. I build the whole path from sensor to screen.",
    githubUrl: "https://github.com/saikham1510",
    linkedinUrl: "https://www.linkedin.com/in/sai-kham-35036a268",
    repoUrl: "https://github.com/saikham1510/live-bench",
    resumePath: "/resume.pdf",
} as const;

export type NavLink = { label: string; href: string; currentFrom?: string };

export const navLinks: NavLink[] = [
    { label: "Work", href: "/#work", currentFrom: "/projects/" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
];

export function isCurrentNavLink(link: NavLink, pathname: string): boolean {
    return link.currentFrom !== undefined && pathname.startsWith(link.currentFrom);
}