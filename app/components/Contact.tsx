import Section from "./Section";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <Section id="contact" title="연락처">
      <div className="rounded-2xl border border-black/[.06] p-8 text-center dark:border-white/[.08] sm:p-12">
        <h3 className="text-2xl font-bold tracking-tight">
          함께 일하고 싶으신가요?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
          새로운 기회나 협업 제안은 언제든 환영합니다. 편하게 연락 주세요.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {profile.email}
        </a>

        <div className="mt-6 flex justify-center gap-6 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-zinc-500 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
