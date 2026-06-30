import Section from "./Section";
import Icon from "./Icon";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" title="기술 스택" label="Skills" icon="code">
      <div className="overflow-hidden rounded-lg border border-border bg-card/80">
        {skills.map((group) => (
          <section
            key={group.category}
            className="grid gap-3 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:items-start"
          >
            <h3 className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Icon name={group.icon} size={15} />
              </span>
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex h-7 items-center rounded-md border border-border bg-background/45 px-2.5 text-sm leading-none text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
