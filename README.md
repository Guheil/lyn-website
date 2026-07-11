# Real Estado Public Website

A separate public-facing Next.js + TypeScript + MUI website converted from the supplied static HTML/CSS/JS project. It is intentionally separate from the dashboard project while using the same MongoDB Atlas database and `properties` collection.

## Included routes

- `/`
- `/about`
- `/properties`
- `/properties/[slug]`
- `/services`
- `/credentials`
- `/contact`
- `GET /api/properties`
- `GET /api/properties/[slug]`
- `POST /api/inquiries`

## Setup

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Fill `.env.local` with the same `MONGODB_URI` and `MONGODB_DB_NAME` used by the dashboard.

## Property visibility

Only records where `status` is `published` are shown publicly. Featured homepage listings must also have `isFeatured: true`.

## Pagination

The public property list is paginated in MongoDB, not after loading every record. Set `PROPERTY_PAGE_SIZE` in `.env.local`; the default is 6.

Examples:

- `/properties?page=2`
- `/properties?type=Land&page=1`

## Inquiry flow

The contact form creates records in the shared `inquiries` collection with:

- `source: "Website"`
- `status: "new"`

The API validates strict plain-text fields, rejects HTML delimiters, uses server-built MongoDB documents, checks same-origin submissions, limits body size, includes a honeypot, and applies basic per-IP throttling. Production deployments should also add a distributed rate limiter at the hosting or edge layer.

## Dependency versions

`package.json` and `package-lock.json` use the same Next.js, React, MUI, Emotion, MongoDB, Zod, Lucide, TypeScript, and ESLint versions as the supplied secure dashboard project.
