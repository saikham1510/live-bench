import type { WidgetState } from "@/types/widget";
import { Panel } from "./Panel";
import { WidgetBody } from "./WidgetBody";

export function LiveWidget({ state }: { state: WidgetState }) {
  return (
    <Panel title="Live telemetry">
      <WidgetBody state={state} />
    </Panel>
  );
}