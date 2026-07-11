import { Typography } from '@mui/material';
import type { PageHeroProps } from './interface';
import { StyledHero, StyledHeroInner } from './elements';

export function PageHero({ title, description, label, image, minHeight }: PageHeroProps) {
  return (
    <StyledHero image={image} minHeight={minHeight}>
      <StyledHeroInner>
        {label && <span className="hero-rule" aria-hidden="true" />}
        <Typography variant="h1" sx={{ fontSize: 'clamp(2.8rem,6.5vw,7rem)', color: '#fff' }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </StyledHeroInner>
    </StyledHero>
  );
}
