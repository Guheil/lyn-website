'use client';

import { styled } from '@mui/material';

export const StyledInner = styled('div')({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  margin: '0 auto',
  '@media (max-width: 600px)': {
    width: 'calc(100% - 48px)',
  },
});

export const StyledCredentialsIntro = styled('section')(({ theme }) => ({
  padding: 'clamp(86px,10vw,154px) 0 clamp(58px,7vw,100px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
  '& .intro-rule': {
    display: 'block',
    width: 76,
    height: 1,
    marginBottom: 28,
    background: theme.palette.primary.main,
  },
  '& h1': {
    maxWidth: 980,
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem,7vw,7rem)',
    fontWeight: 440,
    lineHeight: 0.94,
    letterSpacing: '-.055em',
  },
  '& p': {
    maxWidth: 720,
    margin: '28px 0 0',
    color: theme.palette.text.secondary,
    fontSize: 'clamp(1rem,1.35vw,1.16rem)',
    lineHeight: 1.75,
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: 72,
    '& h1': { fontSize: 'clamp(2.75rem,14vw,4.4rem)', lineHeight: 0.98 },
    '& p': { marginTop: 22 },
  },
}));

export const StyledSection = styled('section')({
  padding: 'clamp(64px,8vw,124px) 0',
  overflow: 'clip',
});

export const StyledCredentialsNote = styled('div')(({ theme }) => ({
  maxWidth: 760,
  display: 'grid',
  gridTemplateColumns: '180px minmax(0,1fr)',
  gap: 24,
  paddingTop: 16,
  marginBottom: 'clamp(42px,6vw,76px)',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& strong': { fontSize: '.92rem' },
  '& p': { margin: 0, color: theme.palette.text.secondary, lineHeight: 1.7 },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: 8,
  },
}));

export const StyledCredentialGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
  gap: 'clamp(28px,4vw,58px) clamp(18px,2.4vw,34px)',
  alignItems: 'start',
  '& figure': {
    minWidth: 0,
    margin: 0,
  },
  '& figure.portrait-large': { gridColumn: 'span 7' },
  '& figure.portrait': { gridColumn: 'span 5' },
  '& figure.landscape': { gridColumn: '2 / span 8' },
  '& .credential-image-button': {
    position: 'relative',
    width: '100%',
    display: 'block',
    padding: 0,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    background: '#e8e2d5',
    color: '#fff',
    cursor: 'zoom-in',
  },
  '& .credential-image-button img': {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    transition: 'transform 440ms cubic-bezier(.22,1,.36,1)',
  },
  '& .credential-image-button:hover img': { transform: 'scale(1.012)' },
  '& .inspect-label': {
    position: 'absolute',
    right: 14,
    bottom: 14,
    padding: '10px 12px',
    background: 'rgba(17,17,15,.76)',
    color: '#fff',
    fontSize: '.76rem',
    letterSpacing: '.03em',
    backdropFilter: 'blur(8px)',
  },
  '& figcaption': {
    display: 'grid',
    gap: 5,
    paddingTop: 16,
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: 14,
  },
  '& figcaption h2': { margin: 0, fontSize: 'clamp(1.25rem,1.7vw,1.75rem)', lineHeight: 1.2 },
  '& figcaption p': { margin: 0, color: theme.palette.text.secondary },
  '& figcaption span': { marginTop: 6, color: theme.palette.primary.dark, fontWeight: 700, fontSize: '.82rem' },
  '& figcaption small': { color: theme.palette.text.secondary, fontSize: '.78rem', lineHeight: 1.5 },
  [theme.breakpoints.down('md')]: {
    '& figure.portrait-large, & figure.portrait': { gridColumn: 'span 6' },
    '& figure.landscape': { gridColumn: '1 / -1' },
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: 44,
    '& figure.portrait-large, & figure.portrait, & figure.landscape': { gridColumn: '1' },
    '& .inspect-label': { minHeight: 44, display: 'grid', placeItems: 'center' },
  },
}));

export const StyledCredentialLightbox = styled('div')(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: 1200,
  display: 'grid',
  gridTemplateColumns: '64px minmax(0,1fr) 64px',
  alignItems: 'center',
  gap: 18,
  padding: 'max(24px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(24px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left))',
  background: 'rgba(12,12,11,.94)',
  backdropFilter: 'blur(12px)',
  animation: 'credentialLightboxIn 220ms ease both',
  '@keyframes credentialLightboxIn': { from: { opacity: 0 }, to: { opacity: 1 } },
  '& > button': {
    width: 52,
    height: 52,
    display: 'grid',
    placeItems: 'center',
    padding: 0,
    border: '1px solid rgba(255,255,255,.34)',
    borderRadius: 0,
    background: 'rgba(0,0,0,.26)',
    color: '#fff',
    cursor: 'pointer',
  },
  '& .close': {
    position: 'absolute',
    top: 'max(20px, env(safe-area-inset-top))',
    right: 'max(20px, env(safe-area-inset-right))',
    zIndex: 2,
  },
  '& .previous': { gridColumn: 1 },
  '& .next': { gridColumn: 3 },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'minmax(0,1fr) 56px',
    gap: 12,
    padding: 'max(72px, calc(env(safe-area-inset-top) + 60px)) 16px max(16px, env(safe-area-inset-bottom))',
    '& .previous, & .next': {
      position: 'absolute',
      bottom: 'max(14px, env(safe-area-inset-bottom))',
    },
    '& .previous': { left: 16 },
    '& .next': { right: 16 },
  },
}));

export const StyledCredentialLightboxImage = styled('div')(({ theme }) => ({
  gridColumn: 2,
  minWidth: 0,
  maxHeight: 'calc(100svh - 68px)',
  display: 'grid',
  gridTemplateRows: 'minmax(0,1fr) auto',
  justifyItems: 'center',
  gap: 14,
  '& img': {
    maxWidth: '100%',
    maxHeight: 'calc(100svh - 150px)',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    background: '#eee8dc',
  },
  '& .lightbox-caption': {
    width: 'min(760px,100%)',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '4px 20px',
    color: '#fff',
  },
  '& .lightbox-caption strong': { fontSize: '1rem' },
  '& .lightbox-caption span': { gridColumn: 1, color: 'rgba(255,255,255,.68)', fontSize: '.86rem' },
  '& .lightbox-caption small': { gridColumn: 2, gridRow: '1 / span 2', alignSelf: 'center', color: 'rgba(255,255,255,.68)' },
  [theme.breakpoints.down('sm')]: {
    gridColumn: 1,
    maxHeight: 'calc(100svh - 142px)',
    '& img': { maxHeight: 'calc(100svh - 222px)' },
    '& .lightbox-caption': { gridTemplateColumns: '1fr', paddingInline: 4 },
    '& .lightbox-caption small': { gridColumn: 1, gridRow: 'auto' },
  },
}));
