export function TagList({ tags }: { tags: string[] }) {
    return (
        <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
                <li key={tag} className="rounded-tag bg-chip px-[9px] py-1.5 text-xs leading-none text-ink-soft"> 
                    {tag}
                </li>
            ))}
        </ul>
    );
}