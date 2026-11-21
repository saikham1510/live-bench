import { site } from "@/content/site";
import { Container } from "./Container";

export function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-sm text-on-dark">
            <Container className="flex flex-col gap-4 py-7 lg:flex-row lg:items-start lg:justify-between lg:py-9">
                <div className="flex flex-col gap-1.5">
                    <p className="font-semibold text-surface">
                        {site.name}, {year}
                    </p>
                    <p>
                        Built with Next.js, with an ESP32 feed on the way.{" "}
                        <a href={site.repoUrl} className="text-on-dark-link underline underline-offset-4 hover:text-surface">
                            Source on GitHub
                        </a>
                    </p>
                </div>

                <a href="#top" className="inline-flex min-h-11 items-center self-start text-on-dark-link underline-offset-4 hover:underline">
                    Back to top
                </a>
            </Container>
        </footer>
    )
}