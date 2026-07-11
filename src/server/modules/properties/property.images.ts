import { Binary } from 'mongodb';

const supportedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const imageTypeAliases: Record<string, string> = { 'image/jpg': 'image/jpeg', 'image/pjpeg': 'image/jpeg' };

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

export function safeImageUrl(value: unknown): string {
  const candidate = stringValue(value);
  if (!candidate) return '';

  if (candidate.startsWith('/') && !candidate.startsWith('//')) return candidate;

  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

function contentTypeFromName(value: unknown): string {
  const name = stringValue(value).toLowerCase();
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg';
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.webp')) return 'image/webp';
  return '';
}

export function uploadedImageContentType(value: unknown): string {
  const image = recordValue(value);
  if (!image) return '';

  const supplied = stringValue(image.contentType ?? image.mimeType ?? image.mimetype ?? image.type).toLowerCase();
  const normalized = imageTypeAliases[supplied] ?? supplied;
  if (supportedImageTypes.has(normalized)) return normalized;

  return contentTypeFromName(image.filename ?? image.fileName ?? image.name);
}

function decodeBase64(value: string): Buffer | null {
  const payload = value.replace(/^data:image\/(?:jpeg|jpg|png|webp);base64,/i, '');
  if (!payload || !/^[A-Za-z0-9+/]+={0,2}$/.test(payload)) return null;

  const decoded = Buffer.from(payload, 'base64');
  return decoded.length ? decoded : null;
}

function toBuffer(value: unknown): Buffer | null {
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Binary) return Buffer.from(value.buffer);
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (typeof value === 'string') return decodeBase64(value);

  const nested = recordValue(value);
  if (nested && 'buffer' in nested) return toBuffer(nested.buffer);
  return null;
}

export function uploadedImageBuffer(value: unknown): Buffer | null {
  const image = recordValue(value);
  if (!image || !uploadedImageContentType(image)) return null;

  return toBuffer(image.data ?? image.buffer ?? image.file ?? image.content);
}

function uploadedPropertyImagePath(slug: string, index: number): string {
  return `/api/properties/${encodeURIComponent(slug)}/images/${index}`;
}

/**
 * Database records may continue using image URLs. For uploaded files, store an
 * object such as `{ filename, contentType, data }`, where `data` is a MongoDB
 * Binary value (or a base64 string). The binary stays server-side and is
 * exposed through the property image route instead of the public API payload.
 */
export function publicPropertyImages(value: unknown, slug: string): string[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((image, index) => {
    const url = safeImageUrl(image);
    if (url) return [url];

    const record = recordValue(image);
    const linkedUrl = record && safeImageUrl(record.url ?? record.imageUrl ?? record.src ?? record.path);
    if (linkedUrl) return [linkedUrl];

    return uploadedImageBuffer(image) ? [uploadedPropertyImagePath(slug, index)] : [];
  });
}

export function propertyImageAt(value: unknown, index: number): { body: Buffer; contentType: string } | null {
  if (!Array.isArray(value) || !Number.isSafeInteger(index) || index < 0) return null;

  const image = value[index];
  const contentType = uploadedImageContentType(image);
  const body = uploadedImageBuffer(image);
  return body && contentType ? { body, contentType } : null;
}
