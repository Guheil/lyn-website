import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Button, Stack, Typography } from '@mui/material';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import type { PublicProperty } from '@/server/modules/properties';
import {
  StyledDark,
  StyledHeroActions,
  StyledHeroContent,
  StyledHeroMedia,
  StyledHeroMeta,
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
          <div className="hero-copy">
            <Typography variant="h1">Property decisions, grounded in La Union.</Typography>
            <Typography className="hero-description">
              Broker-led guidance for land, homes, commercial properties, and serious investment inquiries, presented with clear details and local context.
            </Typography>
            <StyledHeroActions>
              <Button href="/properties" variant="contained" color="secondary" endIcon={<ArrowUpRight size={17} />}>
                Explore properties
              </Button>
              <Button href="/contact" variant="outlined">Discuss a property</Button>
            </StyledHeroActions>
          </div>

          <StyledHeroMeta>
            <Typography>Land, homes, and commercial property across La Union.</Typography>
            <a href="#local-practice">See how Lyn works<ArrowDownRight size={18} /></a>
          </StyledHeroMeta>
        </StyledHeroContent>
      </StyledVideoHero>

      <StyledSection id="local-practice">
        <StyledInner>
          <StyledProof>
            <div className="proof-copy">
              <span className="section-rule" aria-hidden="true" />
              <Typography variant="h2">Real estate should feel clear before it feels urgent.</Typography>
              <Typography>
                Lyn Bactad assists owners, buyers, and investors by organizing the facts that shape a property decision: location, access, measurements, price guidance, available records, and the next practical step.
              </Typography>
              <Button href="/about" variant="text" endIcon={<ArrowUpRight size={17} />}>Meet Lyn Bactad</Button>
            </div>

            <StyledMetrics>
              <Link href="/about">
                <span>01</span>
                <div><strong>Broker-led assistance</strong><small>Direct, locally informed support from first inquiry to the next step.</small></div>
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/credentials">
                <span>02</span>
                <div><strong>Professional verification</strong><small>Credential information presented carefully for serious clients.</small></div>
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/properties">
                <span>03</span>
                <div><strong>Property-first presentation</strong><small>Clear listing information without inflated claims or unnecessary noise.</small></div>
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
                title="A calm process for property questions that deserve careful answers."
                description="Every inquiry starts with the real requirement, not a generic sales script. The goal is to clarify what is known, what still needs verification, and what action makes sense next."
              />
              <div className="steps">
                <div className="step"><span>01</span><strong>Define the requirement</strong><p>Buying, selling, leasing, investment review, or preparing a listing for the market.</p></div>
                <div className="step"><span>02</span><strong>Organize the property facts</strong><p>Location, access, area, asking price, intended use, available records, and buyer questions.</p></div>
                <div className="step"><span>03</span><strong>Coordinate the next move</strong><p>A viewing, inquiry response, presentation, documentation review, or marketing plan.</p></div>
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
            <SectionHeading title="Featured properties, presented for informed inquiry." description="Published listings include the practical details available for public review. Additional information can be discussed directly." />
            <Button href="/properties" variant="outlined" endIcon={<ArrowUpRight size={17} />}>Browse all listings</Button>
          </Stack>
          {featured.length ? (
            <PropertyGrid properties={featured} />
          ) : (
            <Typography color="text.secondary" sx={{ py: 8, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
              Featured properties will appear here after they are published and marked as featured in the dashboard.
            </Typography>
          )}
        </StyledInner>
      </StyledSection>

      <StyledDark>
        <StyledInner>
          <div className="dark-grid">
            <span className="dark-rule" aria-hidden="true" />
            <Typography variant="h2">A strong listing lets the buyer understand the place before the visit.</Typography>
            <div className="dark-copy">
              <Typography>
                Useful photography, aerial context, accurate dimensions, access notes, and concise writing help serious buyers assess whether a property fits their needs.
              </Typography>
              <Button href="/services" variant="outlined" endIcon={<ArrowUpRight size={17} />}>See the marketing approach</Button>
            </div>
          </div>
        </StyledInner>
      </StyledDark>

      <StyledSection sx={{ background: '#fff' }}>
        <StyledInner>
          <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', gap: 5, mb: 4 }}>
            <SectionHeading title="Support built around the property decision in front of you." />
            <Typography color="text.secondary" sx={{ maxWidth: 470, alignSelf: { lg: 'flex-end' } }}>
              Choose the path that matches where you are now, whether you are preparing to sell, comparing options, or improving how a property is presented.
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
                  <h3>Sell with a clearer story.</h3>
                  <p>Organize the property facts, presentation, and inquiry path serious buyers need.</p>
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
                  <h3>Buy with useful context.</h3>
                  <p>Compare access, location, use, pricing, and the details that affect the decision.</p>
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
                  <h3>Present the property properly.</h3>
                  <p>Use photography, aerial views, video, and concise copy to reduce buyer guesswork.</p>
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
