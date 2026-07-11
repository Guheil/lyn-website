import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { publicPropertyService } from '@/server/modules/properties';
export const dynamic = 'force-dynamic';
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) { try { const { slug } = await context.params; const property = await publicPropertyService.getBySlug(slug); if (!property) return NextResponse.json({ success: false, message: 'Property not found.' }, { status: 404 }); return NextResponse.json({ success: true, data: property }); } catch (error) { if (error instanceof ZodError) return NextResponse.json({ success: false, message: 'Invalid property reference.' }, { status: 400 }); console.error('Property detail API failed', error); return NextResponse.json({ success: false, message: 'Property is temporarily unavailable.' }, { status: 500 }); } }
