import Link from "next/link";

const navLinks = [
    { href: "/#work", label: "Work"},
    { href: "/#about", label: "About"},
    { href: "/#skills", label: "Skills"},
    { href: "/#contact", label: "Contact"},
];

export function SiteHeader() {
    return (
        <header className="border-b">
            <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <Link href="/" className="font-semibold">
                    Sai Kham
                </Link>
                <ul className="flex gap-4 text-sm">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                    <li>
                        <a href="/resume.pdf">Resume (PDF)</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}