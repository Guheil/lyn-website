import { Typography } from '@mui/material';
import { PageHero } from '@/components/common/PageHero';
import { ContactForm } from '../ContactForm';
import { StyledGrid, StyledSection } from './elements';

export function ContactPage({ initialReference }: { initialReference?: string }) {
  return (
    <>
      <PageHero
        title="Contact a property broker in La Union."
        description="Send an inquiry about land, house-and-lot, residential, commercial, or investment property. The group will route your message to the appropriate broker."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=84"
      />
      <StyledSection>
        <StyledGrid>
          <div>
            <Typography variant="h2" sx={{ fontSize: 'clamp(2rem,4vw,4.4rem)' }}>
              Share the property details needed for a useful response.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Include the La Union location, property type, budget or asking price, preferred schedule, and whether the inquiry is for buying, selling, listing preparation, investment review, or property marketing.
            </Typography>
            <div className="details">
              <div className="detail">
                <strong>Service area</strong>
                <span>La Union, Philippines</span>
              </div>
              <div className="detail">
                <strong>Property group</strong>
                <span>Lyn Bactad Property Group</span>
              </div>
              <div className="detail">
                <strong>Inquiry routing</strong>
                <span>Messages are directed to the assigned or appropriate property broker.</span>
              </div>
            </div>
          </div>
          <ContactForm initialReference={initialReference} />
        </StyledGrid>
      </StyledSection>
    </>
  );
}
