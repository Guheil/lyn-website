import 'server-only';
import type { Collection } from 'mongodb';
import type { PropertyDocument } from '@/server/modules/properties/property.types';
import type { InquiryDocument } from '@/server/modules/inquiries/inquiry.types';
import { getDatabase } from './mongodb';
let indexesReady: Promise<void> | undefined;
async function ensureIndexes() {
  if (!indexesReady) indexesReady = (async () => { const db = await getDatabase(); await Promise.all([
    db.collection<PropertyDocument>('properties').createIndexes([{ key: { slug: 1 }, unique: true }, { key: { status: 1, propertyType: 1, publishedAt: -1 } }, { key: { isFeatured: 1, publishedAt: -1 } }]),
    db.collection<InquiryDocument>('inquiries').createIndexes([{ key: { createdAt: -1 } }, { key: { email: 1, createdAt: -1 } }]),
  ]); })();
  await indexesReady;
}
export async function getPropertiesCollection(): Promise<Collection<PropertyDocument>> { await ensureIndexes(); return (await getDatabase()).collection<PropertyDocument>('properties'); }
export async function getInquiriesCollection(): Promise<Collection<InquiryDocument>> { await ensureIndexes(); return (await getDatabase()).collection<InquiryDocument>('inquiries'); }
