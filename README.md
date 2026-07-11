# Lyn Bactad La Union Real Estate Website

This is the public website connected to the Lyn Bactad Property Group dashboard.

## Data managed by the dashboard

- Published properties and availability
- Property image galleries
- Assigned broker information and contact methods
- Business credentials
- Website inquiries
- Property-detail view totals used in dashboard reports

The homepage, About page, Services page, visual design, intro animation, header behavior, and fixed marketing content remain in the website code.

## Environment

Copy `.env.example` to `.env.local`:

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=lyn_bactad_real_estate
APP_URL=http://localhost:3000
PROPERTY_PAGE_SIZE=6
REVALIDATION_SECRET=use-the-same-secret-as-the-dashboard
```

The MongoDB database name and revalidation secret must match the dashboard.

## Install and run

```bash
npm install
npm run dev
```

## Connected behavior

- Only published properties appear publicly.
- Current broker details are read from the shared broker record.
- Inquiry assignment is decided by the server from the property slug; hidden browser fields are not trusted.
- Only published credentials that passed the privacy check appear publicly.
- Shared WebP images are served from MongoDB GridFS.
- A property view is counted once per browser session without storing personal visitor information.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
