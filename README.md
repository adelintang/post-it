## PostIt
The mini social media including simple feature implemented like authentication, profile, follow unfollow, posting, comment and like

**Tech Stack** : Express, Typescript, Prisma, PostgreSQL

## How to use this project

### 1. Clone this repository
`https://github.com/adelintang/repo-name.git`

### 2. Install Package
`yarn install | npm i`

### 3.  Create `.env` file and copy paste variabel from `.env.example` and then content your env file
`
.env
`

### 4. Create Database, schema on prisma, and migration database

### 5. How to Create database on Postgres (if you use postgres)
- `CREATE DATABASE database_name;`
- `GRANT ALL ON DATABASE database_name TO user_name;`
- `ALTER DATABASE database_name OWNER TO user_name;`
- `GRANT CREATE ON DATABASE database_name TO user_name;`

### 6. Running Project
`yarn dev | npm run dev`

#### 7. Endpoint Management
- `User`

  - GET `/users` : Get All User and search user by username

- `Follow`

  - POST `/users/follow` : following other user
  - DELETE `/users/unfollow` : unfollowing other user
  - GET `/users/followers/:userId` : Get Followers User
  - GET `/users/followings/:userId` : Get Followings User
  - GET `/users/follows/count/:userId` : Get All Follower and Follower User

- `Profile`

  - POST `/profiles` : Create Profile
  - GET `/profiles/:profileId` : Get Profile User by profileId
  - PATCH `/profiles/:profileId` : Update Profile User by profileId

- `Profile Image`

  - POST `/profiles/files/:profileId/upload` : Upload Image to Profile
  - PATCH `/profiles/files/:profileImageId/upload` : Update Profile Image
  - DELETE `/profiles/files/:profileImageId` : Delete Profile Image
  - GET `/profiles/files/:filename` : Get Profile Image

- `Post`

  - POST `/posts` : Create post
  - GET `/posts` : Get All Post
  - GET `/posts/:postId` : Get Post by postId
  - PATCH `/posts/:postId` : Update Post
  - DELETE `/posts/:postId` : Delete Post

- `Comment`

  - POST `/posts/:postId/comments` : Create Comment
  - GET `/posts/:postId/comments` : Get All Comment
  - PATCH `/posts/:postId/comments/:commentId` : Update Comment
  - DELETE `/posts/:postId/comments/:commentId` : Delete Comment
  
  - POST `/comments/:commentId/reply` : Create Reply
  - GET `/comments/:commentId/reply` : Get All Reply
  - PATCH `/comments/:commentId/reply/:replyId` : Update Reply
  - DELETE `/comments/:commentId/reply/:replyId` : Delete Reply

- `Like`

  - POST `/posts/:postId/like` : Like Post
  - DELETE `/posts/:postId/unlike` : Unlike Post
  - GET `/posts/:postId/likes/count` : likes post count
  - POST `/comments/:commentId/like` : Like Comment
  - DELETE `/comments/:commentId/unlike` : Unlike Comment
  - GET `/comments/:commentId/likes/count` : likes comment count




