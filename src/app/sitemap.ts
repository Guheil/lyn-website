import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL ?? 'http://localhost:3000';
  return ['', '/about', '/properties', '/services', '/credentials', '/contact'].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === '/properties' ? 'daily' : 'monthly', priority: path === '' ? 1 : .7 }));
}
