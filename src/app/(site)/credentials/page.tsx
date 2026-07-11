import type { Metadata } from 'next';
import { CredentialsPage } from '@/features/credentials/CredentialsPage';

export const metadata: Metadata = {
  title: 'Business Credentials and Registrations',
  description:
    'Review public-facing business registrations, permits, training records, and professional affiliations connected to Lyn Bactad Property Group in La Union.',
  alternates: { canonical: '/credentials' },
  openGraph: {
    url: '/credentials',
    title: 'Business Credentials and Registrations',
    description:
      'Public business records, permits, training documents, and professional affiliations connected to Lyn Bactad Property Group in La Union.',
  },
};

export default function Page() {
  return <CredentialsPage />;
}
