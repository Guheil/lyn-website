import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { PropertyGallery } from '@/features/properties/components/PropertyGallery';
import { publicPropertyService } from '@/server/modules/properties';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await publicPropertyService.getBySlug(slug);
    return property ? { title: property.title, description: property.shortDescription } : { title: 'Property not found' };
  } catch {
    return { title: 'Property' };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let property;
  try { property = await publicPropertyService.getBySlug(slug); }
  catch (error) { console.error('Property detail failed', error); }
  if (!property) notFound();

  return <Box sx={{ py: 'clamp(54px,6vw,90px)', px: 'clamp(20px,4vw,48px)' }}>
    <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
      <Button href="/properties" startIcon={<ArrowLeft size={17} />} sx={{ mb: 4 }}>Back to properties</Button>
      <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'flex-end' }, gap: 3, mb: 4 }}>
        <Box>
          <Typography variant="overline" color="primary.dark">{property.propertyType}</Typography>
          <Typography variant="h1" sx={{ fontSize: 'clamp(2.6rem,5.8vw,6rem)', maxWidth: 980 }}>{property.title}</Typography>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', color: 'text.secondary', mt: 2 }}><MapPin size={17} />{property.location}</Stack>
        </Box>
        <Box sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', p: 2.5, minWidth: 260 }}>
          <Typography variant="caption" color="text.secondary">Asking price</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{property.price}</Typography>
        </Box>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.08fr .92fr' }, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <PropertyGallery images={property.images} title={property.title} />
        <Box sx={{ p: 'clamp(28px,4vw,56px)' }}>
          <Typography color="text.secondary" sx={{ fontSize: '1.06rem' }}>{property.shortDescription}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' }, gap: 1.5, my: 4 }}>
            {[['Location', property.location], ['Type', property.propertyType], ['Lot area', property.lotArea || 'Not provided'], ['Floor area', property.floorArea || 'Not provided']].map(([label, value]) => <Box key={label} sx={{ p: 1.7, border: '1px solid', borderColor: 'divider' }}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography sx={{ fontWeight: 700 }}>{value}</Typography></Box>)}
          </Box>
          <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 2 }}>Property features</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>{property.features.length ? property.features.map((feature) => <Chip key={feature} label={feature} variant="outlined" />) : <Typography color="text.secondary">Feature details will be added after verification.</Typography>}</Stack>
          <Box sx={{ mt: 4, p: 2.5, bgcolor: '#f7f3eb', border: '1px solid', borderColor: 'divider' }}><Typography variant="h3" sx={{ fontSize: '1.3rem' }}>Location map</Typography><Typography color="text.secondary">The exact map pin can be added after the seller approves the public location.</Typography></Box>
          <Button href={`/contact?property=${encodeURIComponent(property.title)}`} variant="contained" color="secondary" sx={{ mt: 4 }}>Inquire about this property</Button>
        </Box>
      </Box>
    </Box>
  </Box>;
}
