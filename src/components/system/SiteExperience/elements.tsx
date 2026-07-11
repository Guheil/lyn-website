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
  background: '#11130f',
  pointerEvents: 'auto',
  clipPath: 'inset(0 0 0 0)',
  animation: [
    'introImageExit 620ms cubic-bezier(.76,0,.24,1) 790ms forwards',
    'introFallbackHide 1ms linear 1650ms forwards',
  ].join(','),
  willChange: 'clip-path, visibility',
  '@keyframes introImageExit': {
    to: { clipPath: 'inset(0 0 100% 0)' },
  },
  '@keyframes introFallbackHide': {
    to: { opacity: 0, visibility: 'hidden', pointerEvents: 'none' },
  },
  '[data-intro-seen="true"] &': { display: 'none' },
  [theme.breakpoints.down('sm')]: {
    paddingInline: 18,
  },
}));

export const StyledIntroStage = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'min(1180px, calc(100vw - 80px))',
  height: 'min(68vh, 680px)',
  display: 'grid',
  gridTemplateColumns: 'minmax(0,.78fr) minmax(0,1.18fr) minmax(0,.78fr)',
  gap: 12,
  alignItems: 'stretch',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -22,
    border: '1px solid rgba(247,243,235,.14)',
    opacity: 0,
    animation: 'introFrame 520ms cubic-bezier(.22,1,.36,1) 110ms forwards',
  },
  '@keyframes introFrame': {
    from: { opacity: 0, transform: 'scale(.985)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  [theme.breakpoints.down('md')]: {
    width: 'min(820px, calc(100vw - 48px))',
    height: 'min(64vh, 580px)',
    gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.1fr)',
    '& .intro-image-3': { display: 'none' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'min(62vh, 500px)',
    gap: 8,
    '&::before': { inset: -10 },
  },
}));

export const StyledIntroPanel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'image',
})<{ image: string }>(({ image, theme }) => ({
  position: 'relative',
  minWidth: 0,
  overflow: 'hidden',
  background: `linear-gradient(rgba(10,11,9,.08), rgba(10,11,9,.24)), url("${image}") center/cover, #292c25`,
  clipPath: 'inset(100% 0 0 0)',
  transform: 'translateY(18px) scale(1.035)',
  animation: 'introPanelReveal 660ms cubic-bezier(.22,1,.36,1) forwards',
  willChange: 'clip-path, transform',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(6,7,6,.06) 0%, rgba(6,7,6,.32) 100%)',
  },
  '&.intro-image-1': {
    animationDelay: '20ms',
    backgroundPosition: '44% center',
  },
  '&.intro-image-2': {
    animationDelay: '100ms',
    transform: 'translateY(-14px) scale(1.045)',
  },
  '&.intro-image-3': {
    animationDelay: '180ms',
    backgroundPosition: '58% center',
  },
  '@keyframes introPanelReveal': {
    to: {
      clipPath: 'inset(0 0 0 0)',
      transform: 'translateY(0) scale(1)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '&.intro-image-1': { backgroundPosition: '52% center' },
    '&.intro-image-2': { backgroundPosition: '55% center' },
  },
}));

export const StyledIntroIdentity = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 28,
  right: 28,
  bottom: 26,
  zIndex: 3,
  display: 'grid',
  gridTemplateColumns: 'auto minmax(70px, 1fr)',
  alignItems: 'center',
  gap: 18,
  opacity: 0,
  transform: 'translateY(10px)',
  animation: 'introIdentity 520ms cubic-bezier(.22,1,.36,1) 330ms forwards',
  '& strong': {
    color: '#fff',
    fontSize: 'clamp(.82rem,1vw,.98rem)',
    letterSpacing: '.12em',
    textTransform: 'uppercase',
  },
  '& span': {
    height: 1,
    background: 'rgba(255,255,255,.58)',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    animation: 'introIdentityLine 430ms cubic-bezier(.22,1,.36,1) 420ms forwards',
  },
  '@keyframes introIdentity': {
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes introIdentityLine': {
    to: { transform: 'scaleX(1)' },
  },
  [theme.breakpoints.down('sm')]: {
    left: 18,
    right: 18,
    bottom: 18,
    gap: 12,
  },
}));
