import Link from "next/link";

export default function NotFound() {
    return (
        <section className="mx-auto max-w-3xl p-4">
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="mt-2 text-sm">That page doesn't exist, or its write-up isn't published yet.</p>
            <Link href="/" className="mt-4 inline-block underline">
                Back home
            </Link>
        </section>
    )
}