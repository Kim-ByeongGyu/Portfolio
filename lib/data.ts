// ============================================================
// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 내용이 바뀝니다.
// ============================================================

export const profile = {
  name: "김병규",
  nameEn: "Kim ByeongGyu",
  role: "Backend Engineer",
  tagline:
    "Spring Security 인증, PortOne 결제, WebSocket 채팅, 배포까지 직접 구현하며 서비스 흐름을 끝까지 완성해 본 백엔드 개발자입니다.",
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
    label: "Notion 이력서",
    href: "https://fancy-athlete-ad9.notion.site/Java-Backend-Developer-32e68859f1df8097b6d8fa7af420442c",
    icon: "blog",
  },
  { label: "Email", href: "mailto:zenk555@naver.com", icon: "mail" },
];

// 히어로 통계 지표 — 시선을 끄는 핵심 숫자
export const stats: { value: string; label: string }[] = [
  { value: "2", label: "대표 프로젝트" },
  { value: "4", label: "핵심 담당 영역" },
  { value: "100+", label: "데이터 수집·구축" },
];

export const about = [
  "의료공학을 전공했지만, 기능을 직접 구현하고 하나의 서비스로 완성해가는 과정에 흥미를 느껴 개발자로 진로를 전환했습니다.",
  "팀 프로젝트에서는 회원 인증, 결제 이력, 관리자 채팅, 지도 기반 검색처럼 사용자가 실제로 마주하는 흐름을 맡아 구현했습니다.",
  "기능이 동작하는 데서 멈추지 않고, 결제 시점 데이터 보존이나 세션 저장 방식처럼 운영 중 문제가 될 수 있는 지점을 찾아 구조를 개선해왔습니다.",
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
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  metrics?: { value: string; label: string }[];
  cardPoints?: string[];
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
};

