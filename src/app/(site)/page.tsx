import type { Metadata } from 'next';
import { HomePage } from '@/features/home/HomePage';
import { siteConfig } from '@/constants/site';
import { publicPropertyService } from '@/server/modules/properties';
import type { PublicProperty } from '@/server/modules/properties';

export const metadata: Metadata = {
  title: 'La Union Real Estate Listings & Property Services',
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'La Union Real Estate Listings & Property Services',
    description: siteConfig.description,
    images: [siteConfig.defaultImage],
  },
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  let featured: PublicProperty[] = [];
  try {
    featured = await publicPropertyService.featured(3);
  } catch (error) {
    console.error('Featured properties could not be loaded', error);
  }
  return <HomePage featured={featured} />;
}
