// ============================================================
// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 내용이 바뀝니다.
// ============================================================

export const profile = {
  name: "김병규",
  nameEn: "Kim ByeongGyu",
  role: "Backend Engineer",
  tagline:
    "인증, 결제, 관리자 세션처럼 운영 중 깨지기 쉬운 흐름을 설계하고 검증하는 백엔드 개발자입니다.",
  location: "서울, 대한민국",
  email: "zenk5554785@gmail.com", // 대표 이메일
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
    label: "Notion 이력서",
    href: "https://fancy-athlete-ad9.notion.site/Java-Backend-Developer-32e68859f1df8097b6d8fa7af420442c",
    icon: "blog",
  },
  { label: "Email", href: "mailto:zenk5554785@gmail.com", icon: "mail" },
];

// 히어로 통계 지표 — 시선을 끄는 핵심 숫자
export const stats: { value: string; label: string }[] = [
  { value: "2", label: "대표 프로젝트" },
  { value: "4", label: "운영 흐름 개선" },
  { value: "26", label: "결제 QA 검증" },
];

export const about = [
  "의료공학을 전공했지만, 기능을 직접 구현하고 하나의 서비스로 완성해가는 과정에 흥미를 느껴 개발자로 진로를 전환했습니다.",
  "팀 프로젝트에서는 회원 인증, 결제 이력, 관리자 채팅, 지도 기반 검색처럼 사용자가 실제로 마주하는 흐름을 맡아 구현했습니다.",
  "기능이 동작하는 데서 멈추지 않고, 결제 시점 데이터 보존이나 세션 저장 방식처럼 운영 중 문제가 될 수 있는 지점을 찾아 구조를 개선했습니다.",
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
    title: "검증 가능한 기준을 남깁니다",
    desc: "API 명세, QA 케이스, SQL·Swagger 검증 결과를 남겨 팀원이 같은 기준으로 확인할 수 있게 합니다.",
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
    items: ["Spring Boot", "Spring Security", "Spring Data JPA", "MyBatis", "REST API", "WebSocket", "STOMP"],
  },
  {
    category: "Database & Cache",
    icon: "database",
    items: ["Oracle", "MySQL", "Redis"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "DevOps & Cloud",
    icon: "cloud",
    items: ["Docker", "AWS EC2", "AWS S3", "AWS RDS", "GitHub Actions", "Git"],
  },
  {
    category: "API & Integration",
    icon: "sparkle",
    items: ["JWT", "OAuth2", "PortOne", "Swagger", "Kakao Login", "Naver Maps API", "Naver Search API"],
  },
];

export type ProjectImage = {
  src: string;
  caption: string;
  section?: string;
  group?: string;
};

export type ProjectScope = {
  label: string;
  items: string[];
};

export type ProjectSummary = {
  label: string;
  value: string;
};

export type ProjectFlow = {
  title: string;
  summary: string;
  steps: string[];
};

export type ProjectTroubleshooting = {
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  verification?: string;
  lesson?: string;
};

export type ProjectCaseStudy = {
  problem: string;
  solution: string;
  verification: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  summary?: ProjectSummary[];
  metrics?: { value: string; label: string }[];
  cardPoints?: string[];
  caseStudies?: ProjectCaseStudy[];
  scope?: ProjectScope[];
  flows?: ProjectFlow[];
  highlights: string[];
  tags: string[];
  images?: ProjectImage[];
  role?: string;
  period?: string;
  team?: string;
  troubleshooting?: ProjectTroubleshooting[];
  github?: string;
  demo?: string;
  repoLinks?: ProjectLink[];
};

