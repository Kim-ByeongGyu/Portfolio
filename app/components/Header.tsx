"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "기술", href: "#skills" },
  { label: "프로젝트", href: "#projects" },
  { label: "연락처", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.06] bg-background/80 backdrop-blur dark:border-white/[.08]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          {profile.nameEn}
        </a>

        <ul className="hidden items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="메뉴 열기"
          className="sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-black/[.06] px-6 py-3 text-sm dark:border-white/[.08] sm:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
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
