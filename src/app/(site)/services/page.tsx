import type { Metadata } from 'next';
import { ServicesPage } from '@/features/services/ServicesPage';

export const metadata: Metadata = {
  title: 'Real Estate Services in La Union',
  description:
    'Property selling, buying assistance, land and commercial property support, listing preparation, photography, drone coverage, and property marketing in La Union.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Real Estate Services in La Union',
    description:
      'Explore property selling, buying, listing preparation, commercial real estate, land, photography, drone, and marketing support in La Union.',
  },
};

export default function Page() {
  return <ServicesPage />;
}
