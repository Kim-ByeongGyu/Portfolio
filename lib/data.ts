// ============================================================
// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 내용이 바뀝니다.
// ============================================================

export const profile = {
  name: "김병규",
  nameEn: "Kim ByeongGyu",
  role: "Software Engineer",
  tagline: "사용자에게 가치를 주는 제품을 만드는 개발자입니다.",
  location: "Seoul, Korea",
  email: "your-email@example.com",
  resumeUrl: "", // 이력서 PDF 링크 (선택)
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Kim-ByeongGyu" },
  { label: "Email", href: "mailto:your-email@example.com" },
  // { label: "LinkedIn", href: "https://linkedin.com/in/..." },
  // { label: "Blog", href: "https://..." },
];

export const about = [
  "안녕하세요. 문제를 깊이 파고들어 단순하고 견고한 해법을 찾는 것을 좋아하는 개발자입니다.",
  "여기에 본인을 소개하는 내용을 2~3문장으로 작성하세요. 어떤 기술에 관심이 있는지, 어떤 가치를 중요하게 생각하는지 등을 적으면 좋습니다.",
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Language", items: ["TypeScript", "JavaScript", "Python", "Java"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Docker", "Vercel", "AWS"] },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "프로젝트 이름 1",
    description:
      "프로젝트에 대한 간단한 설명을 적으세요. 어떤 문제를 해결했고, 본인의 역할은 무엇이었는지 한두 문장으로 작성합니다.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/Kim-ByeongGyu",
    demo: "",
  },
  {
    title: "프로젝트 이름 2",
    description:
      "프로젝트 설명. 사용한 기술과 성과(예: 응답속도 40% 개선)를 함께 적으면 더 좋습니다.",
    tags: ["React", "Node.js"],
    github: "https://github.com/Kim-ByeongGyu",
    demo: "",
  },
  {
    title: "프로젝트 이름 3",
    description: "프로젝트 설명을 여기에 작성하세요.",
    tags: ["Python", "Docker"],
    github: "https://github.com/Kim-ByeongGyu",
    demo: "",
  },
];

export const experience: { period: string; title: string; org: string; desc: string }[] = [
  {
    period: "2024 — 현재",
    title: "직무 / 역할",
    org: "회사 또는 단체 이름",
    desc: "주요 업무와 성과를 간단히 적으세요.",
  },
];
