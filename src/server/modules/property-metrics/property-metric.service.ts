import 'server-only';

import { getPropertyMetricsCollection } from '@/server/database';
import { publicPropertyService } from '@/server/modules/properties';

function manilaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export async function recordPropertyView(slug: string) {
  const property = await publicPropertyService.getBySlug(slug);
  if (!property) return { recorded: false };

  const now = new Date();
  await (await getPropertyMetricsCollection()).updateOne(
    { propertyId: property.id, date: manilaDate(now) },
    {
      $inc: { views: 1 },
      $set: { updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
  return { recorded: true };
}
