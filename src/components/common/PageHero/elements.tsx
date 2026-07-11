'use client';

import { styled } from '@mui/material';

export const StyledHero = styled('section', {
  shouldForwardProp: (prop) => prop !== 'image' && prop !== 'minHeight',
})<{ image: string; minHeight?: number }>(({ image, minHeight = 520, theme }) => ({
  minHeight,
  display: 'flex',
  alignItems: 'flex-end',
  background: `linear-gradient(rgba(18,18,16,.22),rgba(18,18,16,.72)), url("${image}") center/cover`,
  color: '#fff',
  [theme.breakpoints.down('md')]: { minHeight: 460 },
}));

export const StyledHeroInner = styled('div')({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  margin: '0 auto',
  padding: '110px 0 64px',
  '& .hero-rule': {
    display: 'block',
    width: 72,
    height: 1,
    marginBottom: 24,
    background: '#d8bd7f',
  },
  '& h1': { maxWidth: 1050 },
  '& p': {
    maxWidth: 760,
    marginTop: 20,
    color: 'rgba(255,255,255,.8)',
    fontSize: 'clamp(1rem,1.3vw,1.14rem)',
  },
});
