import { ChevronDownIcon } from "@/components/site/icons";
import { signalPath, signalPathHeading } from "@/content/home";

function StepArrow() {
  return (
    <svg
      viewBox="0 0 40 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      className="absolute top-1/2 -right-10 h-4 w-10 -translate-y-1/2 text-muted"
    >
      <path d="M4 8h30M28 3l6 5-6 5" />
    </svg>
  );
}

export function SignalPath() {
  const lastIndex = signalPath.length - 1;

  return (
    <div>
      {/* Phones and tablets: folded away, opens on tap. */}
      <details className="group rounded-card border border-line bg-surface lg:hidden">
        <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
          {signalPathHeading}
          <ChevronDownIcon className="size-[18px] transition-transform group-open:rotate-180" />
        </summary>
        <ol className="border-t border-line-soft">
          {signalPath.map((step) => (
            <li
              key={step.title}
              className="flex flex-col gap-1 border-b border-line-soft px-4 py-3.5 last:border-b-0"
            >
              <span className="text-[15px] font-semibold">{step.title}</span>
              <span className="text-sm leading-[1.45] text-muted">{step.body}</span>
            </li>
          ))}
        </ol>
      </details>

      {/* Desktop: four cards in a row. */}
      <div className="hidden flex-col gap-4 lg:flex">
        <h2 className="text-base font-semibold">{signalPathHeading}</h2>
        <ol className="grid grid-cols-4 gap-10">
          {signalPath.map((step, index) => (
            <li
              key={step.title}
              className={`relative flex flex-col gap-1.5 rounded-card border bg-surface px-[18px] py-4 ${
                index === lastIndex ? "border-ink" : "border-line"
              }`}
            >
              <span className="text-[15px] font-semibold">{step.title}</span>
              <span className="text-sm leading-[1.45] text-muted">{step.body}</span>
              {index < lastIndex && <StepArrow />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}