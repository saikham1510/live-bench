"use client";

import { useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count+1)} className="rounded border px-3 py-1">
            Click {count} times
        </button>
    )
}