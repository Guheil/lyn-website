import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/ibm-plex-sans/wght.css';
import '@fontsource-variable/newsreader/wght.css';
import 'lenis/dist/lenis.css';
import '@/app/globals.css';
import { SiteExperience } from '@/components/system/SiteExperience';
import { absoluteUrl, siteConfig, siteUrl } from '@/constants/site';
import { ThemeRegistry } from '@/theme';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 2000,
        height: 1333,
        alt: 'La Union real estate and property services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'real estate',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'en-PH',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      description:
        'A La Union property group that connects buyers, sellers, owners, and investors with assigned real estate brokers and property marketing support.',
      image: siteConfig.defaultImage,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.locality,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: siteConfig.areaServed,
      },
      member: {
        '@type': 'Person',
        name: 'Lyn Bactad',
        jobTitle: 'Property group owner',
      },
      knowsAbout: [
        'La Union real estate',
        'land for sale in La Union',
        'house and lot listings',
        'commercial property',
        'investment property',
        'property marketing',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        url: absoluteUrl('/contact'),
        contactType: 'property inquiries',
        areaServed: 'PH-LUN',
        availableLanguage: ['English', 'Filipino'],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <ThemeRegistry>
          <SiteExperience>{children}</SiteExperience>
        </ThemeRegistry>
      </body>
    </html>
  );
}
