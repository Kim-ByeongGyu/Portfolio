import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <h2 className="mb-10 flex items-center gap-3 text-2xl font-bold tracking-tight">
        <span className="font-mono text-base text-zinc-400">#</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
