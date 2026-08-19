# 프로젝트 계획서

## 1. 프로젝트 개요
- 프로젝트명: 수일 블로그(suil0304-blog)
- 프로젝트 목적: Mono Repository 구조 학습 및 개인 블로그 시스템 구축

### 1-1. 스택 상세
- 언어: TypeScript
- 런타임: Deno 2
- FE: Vite(React), React Router Dom, Axios, TanStack Query, Zustand
- BE: NestJS, Prisma

## 2. 워크스페이스 구조
- suil0304-blog/
    - apps/
        - web/
            일반 사용자 담당 웹 비주얼
        - owner/
            게시물 작성 등 관리자 웹
        - api/
            전체 백엔드 API 담당
    - docs/
        여러 문서를 모아두었습니다.
        개인 프로젝트이기 때문에 대부분의 문서는 공개합니다.
    - packages/
        - types/
            apps/ 프로젝트에 쓰이는 타입 선언
        - ui/
            공통 UI 컴포넌트와 디자인
    - deno.json
    - README.md
    - 등

Mono Repository 구조로 설계하였습니다.

## 3. 기능 상세
### 3-1. apps/web
***FE***
일반 사용자에게 공개되는 단입니다.

packages/ui의 UI 컴포넌트를 사용합니다.

- 게시물 확인
- 게시물 목록 조회
- 카테고리 필터
- 조회수
- (가능한 경우) 로그인 기능
    - 댓글
        - 작성
        - 수정
        - 삭제
    - 좋아요
    - 등

### 3-2. apps/owner
***FE***
소유자에게만 공개되는 단입니다.

packages/ui의 UI 컴포넌트를 사용합니다.

- 인증
- 게시물 관련
    - 작성
    - 수정
    - 삭제
- GitHub와 연동하여 계정 정보 설정

### 3-3. apps/api
***BE***
전체적인 백엔드를 담당합니다.
다만 라우트를 api/와 owner/로 분리하여 사용합니다.

- REST 원칙 준수
- DB 연동

## 4. 개발 마일스톤
1. 환경 셋팅
2. packages/ui 공통 컴포넌트 개발
3. apps/web UI 구현 및 목업 데이터 연결
4. apps/owner UI 구현
5. apps/api 구현 및 DB 연결
6. 테스트
7. 배포