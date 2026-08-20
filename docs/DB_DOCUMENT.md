# DB 구조 명세서

## 1. 개요
- DBMS: PostgreSQL
- ORM: Prisma

## 2. 비즈니스 룰
- 소유자는 여러 개의 게시물을 작성할 수 있다.
- 게시물은 150자 이내의 제목과 내용을 보유한다.
- 게시물은 300자 이내의 요약 설명글을 보유할 수 있다.
- 게시물은 하나 또는 여러 카테고리로 분류되어진다.
- 사용자는 32자 이내의 이름(기본: "익명")과 해시된 비밀번호를 보유한다.
- 사용자는 게시물에 여러 댓글을 달 수 있다.
- 댓글은 내용을 보유한다.

## 3. 모델 및 관계
- Category
    - id(PK): INT
    - name: VARCHAR(255) UNIQUE NOT NULL

- Post
    - id(PK): INT
    - title: VARCHAR(150) NOT NULL
    - description: VARCHAR(300)
    - content: TEXT NOT NULL
    - updatedAt: TIMESTAMP NOT NULL
    - createdAt: TIMESTAMP NOT NULL

- Comment
    - id(PK): INT
    - postId(FK): INT
    - authorName: VARCHAR(32) NOT NULL DEFAULT '익명'
    - authorPassword: VARCHAR(255) NOT NULL
    - content: TEXT NOT NULL
    - updatedAt: TIMESTAMP NOT NULL
    - createdAt: TIMESTAMP NOT NULL

Post와 Category는 M:N의 관계를 가집니다.
Post와 Comment는 1:N의 관계를 가집니다.