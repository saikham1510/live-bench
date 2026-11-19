import { Container } from "@/components/site/Container";
import { LiveWidget } from "@/components/widget/LiveWidget";
import { LiveWidgetContainer } from "@/components/widget/LiveWidgetContainer";
import { formatClock } from "@/lib/format";
import { MOCK_NOW, widgetExamples } from "@/mocks/widget-states";

export default function LabPage() {
  return (
    <Container className="flex flex-col gap-14 py-10 lg:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-section-sm font-light lg:text-section">Live widget states</h1>
        <p className="max-w-3xl text-muted lg:text-[17px]">
          Mock data, frozen at {formatClock(MOCK_NOW.toISOString())} on 17 Sept 2026. Every example goes through the same getWidgetState function as the real widget.
        </p>
      </div>

      <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {widgetExamples.map((example) => (
          <li key={example.title} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{example.title}</h2>
            <LiveWidget deviceId="bench-01" state={example.state} now={MOCK_NOW} />
            <p className="text-sm leading-normal text-ink-soft">{example.note}</p>
          </li>
        ))}
      </ul>

        <section className="flex flex-col gap-3 md:max-w-[calc(50%-0.75rem)] xl:max-w-[calc(33.333%-1rem)]">
          <h2 className="text-lg font-semibold">Real requests</h2>
          <LiveWidgetContainer deviceId="bench-01" />
          <p className="text-sm leading-normal text-ink-soft">
            Calls the real API. Until the backend exists this shows "Can't connect".
          </p>
        </section>

    </Container>
  )
}