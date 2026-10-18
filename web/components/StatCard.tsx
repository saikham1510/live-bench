type StatCardProps = {
    label: string;
    value: string;
    unit?: string;
};

export function StatCard({ label, value, unit }: StatCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-semibold">
                {value}
                {unit && <span className="ml-1 text-base text-gray-500">{unit}</span>}
            </div>
        </div>
    );
}