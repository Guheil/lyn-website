import type { PropertyDocument, PublicProperty } from './property.types';

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function imageList(value: unknown): string[] {
  return stringList(value).filter((image) => {
    if (image.startsWith('/')) return true;
    try {
      const url = new URL(image);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  });
}

function identifier(value: unknown): string {
  if (typeof value === 'string' && value) return value;
  if (value && typeof value === 'object' && 'toHexString' in value) {
    const toHexString = (value as { toHexString?: unknown }).toHexString;
    if (typeof toHexString === 'function') return toHexString.call(value);
  }
  throw new Error('Property identifier is missing.');
}

function isoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  return null;
}

export function mapPublicProperty(document: PropertyDocument): PublicProperty {
  const raw = document as PropertyDocument & Record<string, unknown>;

  return {
    id: identifier(raw._id),
    title: stringValue(raw.title, 'Untitled property'),
    slug: stringValue(raw.slug),
    propertyType: stringValue(raw.propertyType, 'Property'),
    location: stringValue(raw.location, 'La Union'),
    price: stringValue(raw.price, 'Price upon request'),
    lotArea: stringValue(raw.lotArea),
    floorArea: stringValue(raw.floorArea),
    shortDescription: stringValue(raw.shortDescription, 'Further property details are available upon request.'),
    features: stringList(raw.features),
    images: imageList(raw.images),
    isFeatured: raw.isFeatured === true,
    publishedAt: isoDate(raw.publishedAt),
  };
}
