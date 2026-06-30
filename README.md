# Kim ByeongGyu Portfolio

백엔드 개발자 김병규의 포트폴리오 사이트입니다.

인증, 결제, 관리자 세션, 웹훅처럼 운영 중 문제가 되기 쉬운 흐름을 어떻게 설계하고 검증했는지 보여주는 데 초점을 둡니다.

## 주요 내용

- Univ-US: 대학 생활 통합 플랫폼에서 인증/인가, 구독 결제, PortOne 웹훅, Redis 세션, 관리자 채팅 담당
- GRIP: 클라이밍장 지도 기반 정보/커뮤니티 서비스에서 데이터 수집, 지도 연동, 좋아요, 검색/페이지네이션, 배포 담당
- 프로젝트별 문제 해결 사례: 문제, 해결, 검증 흐름을 카드와 상세 모달에서 확인 가능
- 기술 스택: 단순 나열이 아니라 실제 프로젝트에서 사용한 맥락 기준으로 정리

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9

## 실행

```bash
npm install
npm run dev
```

개발 서버 실행 후 `http://localhost:3000`에서 확인합니다.

## 검증

```bash
npx tsc --noEmit
npm run lint
```

## 문서 파일 관리

이력서, PDF, HWP, DOC/DOCX 파일은 개인정보가 포함될 수 있어 `.gitignore`에서 제외합니다. 공개용 이력서가 필요하면 외부 링크 또는 별도 공개 파일로 관리합니다.
