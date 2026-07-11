import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import type { PublicProperty } from '@/server/modules/properties';
import {
  StyledDark,
  StyledHeroContent,
  StyledInner,
  StyledMetrics,
  StyledProcess,
  StyledProof,
  StyledSection,
  StyledServiceGrid,
  StyledVideoHero,
} from './elements';

export function HomePage({ featured }: { featured: PublicProperty[] }) {
  return <>
    <StyledVideoHero>
      <iframe
        src="https://www.youtube.com/embed/URUy19HnMsg?autoplay=1&mute=1&controls=0&loop=1&playlist=URUy19HnMsg&playsinline=1&modestbranding=1&rel=0"
        title="La Union aerial background"
        allow="autoplay; encrypted-media; picture-in-picture"
      />
      <StyledHeroContent>
        <Typography variant="overline" sx={{ color: '#d8bd7f' }}>San Fernando, La Union</Typography>
        <Typography variant="h1" sx={{ fontSize: 'clamp(3rem,7vw,7.4rem)', color: '#fff', my: 2 }}>La Union Real Estate</Typography>
        <Typography>Listings, brokerage assistance, and property marketing led by Lyn Bactad.</Typography>
      </StyledHeroContent>
    </StyledVideoHero>

    <StyledSection>
      <StyledInner>
        <StyledProof>
          <div>
            <Typography variant="overline" sx={{ color: '#d8bd7f' }}>Trusted local practice</Typography>
            <Typography variant="h2" sx={{ fontSize: 'clamp(2rem,4vw,4rem)', my: 2 }}>Broker-led real estate assistance in La Union.</Typography>
            <Typography>Property listings, client inquiries, and listing presentation handled with clear information and local market familiarity.</Typography>
          </div>
          <StyledMetrics>
            <Link href="/about"><span>01</span><strong>Company-led</strong><small>EOFB Realty / J33 INT&apos;L Trading &amp; Dev. Corp.</small></Link>
            <Link href="/credentials"><span>02</span><strong>Credential ready</strong><small>Professional records for client review.</small></Link>
            <Link href="/properties"><span>03</span><strong>Listing focused</strong><small>Land, homes, commercial, and investment properties.</small></Link>
          </StyledMetrics>
        </StyledProof>
      </StyledInner>
    </StyledSection>

    <StyledSection sx={{ background: '#fff' }}>
      <StyledInner>
        <StyledProcess>
          <div className="image" />
          <div>
            <SectionHeading
              label="How we help"
              title="Real estate assistance that keeps the next step clear."
              description="Lyn Bactad assists property owners, buyers, and investors with listing preparation, property inquiries, site-visit coordination, and practical review of available property details."
            />
            <div className="steps">
              <div className="step"><span>01</span><strong>Understand the requirement</strong><p>Buying, selling, leasing, investment review, or listing preparation.</p></div>
              <div className="step"><span>02</span><strong>Review property information</strong><p>Location, access, lot area, price guidance, available documents, and buyer questions.</p></div>
              <div className="step"><span>03</span><strong>Coordinate the next step</strong><p>Move toward a viewing, presentation, inquiry response, or document review.</p></div>
            </div>
            <Stack direction="row" sx={{ gap: 2, mt: 4, flexWrap: 'wrap' }}>
              <Button href="/about" variant="outlined">Read Lyn&apos;s profile</Button>
              <Button href="/contact">Send an inquiry</Button>
            </Stack>
          </div>
        </StyledProcess>
      </StyledInner>
    </StyledSection>

    <StyledSection>
      <StyledInner>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 3, mb: 5 }}>
          <SectionHeading label="Featured listings" title="Property opportunities currently presented for inquiry." />
          <Button href="/properties" variant="outlined">Browse listings</Button>
        </Stack>
        {featured.length ? <PropertyGrid properties={featured} /> : <Typography color="text.secondary">Featured properties will appear here after they are published and marked as featured in the dashboard.</Typography>}
      </StyledInner>
    </StyledSection>

    <StyledDark>
      <StyledInner>
        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: 8, justifyContent: 'space-between' }}>
          <Typography variant="h2" sx={{ fontSize: 'clamp(2rem,4vw,4.5rem)', maxWidth: 720, color: '#fff' }}>Listings are stronger when buyers can understand the property before the visit.</Typography>
          <Stack sx={{ maxWidth: 560, alignItems: 'flex-start' }}>
            <Typography>Professional presentation can include photography, aerial views, walkthroughs, location notes, and concise property details.</Typography>
            <Button href="/services" variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.45)', mt: 2 }}>View services</Button>
          </Stack>
        </Stack>
      </StyledInner>
    </StyledDark>

    <StyledSection sx={{ background: '#fff' }}>
      <StyledInner>
        <SectionHeading centered label="Services" title="Support for property owners, buyers, and investors." />
        <StyledServiceGrid>
          <article><span>01</span><h3>Sell a property</h3><p>Listing preparation, buyer-facing presentation, and inquiry handling.</p></article>
          <article><span>02</span><h3>Buy a property</h3><p>Guidance when comparing locations, access, pricing, and practical use.</p></article>
          <article><span>03</span><h3>Market a listing</h3><p>Photography, drone views, walkthroughs, and clear listing copy.</p></article>
        </StyledServiceGrid>
      </StyledInner>
    </StyledSection>
  </>;
}
