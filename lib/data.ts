// ============================================================
// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 내용이 바뀝니다.
// ============================================================

export const profile = {
  name: "김병규",
  nameEn: "Kim ByeongGyu",
  role: "Backend Engineer",
  tagline:
    "Java·Spring Boot 기반으로 기능을 직접 구현하고 서비스로 완성하는 백엔드 개발자입니다.",
  location: "서울, 대한민국",
  email: "zenk555@naver.com", // 대표 이메일 (Naver)
  emailAlt: "zenk5554785@gmail.com", // 보조 이메일 (Google)
  available: true, // 구직/협업 가능 여부 (히어로 배지)
  resumeUrl: "", // 이력서 PDF 링크 (선택)
};

export type Social = {
  label: string;
  href: string;
  icon: "github" | "mail" | "linkedin" | "blog";
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Kim-ByeongGyu", icon: "github" },
  {
    label: "Portfolio",
    href: "https://fancy-athlete-ad9.notion.site/Java-Backend-Developer-32e68859f1df8097b6d8fa7af420442c",
    icon: "blog",
  },
  { label: "Email", href: "mailto:zenk555@naver.com", icon: "mail" },
];

// 히어로 통계 지표 — 시선을 끄는 핵심 숫자
export const stats: { value: string; label: string }[] = [
  { value: "2", label: "대표 프로젝트" },
  { value: "100+", label: "데이터 수집·구축" },
  { value: "40+", label: "실사용자 경험" },
];

export const about = [
  "의료공학을 전공했지만, 기능을 직접 구현하고 하나의 서비스로 완성해가는 과정에 흥미를 느껴 개발자로 진로를 전환했습니다.",
  "직업훈련과 백엔드 교육 과정을 거치며 Java·Spring Boot·JPA·MySQL·AWS 기반의 웹 서비스 개발을 학습했고, 팀 프로젝트에서 인증/보안·결제·실시간 채팅 등 실제 서비스 기능을 직접 구현했습니다.",
  "막히는 부분이 생기면 원인을 찾고 구조를 다시 살펴보며 끝까지 해결하려는 태도로, 꾸준히 성장하는 백엔드 개발자가 되고자 합니다.",
];

// 개발 가치관 — 전문성을 보여주는 핵심 원칙
export const principles: {
  title: string;
  desc: string;
  icon: "layers" | "users" | "growth";
}[] = [
  {
    title: "구조를 먼저 고민합니다",
    desc: "데이터의 흐름과 책임을 명확히 나누어, 변경에 강하고 읽기 쉬운 구조를 먼저 설계합니다.",
    icon: "layers",
  },
  {
    title: "협업을 가치 있게 여깁니다",
    desc: "PR 리뷰와 명확한 컨벤션, 역할 분배를 통해 팀이 함께 더 멀리 갈 수 있도록 합니다.",
    icon: "users",
  },
  {
    title: "끝까지 파고들어 해결합니다",
    desc: "막히는 부분은 원인을 찾고 구조를 다시 살펴보며, 직접 구현해 이해를 넓혀 갑니다.",
    icon: "growth",
  },
];

export type SkillGroup = {
  category: string;
  icon: "code" | "server" | "database" | "layout" | "cloud" | "sparkle";
  items: string[];
};

// 기술 스택 — 실제 프로젝트(GRIP, Univ-US)에서 사용한 기술 기준
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Spring Boot", "Spring Security", "Spring Data JPA", "MyBatis", "WebSocket (STOMP)"],
  },
  {
    category: "Database & Cache",
    icon: "database",
    items: ["MySQL", "Oracle", "Redis"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "DevOps & Tools",
    icon: "cloud",
    items: ["Docker", "GitHub Actions", "Git", "AWS"],
  },
  {
    category: "기타",
    icon: "sparkle",
    items: ["JWT / OAuth2", "REST API", "PortOne 결제 연동", "Swagger (OpenAPI)"],
  },
];

export type ProjectImage = { src: string; caption: string };

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  images?: ProjectImage[];
  role?: string;
  period?: string;
  team?: string;
  troubleshooting?: { title: string; problem: string; solution: string }[];
  github?: string;
  demo?: string;
};

