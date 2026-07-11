import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Stack, Typography } from '@mui/material';
import type { PropertyCardProps } from './interface';
import { StyledBody, StyledCard, StyledMedia } from './elements';

function availabilityLabel(value: PropertyCardProps['property']['availability']) {
  return { available: 'Available', reserved: 'Reserved', sold: 'Sold', 'off-market': 'Off market' }[value];
}

const placeholder = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=84';

export function PropertyCard({ property }: PropertyCardProps) {
  const facts = [property.location, property.lotArea, property.floorArea].filter(Boolean);

  return (
    <StyledCard>
      <Link href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
        <StyledMedia>
          {/* Database images remain the source of truth; this only covers listings without an image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.images[0] || placeholder}
            alt={`${property.title} in ${property.location}`}
            loading="lazy"
            decoding="async"
          />
          <span className="property-index">{property.isFeatured ? 'Featured' : property.propertyType}</span>
          <span className="property-availability">{availabilityLabel(property.availability)}</span>
          <span className="property-arrow"><ArrowUpRight size={18} /></span>
        </StyledMedia>
        <StyledBody>
          <Stack direction="row" sx={{ alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="overline" color="primary.dark">{property.propertyType}</Typography>
            <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap', ml: 'auto' }}>{property.price}</Typography>
          </Stack>
          <Typography variant="h3">{property.title}</Typography>
          <div className="meta">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <Typography className="description">{property.shortDescription}</Typography>
          <span className="view-link">View property <ArrowUpRight size={16} /></span>
        </StyledBody>
      </Link>
    </StyledCard>
  );
}
