# API 명세서

## 1. 개요
- Base URL(개발 기준): localhost:3000
- 인증 방식
    - 소유자 전용 API(/owner/*): GitHub OAuth 후 Bearer JWT
    - 일반 사용자 API(/api/*): 인증 불필요

## 2. 공통 응답 JSON 포맷
```json
{
    "success": true,
    "data": {},
    "message": "성공 | 실패 메시지 내용"
}
```

## 3. 인증
*apps/owner 전용*

### 3-1. GitHub OAuth 로그인 요청
- Endpoint: GET /auth/github

GitHub 로그인 페이지로 리다이렉트합니다.

### 3-2. GitHub OAuth Callback
- Endpoint: GET /auth/github/callback
- Query Params
    - code: string

GitHub 인증 성공 후 소유자 계정 검증, 토큰 발급.

## 4. 게시글
### 4-1. 게시물 목록 조회
- Domain: 사용자 / 공통
- Endpoint: GET /api/posts
- Query Params
    - num?: int (default: 10)
    - category?: string[]
- Response: 200 Ok
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "제목",
            "description": "요약 설명글",
            "category": ["카테고리1"],
            "createdAt": "<날짜>",
            "updatedAt": "<날짜>"
        },
        {
            "id": 2,
            "title": "제목2",
            "description": "요약 설명글2",
            "category": ["카테고리2", "카테고리3"],
            "createdAt": "<날짜>",
            "updatedAt": "<날짜>"
        }
    ],
    "message": "${category ? category.join(', ') : '모든'} 카테고리에서 ${num > 0 ? num + '개의' : '모든'} 게시물을 가져왔습니다."
}
```

num을 length로 하는 desc 게시글 목록을 가져옵니다.

### 4-2. 게시물 상세 조회
- Domain: 사용자 / 공통
- Endpoint: GET /api/posts/:postId
- Response: 200 Ok
```json
{
    "success": false,
    "data": {
        "id": 1,
        "title": "제목",
        "description": "요약 설명글",
        "content": "내용",
        "category": ["카테고리1"],
        "createdAt": "<날짜>",
        "updatedAt": "<날짜>"
    },
    "message": "${postId}번째 게시물의 상세 정보를 가져왔습니다."
}
```
- Error:
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 게시글은 존재하지 않습니다."
    }
    ```

게시물을 가져옵니다.

### 4-3. 게시물 작성
- Domain: 소유자
- Endpoint: POST /owner/posts
- Body:
```json
{
    "title": "제목",
    "description": "요약 설명글",
    "content": "내용",
    "category": ["카테고리1"]
}
```
- Response: 201 Created
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "제목",
        "description": "요약 설명글",
        "content": "내용",
        "category": ["카테고리1"],
        "createdAt": "<날짜>",
        "updatedAt": "<날짜>"
    },
    "message": "게시물을 새로 생성하였습니다."
}
```
- Error:
    - 400 Bad Request
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```

### 4-4. 게시물 수정
- Domain: 소유자
- Endpoint: PATCH /owner/posts/:postId
- Body:
```json
{
    "title": "변경 제목",
    "description": "변경 요약 설명글",
    "content": "변경 내용",
    "category": ["변경 카테고리"]
}
```
- Response
    - 200 Ok
    ```json
    {
        "success": true,
        "data": {
            "title": "변경 제목",
            "description": "변경 요약 설명글",
            "content": "변경 내용",
            "category": ["변경 카테고리"],
            "createdAt": "<날짜>",
            "updatedAt": "<날짜>"
        },
        "message": "${postId}번째 게시물을 수정하였습니다."
    }
    ```
- Error
    - 400 Bad Request
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 게시글은 존재하지 않습니다."
    }
    ```

### 4-5. 게시물 삭제
- Domain: 소유자
- Endpoint: DELETE /owner/posts/:postId
- Response: 204 No Content
- Error:
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 게시글은 존재하지 않습니다."
    }
    ```

## 5. 댓글
### 5-1. 댓글 목록 조회
- Domain: 사용자 / 공통
- Endpoint: GET /api/comments
- Query Params
    - postId: int
    - num?: int (default: 10)
- Response: 200 Ok
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "authorName": "익명",
            "content": "내용",
            "createdAt": "<날짜>",
            "updatedAt": "<날짜>"
        },
        {
            "id": 2,
            "authorName": "익명2",
            "content": "내용2",
            "createdAt": "<날짜>",
            "updatedAt": "<날짜>"
        }
    ],
    "message": "${num > 0 ? num + '개의' : '모든'} 댓글을 가져왔습니다."
}
```

### 5-2. 댓글 작성
- Domain: 사용자
- Endpoint: POST /api/comments
- Body:
```json
{
    "postId": 1,
    "authorName": "익명",
    "authorPassword": "...",
    "content": "내용"
}
```
- Response: 201 Created
```json
{
    "success": true,
    "data": {
        "id": 1,
        "authorName": "익명2",
        "content": "내용2",
        "createdAt": "<날짜>",
        "updatedAt": "<날짜>"
    },
    "message": "댓글을 새로 생성하였습니다."
}
```

### 5-3. 댓글 수정
- Domain: 사용자
- Endpoint: PATCH /api/comments/:commentId
- Body:
```json
{
    "authorPassword": "...",
    "content": "변경 내용"
}
```
- Response: 200 Ok
```json

{
    "success": true,
    "data": {
        "authorName": "익명",
        "content": "변경 내용",
        "createdAt": "<날짜>",
        "updatedAt": "<날짜>"
    },
    "message": "${commentId}번째 댓글을 수정하였습니다."
}
```
- Error
    - 400 Bad Request
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```
    - 401 Unauthorized
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 댓글과 비밀번호가 맞지 않습니다."
    }
    ```
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 댓글은 존재하지 않습니다."
    }
    ```

### 5-4. 댓글 삭제(사용자)
- Domain: 사용자
- Endpoint: DELETE /api/comments/:commentId
- Body:
```json
{
    "authorPassword": "..."
}
```
- Response: 204 No Content
- Error
    - 400 Bad Request
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```
    - 401 Unauthorized
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 댓글과 비밀번호가 맞지 않습니다."
    }
    ```
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 댓글은 존재하지 않습니다."
    }
    ```

### 5-5. 댓글 삭제(소유자)
- Domain: 소유자
- Endpoint: DELETE /owner/comments/:commentId
- Response: 204 No Content
- Error
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 댓글은 존재하지 않습니다."
    }
    ```

## 6. 카테고리
### 6-1. 카테고리 목록 조회
- Domain: 사용자 / 공통
- Endpoint: GET /owner/categories
- Response: 200 Ok
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "테스트1"
        },
        {
            "id": 2,
            "name": "테스트2"
        }
    ],
    "message": "모든 카테고리를 가져왔습니다."
}
```

### 6-2. 카테고리 작성
- Domain: 소유자
- Endpoint: POST /owner/categories
- Body:
```json
{
    "name": "테스트"
}
```
- Response: 201 Created
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "테스트"
    },
    "message": "카테고리를 새로 생성하였습니다."
}
```
- Error
    - 400 Bad Request:
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```
    - 409 Conflict:
    ```json
    {
        "success": false,
        "data": {},
        "message": "이미 해당 카테고리는 존재합니다."
    }
    ```
### 6-3. 카테고리 수정
- Domain: 소유자
- Endpoint: PATCH /owner/categories/:categoryId
- Body:
```json
{
    "name": "변경 카테고리"
}
```
- Response: 200 Ok
```json
{
    "success": true,
    "data": {
        "name": "변경 카테고리"
    },
    "message": "${categoryId}번째 카테고리를 수정하였습니다."
}
```
- Error
    - 400 Bad Request:
    ```json
    {
        "success": false,
        "data": {},
        "message": "포맷에 맞지 않거나 빠진 값이 존재합니다."
    }
    ```
    - 404 Not Found:
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 카테고리는 존재하지 않습니다."
    }
    ```
    - 409 Conflict:
    ```json
    {
        "success": false,
        "data": {},
        "message": "이미 해당 카테고리는 존재합니다."
    }
    ```

### 6-4. 카테고리 삭제
- Domain: 소유자
- Endpoint: DELETE /owner/categories/:categoryId
- Response: 204 No Content
- Error
    - 404 Not Found
    ```json
    {
        "success": false,
        "data": {},
        "message": "해당 id의 카테고리는 존재하지 않습니다."
    }
    ```