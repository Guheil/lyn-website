import { Button, Typography } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StyledBento, StyledInner, StyledProfile, StyledSection } from './elements';

export function AboutPage() {
  const cards = [
    ['Real estate', 'Broker / Salesperson', 'Assistance for clients preparing to sell, buy, market, or evaluate property opportunities.'],
    ['Company', "EOFB Realty / J33 INT'L Trading & Dev. Corp.", 'Owner, Manager, and CEO.'],
    ['Leadership', 'NREA La Union Chapter', 'President and active member of the local real estate community.'],
    ['Community', 'SFC Multipurpose Credit Coop', 'Vice Chairman.'],
    ['Former role', 'Legal Officer IV', 'NCIP Region I, San Fernando City.'],
    ['Education', 'University of the Philippines', 'With additional education reference from DMMMSU-MLUC College of Law.'],
  ];

  return (
    <>
      <PageHero
        label="About Lyn"
        title="Real estate service led by local experience and careful client assistance."
        description="Lyn Bactad leads EOFB Realty / J33 INT'L Trading & Dev. Corp. and assists clients with property selling, buying, listing, and consultation in La Union."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=84"
      />
      <StyledSection>
        <StyledInner>
          <StyledProfile>
            <div className="photo" />
            <div>
              <Typography variant="h2" sx={{ fontSize: 'clamp(2.2rem,4vw,4.5rem)' }}>Lyn Bactad</Typography>
              <Typography color="primary.dark" sx={{ fontWeight: 700, mt: 1 }}>
                Owner / Manager / CEO, EOFB Realty / J33 INT&apos;L Trading &amp; Dev. Corp.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 3 }}>
                Lyn Bactad is a real estate broker/salesperson and the owner, manager, and CEO of EOFB Realty / J33 INT&apos;L Trading &amp; Dev. Corp. Her work supports clients who are selling, buying, listing, or evaluating property opportunities in La Union.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Her professional profile includes leadership in the local real estate community as President of the NREA La Union Chapter, along with service as Vice Chairman of SFC Multipurpose Credit Coop.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Her previous work as Legal Officer IV at NCIP Region I in San Fernando City adds valuable familiarity with land-related processes and documentation concerns. Real estate assistance on this website is presented as brokerage and client guidance, not legal advice.
              </Typography>
              <Button href="/credentials" endIcon={<ArrowUpRight size={17} />} sx={{ mt: 3, px: 0 }}>
                Review public credentials
              </Button>
            </div>
          </StyledProfile>
        </StyledInner>
      </StyledSection>
      <StyledSection sx={{ background: '#fff' }}>
        <StyledInner>
          <SectionHeading label="Professional background" title="Experience across real estate, leadership, and documentation-aware service." />
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
