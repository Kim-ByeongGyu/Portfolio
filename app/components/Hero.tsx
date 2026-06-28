import { profile, socials, stats } from "@/lib/data";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* 애니메이션 배경 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-20 sm:py-36">
        {profile.available && (
          <span className="animate-in inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            새로운 기회를 찾고 있습니다
          </span>
        )}

        <h1 className="animate-in mt-6 text-4xl font-bold tracking-tight sm:text-7xl" style={{ animationDelay: "0.08s" }}>
          {profile.name}
          <span className="gradient-text mt-2 block">{profile.role}</span>
        </h1>

        <p className="animate-in mt-5 max-w-2xl text-base leading-7 text-foreground/80 sm:mt-6 sm:text-lg sm:leading-8" style={{ animationDelay: "0.16s" }}>
          {profile.tagline}
        </p>

        <div className="animate-in mt-6 flex flex-wrap items-center gap-3 sm:mt-8" style={{ animationDelay: "0.24s" }}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/40"
          >
            프로젝트 보기
            <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3 text-sm font-medium text-muted backdrop-blur transition-colors hover:border-accent hover:text-foreground"
            >
              <Icon name={s.icon} size={16} />
              {s.label}
            </a>
          ))}
        </div>

        {/* 통계 지표 */}
        <dl className="animate-in mt-10 grid max-w-lg grid-cols-3 gap-4 sm:mt-14 sm:gap-6" style={{ animationDelay: "0.32s" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>

        <p className="animate-in mt-8 inline-flex items-center gap-1.5 text-sm text-muted sm:mt-10" style={{ animationDelay: "0.4s" }}>
          <Icon name="pin" size={15} />
          {profile.location}
        </p>
      </div>
    </section>
  );
}
