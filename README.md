API 명세(request, response 포함)

|           | 기능             | HTTP Method | EndPoint            | Request Header | Request Body                                                                                     | Responses |
| --------- | ---------------- | ----------- | ------------------- | -------------- | ------------------------------------------------------------------------------------------------ | --------- |
| **Auth**  | 회원가입         | POST        | /api/v1/auth/users  |                | content: x-www-form-urlencoded<br><br>{<br> "email": "string",<br> "password": "string"<br>}<br> |           |
|           | 로그인           | POST        | /api/v1/auth/signin |                |                                                                                                  |           |
| **Posts** | 게시글 생성      | POST        | /api/v1/posts       |                |                                                                                                  |           |
|           | 게시글 목록 조회 | GET         | /api/v1/posts       |                |                                                                                                  |           |
|           | 특정 게시글 조회 | GET         | /api/v1/posts/:id   |                |                                                                                                  |           |
|           | 특정 게시글 수정 | PUT         | /api/v1/posts/:id   |                |                                                                                                  |           |
|           | 특정 게시글 삭제 | DELETE      | /api/v1/posts/:id   |                |                                                                                                  |           |
