import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { propertyGroupProfile } from '@/constants/broker';
import { absoluteUrl, siteConfig } from '@/constants/site';
import { PropertyGallery } from '@/features/properties/components/PropertyGallery';
import { PropertyViewTracker } from '@/features/properties/components/PropertyViewTracker';
import { publicPropertyService } from '@/server/modules/properties';

export const dynamic = 'force-dynamic';

function telephoneHref(value: string | undefined): string {
  if (!value || /x/i.test(value)) return '';
  const normalized = value.replace(/[^\d+]/g, '');
  return normalized.replace(/\D/g, '').length >= 10 ? `tel:${normalized}` : '';
}

function emailHref(value: string | undefined): string {
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '';
  return `mailto:${value}`;
}

function priceValue(value: string): number | null {
  const numeric = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function availabilityLabel(value: 'available' | 'reserved' | 'sold' | 'off-market'): string {
  return {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
    'off-market': 'Off market',
  }[value];
}

function schemaAvailability(value: 'available' | 'reserved' | 'sold' | 'off-market'): string {
  return {
    available: 'https://schema.org/InStock',
    reserved: 'https://schema.org/LimitedAvailability',
    sold: 'https://schema.org/SoldOut',
    'off-market': 'https://schema.org/Discontinued',
  }[value];
}

function descriptionFor(property: {
  propertyType: string;
  location: string;
  shortDescription: string;
}) {
  const prefix = `${property.propertyType} in ${property.location}. `;
  const full = `${prefix}${property.shortDescription}`.replace(/\s+/g, ' ').trim();
  return full.length > 165 ? `${full.slice(0, 162).trimEnd()}…` : full;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await publicPropertyService.getBySlug(slug);
    if (!property) {
      return {
        title: 'Property not found',
        robots: { index: false, follow: false },
      };
    }

    const description = property.seoDescription || descriptionFor(property);
    const canonical = `/properties/${property.slug}`;
    const images = property.images.length ? property.images : [siteConfig.defaultImage];

    return {
      title: property.seoTitle || property.title,
      description,
      alternates: { canonical },
      openGraph: {
        type: 'website',
        url: canonical,
        title: `${property.title} – ${property.location}`,
        description,
        images: images.map((url) => ({
          url,
          alt: `${property.title} in ${property.location}`,
        })),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${property.title} – ${property.location}`,
        description,
        images: [images[0]],
      },
      robots: { index: true, follow: true },
      other: {
        'geo.region': 'PH-LUN',
        'geo.placename': property.location,
      },
    };
  } catch {
    return {
      title: 'La Union Property Listing',
      robots: { index: false, follow: true },
    };
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
  const broker = property.broker;
  const brokerName = (broker?.name || 'Property inquiry team').replace(/\s*\(Sample\)\s*$/i, '');
  const brokerInitials =
    brokerName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'RE';

  const facts = [
    { label: 'Availability', value: availabilityLabel(property.availability) },
    { label: 'Property type', value: property.propertyType || 'Property' },
    { label: 'Location', value: property.location || 'La Union' },
    { label: 'Lot area', value: property.lotArea || 'Available upon inquiry' },
    { label: 'Floor area', value: property.floorArea || 'Available upon inquiry' },
  ];

  const brokerDetails = [
    { label: 'Agency or team', value: broker?.agency || '' },
    { label: 'Service area', value: broker?.serviceArea || '' },
  ].filter((item) => item.value);

  const inquiryHref = `/contact?property=${encodeURIComponent(property.slug)}`;
  const phoneHref = telephoneHref(broker?.mobile);
  const brokerEmailHref = emailHref(broker?.email);
  const canonicalUrl = absoluteUrl(`/properties/${property.slug}`);
  const numericPrice = priceValue(property.price);

  const breadcrumbItems = [
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Properties', url: absoluteUrl('/properties') },
    { name: property.title, url: canonicalUrl },
  ];

  const listingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${canonicalUrl}#listing`,
    name: property.title,
    description: property.shortDescription,
    url: canonicalUrl,
    datePosted: property.publishedAt || undefined,
    image: images.length ? images : [siteConfig.defaultImage],
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
    provider: broker
      ? {
          '@type': 'Person',
          name: brokerName,
          jobTitle: broker.role || 'Assigned property broker',
          worksFor: {
            '@type': 'RealEstateAgent',
            name: broker.agency || siteConfig.name,
          },
          telephone: broker.mobile || undefined,
          email: broker.email || undefined,
          areaServed: broker.serviceArea || property.location,
        }
      : { '@id': `${absoluteUrl('/')}#organization` },
    about: {
      '@type': 'Place',
      name: property.title,
      description: property.shortDescription,
      image: images.length ? images : undefined,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.location,
        addressRegion: 'La Union',
        addressCountry: 'PH',
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Property type', value: property.propertyType },
        { '@type': 'PropertyValue', name: 'Lot area', value: property.lotArea || undefined },
        { '@type': 'PropertyValue', name: 'Floor area', value: property.floorArea || undefined },
      ].filter((item) => item.value),
    },
    offers: numericPrice
      ? {
          '@type': 'Offer',
          url: canonicalUrl,
          price: numericPrice,
          priceCurrency: 'PHP',
          availability: schemaAvailability(property.availability),
          businessFunction: 'https://purl.org/goodrelations/v1#Sell',
        }
      : undefined,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: 'clamp(56px,7vw,96px)',
        px: 'clamp(20px,4vw,48px)',
        bgcolor: 'background.default',
      }}
    >
      <PropertyViewTracker slug={property.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd).replace(/</g, '\\u003c') }}
      />

      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            mb: 4,
            color: 'text.secondary',
            fontSize: '0.9rem',
            '& a': { color: 'inherit', textDecoration: 'none' },
            '& a:hover': { color: 'text.primary', textDecoration: 'underline' },
          }}
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/properties">Properties</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{property.title}</span>
        </Box>

        <Button href="/properties" startIcon={<ArrowLeft size={17} />} sx={{ mb: 4 }}>
          Back to La Union properties
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
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                }}
              >
                {property.propertyType} in La Union
              </Typography>
              <Box
                component="span"
                sx={{
                  px: 1.1,
                  py: 0.55,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {availabilityLabel(property.availability)}
              </Box>
            </Stack>
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
              <Typography
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem,2.6vw,2.8rem)',
                  lineHeight: 1,
                }}
              >
                {property.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        <PropertyGallery images={images} title={`${property.title} in ${property.location}`} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 390px' },
            gap: { xs: 5, lg: 7 },
            mt: { xs: 5, lg: 7 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                gap: 2,
                mb: 5,
              }}
            >
              {facts.map((fact) => (
                <Box
                  key={fact.label}
                  sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.6, pb: 1.2 }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.7 }}>
                    {fact.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{fact.value}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem,2.2vw,2.5rem)', mb: 2.2 }}>
                About this {property.propertyType.toLowerCase()}
              </Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 740, fontSize: '1.02rem', lineHeight: 1.85 }}>
                {property.shortDescription}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.08fr) minmax(0, 0.92fr)' },
                gap: 4,
                mb: 6,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  p: 'clamp(24px,3vw,34px)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h3" sx={{ fontSize: '1.35rem', mb: 1.7 }}>
                  Before arranging a viewing
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  Ask the assigned broker about current availability, ownership documents, access, utilities, viewing arrangements, and other details relevant to this La Union property.
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: '#f5f1e8',
                  p: 'clamp(24px,3vw,34px)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h3" sx={{ fontSize: '1.35rem', mb: 1.7 }}>
                  Property location
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  The public listing shows the general location. The assigned broker can provide approved directions and a more precise map reference when arranging a serious property inquiry.
                </Typography>
              </Box>
            </Box>

            {features.length ? (
              <Box>
                <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem,2.2vw,2.5rem)', mb: 2.2 }}>
                  Property features
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
                <Typography
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.1rem,2.8vw,3rem)',
                    lineHeight: 1,
                  }}
                >
                  {property.price}
                </Typography>
              </Box>

              <Box sx={{ p: 'clamp(24px,3vw,34px)' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Assigned property broker
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
                    {brokerInitials}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: '1.35rem', lineHeight: 1.15, overflowWrap: 'anywhere' }}
                    >
                      {brokerName}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: '.9rem', overflowWrap: 'anywhere' }}>
                      {broker?.role || 'Property inquiry representative'}
                    </Typography>
                  </Box>
                </Stack>

                {brokerDetails.length ? (
                  <Box sx={{ display: 'grid', gap: 1.5, mb: 2.5 }}>
                    {brokerDetails.map((detail) => (
                      <Box key={detail.label} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.3 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.4 }}>
                          {detail.label}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, lineHeight: 1.5, overflowWrap: 'anywhere' }}>
                          {detail.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : null}

                {broker && (broker.mobile || broker.email) ? (
                  <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.5, mb: 2.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.2 }}>
                      Direct contact
                    </Typography>
                    <Box sx={{ display: 'grid', gap: 1.25 }}>
                      {broker.mobile ? (
                        <Stack direction="row" sx={{ gap: 1.2, alignItems: 'center', minWidth: 0 }}>
                          <Phone size={17} aria-hidden="true" />
                          <Typography
                            component={phoneHref ? 'a' : 'span'}
                            href={phoneHref || undefined}
                            sx={{ color: 'text.primary', fontWeight: 600, overflowWrap: 'anywhere' }}
                          >
                            {broker.mobile}
                          </Typography>
                        </Stack>
                      ) : null}
                      {broker.email ? (
                        <Stack direction="row" sx={{ gap: 1.2, alignItems: 'center', minWidth: 0 }}>
                          <Mail size={17} aria-hidden="true" />
                          <Typography
                            component={brokerEmailHref ? 'a' : 'span'}
                            href={brokerEmailHref || undefined}
                            sx={{ color: 'text.primary', fontWeight: 600, overflowWrap: 'anywhere' }}
                          >
                            {broker.email}
                          </Typography>
                        </Stack>
                      ) : null}
                    </Box>
                  </Box>
                ) : null}

                <Button
                  href={inquiryHref}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  endIcon={<ArrowUpRight size={17} />}
                  sx={{ minHeight: 48 }}
                >
                  Ask about this property
                </Button>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {phoneHref ? (
                    <Button href={phoneHref} startIcon={<Phone size={16} />} sx={{ minHeight: 46 }}>
                      Call broker
                    </Button>
                  ) : null}
                  {brokerEmailHref ? (
                    <Button href={brokerEmailHref} startIcon={<Mail size={16} />} sx={{ minHeight: 46 }}>
                      Email broker
                    </Button>
                  ) : null}
                  {broker?.whatsappUrl ? (
                    <Button
                      href={broker.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<MessageCircle size={16} />}
                      sx={{ minHeight: 46 }}
                    >
                      WhatsApp
                    </Button>
                  ) : null}
                  {broker?.facebookUrl ? (
                    <Button
                      href={broker.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ minHeight: 46 }}
                    >
                      Messenger / Facebook
                    </Button>
                  ) : null}
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3, pt: 2.2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    Property group owner
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>{propertyGroupProfile.ownerName}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.35, fontSize: '0.88rem' }}>
                    {propertyGroupProfile.ownerRole}
                  </Typography>
                  <Button href={propertyGroupProfile.credentialsHref} fullWidth sx={{ mt: 1.2, minHeight: 46 }}>
                    Business credentials
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
