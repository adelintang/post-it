## PostIt
The mini social media including simple feature implemented like authentication, profile, follow unfollow, posting, comment and like.

[read the docs api](https://api-post-it.vercel.app/docs)

**Tech Stack** : Express, Typescript, Prisma, PostgreSQL.

## How to use this project.

### 1. Clone this repository
```
https://github.com/adelintang/post-it.git
```

### 2. Install Package
```
yarn install | npm i
```

### 3.  Create `.env` file and copy paste variabel from `.env.example` and then content your env file
```
.env
```

### 4. Create Database, schema on prisma, and migration database

### 5. How to Create database on Postgres (if you use postgres)
```
CREATE DATABASE database_name;
```
```
GRANT ALL ON DATABASE database_name TO user_name;
```
```
ALTER DATABASE database_name OWNER TO user_name;
```
```
GRANT CREATE ON DATABASE database_name TO user_name;
```

### 6. Running Project
```
yarn dev | npm run dev
```

### 7. Make swagger docs should be build
