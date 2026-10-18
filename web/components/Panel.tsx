import { WidgetBody } from "./WidgetBody";

type PanelProps = {
    title: string;
    children: React.ReactNode;
};

export function Panel({ title, children }: PanelProps) {
    return (
        <section className="rounded-xl border border-gray-200 p-6">
            <h2 className="mb-4 text-lg font-medium">{title}</h2>
            {children}
        </section>
    );
}