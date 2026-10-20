import { LiveWidget } from "@/components/LiveWidget";
import { toWidgetState } from "@/lib/widget-state";
import { latestOnline, latestOffline } from "@/mocks/latest";
import { BucketList } from "@/components/BucketList";
import { makeHistoryMock } from "@/mocks/history";
import { Panel } from "@/components/Panel";
import { WidgetDemo } from "@/components/WidgetDemo";

const history = makeHistoryMock(new Date());

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="mb-6 text-2xl font-semibold">Live Bench</h1> 
      <WidgetDemo />
    </main>
  );
}