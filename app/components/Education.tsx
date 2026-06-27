import Section from "./Section";
import { timeline } from "@/lib/data";

const typeLabel: Record<string, string> = {
  education: "학력",
  training: "교육",
};

export default function Education() {
  return (
    <Section id="education" title="학력 & 교육" label="Education" icon="cap">
      <ol className="relative ml-2 border-l border-border">
        {timeline.map((item) => (
          <li key={item.title} className="relative ml-6 pb-10 last:pb-0">
            <span className="absolute -left-[31px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted">{item.period}</span>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                {typeLabel[item.type]}
              </span>
            </div>
            <h3 className="mt-1.5 font-semibold">{item.title}</h3>
            <p className="text-sm text-muted">{item.org}</p>
            <p className="mt-2 text-sm leading-7 text-foreground/80">{item.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
