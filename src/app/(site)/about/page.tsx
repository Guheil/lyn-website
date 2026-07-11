import type { Metadata } from 'next';
import { AboutPage } from '@/features/about/AboutPage';

export const metadata: Metadata = {
  title: 'About the Property Group',
  description:
    'Learn about Lyn Bactad Property Group, its La Union service area, business leadership, and approach to connecting clients with assigned property brokers.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About Lyn Bactad Property Group',
    description:
      'Local property leadership, broker coordination, and real estate support for buyers, sellers, owners, and investors across La Union.',
  },
};

export default function Page() {
  return <AboutPage />;
}
