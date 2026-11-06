import type { Metadata } from "next";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
    title: "Design tokens",
    robots: { index: false, follow: false },
};

const colors = [
  { name: "canvas", swatch: "bg-canvas", use: "Page background" },
  { name: "surface", swatch: "bg-surface", use: "Header, cards" },
  { name: "surface-alt", swatch: "bg-surface-alt", use: "Compact cards, placeholders" },
  { name: "chip", swatch: "bg-chip", use: "Tags, toggles, hover" },
  { name: "line", swatch: "bg-line", use: "Borders" },
  { name: "line-strong", swatch: "bg-line-strong", use: "Button + input borders" },
  { name: "ink", swatch: "bg-ink", use: "Text, footer" },
  { name: "ink-soft", swatch: "bg-ink-soft", use: "Paragraphs" },
  { name: "muted", swatch: "bg-muted", use: "Captions" },
  { name: "accent", swatch: "bg-accent", use: "Links, primary button" },
  { name: "live", swatch: "bg-live", use: "Widget: online" },
  { name: "danger", swatch: "bg-danger", use: "Widget: error" },
  { name: "light-reading", swatch: "bg-light-reading", use: "Light value" },
];

export default function TokensPage() {
  return (
    <Container className="flex flex-col gap-16 py-12">
      <section className="flex flex-col gap-6">
        <h1 className="text-section font-light">Design tokens</h1>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((color) => (
            <li key={color.name} className="overflow-hidden rounded-card border border-line bg-surface">
              <div className={`h-20 ${color.swatch}`} />
              <div className="p-3">
                <p className="font-mono text-sm">{color.name}</p>
                <p className="text-sm text-muted">{color.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-section font-light">Type</h2>
        <p className="text-display font-light">I build the whole path from sensor to screen.</p>
        <p className="text-section font-light">Section title</p>
        <p className="text-title font-medium">Card title</p>
        <p className="max-w-[500px] text-lead text-ink-soft">
          Lead paragraph. Readings travel over MQTT to a FastAPI backend and land on this page.
        </p>
        <p className="text-[15px]">Body text at 15px, regular weight.</p>
        <p className="text-sm text-muted">Caption · Last reading 12 s ago</p>
        <p className="font-mono text-reading tabular-nums">
          23.4<span className="text-xl font-medium"> °C</span>
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-section font-light">Corners</h2>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-tag bg-chip px-2.5 py-1.5 text-xs">Tag · 5px</span>
          <span className="inline-flex min-h-11 items-center rounded-btn bg-accent px-5 font-semibold text-surface">
            Button · 8px
          </span>
          <span className="rounded-card border border-line bg-surface p-6">Card · 10px</span>
        </div>
      </section>
    </Container>
  );
}