// 대표 프로젝트 — 카드 클릭 시 상세 모달이 열립니다.
export const projects: Project[] = [
  {
    title: "Univ-US",
    subtitle: "대학 생활 통합 플랫폼 · 인증/결제/실시간 채팅 담당",
    description:
      "학사·커뮤니티·예약·구독 결제·AI 챗봇을 아우르는 대학 통합 서비스(11개 도메인 모듈러 모놀리스)입니다. 팀 프로젝트에서 회원·인증/보안, 구독·결제, 관리자 실시간 문의 채팅, 랜딩 페이지를 담당했습니다.",
    highlights: [
      "Spring Security 기반 인증/인가 설계 — JWT 발급·검증, 역할 기반 가드, 구독 인터셉터",
      "회원(member) 도메인 구현 — 회원가입·로그인·세션, 휴대폰 SMS 본인인증 기반 아이디·비밀번호 찾기",
      "PortOne 연동 구독·결제·빌링·환불 및 결제 웹훅 처리",
      "STOMP WebSocket 기반 관리자 실시간 문의 채팅 구현",
      "학교 관리자 대시보드 및 서비스 랜딩 페이지(Next.js) 개발",
    ],
    tags: ["Java 21", "Spring Boot", "Spring Security", "JWT", "MyBatis", "Oracle", "WebSocket", "PortOne", "Next.js"],
    images: [
      { src: "/projects/univus/01-landing.png", caption: "서비스 랜딩 페이지" },
      { src: "/projects/univus/02-signup.png", caption: "회원가입 (member 도메인)" },
      { src: "/projects/univus/03-account-recovery.png", caption: "아이디·비밀번호 찾기 (SMS 본인인증)" },
      { src: "/projects/univus/04-payment.png", caption: "구독 결제 (PortOne)" },
      { src: "/projects/univus/05-payment-detail.png", caption: "결제·구독 관리 내역" },
      { src: "/projects/univus/06-admin-chat.png", caption: "관리자 실시간 문의 채팅 (WebSocket)" },
    ],
    role: "Backend",
    period: "2025",
    team: "팀 프로젝트",
    troubleshooting: [
      {
        title: "구독 플랜 변경 시 결제 이력 정합성",
        problem:
          "구독 플랜 테이블에 이름·가격을 직접 두고 설계했는데, 플랜 수정 기능을 만들면서 문제가 드러났습니다. 결제 이력에는 결제 '당시'의 플랜 이름·가격이 남아야 하지만, 플랜을 수정하면 이력 조회 시 변경된 최신 값이 출력되었습니다.",
        solution:
          "이력성 데이터는 시점의 값을 보존해야 한다는 점을 놓친 설계였습니다. 당시 테이블 구조를 크게 분리하기 어려운 상황이라, 결제 이력에 '결제 시점의 플랜 이름·가격'을 스냅샷으로 저장하는 컬럼을 추가해 정합성을 확보했습니다. 이 경험으로 이력·트랜잭션 데이터는 가변 마스터 데이터를 참조만 하지 말고 시점 값을 함께 저장해야 한다는 설계 원칙을 체득했습니다.",
      },
    ],
    github: "https://github.com/Kim-ByeongGyu/univ-us-be",
    demo: "",
  },
  {
    title: "GRIP",
    subtitle: "클라이밍장 지도 기반 정보·커뮤니티 서비스",
    description:
      "클라이밍장 정보를 지도 기반으로 제공하는 웹 서비스입니다. Naver Search API로 수집한 서울 클라이밍장 약 100곳을 네이버 지도에 시각화하고, 게시글·댓글·좋아요·통합 검색으로 사용자 상호작용을 제공합니다. 단순 기능 구현을 넘어 기술 선택의 이유와 한계까지 정리하며 진행한 멋쟁이사자처럼 4인 팀 프로젝트입니다.",
    highlights: [
      "Naver Search API로 서울 클라이밍장 약 100곳 데이터 수집·구축 (이름·주소·좌표·전화번호)",
      "Naver Maps API 연동 지도 화면 — 클라이밍장 마커 시각화, 클릭 시 상세·블로그 페이지 이동",
      "좋아요 기능 — Like 엔티티 설계, 토글 등록/취소, 비동기 fetch로 즉시 반영 및 중복 방지 처리",
      "게시글·클라이밍장 통합 검색 + 페이지네이션 (JPA Containing · Pageable)",
      "JWT 인증 + Kakao OAuth2 로그인 — RefreshToken을 DB에 저장해 재발급 시 검증",
      "AWS EC2·S3·RDS 직접 배포 — 약 40명 수강생이 접속한 운영 환경 구성",
    ],
    tags: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "Redis", "AWS (EC2·S3·RDS)", "JWT", "Kakao OAuth2", "Naver Maps API"],
    images: [
      { src: "/projects/grip/01-map.png", caption: "네이버 지도 기반 클라이밍장 화면" },
      { src: "/projects/grip/02-prototype.png", caption: "서비스 프로토타입" },
      { src: "/projects/grip/03-erd.png", caption: "ERD — 데이터 모델 설계" },
      { src: "/projects/grip/04-event-storming.png", caption: "이벤트 스토밍 — 도메인 설계" },
    ],
    role: "Backend",
    period: "2024.07 – 2024.09",
    team: "4인 팀 · 멋쟁이사자처럼",
    troubleshooting: [
      {
        title: "좋아요 중복 등록 방지",
        problem:
          "한 사용자가 같은 게시글에 여러 번 좋아요를 누를 수 있는 문제가 있었습니다.",
        solution:
          "userId + postId 기준으로 기존 좋아요 여부를 먼저 조회한 뒤, 존재하면 취소하고 없으면 생성하는 토글 방식으로 구현했습니다. 데이터가 많아질수록 조회 비용이 늘 수 있다는 한계를 인지하고, 복합 유니크 인덱스·캐시 적용을 개선 방향으로 정리했습니다.",
      },
      {
        title: "JWT vs 세션 인증 방식 선택",
        problem:
          "인증 방식을 세션 기반과 JWT 중 무엇으로 할지 결정해야 했습니다.",
        solution:
          "AccessToken 검증 시 서버가 별도 세션 저장소를 조회하지 않아도 되는 점에서 JWT가 프로젝트 구조에 더 적합하다고 판단했습니다. 다만 로그아웃·재발급 보안을 위해 RefreshToken은 DB에 저장하고 재발급 시 검증하는 구조로 구현했습니다.",
      },
    ],
    github: "https://github.com/Kim-ByeongGyu/GRIP_TEAM_EPARI",
    demo: "",
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  desc: string;
  type: "education" | "training";
};

