import Image from 'next/image';
import { Button } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StyledInner, StyledMedia, StyledSection, StyledServiceEditorial } from './elements';

const serviceGroups = [
  {
    title: 'Prepare a property for the market.',
    description: 'A stronger listing begins with organized information and a presentation that makes the property easier to understand before the first visit.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86',
    alt: 'Modern residential property prepared for sale',
    services: [
      ['Property selling assistance', 'Prepare listing details, property highlights, buyer-facing information, and the inquiry process.'],
      ['Listing consultation', 'Review presentation, pricing discussion, property description, and the questions buyers are likely to ask.'],
    ],
  },
  {
    title: 'Compare opportunities with context.',
    description: 'Buying decisions become clearer when location, access, practical use, price, and long-term considerations are reviewed together.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86',
    alt: 'Interior of a home being considered by a buyer',
    services: [
      ['Property buying assistance', 'Compare locations, access, property type, price considerations, and how the property may be used.'],
      ['Investment property guidance', 'Evaluate opportunities intended for long-term use, holding, income, or future development.'],
    ],
  },
  {
    title: 'Understand land and commercial potential.',
    description: 'Land and commercial property need more than a good photograph. Access, frontage, surrounding activity, and available records shape the opportunity.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=86',
    alt: 'Open land viewed from above',
    services: [
      ['Land and document readiness', 'Organize the available property information and identify which details still need confirmation.'],
      ['Commercial property marketing', 'Present business-ready lots and spaces through frontage, access points, scale, and nearby activity.'],
    ],
  },
  {
    title: 'Show the property as a place, not a thumbnail.',
    description: 'Useful media explains scale, condition, access, terrain, and surroundings so buyers can decide whether a site visit is worth taking.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1800&q=86',
    alt: 'Drone used for aerial real estate photography',
    services: [
      ['Drone and aerial presentation', 'Use aerial views to show terrain, frontage, neighboring areas, roads, and the property in context.'],
      ['Listing media preparation', 'Create photography, walkthrough video, social-ready material, and concise property copy.'],
    ],
  },
] as const;

const media = [
  ['Photography', 'Clean listing images for property pages, buyer presentations, and social posts.'],
  ['Drone coverage', 'Aerial context for lots, homes, commercial frontage, and surrounding roads.'],
  ['Walkthrough video', 'Calm video presentation for homes, spaces, and larger property locations.'],
  ['Inquiry-ready details', 'Organized property notes for buyers who are ready to ask practical questions.'],
] as const;

export function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Real estate services for clearer property decisions."
        description="Support for property owners, buyers, and investors who need organized assistance before listing, visiting, negotiating, or marketing a property."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=84"
      />

      <StyledSection>
        <StyledInner>
          <StyledServiceEditorial>
            {serviceGroups.map((group, index) => (
              <article className={index % 2 ? 'service-row service-row--reverse' : 'service-row'} key={group.title}>
                <div className="service-image">
                  <Image
                    fill
                    sizes="(max-width: 1200px) 100vw, 56vw"
                    src={group.image}
                    alt={group.alt}
                  />
                </div>
                <div className="service-copy">
                  <h2>{group.title}</h2>
                  <p className="service-intro">{group.description}</p>
                  <div className="service-list">
                    {group.services.map(([title, description]) => (
                      <div className="service-item" key={title}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>
                    ))}
                  </div>
                  <Button href="/contact" variant="text" endIcon={<ArrowUpRight size={17} />}>
                    Discuss this service
                  </Button>
                </div>
              </article>
            ))}
          </StyledServiceEditorial>
        </StyledInner>
      </StyledSection>

      <StyledSection sx={{ background: '#f1ede5' }}>
        <StyledInner>
          <StyledMedia>
            <div className="media-image">
              <Image
                fill
                sizes="(max-width: 1200px) 100vw, 56vw"
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=86"
                alt="Property photographed for a professional real estate listing"
              />
            </div>
            <div className="media-copy">
              <SectionHeading
                title="Clear visuals help serious buyers understand the property faster."
                description="Good property media reduces guesswork by showing access, scale, surroundings, condition, and location context before the first site visit."
              />
              <div className="list">
                {media.map(([title, description]) => (
                  <div className="item" key={title}>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </StyledMedia>
        </StyledInner>
      </StyledSection>
    </>
  );
}
