import type { Metadata } from 'next';
import { ContactPage } from '@/features/contact/ContactPage';
export const metadata: Metadata = { title: 'Contact' };
export default async function Page({ searchParams }: { searchParams: Promise<{ property?: string | string[] }> }) { const params=await searchParams; const value=Array.isArray(params.property)?params.property[0]:params.property; return <ContactPage initialReference={value?.slice(0,180)} />; }
