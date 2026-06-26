import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-black/[.06] dark:border-white/[.08]">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {profile.name} ({profile.nameEn}). Built with
        Next.js & Tailwind CSS.
      </div>
    </footer>
  );
}
