import type { HistoryBucket } from "@/types/telemetry";

export function BucketList({ buckets }: { buckets: HistoryBucket[] }) {
    if (buckets.length === 0) {
        return <p className="text-sm text-gray-500">No data.</p>
    }

    if (buckets.every((b) => b.sample_count === 0)) {
        return <p className="text-sm text-gray-500">No readings in this window.</p>
    }

    return (
        <ul className="divide-y divide-gray-100 text-sm">
            {buckets.map((b) => (
                <li key={b.bucket_start} className="flex justify-between py-1.5">
                    <span className="text-gray-500">{b.bucket_start.slice(11, 16)}</span>
                    {b.sample_count === 0 ? (
                        <span className="text-gray-400">gap</span>
                    ) : (
                        <span>{b.temperature_avg?.toFixed(1) ?? "-"}°C</span>
                    )
                    }
                </li>
            ))}
        </ul>
    );
}