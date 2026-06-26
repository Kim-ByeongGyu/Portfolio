import Section from "./Section";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" title="기술 스택">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-black/[.06] p-5 dark:border-white/[.08]"
          >
            <h3 className="mb-3 font-mono text-sm uppercase tracking-wider text-zinc-400">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-black/[.04] px-2.5 py-1 text-sm dark:bg-white/[.06]"
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
