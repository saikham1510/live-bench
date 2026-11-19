import type { ReactNode } from "react";
import type { Metadata } from "next";

export default function LabLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <p className="bg-delayed-bg p-2 text-center text-sm text-delayed">
                Dev lab: mock data, not linked from the public site.
            </p>
            {children}
        </div>
    )
}

export const metadata: Metadata = {
    title: "Widget lab",
    robots: { index: false, follow: false },
};