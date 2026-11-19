"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentNavLink, navLinks } from "@/content/site";

export function DesktopNavLinks() {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isCurrentNavLink(link, pathname) ? "page" : undefined}
                    className="px-1 py-2.5 text-[15px] font-medium hover:text-accent aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
                >
                    {link.label}
                </Link>
            ))}
        </>
    );
}