"use client"

import { useEffect, useState } from "react"

type CopyStatus = "idle" | "copied" | "failed";

export function CopyEmailButton({ email }: { email: string}) {
    const [status, setStatus] = useState<CopyStatus>("idle");

    useEffect(() => {
        if (status === "idle") return;
        const id = setTimeout(() => setStatus("idle"), 2000);
        return () => clearTimeout(id);
    }, [status]);

    async function handleClick() {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
    }

    const label = 
        status === "copied" ? "Copied!" : status === "failed" ? "Copy failed" : "Copy email";

    return (
        <button type="button" onClick={handleClick} className="rounded border px-3 py-1 text-sm">
            {label}
        </button>
    );
}