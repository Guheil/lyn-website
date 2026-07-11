import type { Metadata } from 'next';
import { ServicesPage } from '@/features/services/ServicesPage';
export const metadata: Metadata = { title: 'Services' };
export default function Page(){ return <ServicesPage />; }
