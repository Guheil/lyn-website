import 'server-only';
import { ObjectId } from 'mongodb';
import { getEnv } from '@/server/config/env';
import { getBrokersCollection } from '@/server/database';
import { mapPublicProperty } from './property.mapper';
import { publicPropertyRepository } from './property.repository';
import { propertySlugSchema, publicPropertyQuerySchema } from './property.schema';
import type { PublicProperty, PublicPropertyBroker } from './property.types';

function brokerFromRow(row: Record<string, unknown>): PublicPropertyBroker | null {
  if (typeof row.name !== 'string' || !row.name.trim()) return null;
  const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
  return { name: text(row.name), role: text(row.role) || 'Property broker', agency: text(row.agency), mobile: text(row.mobile), email: text(row.email), whatsappUrl: text(row.whatsappUrl), facebookUrl: text(row.facebookUrl), serviceArea: text(row.serviceArea), profileImage: text(row.profileImage), isPlaceholder: false };
}
async function withCurrentBroker(property: PublicProperty): Promise<PublicProperty> {
  if (!property.assignedBrokerId || !ObjectId.isValid(property.assignedBrokerId)) return property;
  const broker = await (await getBrokersCollection()).findOne({ _id: new ObjectId(property.assignedBrokerId), status: 'active' });
  return broker ? { ...property, broker: brokerFromRow(broker as Record<string, unknown>) } : property;
}
export const publicPropertyService = {
  async list(input: unknown) { const query = publicPropertyQuerySchema.parse(input); const pageSize = getEnv().PROPERTY_PAGE_SIZE; const result = await publicPropertyRepository.list({ page: query.page, pageSize, propertyType: query.type }); return { items: result.items.map(mapPublicProperty), page: result.page, pageSize, totalItems: result.totalItems, totalPages: result.totalPages }; },
  async featured(limit = 3) { return (await publicPropertyRepository.featured(Math.min(Math.max(limit,1),6))).map(mapPublicProperty); },
  async getBySlug(input: unknown) { const slug = propertySlugSchema.parse(input); const property = await publicPropertyRepository.bySlug(slug); return property ? withCurrentBroker(mapPublicProperty(property)) : null; },
};
