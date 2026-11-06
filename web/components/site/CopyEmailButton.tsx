"use client"

import { useEffect, useState } from "react";
import { buttonClass } from "./button";

type Status = "idle" | "copied" | "failed";

const messages: Record<Status, string> = {
    idle: "",
    copied: "Email copied",
    failed: "Couldn't copy. Select the address instead.",
};

export function CopyEmailButton({ email }: { email: string}) {
    const [status, setStatus] = useState<Status>("idle");

    useEffect(() => {
        if (status === "idle") return;
        const timer = setTimeout(() => setStatus("idle"), 2000);
        return () => clearTimeout(timer);
    }, [status]);

    async function copy() {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={copy} className={buttonClass("secondary")}>
                {status === "copied" ? "Copied": "Copy email"}
            </button>
            <span role="status" className="text-sm text-muted">
                {messages[status]}
            </span>
        </div>
    );
}