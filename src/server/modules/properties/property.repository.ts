import 'server-only';
import { getPropertiesCollection } from '@/server/database';

export const publicPropertyRepository = {
  async list({ page, pageSize, propertyType }: { page: number; pageSize: number; propertyType?: string }) {
    const collection = await getPropertiesCollection();
    const filter = { status: 'published' as const, ...(propertyType ? { propertyType } : {}) };
    const totalItems = await collection.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(page, totalPages);
    const items = await collection
      .find(filter)
      .sort({ isFeatured: -1, publishedAt: -1, createdAt: -1, _id: -1 })
      .skip((safePage - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return { items, totalItems, totalPages, page: safePage };
  },

  async featured(limit: number) {
    return (await getPropertiesCollection())
      .find({ status: 'published', isFeatured: true })
      .sort({ publishedAt: -1, createdAt: -1, _id: -1 })
      .limit(limit)
      .toArray();
  },

  async bySlug(slug: string) {
    // Use a deterministic query instead of findOne so a legacy duplicate slug
    // cannot produce unpredictable behavior. The newest published record wins.
    const records = await (await getPropertiesCollection())
      .find({ slug, status: 'published' })
      .sort({ updatedAt: -1, publishedAt: -1, createdAt: -1, _id: -1 })
      .limit(1)
      .toArray();

    return records[0] ?? null;
  },
};
