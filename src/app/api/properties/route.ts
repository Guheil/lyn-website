import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { publicPropertyService } from '@/server/modules/properties';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) { try { const url = new URL(request.url); const result = await publicPropertyService.list({ page: url.searchParams.get('page') ?? undefined, type: url.searchParams.get('type') ?? undefined }); return NextResponse.json({ success: true, data: result }); } catch (error) { if (error instanceof ZodError) return NextResponse.json({ success: false, message: 'Invalid filters.' }, { status: 400 }); console.error('Public properties API failed', error); return NextResponse.json({ success: false, message: 'Properties are temporarily unavailable.' }, { status: 500 }); } }
