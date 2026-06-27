import { profile, socials } from "@/lib/data";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} ({profile.nameEn})
        </p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors hover:text-foreground"
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
