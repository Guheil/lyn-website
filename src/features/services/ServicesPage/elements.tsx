'use client';

import { styled } from '@mui/material';

export const StyledSection = styled('section')({
  padding: 'clamp(72px,8vw,124px) clamp(20px,4vw,48px)',
});

export const StyledInner = styled('div')({
  maxWidth: 1440,
  margin: '0 auto',
});

export const StyledServiceEditorial = styled('div')(({ theme }) => ({
  display: 'grid',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& .service-row': {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1.05fr) minmax(390px,.95fr)',
    minHeight: 620,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .service-row--reverse': { gridTemplateColumns: 'minmax(390px,.95fr) minmax(0,1.05fr)' },
  '& .service-row--reverse .service-image': { order: 2 },
  '& .service-row--reverse .service-copy': { order: 1 },
  '& .service-image': { position: 'relative', minHeight: 620, overflow: 'hidden', background: '#dedbd4' },
  '& .service-image img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 900ms cubic-bezier(.22,1,.36,1)',
  },
  '& .service-row:hover .service-image img': { transform: 'scale(1.025)' },
  '& .service-copy': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 'clamp(42px,6vw,92px)',
  },
  '& h2': {
    maxWidth: 610,
    margin: 0,
    fontSize: 'clamp(2.35rem,4.2vw,4.7rem)',
    lineHeight: .98,
    letterSpacing: '-.05em',
  },
  '& .service-intro': {
    maxWidth: 620,
    margin: '24px 0 0',
    color: theme.palette.text.secondary,
    fontSize: '1.04rem',
    lineHeight: 1.68,
  },
  '& .service-list': { marginTop: 38, borderTop: `1px solid ${theme.palette.divider}` },
  '& .service-item': { padding: '20px 0', borderBottom: `1px solid ${theme.palette.divider}` },
  '& .service-item h3': { margin: 0, fontSize: '1.08rem', letterSpacing: '-.015em' },
  '& .service-item p': { maxWidth: 590, margin: '7px 0 0', color: theme.palette.text.secondary, fontSize: '.92rem' },
  '& .MuiButton-root': { alignSelf: 'flex-start', marginTop: 24, paddingInline: 0 },
  [theme.breakpoints.down('lg')]: {
    '& .service-row, & .service-row--reverse': { gridTemplateColumns: '1fr', minHeight: 0 },
    '& .service-row--reverse .service-image, & .service-row--reverse .service-copy': { order: 'initial' },
    '& .service-image': { minHeight: 520 },
  },
  [theme.breakpoints.down('sm')]: {
    '& .service-image': { minHeight: 390 },
    '& .service-copy': { padding: '42px 0 58px' },
    '& h2': { fontSize: 'clamp(2.25rem,11vw,3.4rem)' },
  },
}));

export const StyledMedia = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1.05fr) minmax(390px,.95fr)',
  gap: 'clamp(44px,7vw,104px)',
  alignItems: 'stretch',
  '& .media-image': { position: 'relative', minHeight: 680, overflow: 'hidden', background: '#d8d3c9' },
  '& .media-image img': { width: '100%', height: '100%', objectFit: 'cover' },
  '& .media-copy': { display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBlock: 24 },
  '& .list': { display: 'grid', marginTop: 42, borderTop: `1px solid ${theme.palette.divider}` },
  '& .item': { padding: '20px 0', borderBottom: `1px solid ${theme.palette.divider}` },
  '& .item strong': { fontSize: '1.02rem' },
  '& .item p': { maxWidth: 540, margin: '7px 0 0', color: theme.palette.text.secondary, fontSize: '.92rem' },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
    '& .media-image': { minHeight: 520 },
  },
  [theme.breakpoints.down('sm')]: { '& .media-image': { minHeight: 390 } },
}));
