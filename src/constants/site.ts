const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://lyn-realestate-elyu.vercel.app';

export const siteUrl = configuredSiteUrl.replace(/\/+$/, '');

export const siteConfig = {
  name: 'Lyn Bactad Property Group',
  shortName: 'Lyn Bactad',
  title: 'La Union Real Estate Listings & Property Services | Lyn Bactad Property Group',
  description:
    'Browse land, house-and-lot, residential, commercial, and investment property listings in La Union and connect with an assigned property broker.',
  areaServed: 'La Union, Philippines',
  locality: 'San Fernando City',
  region: 'La Union',
  country: 'PH',
  defaultImage:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=84',
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}
