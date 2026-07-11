import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button, Stack, Typography } from '@mui/material';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import type { PublicProperty } from '@/server/modules/properties';
import {
  StyledDark,
  StyledHeroContent,
  StyledHeroMedia,
  StyledInner,
  StyledMetrics,
  StyledProcess,
  StyledProof,
  StyledSection,
  StyledServiceGrid,
  StyledVideoHero,
} from './elements';

export function HomePage({ featured }: { featured: PublicProperty[] }) {
  return (
    <>
      <StyledVideoHero data-home-hero>
        <StyledHeroMedia className="hero-media">
          <iframe
            src="https://www.youtube.com/embed/URUy19HnMsg?autoplay=1&mute=1&controls=0&loop=1&playlist=URUy19HnMsg&playsinline=1&modestbranding=1&rel=0"
            title="Aerial view of La Union"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        </StyledHeroMedia>

        <StyledHeroContent>
          <div className="hero-statement">
            <Typography variant="h1">
              La Union real estate,<br />seen clearly.
            </Typography>

            <div className="hero-aside">
              <Typography>Land, homes, commercial spaces, and investment properties across La Union.</Typography>
              <Button href="/properties" variant="text" endIcon={<ArrowUpRight size={17} />}>
                Explore properties
              </Button>
            </div>
          </div>
        </StyledHeroContent>
      </StyledVideoHero>

      <StyledSection id="local-practice">
        <StyledInner>
          <StyledProof>
            <div className="proof-copy">
              <span className="section-rule" aria-hidden="true" />
              <Typography variant="h2">Local property guidance starts with clear facts.</Typography>
              <Typography>
                Lyn Bactad Property Group connects buyers, sellers, property owners, and investors with assigned real estate brokers who understand La Union locations, access, property measurements, pricing, available records, and viewing requirements.
              </Typography>
              <Button href="/about" variant="text" endIcon={<ArrowUpRight size={17} />}>About the property group</Button>
            </div>

            <StyledMetrics>
              <Link href="/about">
                <span>01</span>
                <div><strong>Assigned broker support</strong><small>Property inquiries are routed to a broker who can respond with relevant local and listing information.</small></div>
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/credentials">
                <span>02</span>
                <div><strong>Business credentials</strong><small>Review public-facing business registrations, permits, training records, and affiliations.</small></div>
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/properties">
                <span>03</span>
                <div><strong>La Union property listings</strong><small>Browse land, house-and-lot, residential, commercial, and investment opportunities.</small></div>
                <ArrowUpRight size={18} />
              </Link>
            </StyledMetrics>
          </StyledProof>
        </StyledInner>
      </StyledSection>

      <StyledSection sx={{ background: '#fff' }}>
        <StyledInner>
          <StyledProcess>
            <div className="image" role="img" aria-label="Contemporary property interior" />
            <div className="process-copy">
              <SectionHeading
                title="A practical process for buying, selling, and listing property in La Union."
                description="Each inquiry begins with the property type, location, budget or asking price, intended use, and available documents. The group then coordinates the inquiry with an appropriate property broker."
              />
              <div className="steps">
                <div className="step"><span>01</span><strong>Define the requirement</strong><p>Buying, selling, investing, or preparing land, a home, or commercial property for the market.</p></div>
                <div className="step"><span>02</span><strong>Organize the property facts</strong><p>Confirm the location, access, lot and floor area, asking price, intended use, available records, and buyer questions.</p></div>
                <div className="step"><span>03</span><strong>Coordinate the next move</strong><p>Coordinate a viewing, broker response, listing presentation, document review, or property marketing plan.</p></div>
              </div>
              <Stack direction="row" sx={{ gap: 2, mt: 4, flexWrap: 'wrap' }}>
                <Button href="/services" variant="outlined">View the services</Button>
                <Button href="/contact" color="secondary">Start an inquiry</Button>
              </Stack>
            </div>
          </StyledProcess>
        </StyledInner>
      </StyledSection>

      <StyledSection>
        <StyledInner>
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 3, mb: 5 }}>
            <SectionHeading title="Featured real estate listings in La Union." description="View selected land, residential, commercial, and investment properties with prices, locations, photos, specifications, and assigned broker contact details." />
            <Button href="/properties" variant="outlined" endIcon={<ArrowUpRight size={17} />}>Browse all listings</Button>
          </Stack>
          {featured.length ? (
            <PropertyGrid properties={featured} />
          ) : (
            <Typography color="text.secondary" sx={{ py: 8, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
              Featured La Union property listings are being updated. Browse all properties or contact the group about current availability.
            </Typography>
          )}
        </StyledInner>
      </StyledSection>

      <StyledDark>
        <StyledInner>
          <div className="dark-grid">
            <span className="dark-rule" aria-hidden="true" />
            <Typography variant="h2">Strong property marketing helps buyers understand the location before a site visit.</Typography>
            <div className="dark-copy">
              <Typography>
                Professional photography, drone views, accurate property dimensions, road access notes, and clear descriptions help buyers compare La Union properties before arranging a viewing.
              </Typography>
              <Button href="/services" variant="outlined" endIcon={<ArrowUpRight size={17} />}>See the marketing approach</Button>
            </div>
          </div>
        </StyledInner>
      </StyledDark>

      <StyledSection sx={{ background: '#fff' }}>
        <StyledInner>
          <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', gap: 5, mb: 4 }}>
            <SectionHeading title="Real estate services for buyers, sellers, and property owners in La Union." />
            <Typography color="text.secondary" sx={{ maxWidth: 470, alignSelf: { lg: 'flex-end' } }}>
              Get support for property selling, buying, listing preparation, land and commercial inquiries, photography, drone coverage, and property marketing.
            </Typography>
          </Stack>
          <StyledServiceGrid>
            <Link href="/services" className="service-card service-card--primary">
              <Image
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86"
                alt="Modern home prepared for property marketing"
              />
              <div className="service-overlay" />
              <div className="service-content">
                <div>
                  <h3>Sell property with clearer listing information.</h3>
                  <p>Prepare accurate property details, photos, location context, and a direct broker inquiry path.</p>
                </div>
                <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </div>
            </Link>

            <Link href="/services" className="service-card">
              <Image
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=86"
                alt="Interior view used when comparing a property"
              />
              <div className="service-overlay" />
              <div className="service-content">
                <div>
                  <h3>Compare La Union properties with local context.</h3>
                  <p>Review location, road access, intended use, pricing, property area, and available documents.</p>
                </div>
                <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </div>
            </Link>

            <Link href="/services" className="service-card">
              <Image
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=86"
                alt="Aerial property presentation for a real estate listing"
              />
              <div className="service-overlay" />
              <div className="service-content">
                <div>
                  <h3>Market property with professional visuals.</h3>
                  <p>Use real estate photography, drone views, walkthrough video, and concise property descriptions.</p>
                </div>
                <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </div>
            </Link>
          </StyledServiceGrid>
        </StyledInner>
      </StyledSection>
    </>
  );
}
