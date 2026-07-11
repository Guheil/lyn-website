import type { PropertyDocument, PublicProperty, PublicPropertyBroker } from './property.types';

function stringValue(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function safePublicUrl(value: unknown, allowInternal = false): string {
  const candidate = stringValue(value);
  if (!candidate) return '';
  if (allowInternal && candidate.startsWith('/') && !candidate.startsWith('//')) return candidate;

  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

function imageList(value: unknown): string[] {
  return stringList(value).filter((image) => Boolean(safePublicUrl(image, true)));
}

function identifier(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim();

  if (value && typeof value === 'object') {
    if ('toHexString' in value) {
      const toHexString = (value as { toHexString?: unknown }).toHexString;
      if (typeof toHexString === 'function') {
        try {
          return toHexString.call(value);
        } catch {
          // Continue to the Extended JSON check below.
        }
      }
    }

    if ('$oid' in value) {
      const oid = (value as { $oid?: unknown }).$oid;
      if (typeof oid === 'string' && oid.trim()) return oid.trim();
    }
  }

  return fallback || 'property';
}

function isoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();

  if (value && typeof value === 'object' && '$date' in value) {
    return isoDate((value as { $date?: unknown }).$date);
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  return null;
}

function mapBroker(value: unknown): PublicPropertyBroker | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const raw = value as Record<string, unknown>;
  const name = stringValue(raw.name);
  if (!name) return null;

  return {
    name,
    role: stringValue(raw.role, 'Assigned property broker'),
    agency: stringValue(raw.agency),
    mobile: stringValue(raw.mobile ?? raw.phone),
    email: stringValue(raw.email).toLowerCase(),
    whatsappUrl: safePublicUrl(raw.whatsappUrl),
    facebookUrl: safePublicUrl(raw.facebookUrl),
    serviceArea: stringValue(raw.serviceArea),
    isPlaceholder: raw.isPlaceholder === true,
  };
}

export function mapPublicProperty(document: PropertyDocument): PublicProperty {
  const raw = document as PropertyDocument & Record<string, unknown>;
  const slug = stringValue(raw.slug);

  return {
    id: identifier(raw._id, slug),
    title: stringValue(raw.title, 'Untitled property'),
    slug,
    propertyType: stringValue(raw.propertyType, 'Property'),
    location: stringValue(raw.location, 'La Union'),
    price: stringValue(raw.price, 'Price upon request'),
    lotArea: stringValue(raw.lotArea),
    floorArea: stringValue(raw.floorArea),
    shortDescription: stringValue(raw.shortDescription, 'Further property details are available upon request.'),
    features: stringList(raw.features),
    images: imageList(raw.images),
    broker: mapBroker(raw.broker),
    isFeatured: raw.isFeatured === true,
    publishedAt: isoDate(raw.publishedAt),
  };
}
