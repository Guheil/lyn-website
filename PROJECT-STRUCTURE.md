# Project Structure

```text
real-estado-nextjs/
├── public/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── credentials/page.tsx
│   │   │   ├── properties/
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── inquiries/route.ts
│   │   │   └── properties/
│   │   │       ├── [slug]/route.ts
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── PageHero/
│   │   │   └── SectionHeading/
│   │   └── layout/
│   │       ├── SiteFooter/
│   │       └── SiteHeader/
│   ├── features/
│   │   ├── about/AboutPage/
│   │   ├── contact/
│   │   │   ├── ContactForm/
│   │   │   └── ContactPage/
│   │   ├── credentials/CredentialsPage/
│   │   ├── home/HomePage/
│   │   ├── properties/components/
│   │   │   ├── PropertyCard/
│   │   │   ├── PropertyFilters/
│   │   │   ├── PropertyGallery/
│   │   │   ├── PropertyGrid/
│   │   │   └── PropertyPagination/
│   │   └── services/ServicesPage/
│   ├── server/
│   │   ├── config/env.ts
│   │   ├── database/
│   │   ├── modules/
│   │   │   ├── inquiries/
│   │   │   └── properties/
│   │   └── security/
│   ├── constants/
│   └── theme/
├── .env.example
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

Each substantial UI component keeps its component implementation, `elements.tsx`, `interface.ts` where props are needed, and `index.ts` export inside the same folder.
