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
  [theme.breakpoints.down('sm')]: { minHeight: 410 },
}));

export const StyledHeroInner = styled('div')(({ theme }) => ({
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
  '& h1': { maxWidth: 1050, overflowWrap: 'anywhere' },
  '& p': {
    maxWidth: 760,
    marginTop: 20,
    color: 'rgba(255,255,255,.8)',
    fontSize: 'clamp(1rem,1.3vw,1.14rem)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 40px)',
    padding: '96px 0 44px',
    '& h1': { fontSize: 'clamp(2.45rem,13vw,4rem) !important', lineHeight: 1 },
    '& p': { marginTop: 16, fontSize: '1rem' },
  },
}));
