# Pranav — Portfolio

personal portfolio built with Next.js App Router.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (custom tokens)
- IBM Plex Mono via `next/font`
- Framer Motion page fades
- Resend (contact form)
- Prisma + SQLite (local) / Postgres or Turso (prod)
- GitHub GraphQL API (pinned repos)

## Setup

```bash
npm install
cp .env.example .env.local
# fill RESEND_API_KEY, GITHUB_TOKEN, DATABASE_URL as needed
npx prisma migrate dev
npm run dev
```

## Env

See `.env.example` for `RESEND_API_KEY`, `DATABASE_URL`, `GITHUB_TOKEN`, and `GITHUB_USERNAME`.

## Content

- Bio / experience / skills / education: `lib/site.ts`
- Resume PDF: `public/resume.pdf`
