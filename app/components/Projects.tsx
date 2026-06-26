import Section from "./Section";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="프로젝트">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-xl border border-black/[.06] p-6 transition-colors hover:border-black/20 dark:border-white/[.08] dark:hover:border-white/25"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-black/[.04] px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-white/[.06]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-4 text-sm font-medium">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
