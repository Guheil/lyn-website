import 'server-only';
import type { Collection, IndexDescription } from 'mongodb';
import type { PropertyDocument } from '@/server/modules/properties/property.types';
import type { InquiryDocument } from '@/server/modules/inquiries/inquiry.types';
import { getDatabase } from './mongodb';

let indexesReady: Promise<void> | undefined;

async function createIndexesSafely(collectionName: string, indexes: IndexDescription[]): Promise<void> {
  try {
    const db = await getDatabase();
    await db.collection(collectionName).createIndexes(indexes);
  } catch (error) {
    // Index maintenance must never prevent the public website from reading data.
    // Legacy collections may contain duplicate or incomplete values that make a
    // new index impossible to create until an administrator cleans the records.
    console.error(`Could not ensure indexes for ${collectionName}. Continuing without blocking reads.`, error);
  }
}

function ensureIndexesInBackground(): void {
  if (indexesReady) return;

  indexesReady = Promise.all([
    createIndexesSafely('properties', [
      { key: { slug: 1, status: 1 }, name: 'properties_slug_status' },
      { key: { status: 1, propertyType: 1, publishedAt: -1 }, name: 'properties_filter_sort' },
      { key: { isFeatured: 1, publishedAt: -1 }, name: 'properties_featured_sort' },
    ]),
    createIndexesSafely('inquiries', [
      { key: { createdAt: -1 }, name: 'inquiries_created_at' },
      { key: { email: 1, createdAt: -1 }, name: 'inquiries_email_created_at' },
    ]),
  ]).then(() => undefined);
}

export async function getPropertiesCollection(): Promise<Collection<PropertyDocument>> {
  const db = await getDatabase();
  ensureIndexesInBackground();
  return db.collection<PropertyDocument>('properties');
}

export async function getInquiriesCollection(): Promise<Collection<InquiryDocument>> {
  const db = await getDatabase();
  ensureIndexesInBackground();
  return db.collection<InquiryDocument>('inquiries');
}
