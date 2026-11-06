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
                        Built with Next.js and a real ESP32.{" "}
                        <a href={site.repoUrl} className="text-on-dark-link underline-offset-4 hover:underline">
                            Source on GitHub
                        </a>
                    </p>
                </div>

                <a href="#top" className="self-start text-on-dark-link underline-offset-4 hover:underline">
                    Back to top
                </a>
            </Container>
        </footer>
    )
}