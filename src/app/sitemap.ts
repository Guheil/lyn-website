import type { MetadataRoute } from 'next';
import { siteUrl } from '@/constants/site';
import { publicPropertyService } from '@/server/modules/properties';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/properties`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/credentials`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB_NAME) return staticPages;

  try {
    const propertyPages: MetadataRoute.Sitemap = [];
    let page = 1;
    let totalPages = 1;

    do {
      const result = await publicPropertyService.list({ page });
      totalPages = result.totalPages;
      propertyPages.push(
        ...result.items.map((property) => ({
          url: `${siteUrl}/properties/${property.slug}`,
          lastModified: property.publishedAt ? new Date(property.publishedAt) : undefined,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
          images: property.images,
        })),
      );
      page += 1;
    } while (page <= totalPages);

    return [...staticPages, ...propertyPages];
  } catch {
    return staticPages;
  }
}
