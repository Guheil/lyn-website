import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { brokerProfile } from '@/constants/broker';
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

  try {
    property = await publicPropertyService.getBySlug(slug);
  } catch (error) {
    console.error('Property detail failed', error);
  }

  if (!property) notFound();

  const features = Array.isArray(property.features) ? property.features.filter(Boolean) : [];
  const images = Array.isArray(property.images) ? property.images.filter(Boolean) : [];

  const facts = [
    { label: 'Property type', value: property.propertyType || 'Not provided' },
    { label: 'Location', value: property.location || 'Not provided' },
    { label: 'Lot area', value: property.lotArea || 'Not provided' },
    { label: 'Floor area', value: property.floorArea || 'Not provided' },
  ];

  const inquiryHref = `/contact?property=${encodeURIComponent(property.title)}`;

  return (
    <Box component="section" sx={{ py: 'clamp(56px,7vw,96px)', px: 'clamp(20px,4vw,48px)', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Button href="/properties" startIcon={<ArrowLeft size={17} />} sx={{ mb: 4 }}>
          Back to properties
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(340px, 0.85fr)' },
            gap: { xs: 4, lg: 7 },
            alignItems: 'end',
            mb: { xs: 5, lg: 6 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 2,
              }}
            >
              {property.propertyType}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: 'clamp(2.65rem,6vw,6.2rem)',
                lineHeight: 0.95,
                maxWidth: 920,
                overflowWrap: 'anywhere',
              }}
            >
              {property.title}
            </Typography>
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center', color: 'text.secondary', mt: 2.5 }}>
              <MapPin size={18} />
              <Typography>{property.location}</Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              pt: 3,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) auto' },
              gap: 3,
              alignItems: 'end',
            }}
          >
            <Typography color="text.secondary">{property.shortDescription}</Typography>
            <Box sx={{ minWidth: { xs: '100%', sm: 220 } }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Asking price
              </Typography>
              <Typography sx={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,2.6vw,2.8rem)', lineHeight: 1 }}>
                {property.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        <PropertyGallery images={images} title={property.title} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 380px' },
            gap: { xs: 5, lg: 7 },
            mt: { xs: 5, lg: 7 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2, mb: 5 }}>
              {facts.map((fact) => (
                <Box key={fact.label} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.6, pb: 1.2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.7 }}>
                    {fact.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{fact.value}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem,2.2vw,2.5rem)', mb: 2.2 }}>
                Property overview
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 740, fontSize: '1.02rem', lineHeight: 1.85 }}>
                {property.shortDescription}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.08fr) minmax(0, 0.92fr)' }, gap: 4, mb: 6 }}>
              <Box sx={{ bgcolor: 'background.paper', p: 'clamp(24px,3vw,34px)', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h3" sx={{ fontSize: '1.35rem', mb: 1.7 }}>
                  Inquiry preparation
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  Ask about availability, ownership documents, viewing arrangements, access, utilities, and other information needed before making a property decision.
                </Typography>
              </Box>
              <Box sx={{ bgcolor: '#f5f1e8', p: 'clamp(24px,3vw,34px)', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h3" sx={{ fontSize: '1.35rem', mb: 1.7 }}>
                  Location privacy
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  The exact map pin can be shared during a serious inquiry once the seller approves the public location details.
                </Typography>
              </Box>
            </Box>

            {features.length ? (
              <Box>
                <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem,2.2vw,2.5rem)', mb: 2.2 }}>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  {features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{
                        px: 1.6,
                        py: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        fontSize: '0.92rem',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {feature}
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : null}
          </Box>

          <Box sx={{ order: { xs: -1, lg: 0 }, position: { lg: 'sticky' }, top: { lg: 110 } }}>
            <Box sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Box sx={{ p: 'clamp(24px,3vw,34px)', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Asking price
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,2.8vw,3rem)', lineHeight: 1 }}>
                  {property.price}
                </Typography>
              </Box>

              <Box sx={{ p: 'clamp(24px,3vw,34px)' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Property representative
                </Typography>

                <Stack direction="row" sx={{ gap: 2, alignItems: 'center', mb: 2.4 }}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 54,
                      height: 54,
                      flex: '0 0 auto',
                      display: 'grid',
                      placeItems: 'center',
                      border: '1px solid',
                      borderColor: 'text.primary',
                      fontWeight: 800,
                      letterSpacing: '.08em',
                    }}
                  >
                    LB
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h3" sx={{ fontSize: '1.35rem', lineHeight: 1.15 }}>
                      {brokerProfile.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: '.9rem' }}>
                      {brokerProfile.role}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ display: 'grid', gap: 1.6, mb: 3 }}>
                  <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.4 }}>
                      Company
                    </Typography>
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.5 }}>{brokerProfile.company}</Typography>
                  </Box>
                  <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.4 }}>
                      Service area
                    </Typography>
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.5 }}>{brokerProfile.serviceArea}</Typography>
                  </Box>
                  <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.4 }}>
                      Contact channels
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>{brokerProfile.channels}</Typography>
                  </Box>
                </Box>

                <Button
                  href={inquiryHref}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  endIcon={<ArrowUpRight size={17} />}
                  sx={{ minHeight: 48 }}
                >
                  Inquire about this property
                </Button>
                <Button href="/credentials" fullWidth sx={{ mt: 1.2, minHeight: 46 }}>
                  View broker credentials
                </Button>

                <Typography sx={{ color: 'text.secondary', mt: 2.2, fontSize: '0.88rem', lineHeight: 1.65 }}>
                  Include the property title in your message. Public-safe credentials and professional background are available for review on the Credentials page.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