// 대표 프로젝트 — 카드 클릭 시 상세 모달이 열립니다.
export const projects: Project[] = [
  {
    title: "Univ-US",
    subtitle: "대학 생활 통합 플랫폼 · 인증/결제/관리자 운영 API 담당",
    description:
      "학사·커뮤니티·예약·구독 결제·AI 챗봇 등 11개 도메인을 포함한 대학 통합 서비스입니다. 팀 프로젝트에서 회원 인증/보안, 구독 결제·웹훅, 관리자 대시보드 운영 API, 관리자 실시간 문의 채팅 API를 담당했습니다. 관리자 화면과 랜딩 페이지는 백엔드 기능 검증 및 서비스 흐름 연결을 위해 함께 구현했습니다.",
    summary: [
      { label: "담당", value: "회원 인증/보안, 구독 결제·웹훅, 관리자 운영 API, 관리자 채팅 API" },
      { label: "문제", value: "결제 이력 변경, 웹훅 반복 호출, 관리자 중복 로그인처럼 운영 중 깨질 수 있는 흐름" },
      { label: "검증", value: "SQL 조회, Swagger 반복 호출, Redis 세션 충돌 흐름으로 재현·확인" },
    ],
    metrics: [
      { value: "4", label: "운영 흐름 개선" },
      { value: "26", label: "구독·결제 QA" },
      { value: "3", label: "핵심 문제 해결" },
    ],
    cardPoints: [
      "결제 이력 스냅샷으로 플랜 변경 후에도 과거 결제 기준 보존",
      "PortOne 웹훅 반복 호출을 내부 결제 상태 기준으로 방어",
      "Redis 기반 관리자 단일 세션 정책 적용",
    ],
    caseStudies: [
      {
        problem: "플랜 수정 후 과거 결제 이력이 최신 플랜명·가격으로 보이는 정합성 문제가 있었습니다.",
        solution: "결제 이력에 결제 시점의 플랜명과 가격을 스냅샷 컬럼으로 저장했습니다.",
        verification: "플랜 변경 후 과거 결제 내역을 재조회해 당시 planName·amount 값이 유지되는지 SQL로 확인했습니다.",
      },
      {
        problem: "PortOne 정기결제 웹훅은 같은 이벤트가 반복 호출될 수 있어 중복 처리 위험이 있었습니다.",
        solution: "merchantUid와 내부 결제 상태를 먼저 조회하고 READY 상태가 아닌 이력은 바로 반환했습니다.",
        verification: "Swagger로 동일 웹훅을 반복 호출한 뒤 CANCELED 이력이 1건 그대로 유지되는지 DB로 검증했습니다.",
      },
      {
        problem: "관리자 계정은 여러 브라우저 동시 로그인 시 권한 회수와 감사 관점의 운영 리스크가 컸습니다.",
        solution: "AccessToken의 session id와 Redis의 auth:admin-session:{memberId} 값을 비교해 단일 세션 정책을 적용했습니다.",
        verification: "다른 브라우저에서 동일 관리자 계정 로그인을 시도해 409 충돌 응답과 forceLogin 흐름을 확인했습니다.",
      },
    ],
    scope: [
      {
        label: "팀 전체 서비스",
        items: ["학사·커뮤니티", "예약·구독 결제", "AI 챗봇", "관리자 기능"],
      },
      {
        label: "내 담당",
        items: ["회원 인증/인가 및 보안", "구독 결제·웹훅 처리", "관리자 실시간 문의 채팅 API", "관리자 대시보드 운영 API"],
      },
      {
        label: "협업/검증",
        items: ["프론트 연동 API", "QA 케이스 정리", "Swagger 검증", "배포 환경 확인"],
      },
    ],
    flows: [
      {
        title: "인증/세션 흐름",
        summary: "토큰을 브라우저 저장소에 직접 두는 구조에서 HttpOnly Cookie와 Redis 세션 기반 구조로 전환했습니다.",
        steps: ["Login", "Set-Cookie", "Redis session 저장", "권한 검증", "재발급/로그아웃 처리"],
      },
      {
        title: "관리자 중복 로그인",
        summary: "ADM/SUA 관리자 역할은 Redis의 현재 세션과 토큰의 session id를 비교해 단일 세션 정책을 적용했습니다.",
        steps: ["관리자 로그인", "기존 세션 조회", "409 충돌 응답", "forceLogin 선택", "세션 교체"],
      },
      {
        title: "정기결제 웹훅",
        summary: "PortOne 웹훅 수신 시 merchantUid와 이력 상태를 먼저 확인해 처리 대상이 아닌 요청은 조기 반환했습니다.",
        steps: ["Webhook 수신", "merchantUid 조회", "상태 확인", "READY만 처리", "중복/취소 이력 유지"],
      },
    ],
    highlights: [
      "Spring Security 기반 인증/인가 설계 — JWT 발급·검증, 역할 기반 가드, 구독 인터셉터",
      "회원(member) 도메인 구현 — 회원가입·로그인·세션, 휴대폰 SMS 본인인증 기반 아이디·비밀번호 찾기",
      "PortOne 연동 구독·결제·빌링·환불 및 결제 웹훅 처리",
      "STOMP WebSocket 기반 관리자 실시간 문의 채팅 구현",
      "서비스 관리자 대시보드, 학교 관리, 구독 플랜 관리 화면 개발",
      "HttpOnly 쿠키와 Redis 기반 refresh/session/admin-session 저장 구조로 인증 흐름 개선",
      "구독·결제 도메인 QA 산출물 기준 26건의 테스트 케이스 확인",
      "Swagger로 동일 정기결제 웹훅을 반복 호출해 처리 대상이 아닌 이력이 중복 처리되지 않는 흐름 확인",
    ],
    tags: ["Java 21", "Spring Boot", "Spring Security", "JWT", "Redis", "MyBatis", "Oracle", "WebSocket", "PortOne", "Next.js"],
    images: [
      { src: "/projects/univus/01-landing.png", caption: "서비스 랜딩 페이지", section: "주요 화면" },
      { src: "/projects/univus/04-payment.png", caption: "구독 결제 (PortOne)", section: "주요 화면" },
      { src: "/projects/univus/06-admin-chat.png", caption: "관리자 실시간 문의 채팅 (WebSocket)", section: "주요 화면" },
      {
        src: "/projects/univus/12-webhook-before-db.png",
        caption: "1. 호출 전 DB 상태: CANCELED 1건",
        section: "검증·설계 자료",
        group: "정기결제 웹훅 반복 호출 검증",
      },
      {
        src: "/projects/univus/13-webhook-swagger-ok.png",
        caption: "2. Swagger 동일 웹훅 반복 호출: 200 OK",
        section: "검증·설계 자료",
        group: "정기결제 웹훅 반복 호출 검증",
      },
      {
        src: "/projects/univus/14-webhook-after-db.png",
        caption: "3. 호출 후 DB 상태 유지: 변경/중복 없음",
        section: "검증·설계 자료",
          group: "정기결제 웹훅 반복 호출 검증",
        },
      {
        src: "/projects/univus/17-admin-session-conflict.png",
        caption: "관리자 중복 로그인 충돌 모달 확인",
        section: "검증·설계 자료",
      },
      {
        src: "/projects/univus/18-payment-snapshot-query.png",
        caption: "결제 이력 스냅샷 검증 SQL 및 결과",
        section: "검증·설계 자료",
      },
      { src: "/projects/univus/19-architecture.png", caption: "시스템 아키텍처 및 연동 구조", section: "검증·설계 자료" },
    ],
    role: "Backend",
    period: "2026.05 – 2026.06",
    team: "팀 프로젝트",
    troubleshooting: [
      {
        title: "구독 플랜 변경 시 결제 이력 정합성 보존",
        problem:
          "구독 플랜 수정 기능을 추가하면서 과거 결제 이력이 최신 플랜명과 가격으로 조회되는 문제가 드러났습니다. 결제 이력은 결제 당시 기준으로 남아야 하지만, 기존 구조에서는 현재 플랜 테이블의 값이 따라오고 있었습니다.",
        cause:
          "결제 이력이 플랜 테이블을 참조하는 구조였기 때문에 과거 이력 조회 시에도 현재 플랜 정보가 조인되었습니다. 플랜명과 가격은 운영 중 수정될 수 있는 값인데, 이력 테이블에는 결제 시점의 값이 별도로 보존되어 있지 않았습니다.",
        solution:
          "결제 이력은 현재 상태가 아니라 발생 시점의 값을 보존해야 한다고 판단했습니다. 결제 이력 테이블에 결제 당시의 플랜명과 가격을 저장하는 스냅샷 컬럼을 추가했습니다. 이후 이력 조회는 플랜 테이블의 현재 값이 아니라 결제 이력에 저장된 스냅샷 값을 기준으로 표시하도록 정리했습니다.",
        verification:
          "플랜명과 가격을 변경한 뒤 기존 결제 이력을 다시 조회했습니다. 과거 이력이 변경된 최신 값이 아니라 결제 당시 저장된 planName, amount 값을 유지하는 것을 SQL 조회 결과로 확인했습니다.",
        lesson:
          "이력성 데이터는 정규화만 기준으로 판단하면 안 되고, 변경 가능한 참조 값은 발생 시점 보존 여부를 함께 고려해야 한다는 점을 배웠습니다.",
      },
      {
        title: "PortOne 웹훅 반복 호출에 대한 멱등 처리",
        problem:
          "정기결제 웹훅은 외부 결제 시스템에서 호출되기 때문에 같은 merchantUid에 대한 요청이 반복해서 들어올 수 있었습니다. 특히 이미 취소되었거나 처리 대상이 아닌 결제 이력에 웹훅이 다시 들어올 경우, 상태가 잘못 변경되거나 중복 처리될 위험이 있었습니다.",
        cause:
          "웹훅 요청 자체를 신뢰하고 바로 처리하면 내부 결제 이력의 현재 상태와 외부 요청의 상태가 어긋날 수 있었습니다. 외부 시스템 연동에서는 네트워크 재시도나 중복 이벤트가 발생할 수 있으므로, 처리 전 내부 상태 확인이 필요했습니다.",
        solution:
          "웹훅 처리 전에 merchantUid로 결제 이력을 조회하고, READY 상태인 이력만 후속 처리를 하도록 제한했습니다. READY가 아닌 CANCELED, PAID 등의 이력은 처리 대상이 아니라고 판단해 조기 반환하도록 했습니다.",
        verification:
          "Swagger로 동일 merchantUid의 정기결제 웹훅을 반복 호출했습니다. 이후 DB를 조회해 CANCELED 상태의 결제 이력이 상태 변경 없이 1건만 유지되는 것을 확인했습니다.",
        lesson:
          "외부 웹훅은 한 번만 호출된다고 가정하면 안 되며, 내부 상태를 기준으로 멱등성에 가까운 방어 로직을 두어야 한다는 점을 배웠습니다.",
      },
      {
        title: "Redis 기반 관리자 단일 세션 정책 적용",
        problem:
          "서비스 관리자와 학교 관리자는 권한 범위가 넓기 때문에 여러 브라우저에서 동시에 로그인된 상태가 유지되면 운영 리스크가 커질 수 있었습니다. 기존 토큰 기반 인증만으로는 현재 유효한 관리자 세션이 무엇인지 서버에서 일관되게 판단하기 어려웠습니다.",
        cause:
          "초기 구조는 JWT를 발급하고 검증하는 흐름에 집중되어 있었고, 서버 측에서 관리자별 현재 세션을 추적하는 기준이 부족했습니다. 로그아웃, 재발급, 강제 로그인처럼 세션 상태를 바꿔야 하는 흐름에서는 토큰 검증만으로는 충분하지 않았습니다.",
        solution:
          "AccessToken에 session id를 포함하고, Redis에 관리자별 현재 세션 값을 저장했습니다. 요청 시 토큰의 session id와 Redis의 auth:admin-session:{memberId} 값을 비교해 현재 세션만 허용했습니다. 다른 브라우저에서 로그인하면 409 ADMIN_SESSION_CONFLICT를 반환하고, forceLogin을 선택한 경우 기존 세션을 교체하도록 처리했습니다.",
        verification:
          "기존 관리자 세션이 유지된 상태에서 다른 브라우저로 동일 계정 로그인을 시도했습니다. 동시 접근 제한 모달이 노출되고, 강제 로그인 선택 시 기존 세션이 교체되는 흐름을 확인했습니다.",
        lesson:
          "JWT만으로는 현재 유효한 세션 정책을 표현하기 어렵고, 운영 정책이 필요한 계정은 서버 측 세션 상태를 함께 관리해야 한다는 점을 배웠습니다.",
      },
    ],
    github: "https://github.com/Kim-ByeongGyu/univ-us-be",
    demo: "",
    repoLinks: [
      { label: "Backend Repository", href: "https://github.com/Kim-ByeongGyu/univ-us-be" },
      { label: "Frontend Repository", href: "https://github.com/Kim-ByeongGyu/univ-us-fe" },
    ],
  },
  {
    title: "GRIP",
    subtitle: "클라이밍장 지도 기반 정보·커뮤니티 서비스",
    description:
      "클라이밍장 정보를 지도 기반으로 제공하고 게시글·댓글·좋아요·검색 기능을 함께 제공하는 커뮤니티 서비스입니다. 팀 프로젝트에서 클라이밍장 목록/검색 API와 지도 화면 연동, 마커 정보창과 상세 페이지 이동, 혼잡도 조회 연결, 좋아요 토글 API와 중복 등록 방지 흐름을 담당했습니다.",
    summary: [
      { label: "담당", value: "지도 조회 API, 좋아요 토글 API, 혼잡도 연동" },
      { label: "문제", value: "DB의 클라이밍장·혼잡도 데이터를 지도 화면에 연결하고 좋아요 중복 등록을 막아야 했음" },
      { label: "검증", value: "지도 마커·정보창, 상세 페이지/혼잡도 조회, 좋아요 등록·취소 반복 확인" },
    ],
    metrics: [
      { value: "100+", label: "클라이밍장 데이터" },
      { value: "40+", label: "AWS 배포 환경 접속" },
      { value: "4", label: "팀 프로젝트 인원" },
    ],
    cardPoints: [
      "지도 마커·정보창·상세 페이지 이동 흐름 연결",
      "혼잡도 조회 API를 상세 화면 그래프와 연동",
      "userId + postId 기준 좋아요 토글로 중복 등록 방지",
    ],
    caseStudies: [
      {
        problem: "같은 사용자가 같은 게시글에 좋아요를 여러 번 등록할 수 있는 문제가 있었습니다.",
        solution: "userId + postId 기준으로 기존 좋아요를 조회한 뒤 생성/취소를 나누는 토글 방식으로 구현했습니다.",
        verification: "같은 게시글에서 좋아요를 반복 클릭해 등록과 취소가 번갈아 처리되고 중복 데이터가 쌓이지 않는지 확인했습니다.",
      },
      {
        problem: "DB에 저장된 클라이밍장과 혼잡도 데이터를 사용자가 지도에서 바로 탐색할 수 있게 연결해야 했습니다.",
        solution: "클라이밍장 목록/검색 API와 혼잡도 조회 API를 지도 화면에 연결하고, 마커 클릭 시 정보창과 상세 페이지 이동 흐름을 구성했습니다.",
        verification: "지도 마커 노출, 정보창의 혼잡도 표시, 상세 페이지의 시간대별 혼잡도 그래프가 정상 동작하는지 확인했습니다.",
      },
    ],
    highlights: [
      "클라이밍장 목록/검색 API와 Naver Maps API 연동 — 지도 마커·정보창·상세 이동 흐름 구현",
      "혼잡도 조회 API 연동 — 마커 정보창과 상세 페이지의 시간대별 혼잡도 그래프 연결",
      "좋아요 기능 — Like 엔티티 설계, 토글 등록/취소, 비동기 fetch로 즉시 반영 및 중복 방지 처리",
      "클라이밍장 상세 페이지 게시글 페이징·정렬 개선 (Pageable, 최신순 정렬)",
      "프로젝트 공통 환경으로 Spring Security/JWT, Redis RefreshToken, Kakao OAuth2, AWS EC2/S3/RDS 배포 흐름 경험",
    ],
    tags: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL", "Redis", "AWS (EC2·S3·RDS)", "JWT", "Kakao OAuth2", "Naver Maps API"],
    images: [
      { src: "/projects/grip/07-main-map.png", caption: "메인 지도 — 클라이밍장 마커·혼잡도", section: "주요 화면" },
      { src: "/projects/grip/08-gym-detail.png", caption: "클라이밍장 상세 — 지도·시간대별 혼잡도 그래프", section: "주요 화면" },
      { src: "/projects/grip/10-post-detail.png", caption: "게시글 상세 — 좋아요·댓글 흐름", section: "주요 화면" },
      { src: "/projects/grip/05-architecture.svg", caption: "시스템 / AWS 구성도 (코드 기반)", section: "설계 자료" },
      { src: "/projects/grip/06-sequence-collect.svg", caption: "지도 조회 API 연동 흐름", section: "설계 자료" },
      { src: "/projects/grip/03-erd.png", caption: "ERD — 데이터 모델 설계", section: "설계 자료" },
      { src: "/projects/grip/04-event-storming.png", caption: "이벤트 스토밍 — 도메인 설계", section: "설계 자료" },
    ],
    role: "Backend",
    period: "2024.07 – 2024.09",
    team: "4인 팀 · 멋쟁이사자처럼",
    troubleshooting: [
      {
        title: "좋아요 중복 등록 방지",
        problem:
          "한 사용자가 같은 게시글에 여러 번 좋아요를 누를 수 있는 문제가 있었습니다.",
        cause:
          "좋아요 등록 시 기존 등록 여부를 확인하지 않으면, 같은 사용자와 게시글 조합의 좋아요가 중복으로 쌓일 수 있는 구조였습니다.",
        solution:
          "userId + postId 기준으로 기존 좋아요 여부를 먼저 조회한 뒤, 존재하면 취소하고 없으면 생성하는 토글 방식으로 구현했습니다. 데이터가 많아질수록 조회 비용이 늘 수 있다는 한계를 인지하고, 복합 유니크 인덱스·캐시 적용을 개선 방향으로 정리했습니다.",
        verification:
          "같은 게시글에서 좋아요를 반복해 눌렀을 때 등록과 취소가 번갈아 처리되고, 사용자별 좋아요가 한 번만 반영되는지 확인했습니다.",
      },
      {
        title: "지도 조회와 혼잡도 연동",
        problem:
          "지도 화면에서는 클라이밍장 위치뿐 아니라 현재 시간대의 혼잡도까지 함께 보여줘야 했습니다.",
        cause:
          "클라이밍장 기본 정보와 시간대별 혼잡도 데이터가 분리되어 있어, 지도 마커 클릭 시 필요한 데이터를 단계적으로 조회해야 했습니다.",
        solution:
          "지도 초기 로딩 시 클라이밍장 목록을 조회하고, 마커 클릭 시 해당 클라이밍장의 혼잡도 API를 호출해 정보창에 여유·보통·혼잡 상태를 표시했습니다.",
        verification:
          "지도 마커 노출, 정보창의 혼잡도 표시, 상세 페이지의 시간대별 혼잡도 그래프가 정상 동작하는지 확인했습니다.",
      },
    ],
    github: "https://github.com/Kim-ByeongGyu/grip",
    demo: "",
    repoLinks: [
      { label: "Project Repository", href: "https://github.com/Kim-ByeongGyu/grip" },
    ],
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
    desc: "Java·Spring Boot, React·Next.js, Oracle/PLSQL, Docker·Ubuntu/Linux 기반 개발·배포 환경을 학습하고, 팀 프로젝트에서 FE/BE 분리 구조로 인증/보안, 구독 결제, 관리자 대시보드, 실시간 문의 채팅을 구현했습니다.",
    type: "training",
  },
  {
    period: "2024.03 — 2024.09",
    title: "멋쟁이사자처럼 (백엔드)",
    org: "백엔드 개발 교육 과정",
    desc: "Java·Spring Boot·JPA 기반 백엔드 개발과 REST API 설계, 데이터베이스 연동을 학습하고, 팀 프로젝트에서 JWT 인증, Kakao OAuth2, Naver Maps API 연동과 AWS 기반 배포 환경 구성을 경험했습니다.",
    type: "training",
  },
  {
    period: "2023.02 — 2023.08",
    title: "한국디지털직업전문학교",
    org: "직업훈련 과정",
    desc: "의료공학 전공을 살려 아두이노 기반 IoT 프로그래밍을 학습하며 취업을 준비했고, Java·C·MySQL과 웹 기초를 접하면서 웹 개발에 흥미를 갖게 되었습니다.",
    type: "training",
  },
  {
    period: "2017.03 — 2023.02",
    title: "대구한의대학교 의료공학과",
    org: "학사 졸업 · 학점 3.84 / 4.5",
    desc: "의료기기와 공학 기초를 중심으로 의료공학을 전공했습니다.",
    type: "education",
  },
];
