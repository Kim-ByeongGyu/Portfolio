import Section from "./Section";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="프로젝트" label="Projects" icon="folder">
      <ProjectsClient projects={projects} />
    </Section>
  );
}
