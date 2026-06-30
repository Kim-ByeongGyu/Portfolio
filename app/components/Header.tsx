"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import Icon from "./Icon";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "기술", href: "#skills" },
  { label: "프로젝트", href: "#projects" },
  { label: "학력", href: "#education" },
  { label: "연락처", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const resolveTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

      return media.matches ? "dark" : "light";
    };

    const frame = window.requestAnimationFrame(() => {
      const resolvedTheme = resolveTheme();
      document.documentElement.dataset.theme = resolvedTheme;
      setTheme(resolvedTheme);
    });

    const onChange = () => {
      if (!localStorage.getItem("theme")) {
        const resolvedTheme = resolveTheme();
        document.documentElement.dataset.theme = resolvedTheme;
        setTheme(resolvedTheme);
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", onChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="group font-mono text-sm font-semibold tracking-tight">
          {profile.nameEn}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            title={theme === "dark" ? "라이트 모드" : "다크 모드"}
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/70 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>

          <button
            aria-label="메뉴 열기"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/70 text-muted transition-colors hover:border-accent hover:text-accent sm:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-3 text-sm sm:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
