import type { Metadata } from 'next';
import { CredentialsPage } from '@/features/credentials/CredentialsPage';
export const metadata: Metadata = { title: 'Credentials' };
export default function Page(){ return <CredentialsPage />; }
