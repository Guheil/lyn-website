import { getEnv } from '@/server/config/env';

function requestOrigin(request: Request): string | null {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!host) return null;

  const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ?? new URL(request.url).protocol.replace(':', '');
  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return null;
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return;

  const configuredOrigin = new URL(getEnv().APP_URL).origin;
  const servingOrigin = requestOrigin(request);
  if (origin !== configuredOrigin && origin !== servingOrigin) throw new Error('INVALID_ORIGIN');
}

export async function readJsonBody(request: Request, maxBytes = 20_000) { if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('INVALID_CONTENT_TYPE'); const length = Number(request.headers.get('content-length') ?? '0'); if (Number.isFinite(length) && length > maxBytes) throw new Error('BODY_TOO_LARGE'); const text = await request.text(); if (new TextEncoder().encode(text).byteLength > maxBytes) throw new Error('BODY_TOO_LARGE'); return JSON.parse(text) as unknown; }
const attempts = new Map<string, { count: number; resetAt: number }>();
export function allowRequest(key: string, limit = 8, windowMs = 60_000) { const now = Date.now(); const current = attempts.get(key); if (!current || current.resetAt <= now) { attempts.set(key,{count:1,resetAt:now+windowMs}); return true; } if (current.count >= limit) return false; current.count += 1; return true; }
