import Image from "next/image";
import Link from "next/link";
import benchPhoto from "@/public/images/bench.jpg";
import { buttonClass } from "@/components/site/button";
import { Container } from "@/components/site/Container";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { SignalPath } from "./SignalPath";

export function Hero() {
    return (
        <section id="top" className="pt-8 pb-12 lg:pt-18 lg:pb-16">
            <Container className="flex flex-col gap-10 lg:gap-12">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[minmax(0,1fr)_600px]">
                    <div className="flex flex-col gap-5 lg:gap-6 lg:pt-6">
                        <p className="text-sm text-muted lg:text-base">{hero.eyebrow}</p>
                        <h1 className="text-display-sm font-light xl:text-display">{hero.title}</h1>
                        <p className="max-w-[500px] text-[17px] leading-[1.55] text-ink-soft lg:text-lead">
                            {hero.intro}
                        </p>
                        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                            <a href="#work" className={buttonClass("primary")}>
                                See my work
                            </a>
                            <a href={site.resumePath} className={buttonClass("secondary")}>
                                Download resume
                            </a>
                        </div>
                    </div>

                    <figure className="overflow-hidden rounded-card border border-line bg-surface">
                        <Image 
                            src={benchPhoto}
                            alt={hero.photoAlt}
                            placeholder="blur"
                            loading="eager"
                            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                            className="aspect-4/3 h-auto w-full object-cover"
                        />
                        <figcaption className="flex flex-wrep items-center justify-between gap-x-4 gap-y-1 border-t border-line-soft px-4 py-3 text-sm lg:px-5">
                            <span className="text-muted">{hero.photoCaption}</span>
                            <Link href="/projects/live-bench" className="font-medium text-accent hover:text-accent-hover">
                                How it works
                            </Link>
                        </figcaption>
                    </figure>
                </div>
                <SignalPath />
            </Container>
        </section>
    );
}