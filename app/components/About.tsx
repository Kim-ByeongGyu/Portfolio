import Section from "./Section";
import { about, experience } from "@/lib/data";

export default function About() {
  return (
    <Section id="about" title="소개">
      <div className="grid gap-12 sm:grid-cols-5">
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 sm:col-span-3">
          {about.map((p, i) => (
            <p key={i} className="leading-8">
              {p}
            </p>
          ))}
        </div>

        {experience.length > 0 && (
          <div className="sm:col-span-2">
            <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-zinc-400">
              Experience
            </h3>
            <ul className="space-y-6">
              {experience.map((e, i) => (
                <li key={i}>
                  <p className="font-mono text-xs text-zinc-400">{e.period}</p>
                  <p className="mt-1 font-medium">{e.title}</p>
                  <p className="text-sm text-zinc-500">{e.org}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {e.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
