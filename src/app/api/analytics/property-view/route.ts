import { NextResponse } from 'next/server';
import { z } from 'zod';
import { recordPropertyView } from '@/server/modules/property-metrics';
import { allowRequest, assertSameOrigin, readJsonBody } from '@/server/security/request';

const inputSchema = z.object({ slug: z.string().trim().min(1).max(180) }).strict();

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowRequest(`property-view:${ip}`, 80, 60 * 60_000)) {
      return NextResponse.json({ success: true, recorded: false });
    }

    const input = inputSchema.parse(await readJsonBody(request, 2_000));
    const result = await recordPropertyView(input.slug);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'The property link is not valid.' }, { status: 400 });
    }
    if (error instanceof Error && ['INVALID_ORIGIN', 'INVALID_CONTENT_TYPE', 'BODY_TOO_LARGE'].includes(error.message)) {
      return NextResponse.json({ success: false, message: 'Request rejected.' }, { status: 400 });
    }
    console.error('Property view tracking failed', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
