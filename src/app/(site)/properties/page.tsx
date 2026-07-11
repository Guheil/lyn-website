import type { Metadata } from 'next';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { Building2 } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PropertyFilters } from '@/features/properties/components/PropertyFilters';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { PropertyPagination } from '@/features/properties/components/PropertyPagination';
import { absoluteUrl } from '@/constants/site';
import { publicPropertyService } from '@/server/modules/properties';

const supportedTypes = new Set([
  'Land',
  'House and Lot',
  'Residential',
  'Commercial',
  'Investment Property',
]);

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; type?: string | string[] }>;
}): Promise<Metadata> {
  const raw = await searchParams;
  const typeValue = readParam(raw.type);
  const type = typeValue && supportedTypes.has(typeValue) ? typeValue : undefined;
  const parsedPage = Number.parseInt(readParam(raw.page) ?? '1', 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 1 ? parsedPage : 1;
  const query = new URLSearchParams();
  if (type) query.set('type', type);
  if (page > 1) query.set('page', String(page));
  const canonical = `/properties${query.size ? `?${query.toString()}` : ''}`;
  const topic = type ? `${type} properties` : 'real estate properties';
  const title = `${type ? `${type} Listings` : 'Properties for Sale'} in La Union${page > 1 ? ` – Page ${page}` : ''}`;
  const description = `Browse ${topic.toLowerCase()} in La Union with location, price, lot area, floor area, photos, features, and assigned broker contact details.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { url: canonical, title, description },
  };
}

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; type?: string | string[] }>;
}) {
  const raw = await searchParams;
  const page = readParam(raw.page);
  const typeValue = readParam(raw.type);
  const type = typeValue && supportedTypes.has(typeValue) ? typeValue : undefined;
  let unavailable = false;
  let result;

  try {
    result = await publicPropertyService.list({ page, type });
  } catch (error) {
    console.error('Properties page failed', error);
    unavailable = true;
    result = { items: [], page: 1, pageSize: 6, totalItems: 0, totalPages: 1 };
  }

  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: type ? `${type} listings in La Union` : 'Real estate listings in La Union',
    description: type
      ? `Browse published ${type.toLowerCase()} listings in La Union.`
      : 'Browse published land, residential, commercial, and investment property listings in La Union.',
    url: absoluteUrl(
      `/properties${type ? `?type=${encodeURIComponent(type)}` : ''}`,
    ),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: result.totalItems,
      itemListElement: result.items.map((property, index) => ({
        '@type': 'ListItem',
        position: (result.page - 1) * result.pageSize + index + 1,
        name: property.title,
        url: absoluteUrl(`/properties/${property.slug}`),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero
        title="Properties for sale across La Union."
        description="Browse land, house-and-lot, residential, commercial, and investment property listings with practical details and direct broker inquiry options."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=84"
      />
      <Box
        component="section"
        sx={{
          py: 'clamp(72px,8vw,124px)',
          px: 'clamp(20px,4vw,48px)',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', lg: 'flex-end' },
              gap: 3,
              mb: 5,
            }}
          >
            <SectionHeading
              title={type ? `${type} listings in La Union` : 'Browse La Union property listings'}
              description={`${result.totalItems} available ${result.totalItems === 1 ? 'property' : 'properties'}.`}
            />
            <PropertyFilters activeType={type} />
          </Stack>

          {unavailable ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Property listings are temporarily unavailable. Please try again shortly or send a property inquiry through the contact page.
            </Alert>
          ) : null}

          {result.items.length ? (
            <>
              <PropertyGrid properties={result.items} />
              <PropertyPagination
                page={result.page}
                totalPages={result.totalPages}
                propertyType={type}
              />
            </>
          ) : (
            <Stack
              sx={{
                minHeight: 300,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Building2 size={36} />
              <Typography variant="h3">No properties match this selection.</Typography>
              <Typography color="text.secondary">
                Explore another property type or contact the group about current and upcoming listings in La Union.
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}
