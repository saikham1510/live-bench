import Link from "next/link";
import { Fragment } from "react";
import { skillGroups, skillsIntro } from "@/content/home";
import { Section } from "./Section";
import { TagList } from "@/components/site/TagList";

export function Skills() {
    return (
        <Section id="skills" title="Skills" intro={skillsIntro} tone="surface">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {skillGroups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-3.5 border-t-2 border-ink pt-4">
                        <h3 className="text-base font-semibold lg:text-[17px]">{group.title}</h3>

                        <TagList tags={group.skills} />

                        {group.shownIn.length > 0 && (
                            <p className="text-sm">
                                <span className="text-muted">Shown in </span>
                                {group.shownIn.map((item, index) => (
                                    <Fragment key={item.label}>
                                        {index > 0 && ", "}
                                        {item.href ? (
                                            <Link href={item.href}  className="text-accent hover:text-accent-hover">
                                                {item.label}
                                            </Link>
                                        ) : (
                                            item.label
                                        )}
                                    </Fragment>
                                ))}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    )
}