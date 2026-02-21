# Huellas Humanitarias Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Initialize the Next.js single-page application and configure the Prisma ORM for MySQL.

**Architecture:** We are using a Next.js Full-Stack App Router architecture. The database is MySQL on Hostinger. We'll use Prisma as our ORM to interact with the database.

**Tech Stack:** Next.js (React), TypeScript, TailwindCSS, Prisma (ORM), MySQL.

---

## User Review Required
> [!IMPORTANT]
> Since this is a brand new project, no existing code will be modified. The commands will generate the base structure of the Next.js application in the root directory. You will need to provide your Hostinger MySQL credentials in the `.env` file once it is created.

## Proposed Changes

### Next.js Initialization
#### [NEW] [package.json](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/package.json)
#### [NEW] [next.config.mjs](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/next.config.mjs)
#### [NEW] [tailwind.config.ts](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/tailwind.config.ts)

### Database Configuration
#### [NEW] [prisma/schema.prisma](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/prisma/schema.prisma)
#### [NEW] [.env](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/.env)

---

## Bite-Sized Tasks (Execution Plan)

### Task 1: Scaffold Next.js Application

**Files:**
- Create: `package.json`, `next.config.mjs`, `src/app/page.tsx`, etc.

**Step 1: Write the failing test / verification**
Run: `npm run dev`
Expected: FAIL with "ENOENT" or missing package.json since the project is empty.

**Step 2: Write minimal implementation (Scaffolding)**
Run the following command to initialize Next.js in the current directory (`.`):
```bash
npx -y create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

**Step 3: Run test to verify it passes**
Run: `npm run build`
Expected: PASS with compiled Next.js output and no errors.

**Step 4: Commit**
```bash
git add .
git commit -m "chore: scaffold Next.js application with Tailwind and TypeScript"
```

### Task 2: Install and Configure Prisma

**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env`

**Step 1: Write failing verification**
Run: `npx prisma --version`
Expected: FAIL (command not found or errors)

**Step 2: Minimal Implementation (Installation)**
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**Step 3: Configure Database Provider**
Modify: `prisma/schema.prisma`
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

**Step 4: Create Baseline Connection (Testing)**
In `.env`, set a placeholder: `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
*(The user will replace this later with actual Hostinger credentials)*.

**Step 5: Commit**
```bash
git add prisma/ .env .gitignore package.json package-lock.json
git commit -m "chore: add Prisma ORM and configure for MySQL"
```

---

## Verification Plan

### Automated Tests
1. `npm run build` should complete without errors, verifying the Next.js setup is healthy.
2. `npx prisma validate` should complete without errors, verifying the Prisma schema is syntactically correct.

### Manual Verification
1. I will ask the user to fill in their Hostinger `DATABASE_URL` in the `.env` file.
2. After that, we will run `npx prisma db push` to verify connection to the Hostinger MySQL database.
