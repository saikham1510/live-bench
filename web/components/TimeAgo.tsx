"use client";

import { useEffect, useState } from "react";
import { formatAgo } from "@/lib/format";

export function TimeAgo({ timestamp }: { timestamp: string | null}) {
    const [now, setNow] = useState(() => new Date());
    const [label, setLabel] = useState("A");
    
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 10_000);
        return () => clearInterval(id);
    }, []);

    if (timestamp === null) {
        return <span>never</span>;
    }

    return <time dateTime={timestamp}>{formatAgo(timestamp, now)}</time>
}