## Introduction
This is a template project api for express prisma typescript

**including** :
- authentication with jwt
- basic crud
- uploading file with multer
- swagger documentation

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