// 학력 & 교육 — 최신순
export const timeline: TimelineItem[] = [
  {
    period: "2026.05 — 2026.07 (수강 중)",
    title: "Java 웹개발자 과정",
    org: "한국IT전문가협회 주관 · 서울시 매력일자리사업",
    desc: "서울시 매력일자리사업의 일환으로 한국IT전문가협회가 주관하는 Java 웹 개발자 양성 과정에 참여하며 실무 중심의 백엔드 개발 역량을 강화하고 있습니다.",
    type: "training",
  },
  {
    period: "2024.03 — 2024.09",
    title: "멋쟁이사자처럼 (백엔드)",
    org: "백엔드 개발 교육 과정",
    desc: "Java·Spring Boot·JPA·Docker·AWS 기반 백엔드 개발 학습. REST API 설계, 데이터베이스 연동, 배포 환경 구성 및 팀 프로젝트 협업 경험.",
    type: "training",
  },
  {
    period: "2023.02 — 2023.08",
    title: "한국디지털직업전문학교",
    org: "직업훈련 과정",
    desc: "Java·C·MySQL 기반 프로그래밍 및 웹 기초 학습, 아두이노 기반 IoT 프로그래밍 실습 수행.",
    type: "training",
  },
  {
    period: "2017.03 — 2023.02",
    title: "대구한의대학교 의료공학과",
    org: "학사 졸업 · 학점 3.84 / 4.5",
    desc: "의료공학 전공. 재학 중 소프트웨어 개발에 흥미를 느껴 개발자로 진로를 전환.",
    type: "education",
  },
];
