'use client';

import { styled } from '@mui/material';

export const StyledIntro = styled('div')(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  color: '#f7f3eb',
  background: '#151714',
  pointerEvents: 'auto',
  animation: 'introFallbackHide 1ms linear 1350ms forwards',
  '@keyframes introFallbackHide': { to: { opacity: 0, visibility: 'hidden', pointerEvents: 'none' } },
  '[data-intro-seen="true"] &': { display: 'none' },
  [theme.breakpoints.down('sm')]: { paddingInline: 24 },
}));

export const StyledIntroCurtain = styled('span')({
  position: 'absolute',
  insetBlock: 0,
  width: '50.5%',
  background: '#151714',
  animation: 'introCurtain 580ms cubic-bezier(.76,0,.24,1) 540ms forwards',
  '&.intro-curtain-left': { left: 0, transformOrigin: 'left center' },
  '&.intro-curtain-right': { right: 0, transformOrigin: 'right center' },
  '@keyframes introCurtain': {
    to: { transform: 'scaleX(0)' },
  },
});

export const StyledIntroContent = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'grid',
  gridTemplateColumns: '56px minmax(56px, 140px) auto',
  alignItems: 'center',
  gap: 18,
  animation: 'introContent 820ms cubic-bezier(.22,1,.36,1) both',
  '& .intro-line': {
    height: 1,
    background: 'rgba(247,243,235,.55)',
    transformOrigin: 'left',
    animation: 'introLine 540ms cubic-bezier(.22,1,.36,1) 160ms both',
  },
  '& > div': { display: 'grid', gap: 2 },
  '& strong': { fontSize: '.78rem', letterSpacing: '.18em', textTransform: 'uppercase' },
  '& div span': { color: 'rgba(247,243,235,.62)', fontSize: '.78rem' },
  '@keyframes introContent': {
    from: { opacity: 0, transform: 'translateY(12px)' },
    '60%': { opacity: 1, transform: 'translateY(0)' },
    to: { opacity: 0, transform: 'translateY(-8px)' },
  },
  '@keyframes introLine': {
    from: { transform: 'scaleX(0)' },
    to: { transform: 'scaleX(1)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    gridTemplateColumns: '48px minmax(32px, 1fr) auto',
    gap: 12,
  },
}));

export const StyledIntroMark = styled('span')({
  width: 52,
  height: 52,
  display: 'grid',
  placeItems: 'center',
  border: '1px solid rgba(247,243,235,.58)',
  fontSize: '.83rem',
  fontWeight: 700,
  letterSpacing: '.08em',
});
