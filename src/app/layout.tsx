import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/ibm-plex-sans/wght.css';
import '@fontsource-variable/newsreader/wght.css';
import 'lenis/dist/lenis.css';
import '@/app/globals.css';
import { SiteExperience } from '@/components/system/SiteExperience';
import { ThemeRegistry } from '@/theme';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? 'http://localhost:3000'),
  title: { default: 'Lyn Bactad | La Union Real Estate', template: '%s | Lyn Bactad Real Estate' },
  description: 'Real estate listings, brokerage assistance, and property marketing in La Union.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <SiteExperience>{children}</SiteExperience>
        </ThemeRegistry>
      </body>
    </html>
  );
}
