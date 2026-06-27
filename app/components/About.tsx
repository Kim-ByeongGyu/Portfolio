import Section from "./Section";
import Icon from "./Icon";
import { about, principles } from "@/lib/data";

export default function About() {
  return (
    <Section id="about" title="소개" label="About" icon="user">
      <div className="space-y-4 text-base leading-8 text-muted">
        {about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {principles.length > 0 && (
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {principles.map((pr) => (
            <div
              key={pr.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon name={pr.icon} size={20} />
              </span>
              <h3 className="mt-4 font-semibold">{pr.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{pr.desc}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
