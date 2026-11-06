"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";
import { Container } from "./Container";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./icons";

export function MobileMenu() {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    function close() {
        setOpen(false);
    }

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                aria-label="Main menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((isOpen) => !isOpen)}
                className="-mr-2 flex size-12 items-center justify-center rounded-btn hover:bg-chip lg:hidden"
            >
                {open ? <CloseIcon/> : <MenuIcon/>}
            </button>

            <div
                id="mobile-menu"
                hidden={!open}
                className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg lg:hidden"
            >
                <Container>
                    <nav aria-label="Main" className="flex flex-col py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={close}
                                className="border-b border-line-soft py-3.5 text-lg font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="flex gap-2 py-4">
                            <a 
                                href={site.githubUrl}
                                className="inline-flex min-h-11 items-cetner gap-2 rounded-btn px-3 font-medium hover:bg-chip"
                            >
                                <GitHubIcon />
                                GitHub
                            </a>
                            <a 
                                href={site.linkedinUrl}
                                className="inline-flex min-h-11 items-cetner gap-2 rounded-btn px-3 font-medium hover:bg-chip"
                            >
                                <LinkedInIcon />
                                LinkedIn
                            </a>
                        </div>

                        <a
                            href={site.resumePath}
                            onClick={close}
                            className="mb-4 inline-flex min-h-11 items-center justify-center rounded-btn bg-accent px-5 font-semibold text-surface hover:bg-accent-hover"
                        >
                            Download resume (PDF)
                        </a>

                    </nav>
                </Container>
            </div>
        </>
    )
}