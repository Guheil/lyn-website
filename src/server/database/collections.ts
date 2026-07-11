import 'server-only';
import type { Collection, IndexDescription } from 'mongodb';
import type { PropertyDocument } from '@/server/modules/properties/property.types';
import type { InquiryDocument } from '@/server/modules/inquiries/inquiry.types';
import type { CredentialDocument } from '@/server/modules/credentials';
import type { PropertyMetricDocument } from '@/server/modules/property-metrics';
import { getDatabase } from './mongodb';

let indexesReady: Promise<void> | undefined;

function matchingKey(left: Record<string, unknown>, right: Record<string, unknown>): boolean {
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);
  return leftEntries.length === rightEntries.length
    && leftEntries.every(([field, direction], index) => field === rightEntries[index]?.[0] && direction === rightEntries[index]?.[1]);
}

async function createIndexesSafely(name: string, indexes: IndexDescription[]) {
  try {
    const collection = (await getDatabase()).collection(name);
    const existing = await collection.listIndexes().toArray();

    // Atlas may already have an index created without an explicit name (for
    // example, `createdAt_-1`). MongoDB rejects a duplicate key pattern with a
    // new name, so reuse the equivalent index instead of trying to recreate it.
    const missing = indexes.filter((index) => !existing.some((current) => (
      current.name === index.name
      || (
        matchingKey(current.key, index.key as Record<string, unknown>)
        && Boolean(current.unique) === Boolean(index.unique)
      )
    )));

    if (missing.length) await collection.createIndexes(missing);
  } catch (error) {
    console.error(`Could not ensure indexes for ${name}. Continuing without blocking reads.`, error);
  }
}

function ensure() {
  if (indexesReady) return;

  indexesReady = Promise.all([
    createIndexesSafely('properties', [
      { key: { slug: 1, status: 1 }, name: 'properties_slug_status' },
      { key: { status: 1, availability: 1, propertyType: 1, publishedAt: -1 }, name: 'properties_public_filter' },
    ]),
    createIndexesSafely('inquiries', [{ key: { createdAt: -1 }, name: 'inquiries_created_at' }]),
    createIndexesSafely('credentials', [{ key: { status: 1, displayOrder: 1 }, name: 'credentials_public_order' }]),
    createIndexesSafely('propertyMetrics', [
      { key: { propertyId: 1, date: 1 }, name: 'property_metrics_property_date', unique: true },
      { key: { date: -1 }, name: 'property_metrics_date' },
    ]),
  ]).then(() => undefined);
}

export async function getPropertiesCollection(): Promise<Collection<PropertyDocument>> {
  const db = await getDatabase();
  ensure();
  return db.collection<PropertyDocument>('properties');
}

export async function getInquiriesCollection(): Promise<Collection<InquiryDocument>> {
  const db = await getDatabase();
  ensure();
  return db.collection<InquiryDocument>('inquiries');
}

export async function getCredentialsCollection(): Promise<Collection<CredentialDocument>> {
  const db = await getDatabase();
  ensure();
  return db.collection<CredentialDocument>('credentials');
}

export async function getBrokersCollection() {
  const db = await getDatabase();
  ensure();
  return db.collection('brokers');
}

export async function getPropertyMetricsCollection(): Promise<Collection<PropertyMetricDocument>> {
  const db = await getDatabase();
  ensure();
  return db.collection<PropertyMetricDocument>('propertyMetrics');
}
