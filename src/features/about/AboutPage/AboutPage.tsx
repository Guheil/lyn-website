import { Button, Typography } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StyledBento, StyledInner, StyledProfile, StyledSection } from './elements';

export function AboutPage() {
  const cards = [
    [
      'Ownership',
      'Lyn Bactad Property Group',
      'Locally led real estate operations for property owners, buyers, sellers, and investors in La Union.',
    ],
    [
      'Broker coordination',
      'Assigned property brokers',
      'Listing and buyer inquiries are routed to an appropriate broker with direct contact details on each property page.',
    ],
    [
      'Business',
      "EOFB Realty / J33 INT'L Trading & Dev. Corp.",
      'Property-related business operations, client coordination, and marketing support.',
    ],
    [
      'Property services',
      'Buying, selling, and listing support',
      'Assistance with property inquiries, listing preparation, viewings, presentation, and broker communication.',
    ],
    [
      'Local focus',
      'La Union, Philippines',
      'Land, house-and-lot, residential, commercial, and investment property opportunities across the province.',
    ],
    [
      'Public records',
      'Business credentials and registrations',
      'Public-facing business documents, permits, training records, and professional affiliations are available for review.',
    ],
  ];

  return (
    <>
      <PageHero
        title="A locally led property group serving La Union."
        description="Lyn Bactad Property Group coordinates property listings, client inquiries, assigned brokers, and real estate marketing for buyers, sellers, owners, and investors across La Union."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=84"
      />

      <StyledSection>
        <StyledInner>
          <StyledProfile>
            <div className="photo" role="img" aria-label="Lyn Bactad Property Group in La Union" />
            <div>
              <Typography variant="h2" sx={{ fontSize: 'clamp(2.2rem,4vw,4.5rem)' }}>
                Lyn Bactad
              </Typography>
              <Typography color="primary.dark" sx={{ fontWeight: 700, mt: 1 }}>
                Property group owner and business manager
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 3 }}>
                Lyn Bactad leads the property group and oversees client coordination, property presentation, business operations, and inquiry routing for real estate opportunities in La Union.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Property-specific inquiries are handled by assigned brokers. Their names, service areas, mobile numbers, email addresses, and available contact channels appear on the relevant property detail pages.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                The group supports property owners preparing to sell, buyers comparing locations, investors reviewing land or commercial opportunities, and clients who need clearer listing media and property information.
              </Typography>
              <Button href="/credentials" endIcon={<ArrowUpRight size={17} />} sx={{ mt: 3, px: 0 }}>
                Review business credentials
              </Button>
            </div>
          </StyledProfile>
        </StyledInner>
      </StyledSection>

      <StyledSection sx={{ background: '#fff' }}>
        <StyledInner>
          <SectionHeading title="Property leadership, broker coordination, and local real estate support." />
          <StyledBento>
            {cards.map(([label, title, body]) => (
              <article key={title}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </StyledBento>
        </StyledInner>
      </StyledSection>
    </>
  );
}
