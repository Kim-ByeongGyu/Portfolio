import { profile, socials } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
      <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
        Hi, I&apos;m
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
        <span className="block text-zinc-400 dark:text-zinc-500">
          {profile.role}
        </span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          프로젝트 보기
        </a>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-foreground hover:underline dark:text-zinc-400"
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
