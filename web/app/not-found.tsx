import Link from "next/link";
import { buttonClass } from "@/components/site/button";
import { Container } from "@/components/site/Container";

export default function NotFound() {
    return (
        <Container className="flex flex-col items-start gap-5 py-16 lg:py-24">
            <p className="font-mono text-sm text-muted">404</p>
            <h1 className="text-section-sm font-light lg:text-section">Page not found</h1>
            <p className="max-w-xl text-ink-soft lg:text[17px]">
                That page doesn&rsquo;t exist, or its writeup isn&rsquo;t published yet.
            </p>
            <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                <Link href="/" className={buttonClass("primary")}>
                    Back home
                </Link>
                <Link href="/#work" className={buttonClass("secondary")}>
                    See my work
                </Link>
            </div>
        </Container>
    )
}