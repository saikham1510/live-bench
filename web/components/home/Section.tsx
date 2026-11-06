import { Container } from "@/components/site/Container";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  tone?: "canvas" | "surface";
  children: React.ReactNode;
};

const tones = {
  canvas: "",
  surface: "border-y border-line bg-surface",
};

export function Section({ id, title, intro, tone = "canvas", children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`py-14 lg:py-22 ${tones[tone]}`}>
      <Container className="flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col gap-3">
          <h2 id={titleId} className="text-section-sm font-light lg:text-section">
            {title}
          </h2>
          {intro && <p className="max-w-2xl text-base text-muted lg:text-[17px]">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}