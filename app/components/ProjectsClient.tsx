"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import type { Project, ProjectImage } from "@/lib/data";

type GalleryItem = {
  key: string;
  title: string;
  section: string;
  images: ProjectImage[];
  isGroup: boolean;
};

type GallerySection = {
  title: string;
  items: GalleryItem[];
};

type LightboxState = {
  title: string;
  images: ProjectImage[];
};

function buildGallerySections(images: ProjectImage[]): GallerySection[] {
  const items: GalleryItem[] = [];
  const groups = new Map<string, GalleryItem>();

  images.forEach((image) => {
    const section = image.section ?? "화면";

    if (!image.group) {
      items.push({
        key: image.src,
        title: image.caption,
        section,
        images: [image],
        isGroup: false,
      });
      return;
    }

    const group = groups.get(image.group);
    if (group) {
      group.images.push(image);
      return;
    }

    const newGroup = {
      key: `group:${image.group}`,
      title: image.group,
      section,
      images: [image],
      isGroup: true,
    };
    groups.set(image.group, newGroup);
    items.push(newGroup);
  });

  return items.reduce<GallerySection[]>((sections, item) => {
    const section = sections.find((candidate) => candidate.title === item.section);
    if (section) {
      section.items.push(item);
      return sections;
    }

    sections.push({ title: item.section, items: [item] });
    return sections;
  }, []);
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const project = openIndex !== null ? projects[openIndex] : null;
  const gallerySections = useMemo(
    () => (project?.images ? buildGallerySections(project.images) : []),
    [project]
  );
  const canUseDocument = typeof document !== "undefined";

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
            aria-label={`${p.title} 프로젝트 상세 보기`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5"
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
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                {p.role && (
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                    {p.role}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
              {p.metrics && p.metrics.length > 0 && (
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  {p.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-border bg-background/40 px-2.5 py-2">
                      <dt className="text-lg font-bold tracking-tight text-accent">{metric.value}</dt>
                      <dd className="mt-0.5 text-[11px] leading-4 text-muted">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {p.cardPoints && p.cardPoints.length > 0 ? (
                <ul className="mt-4 flex-1 space-y-2">
                  {p.cardPoints.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-6 text-foreground/80">
                      <span className="mt-0.5 text-accent">
                        <Icon name="check" size={15} />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-muted">
                  {p.description}
                </p>
              )}
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
      {canUseDocument && project && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onClick={close}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 (고정) */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-background px-6 py-5 sm:px-8 lg:px-10">
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
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 lg:px-10">
              <p className="max-w-5xl text-base leading-8 text-foreground/85">{project.description}</p>

              {project.metrics && project.metrics.length > 0 && (
                <dl className="mt-5 grid grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-border bg-card px-4 py-3">
                      <dt className="text-2xl font-bold tracking-tight text-accent">{metric.value}</dt>
                      <dd className="mt-1 text-xs leading-5 text-muted">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.scope && project.scope.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">담당 범위</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    {project.scope.map((scope) => (
                      <section key={scope.label} className="rounded-lg border border-border bg-card p-4">
                        <h5 className="font-mono text-xs font-semibold text-accent">{scope.label}</h5>
                        <ul className="mt-3 space-y-2">
                          {scope.items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-foreground/80">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </>
              )}

              {project.flows && project.flows.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">아키텍처 / 핵심 흐름</h4>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {project.flows.map((flow) => (
                      <section key={flow.title} className="rounded-lg border border-border bg-card p-4">
                        <h5 className="font-semibold">{flow.title}</h5>
                        <p className="mt-2 text-sm leading-6 text-foreground/75">{flow.summary}</p>
                        <ol className="mt-4 space-y-2">
                          {flow.steps.map((step, index) => (
                            <li key={step} className="flex items-center gap-2 text-sm text-foreground/85">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[11px] font-semibold text-accent">
                                {index + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    ))}
                  </div>
                </>
              )}

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

              {/* 트러블슈팅 */}
              {project.troubleshooting && project.troubleshooting.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">트러블슈팅</h4>
                  <div className="space-y-3">
                    {project.troubleshooting.map((t) => (
                      <div
                        key={t.title}
                        className="rounded-lg border border-border bg-card p-4"
                      >
                        <p className="font-semibold">{t.title}</p>
                        <div className="mt-2 flex gap-2 text-sm leading-6">
                          <span className="mt-0.5 shrink-0 rounded bg-rose-500/10 px-1.5 py-0.5 text-xs font-medium text-rose-500">
                            문제
                          </span>
                          <span className="text-foreground/80">{t.problem}</span>
                        </div>
                        {t.cause && (
                          <div className="mt-2 flex gap-2 text-sm leading-6">
                            <span className="mt-0.5 shrink-0 rounded bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-500">
                              원인
                            </span>
                            <span className="text-foreground/80">{t.cause}</span>
                          </div>
                        )}
                        <div className="mt-2 flex gap-2 text-sm leading-6">
                          <span className="mt-0.5 shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-medium text-emerald-500">
                            해결
                          </span>
                          <span className="text-foreground/80">{t.solution}</span>
                        </div>
                        {t.verification && (
                          <div className="mt-2 flex gap-2 text-sm leading-6">
                            <span className="mt-0.5 shrink-0 rounded bg-sky-500/10 px-1.5 py-0.5 text-xs font-medium text-sky-500">
                              검증
                            </span>
                            <span className="text-foreground/80">{t.verification}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* 스크린샷 갤러리 */}
              {gallerySections.length > 0 && (
                <>
                  <h4 className="mt-7 mb-3 text-sm font-semibold text-muted">화면</h4>
                  <div className="space-y-6">
                    {gallerySections.map((section) => (
                      <section key={section.title}>
                        <h5 className="mb-3 font-mono text-xs font-semibold text-accent">{section.title}</h5>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {section.items.map((item) => (
                            <figure
                              key={item.key}
                              className={`overflow-hidden rounded-lg border border-border bg-card ${
                                item.isGroup ? "sm:col-span-2 xl:col-span-3" : ""
                              }`}
                            >
                              <button
                                onClick={() => setLightbox({ title: item.title, images: item.images })}
                                className="group block w-full text-left"
                              >
                                {item.isGroup ? (
                                  <div className={`grid gap-2 bg-background/40 p-3 ${item.images.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                                    {item.images.map((image) => (
                                      <div key={image.src} className="overflow-hidden rounded-md border border-border bg-background">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={image.src}
                                          alt={image.caption}
                                          loading="lazy"
                                          className="aspect-[16/10] w-full cursor-zoom-in object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.images[0].src}
                                      alt={item.images[0].caption}
                                      loading="lazy"
                                      className="aspect-[16/10] w-full cursor-zoom-in object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                  </>
                                )}
                              </button>
                              <figcaption className="flex items-center justify-between gap-3 border-t border-border px-3 py-2 text-xs text-muted">
                                <span>{item.title}</span>
                                {item.isGroup && (
                                  <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
                                    {item.images.length}단계
                                  </span>
                                )}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      </section>
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
      {canUseDocument && lightbox && createPortal(
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
          <div
            className="max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-lg border border-white/15 bg-background p-4 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold tracking-tight">{lightbox.title}</h3>
            <div className={lightbox.images.length > 1 ? "grid gap-4 lg:grid-cols-3" : ""}>
              {lightbox.images.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-lg border border-border bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="max-h-[72vh] w-full object-contain"
                  />
                  <figcaption className="border-t border-border px-3 py-2 text-sm text-muted">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
