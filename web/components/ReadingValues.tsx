import type { Reading } from "@/types/telemetry";
import { StatCard } from "./StatCard";
import { formatTemperature, formatLight, formatPresence } from "@/lib/format";

type ReadingValuesProps = {
    reading: Reading | null;
};

export function ReadingValues({ reading }: ReadingValuesProps) {
    const temperature = reading?.temperature;
    const light = reading?.light_level;
    const presence = reading?.presence;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard 
                label="Temperature"
                {...formatTemperature(reading?.temperature)}
            />
            <StatCard 
                label="Light"
                {...formatLight(reading?.light_level)}
            />
            <StatCard 
                label="Room"
                {...formatPresence(reading?.presence)}
            />
        </div>
    );
};