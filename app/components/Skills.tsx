import Section from "./Section";
import Icon from "./Icon";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" title="기술 스택" label="Skills" icon="code">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="mb-4 flex items-center gap-2.5 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon name={group.icon} size={16} />
              </span>
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border px-2.5 py-1 text-sm text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
