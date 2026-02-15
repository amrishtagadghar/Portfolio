# Balance Portfolio

Initial implementation of a design-first portfolio based on the requirements in `initial.txt`.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Run
1. Install Node.js 20+ and npm.
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

## Neon Setup
1. Connect Neon in Vercel:
   - `Vercel Project -> Storage -> Neon -> Connect`
2. Pull environment variables locally:
   - `vercel link`
   - `vercel env pull .env.local`
3. Ensure `.env.local` has either `POSTGRES_URL` or `DATABASE_URL`.
4. Apply schema in Neon SQL editor:
   - Run `db/schema.sql`
5. Start app:
   - `npm run dev`
6. Verify DB connection:
   - `GET /api/db-check`

## Seed Neon From Local Content
1. Set `SEED_TOKEN` in Vercel env vars and `.env.local`.
2. Run seed endpoint (local):
   - `curl -X POST http://localhost:3000/api/admin/seed -H "x-seed-token: YOUR_TOKEN"`
3. Run seed endpoint (production):
   - `curl -X POST https://YOUR_DOMAIN/api/admin/seed -H "x-seed-token: YOUR_TOKEN"`
4. Response returns seeded counts for `caseStudies`, `articles`, and `playItems`.

## Data Layer
- App reads data through `lib/cms.ts`.
- `lib/cms.ts` uses Neon when DB env vars are present.
- If DB is unavailable or tables are not created yet, it falls back to local content in `lib/content.ts`.