// 대표 프로젝트 — 카드 클릭 시 상세 모달이 열립니다.
export const projects: Project[] = [
  {
    title: "Univ-US",
    subtitle: "대학 생활 통합 플랫폼 · 인증/결제/관리자 채팅 담당",
    description:
      "학사·커뮤니티·예약·구독 결제·AI 챗봇 등 11개 도메인을 포함한 대학 통합 서비스입니다. 팀 프로젝트에서 회원 인증/보안, 구독 결제, 관리자 실시간 문의 채팅, 서비스 관리자 화면과 랜딩 페이지를 담당했습니다.",
    metrics: [
      { value: "4", label: "핵심 담당 영역" },
      { value: "26", label: "구독·결제 QA" },
      { value: "3", label: "Redis 세션 키" },
    ],
    cardPoints: [
      "담당: 인증/인가, 구독 결제, 관리자 채팅, 서비스 관리자 화면",
      "개선: 결제 시점 플랜명·가격 2개 값을 이력에 스냅샷 저장",
      "확장: ADM/SUA 2개 관리자 역할에 중복 로그인 제어 정책 적용",
    ],
    scope: [
      {
        label: "Backend",
        items: ["회원 인증/인가", "구독 결제·웹훅", "Redis 세션", "관리자 채팅 API"],
      },
      {
        label: "Admin",
        items: ["학교 관리", "구독 플랜 관리", "결제 관리", "문의 관리"],
      },
      {
        label: "Collaboration",
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
      "Spring Security 기반 인증/인가 설계 - JWT 발급·검증, 역할 기반 가드, 구독 인터셉터",
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
      { src: "/projects/univus/02-signup.png", caption: "회원가입 (member 도메인)", section: "주요 화면" },
      { src: "/projects/univus/03-account-recovery.png", caption: "아이디·비밀번호 찾기 (SMS 본인인증)", section: "주요 화면" },
      { src: "/projects/univus/04-payment.png", caption: "구독 결제 (PortOne)", section: "주요 화면" },
      { src: "/projects/univus/05-payment-detail.png", caption: "결제·구독 관리 내역", section: "주요 화면" },
      { src: "/projects/univus/06-admin-chat.png", caption: "관리자 실시간 문의 채팅 (WebSocket)", section: "주요 화면" },
      { src: "/projects/univus/08-service-admin-payments.png", caption: "서비스 관리자 결제 관리", section: "관리자 기능" },
      { src: "/projects/univus/09-service-admin-plan-create.png", caption: "구독 플랜 생성 및 입력 제한", section: "관리자 기능" },
      { src: "/projects/univus/10-service-admin-inquiries.png", caption: "서비스 관리자 문의 목록", section: "관리자 기능" },
      { src: "/projects/univus/11-service-admin-chat-reply.png", caption: "문의 채팅 답변 및 첨부파일 흐름", section: "관리자 기능" },
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
        src: "/projects/univus/15-subscription-prepare-sequence.png",
        caption: "구독 준비 요청: 중복 구독 409 및 READY 결제이력 생성",
        section: "검증·설계 자료",
        group: "구독 결제 시퀀스 설계",
      },
      {
        src: "/projects/univus/16-payment-verify-sequence.png",
        caption: "결제 검증: PortOne 조회, PAID 마킹, Redis 세션 저장",
        section: "검증·설계 자료",
        group: "구독 결제 시퀀스 설계",
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
    ],
    role: "Backend",
    period: "2025",
    team: "팀 프로젝트",
    troubleshooting: [
      {
        title: "구독 플랜 변경 시 결제 이력 정합성",
        problem:
          "구독 플랜 테이블에 이름·가격을 직접 두고 설계했는데, 플랜 수정 기능을 만들면서 문제가 드러났습니다. 결제 이력에는 결제 '당시'의 플랜 이름·가격이 남아야 하지만, 플랜을 수정하면 이력 조회 시 변경된 최신 값이 출력되었습니다.",
        cause:
          "결제 이력이 플랜 테이블을 참조하는 구조라 과거 이력 조회 시에도 현재 플랜 정보가 따라오는 구조였습니다.",
        solution:
          "이력성 데이터는 시점의 값을 보존해야 한다고 판단했습니다. 결제 이력에 '결제 시점의 플랜 이름·가격' 2개 값을 스냅샷으로 저장하는 컬럼을 추가해, 플랜 정보가 바뀌어도 과거 결제 내역은 당시 기준으로 조회되도록 정리했습니다.",
        verification:
          "플랜명·가격 변경 후 결제 이력을 다시 조회해 과거 이력이 결제 당시의 planName·amount 값을 유지하는지 확인했습니다.",
      },
      {
        title: "정기결제 웹훅 반복 호출 방어 확인",
        problem:
          "PortOne 정기결제 웹훅은 외부 시스템에서 호출되므로 같은 이벤트가 반복 호출되거나, 이미 취소된 결제 이력에 대한 요청이 들어올 수 있습니다.",
        cause:
          "외부 웹훅은 네트워크 재시도나 상태 불일치 상황이 발생할 수 있어, 처리 전 내부 결제 이력 상태 확인이 필요했습니다.",
        solution:
          "웹훅 처리 전 merchantUid와 상태를 조회하고, READY 상태가 아닌 이력은 바로 반환하도록 처리했습니다. Swagger로 동일 정기결제 웹훅을 반복 호출한 뒤 DB를 다시 조회해, CANCELED 상태의 이력이 상태 변경이나 중복 생성 없이 유지되는 것을 확인했습니다.",
        verification:
          "동일 merchantUid 웹훅 요청을 Swagger로 반복 호출하고, DB에서 해당 이력이 CANCELED 상태 그대로 1건만 유지되는지 확인했습니다.",
      },
      {
        title: "MVP 인증 구조를 cookie/Redis 세션 구조로 전환",
        problem:
          "초기 기능 검증 단계에서는 localStorage에 JWT를 저장하고 Authorization 헤더로 전달하는 구조로 구현했습니다. 이후 인증 기능 범위가 넓어지면서 브라우저 저장소 노출 가능성, refresh/session 상태 추적, 관리자 계정 동시 로그인 제어가 개선 포인트로 드러났습니다.",
        cause:
          "MVP 단계의 단순한 토큰 저장 방식만으로는 재발급 상태 추적, 로그아웃 무효화, 관리자 단일 세션 정책을 일관되게 처리하기 어려웠습니다.",
        solution:
          "AccessToken과 RefreshToken을 HttpOnly 쿠키로 내려주고, Redis에 refresh/session/admin-session 3개 키 계열을 저장하는 방식으로 전환했습니다. 프론트엔드는 withCredentials 기반으로 요청하고, 서버는 Redis 세션 상태를 확인해 재발급·로그아웃·관리자 세션 충돌을 처리하도록 개선했습니다.",
        verification:
          "쿠키 기반 요청 전환 후 로그인·재발급·로그아웃 흐름과 Redis 세션 키 저장/삭제 흐름을 확인했습니다.",
      },
      {
        title: "관리자 계정 중복 로그인 제어",
        problem:
          "서비스 관리자(SUA)와 학교 관리자(ADM)는 권한 범위가 넓어, 여러 브라우저에서 동시에 로그인되는 상황에 대한 명확한 정책이 필요했습니다.",
        cause:
          "관리자 계정은 권한 범위가 넓어 세션이 여러 브라우저에 동시에 남으면 권한 회수와 감사 관점에서 운영 리스크가 커질 수 있었습니다.",
        solution:
          "ADM/SUA 2개 관리자 역할에 단일 세션 정책을 적용했습니다. AccessToken에 session id를 포함하고 Redis의 auth:admin-session:{memberId} 값과 비교해 현재 세션만 허용했으며, 충돌 시 409 ADMIN_SESSION_CONFLICT와 forceLogin 흐름으로 기존 세션 대체 여부를 명시적으로 처리했습니다.",
        verification:
          "기존 관리자 세션이 유지된 상태에서 다른 브라우저로 동일 계정 로그인을 시도해 동시 접근 제한 모달이 노출되는 것을 확인했습니다.",
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
    metrics: [
      { value: "100+", label: "클라이밍장 데이터" },
      { value: "40+", label: "운영 환경 접속자" },
      { value: "4", label: "팀 프로젝트 인원" },
    ],
    cardPoints: [
      "담당: 지도 데이터 수집, 좋아요, 검색/페이지네이션, 배포",
      "구현: Naver Maps API로 약 100곳 클라이밍장 마커 시각화",
      "개선: 좋아요 토글 처리와 중복 등록 방지",
    ],
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
    github: "https://github.com/Kim-ByeongGyu/grip",
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
