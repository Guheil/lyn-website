import type { Metadata } from 'next';
import { CredentialsPage } from '@/features/credentials/CredentialsPage';
import { listPublicCredentials, type PublicCredential } from '@/server/modules/credentials';

export const metadata: Metadata = {
  title: 'Business Credentials and Registrations',
  description: 'Review public-facing business registrations, permits, training records, and professional affiliations connected to Lyn Bactad Property Group in La Union.',
  alternates: { canonical: '/credentials' },
};
export const dynamic = 'force-dynamic';

export default async function Page() {
  let credentials: PublicCredential[] = [];
  try {
    credentials = await listPublicCredentials();
  } catch (error) {
    console.error('Credentials page could not load records', error);
  }
  return <CredentialsPage credentials={credentials} />;
}
