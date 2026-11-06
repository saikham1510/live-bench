import { buttonClass } from "@/components/site/button";
import { CopyEmailButton } from "@/components/site/CopyEmailButton";
import { contact } from "@/content/home";
import { site } from "@/content/site";
import { Section } from "./Section";

const linkClass = "inline-flex min-h-11 items-center self-start font-medium break-all text-accent hover:text-accent-hover";

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

const profiles = [
    { label: "LinkedIn", url: site.linkedinUrl },
    { label: "GitHub", url:site.githubUrl },
];

export function Contact() {
    return (
        <Section id="contact" title="Get in touch">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-6">
                    <p className="max-w-[460px] text-[17px] leading-relaxed text-ink-soft lg:text-lg">{contact.intro}</p>
                    <a href={site.resumePath} className={`${buttonClass("primary")} sm:self-start`}>
                        Download resume (PDF)
                    </a>
                </div>

                <ul className="rounded-card border border-line bg-surface">
                    <li className="flex flex-col gap-3 border-b border-line-soft p-4 lg:px-6 lg:py-5">
                        <div className="flex min-w-0 flex-col">
                            <span className="text-sm text-muted">Email</span>
                            <a href={`mailto:${site.email}`} className={linkClass}>
                                {site.email}
                            </a>
                        </div>
                        <CopyEmailButton email={site.email} />
                    </li>

                    {profiles.map((profile) => (
                        <li
                            key={profile.label}
                            className="flex flex-col border-b border-line-soft p-4 last:border-b-0 lg:px-6 lg:py-5"
                        >
                            <span className="text-sm text-muted">{profile.label}</span>
                            <a href={profile.url} className={linkClass}>
                                {displayUrl(profile.url)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}