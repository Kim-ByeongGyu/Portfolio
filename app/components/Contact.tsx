import Section from "./Section";
import Icon from "./Icon";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <Section id="contact" title="연락처" label="Contact" icon="mail">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-14">
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            함께 일하고 싶으신가요?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-muted">
            새로운 기회나 협업 제안은 언제든 환영합니다. 편하게 연락 주세요.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Icon name="mail" size={16} />
              {profile.email}
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
