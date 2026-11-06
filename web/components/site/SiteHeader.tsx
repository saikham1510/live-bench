import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { Container } from "./Container";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-line bg-surface">
            <Container className="flex h-16 items-center justify-between lg:h-19">
                <Link href="/" className="text-xl font-medium tracking-tight lg:text-[22px]">
                  {site.name}
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-1 py-2.5 text-[15px] font-medium hover:text-accent"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex gap-0.5">
                        <a 
                            href={site.githubUrl}
                            aria-label="GitHub"
                            className="flex size-11 items-center justify-center rounded-btn hover:bg-chip"
                        >
                            <GitHubIcon />
                        </a>
                        <a 
                            href={site.linkedinUrl}
                            aria-label="LinkedIn"
                            className="flex size-11 items-center justify-center rounded-btn hover:bg-chip"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>

                    <a 
                        href={site.resumePath}
                        className="inline-flex min-h-10 items-center rounded-btn border border-line-strong bg-surface px-4 text-sm font-semibold hover:border-ink"
                    >
                        Resume (PDF)
                    </a>
                </nav>
                <MobileMenu />
            </Container>

        </header>
    );
}