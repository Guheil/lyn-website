import type { Metadata } from 'next';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { Building2 } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PropertyFilters } from '@/features/properties/components/PropertyFilters';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { PropertyPagination } from '@/features/properties/components/PropertyPagination';
import { publicPropertyService } from '@/server/modules/properties';

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse published land, residential, commercial, and investment property listings in La Union.',
};
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string | string[]; type?: string | string[] }> }) {
  const raw = await searchParams;
  const page = Array.isArray(raw.page) ? raw.page[0] : raw.page;
  const type = Array.isArray(raw.type) ? raw.type[0] : raw.type;
  let unavailable = false;
  let result;
  try {
    result = await publicPropertyService.list({ page, type });
  } catch (error) {
    console.error('Properties page failed', error);
    unavailable = true;
    result = { items: [], page: 1, pageSize: 6, totalItems: 0, totalPages: 1 };
  }

  return <>
    <PageHero label="Property listings" title="Available property opportunities in La Union." description="Browse represented listings by property type. Each page includes location details, specifications, photos, and inquiry information." image="https://picsum.photos/seed/la-union-property-catalog/1800/1000" />
    <Box component="section" sx={{ py: 'clamp(72px,8vw,124px)', px: 'clamp(20px,4vw,48px)', bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'flex-end' }, gap: 3, mb: 5 }}>
          <SectionHeading title="Browse properties" description={`${result.totalItems} published ${result.totalItems === 1 ? 'listing' : 'listings'} found.`} />
          <PropertyFilters activeType={type} />
        </Stack>
        {unavailable && <Alert severity="warning" sx={{ mb: 3 }}>The property database could not be reached. Check the Atlas connection in <code>.env.local</code>.</Alert>}
        {result.items.length ? <>
          <PropertyGrid properties={result.items} />
          <PropertyPagination page={result.page} totalPages={result.totalPages} propertyType={type} />
        </> : <Stack sx={{ minHeight: 300, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2, border: '1px solid', borderColor: 'divider' }}>
          <Building2 size={36} />
          <Typography variant="h3">No published properties yet.</Typography>
          <Typography color="text.secondary">Publish a property from the dashboard and it will appear here automatically.</Typography>
        </Stack>}
      </Box>
    </Box>
  </>;
}
