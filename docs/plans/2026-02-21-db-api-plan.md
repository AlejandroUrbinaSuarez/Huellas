# Huellas Humanitarias - Database & API Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Define the Prisma schema for the core business entities (Users, Products, Orders, Impact) and create the foundational Next.js API routes to serve this data to the frontend.

**Architecture:** Prisma ORM connecting to MySQL. Next.js App Router API endpoints (`src/app/api/...`) to handle client requests securely.

**Tech Stack:** Prisma, MySQL, Next.js Server Actions / API Routes, bcryptjs (for basic password hashing if needed, though we will mock authentication first).

---

## User Review Required
> [!IMPORTANT]
> This plan defines the structure of your MySQL database based on our design document. Please review the models below to ensure they capture what you need for the "Compra 2, Donamos 1" MVP logic.

## Proposed Changes

### Database Schema
#### [MODIFY] [prisma/schema.prisma](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/prisma/schema.prisma)

### API Routes & Server Actions
#### [NEW] [src/app/api/products/route.ts](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/src/app/api/products/route.ts)
#### [NEW] [src/app/api/impact/route.ts](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/src/app/api/impact/route.ts)
#### [NEW] [src/lib/prisma.ts](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/src/lib/prisma.ts)
#### [NEW] [prisma/seed.ts](file:///c:/Users/aurbi/OneDrive/Escritorio/huellas/prisma/seed.ts)

---

## Bite-Sized Tasks (Execution Plan)

### Task 1: Define Prisma Schema & Client Singleton

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`

**Step 1: Write the Schema**
Update `schema.prisma` to include the models: `User`, `Product`, `Order`, `OrderItem`, and `DonationImpact`. Ensure relations are correctly mapped.

**Step 2: Create Prisma Client Singleton**
Create `src/lib/prisma.ts` to instantiate a single instance of PrismaClient to avoid exhausting database connections in development mode.

**Step 3: Test Schema Validity**
Run: `npx prisma validate`
Expected: PASS

**Step 4: Commit**
```bash
git add prisma/schema.prisma src/lib/prisma.ts
git commit -m "feat(db): define core e-commerce database schema"
```

### Task 2: Push Schema to Hostinger MySQL & Seed Data

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json`

**Step 1: Create Seed Data Script**
Write a script to insert initial products (shoes) and a base `DonationImpact` record into the database so the UI has something to show.

**Step 2: Update package.json**
Add the prisma seed configuration to `package.json`.

**Step 3: Push and Seed (Verification)**
Run: `npx prisma db push`
Run: `npx prisma db seed`
Expected: PASS (Tables created in MySQL and populated).

**Step 4: Commit**
```bash
git add prisma/seed.ts package.json
git commit -m "chore(db): add database seed script for initial testing"
```

### Task 3: Build Next.js API Routes

**Files:**
- Create: `src/app/api/products/route.ts`
- Create: `src/app/api/impact/route.ts`

**Step 1: Write Products API**
Create a GET route that fetches all active shoes from the MySQL database via Prisma.

**Step 2: Write Impact API**
Create a GET route that fetches the total number of shoes donated from the `DonationImpact` table.

**Step 3: Test API endpoints**
Use `curl` or browser to hit `/api/products` and `/api/impact` locally to verify JSON response structure.

**Step 4: Commit**
```bash
git add src/app/api/
git commit -m "feat(api): create core data fetching routes"
```

---

## Verification Plan
1. Validate schema compilation before pushing (`npx prisma validate`).
2. Successfully push the schema to the Hostinger database, verifying connection credentials are correct.
3. Successfully run the seed script to populate mock catalog data.
4. Verify the API routes return the seeded data correctly by hitting them in the browser.
