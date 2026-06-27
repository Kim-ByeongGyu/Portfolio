"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import type { Project } from "@/lib/data";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const project = openIndex !== null ? projects[openIndex] : null;

  const close = useCallback(() => {
    if (lightbox) setLightbox(null);
    else setOpenIndex(null);
  }, [lightbox]);

  // ESC 키 + 바디 스크롤 잠금
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close]);

  return (
    <>
      {/* 카드 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setOpenIndex(i)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5"
          >
            {/* 커버 */}
            {p.images && p.images.length > 0 ? (
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0].src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center border-b border-border bg-gradient-to-br from-accent-soft to-transparent">
                <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  {p.title}
                </span>
              </div>
            )}

            {/* 본문 */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                {p.role && (
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                    {p.role}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-muted">
                {p.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 5).map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
                {p.tags.length > 5 && (
                  <li className="px-1 py-0.5 font-mono text-xs text-muted">
                    +{p.tags.length - 5}
                  </li>
                )}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                자세히 보기
                <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 상세 모달 (Portal로 body에 렌더 — 조상의 transform 영향 회피) */}
      {mounted && project && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onClick={close}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 (고정) */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-background px-7 py-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                  {project.role && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                      {project.role}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {[project.period, project.team].filter(Boolean).join(" · ")}
                </p>
              </div>
              <button
                onClick={close}
                aria-label="닫기"
                className="shrink-0 rounded-full border border-border p-2 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {/* 본문 (스크롤) */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
              <p className="text-sm leading-7 text-foreground/85">{project.description}</p>

              {project.highlights.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">주요 구현</h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm leading-6">
                        <span className="mt-0.5 text-accent">
                          <Icon name="check" size={16} />
                        </span>
                        <span className="text-foreground/85">{h}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* 스크린샷 갤러리 */}
              {project.images && project.images.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">화면</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.images.map((img) => (
                      <figure key={img.src} className="overflow-hidden rounded-xl border border-border">
                        <button
                          onClick={() => setLightbox(img.src)}
                          className="block w-full"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.caption}
                            loading="lazy"
                            className="aspect-[16/10] w-full cursor-zoom-in object-cover object-top transition-transform duration-300 hover:scale-[1.03]"
                          />
                        </button>
                        <figcaption className="border-t border-border px-3 py-2 text-xs text-muted">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}

              {/* 태그 */}
              <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">기술 스택</h4>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-foreground/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* 링크 */}
              <div className="mt-7 flex gap-3 text-sm font-medium">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name="github" size={15} />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-white transition-opacity hover:opacity-90"
                  >
                    <Icon name="external" size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 라이트박스 (스크린샷 확대) */}
      {mounted && lightbox && createPortal(
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="닫기"
            className="absolute right-4 top-4 rounded-full border border-white/30 p-2 text-white/80 transition-colors hover:text-white"
          >
            <Icon name="close" size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
