import { about } from "@/content/home";
import { Section } from "./Section";

export function About() {
    return (
        <Section id="about" title="About">
            <div className="flex max-w-[700px] flex-col gap-5">
                {about.paragraphs.map((text) => (
                    <p key={text} className="text-[17px] leading-relaxed text-ink-soft lg:text-lg">
                        {text}
                    </p>
                ))}

                <dl className="mt-2 flex flex-col gap-3.5 border-t border-line pt-5">
                    {about.facts.map((fact) => (
                        <div key={fact.label} className="grid gap-0.5 sm:grid-cols-[160px_1fr]">
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </Section>
    );
}