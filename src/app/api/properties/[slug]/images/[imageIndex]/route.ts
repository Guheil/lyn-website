import { NextResponse } from 'next/server';
import { getPropertiesCollection } from '@/server/database';
import { propertyImageAt } from '@/server/modules/properties/property.images';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; imageIndex: string }> },
) {
  const { slug, imageIndex } = await context.params;
  const index = Number(imageIndex);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !/^\d+$/.test(imageIndex) || !Number.isSafeInteger(index)) {
    return NextResponse.json({ success: false, message: 'Image not found.' }, { status: 404 });
  }

  const property = await (await getPropertiesCollection()).findOne({ slug, status: 'published' });
  const image = propertyImageAt(property?.images, index);
  if (!image) return NextResponse.json({ success: false, message: 'Image not found.' }, { status: 404 });

  return new NextResponse(image.body, {
    headers: {
      'Content-Type': image.contentType,
      'Content-Length': String(image.body.byteLength),
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
