import 'server-only';
import { getEnv } from '@/server/config/env';
import { mapPublicProperty } from './property.mapper';
import { publicPropertyRepository } from './property.repository';
import { propertySlugSchema, publicPropertyQuerySchema } from './property.schema';
export const publicPropertyService = {
  async list(input: unknown) { const query = publicPropertyQuerySchema.parse(input); const pageSize = getEnv().PROPERTY_PAGE_SIZE; const result = await publicPropertyRepository.list({ page: query.page, pageSize, propertyType: query.type }); return { items: result.items.map(mapPublicProperty), page: result.page, pageSize, totalItems: result.totalItems, totalPages: result.totalPages }; },
  async featured(limit = 3) { return (await publicPropertyRepository.featured(Math.min(Math.max(limit,1),6))).map(mapPublicProperty); },
  async getBySlug(input: unknown) { const slug = propertySlugSchema.parse(input); const property = await publicPropertyRepository.bySlug(slug); return property ? mapPublicProperty(property) : null; },
};
