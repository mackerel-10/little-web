# Little web

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=node.js&logoStyle=flat&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoStyle=flat&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoStyle=flat&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoStyle=flat&logoColor=white)

<!-- Little APIs with Node.js and MySQL. It's using babel as convert ES6 to commonJS. -->

### Quick Start

```bash
# 실행
docker-compose up

# 종료
docker-compose down
```

### ERD

![wanted-pre-onboarding-backend](https://github.com/mackerel-10/wanted-pre-onboarding-backend/assets/67633810/ed98da13-3033-477a-b12f-4ce3e9025d3d)

### 클라우드 환경

![My First Board (2)](https://github.com/mackerel-10/wanted-pre-onboarding-backend/assets/67633810/c04c2950-056e-4638-8c03-a4d20e6fa7b2)

### 구현 방법 및 이유

- docker-compose로 배포 환경을 구성한 후 개발을 시작했습니다. 개발이 완료된 후 배포를 준비하면 환경적 차이 때문에 수정해야 하는 부분이 많이 생겨 처음부터 배포 환경을 구성했습니다.
- JWT를 이용해 Refresh Token과 Access Token을 이용해 사용자 인증을 관리했습니다. Refresh Token을 사용함으로써 Token이 만료되기 전까지 매번 사용자가 로그인할 필요성이 사라지고, Access Token을 발급하기에도 편리합니다.
- Joi를 활용해 request validator를 생성해 들어오는 요청 사항들을 검증했습니다.
- MVC 구조를 사용해 구현을 하였고, controller 대신에 service를 생성하여 구현했습니다.

### API 명세

|           | 기능        | HTTP Method | EndPoint                                                     | Request                                                      | Response                                                     |
|-----------|-----------|-------------|--------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| **Auth**  | 회원가입      | POST        | /api/v1/auth/users                                           | **Request Body**<br>content: x-www-form-urlencoded<br>{<br>	"email": "test@test.com",<br>	"password": "qwerty1234"<br>} | - 200: 회원가입 했습니다.<br>- 400: 사용자가 있습니다.                       |
|           | 로그인       | POST        | /api/v1/auth/signin                                          | **Request Body**<br>content: x-www-form-urlencoded<br>{<br>	"email": "test@test.com",<br>	"password": "qwerty1234"<br>} | - 200: 로그인 했습니다.<br>Header: <br>X-Refresh-Token(Bearer, Refresh Token), Authorization(Bearer, Access Token)<br>- 400: 잘못된 비밀번호입니다.<br>- 404: 사용자가 없습니다. |
| **Posts** | 게시글 생성    | POST        | /api/v1/posts                                                | **Request Header**<br>Authorization(Bearer, Access Token)<br>**Request Body**<br>content: x-www-form-urlencoded<br>{<br>	"title": "hello",<br>	"content": "world"<br>} | - 201: 게시글이 작성됐습니다.                                          |
|           | 게시글 목록 조회 | GET         | /api/v1/posts<br><br>요청 예시: /api/v1/posts?page=1&perPage=10<br> | **Query**<br>page: Number<br>perPage: Number<br>             | - 200: 게시글 목록을 불러왔습니다.,<br>{<br>	"message": "게시글 목록을 불러왔습니다.",<br>	"data":  {<br>		"postList": [<br>			{<br>                                "id": 1,<br>		                "author_id": 1,<br>               			 "title": "hello",<br>		                "content": "world",<br>        			        "created_at": "2023-08-06T13:40:40.000Z",<br>		                "updated_at": "2023-08-06T13:40:40.000Z"<br>			}<br>		]<br>         },<br>}<br>- 404: 게시글이 없습니다. |
|           | 특정 게시글 조회 | GET         | /api/v1/posts/:id                                            | **Param**<br>id: Number                                      | - 200: 게시글을 불러왔습니다.<br>{<br>	"message": "게시글을 불러왔습니다.",<br>	"data":  {<br>		"post":  {<br>                                	"id": 1,<br>		                "author_id": 1,<br>               			 "title": "hello",<br>		                "content": "world",<br>        			        "created_at": "2023-08-06T13:40:40.000Z",<br>		                "updated_at": "2023-08-06T13:40:40.000Z"<br>		}<br>         },<br>}<br>- 404: 게시글이 없습니다. |
|           | 특정 게시글 수정 | PUT         | /api/v1/posts/:id                                            | **Request Header**<br>Authorization(Bearer, Access Token)<br>**Param**<br>id: Number<br>**Request Body**<br>content: x-www-form-urlencoded<br>{<br>	"title": "hello",<br>	"content": "world"<br>} | - 200: 게시글을 수정했습니다.<br>- 404: 게시글을 수정할 수 없습니다.               |
|           | 특정 게시글 삭제 | DELETE      | /api/v1/posts/:id                                            | **Request Header**<br>Authorization(Bearer, Access Token)<br>**Param**<br>id: Number | - 200: 게시글을 삭제했습니다.<br>- 404: 게시글을 삭제할 수 없습니다.               |
