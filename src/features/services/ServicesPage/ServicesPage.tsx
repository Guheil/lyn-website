import Image from 'next/image';
import { Button } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StyledInner, StyledMedia, StyledSection, StyledServiceEditorial } from './elements';

const serviceGroups = [
  {
    title: 'Prepare property listings for the La Union market.',
    description: 'Effective property selling starts with accurate listing details, clear photography, useful location context, and a direct path for buyer inquiries.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86',
    alt: 'Modern residential property prepared for sale',
    services: [
      ['Property selling assistance', 'Organize the location, lot and floor area, asking price, property features, available documents, and buyer inquiry process.'],
      ['Listing consultation', 'Review the listing presentation, asking price context, property description, photographs, and common buyer questions.'],
    ],
  },
  {
    title: 'Compare homes and investment properties with local context.',
    description: 'Property buyers and investors can compare location, road access, intended use, asking price, property area, and long-term considerations before arranging a viewing.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86',
    alt: 'Interior of a home being considered by a buyer',
    services: [
      ['Property buying assistance', 'Compare La Union locations, access, property type, asking price, available features, and intended use.'],
      ['Investment property guidance', 'Review properties intended for long-term ownership, rental income, business use, land holding, or future development.'],
    ],
  },
  {
    title: 'Evaluate land and commercial property in La Union.',
    description: 'Land and commercial real estate require clear information about road access, frontage, lot area, nearby activity, utilities, zoning context, and available property records.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=86',
    alt: 'Open land viewed from above',
    services: [
      ['Land and document readiness', 'Organize lot area, access, boundaries, utilities, intended use, and the documents available for broker and buyer review.'],
      ['Commercial property marketing', 'Market commercial lots and spaces using frontage, access points, floor or lot area, surrounding businesses, and transport connections.'],
    ],
  },
  {
    title: 'Use professional property photography, drone views, and video.',
    description: 'Real estate photography and aerial media show property scale, condition, access, terrain, nearby roads, and surroundings before a buyer schedules a site visit.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1800&q=86',
    alt: 'Drone used for aerial real estate photography',
    services: [
      ['Drone and aerial presentation', 'Use drone photography and aerial video to show terrain, frontage, neighboring properties, roads, and the wider La Union location.'],
      ['Listing media preparation', 'Prepare listing photography, walkthrough video, social media materials, and clear property descriptions for online marketing.'],
    ],
  },
] as const;

const media = [
  ['Photography', 'High-quality real estate photographs for property pages, buyer presentations, and social media marketing.'],
  ['Drone coverage', 'Drone photography and video for land, homes, commercial frontage, terrain, and surrounding roads.'],
  ['Walkthrough video', 'Walkthrough video for houses, interiors, commercial spaces, land, and larger property locations.'],
  ['Inquiry-ready details', 'Organized listing facts, features, measurements, pricing, and broker contact details for serious property inquiries.'],
] as const;

export function ServicesPage() {
  return (
    <>
      <PageHero
        title="Real estate services for property buyers, sellers, and owners in La Union."
        description="Property selling, buying assistance, listing preparation, land and commercial support, photography, drone coverage, and real estate marketing across La Union."
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
                title="Professional property media helps buyers evaluate a listing before the site visit."
                description="Clear photography, aerial views, walkthrough video, and accurate listing details help buyers understand access, scale, condition, surroundings, and location context."
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
