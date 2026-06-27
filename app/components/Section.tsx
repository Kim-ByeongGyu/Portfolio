import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

export default function Section({
  id,
  title,
  label,
  icon,
  children,
}: {
  id: string;
  title: string;
  label?: string;
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <div className="reveal mb-10">
        {label && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {label}
          </p>
        )}
        <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
          {icon && (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon name={icon} size={18} />
            </span>
          )}
          {title}
        </h2>
      </div>
      <div className="reveal">{children}</div>
    </section>
  );
}
