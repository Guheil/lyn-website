import type { Metadata } from 'next';
import { ContactPage } from '@/features/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact a Property Broker in La Union',
  description:
    'Send an inquiry about buying, selling, listing, land, house-and-lot, commercial, or investment property in La Union. The property group will route your message to the appropriate broker.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact a Property Broker in La Union',
    description:
      'Share your property location, property type, budget or asking price, and preferred next step for a broker-routed inquiry in La Union.',
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ property?: string | string[] }>;
}) {
  const params = await searchParams;
  const value = Array.isArray(params.property) ? params.property[0] : params.property;
  return <ContactPage initialReference={value?.slice(0, 180)} />;
}
