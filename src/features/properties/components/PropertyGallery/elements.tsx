'use client';
import { styled } from '@mui/material';

export const StyledGallery = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1fr) 122px',
  gap: 14,
  alignItems: 'stretch',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const StyledMainImage = styled('div', { shouldForwardProp: (prop) => prop !== 'image' })<{ image: string }>(
  ({ image, theme }) => ({
    minHeight: 640,
    background: `url("${image}") center/cover, #d8d0c2`,
    [theme.breakpoints.down('lg')]: { minHeight: 560 },
    [theme.breakpoints.down('md')]: { minHeight: 420 },
    [theme.breakpoints.down('sm')]: { minHeight: 300 },
  }),
);

export const StyledThumbRail = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'repeat(5, minmax(0, 1fr))',
  gap: 12,
  [theme.breakpoints.down('md')]: {
    gridTemplateRows: 'unset',
    gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))',
    overflowX: 'auto',
    paddingBottom: 4,
    scrollSnapType: 'x proximity',
    overscrollBehaviorInline: 'contain',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
}));

export const StyledThumb = styled('button', {
  shouldForwardProp: (prop) => prop !== 'image' && prop !== 'active',
})<{ image: string; active: boolean }>(({ image, active, theme }) => ({
  minHeight: 112,
  border: `1px solid ${active ? theme.palette.common.black : theme.palette.divider}`,
  padding: 0,
  background: `url("${image}") center/cover, #d8d0c2`,
  cursor: 'pointer',
  scrollSnapAlign: 'start',
  opacity: active ? 1 : 0.72,
  transition: 'opacity 180ms ease, transform 180ms ease, border-color 180ms ease',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 90,
    minWidth: 92,
  },
}));
