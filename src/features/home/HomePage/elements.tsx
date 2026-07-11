'use client';

import { styled } from '@mui/material';

export const StyledVideoHero = styled('section')(({ theme }) => ({
  position: 'relative',
  minHeight: '100svh',
  overflow: 'hidden',
  background: '#191a17',
  color: '#fff',
  isolation: 'isolate',
  [theme.breakpoints.down('md')]: { minHeight: 'max(680px, 100svh)' },
  [theme.breakpoints.down('sm')]: { minHeight: 'max(620px, 100svh)' },
}));

export const StyledHeroMedia = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: -2,
  overflow: 'hidden',
  background: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88") center/cover no-repeat',
  transition: 'transform 900ms cubic-bezier(.22,1,.36,1)',
  '& iframe': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '56.25vw',
    minWidth: '177.78vh',
    minHeight: '100vh',
    transform: 'translate(-50%,-50%) scale(1.42)',
    transformOrigin: 'center',
    border: 0,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: [
      'linear-gradient(180deg, rgba(8,9,8,.48) 0%, rgba(8,9,8,.06) 28%, rgba(8,9,8,.08) 58%, rgba(8,9,8,.76) 100%)',
      'linear-gradient(90deg, rgba(8,9,8,.28) 0%, rgba(8,9,8,.05) 48%, rgba(8,9,8,.12) 100%)',
    ].join(','),
  },
  [theme.breakpoints.down('md')]: {
    '& iframe': {
      width: '100vw',
      height: '56.25vw',
      minWidth: '177.78vh',
      minHeight: '100%',
      transform: 'translate(-50%,-50%) scale(1.58)',
    },
    '&::after': {
      background: 'linear-gradient(180deg, rgba(8,9,8,.52) 0%, rgba(8,9,8,.08) 35%, rgba(8,9,8,.18) 58%, rgba(8,9,8,.86) 100%)',
    },
  },
}));

export const StyledHeroContent = styled('div')(({ theme }) => ({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  minHeight: '100svh',
  margin: '0 auto',
  padding: 'clamp(140px,16vh,188px) 0 clamp(34px,5vh,64px)',
  display: 'flex',
  alignItems: 'flex-end',
  '& .hero-statement': {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) minmax(270px,360px)',
    alignItems: 'end',
    gap: 'clamp(44px,8vw,130px)',
    paddingTop: 'clamp(24px,3vw,40px)',
    borderTop: '1px solid rgba(255,255,255,.34)',
  },
  '& h1': {
    maxWidth: 650,
    margin: 0,
    color: '#fff',
    fontSize: 'clamp(3.7rem,6.1vw,6.4rem)',
    letterSpacing: '-.055em',
  },
  '& .hero-aside': {
    display: 'grid',
    justifyItems: 'start',
    gap: 18,
    paddingBottom: 8,
  },
  '& .hero-aside p': {
    maxWidth: 330,
    margin: 0,
    color: 'rgba(255,255,255,.78)',
    fontSize: 'clamp(.98rem,1.2vw,1.12rem)',
    lineHeight: 1.55,
  },
  '& .hero-aside .MuiButton-root': {
    minHeight: 0,
    padding: '0 0 7px',
    color: '#fff',
    borderBottom: '1px solid rgba(255,255,255,.62)',
    '& svg': { transition: 'transform 220ms ease' },
    '&:hover': {
      background: 'transparent',
      borderColor: '#fff',
      '& svg': { transform: 'translate(3px,-3px)' },
    },
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'max(680px, 100svh)',
    paddingTop: 120,
    '& .hero-statement': {
      gridTemplateColumns: '1fr',
      gap: 28,
    },
    '& h1': { maxWidth: 540 },
    '& .hero-aside': { paddingBottom: 0 },
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 40px)',
    minHeight: 'max(620px, 100svh)',
    paddingTop: 108,
    paddingBottom: 'max(28px, env(safe-area-inset-bottom))',
    '& h1': { fontSize: 'clamp(3rem,14vw,4.2rem)', overflowWrap: 'anywhere' },
    '& .hero-statement': { gap: 22 },
    '& .hero-aside': { gap: 14 },
  },
}));

export const StyledSection = styled('section')(({ theme }) => ({
  padding: 'clamp(78px,9vw,138px) clamp(20px,4vw,48px)',
  background: theme.palette.background.default,
}));

export const StyledInner = styled('div')({ maxWidth: 1440, margin: '0 auto' });

export const StyledProof = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,.95fr) minmax(0,1.05fr)',
  gap: 'clamp(60px,10vw,150px)',
  alignItems: 'start',
  '& .section-rule': {
    display: 'block',
    width: 74,
    height: 1,
    marginBottom: 28,
    background: theme.palette.primary.dark,
  },
  '& .proof-copy h2': { margin: '0 0 24px', fontSize: 'clamp(2.6rem,5vw,5.4rem)', maxWidth: 720 },
  '& .proof-copy p': { maxWidth: 660, color: theme.palette.text.secondary, fontSize: '1.05rem' },
  '& .proof-copy .MuiButton-root': { marginTop: 24, paddingInline: 0 },
  [theme.breakpoints.down('lg')]: { gridTemplateColumns: '1fr', gap: 56 },
}));

export const StyledMetrics = styled('div')(({ theme }) => ({
  display: 'grid',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& a': {
    minHeight: 142,
    display: 'grid',
    gridTemplateColumns: '48px 1fr auto',
    alignItems: 'center',
    gap: 18,
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: 'padding 220ms ease, color 220ms ease',
    '& > span': { color: theme.palette.primary.dark, fontSize: '.72rem', letterSpacing: '.1em' },
    '& > div': { display: 'grid', gap: 7 },
    '& strong': { fontSize: 'clamp(1.15rem,1.5vw,1.35rem)' },
    '& small': { maxWidth: 440, color: theme.palette.text.secondary, fontSize: '.87rem', lineHeight: 1.55 },
    '& svg': { transition: 'transform 220ms ease' },
    '&:hover': { paddingLeft: 12, color: theme.palette.primary.dark },
    '&:hover svg': { transform: 'translate(3px,-3px)' },
  },
  [theme.breakpoints.down('sm')]: {
    '& a': { gridTemplateColumns: '34px 1fr auto', minHeight: 122, gap: 10 },
    '& small': { display: 'none' },
  },
}));

export const StyledProcess = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,.92fr) minmax(0,1.08fr)',
  gap: 'clamp(48px,8vw,120px)',
  alignItems: 'center',
  '& .image': {
    minHeight: 690,
    background: 'linear-gradient(rgba(28,29,26,.06),rgba(28,29,26,.12)), url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86") center/cover',
  },
  '& .process-copy': { paddingBlock: 18 },
  '& .steps': { display: 'grid', marginTop: 34 },
  '& .step': {
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
    gap: 12,
    padding: '22px 0',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& .step:last-child': { borderBottom: `1px solid ${theme.palette.divider}` },
  '& .step span': { color: theme.palette.primary.dark, fontSize: '.72rem', letterSpacing: '.1em' },
  '& .step strong': { fontSize: '1.05rem' },
  '& .step p': { gridColumn: 2, margin: 0, maxWidth: 550, color: theme.palette.text.secondary },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
    '& .image': { minHeight: 520 },
  },
  [theme.breakpoints.down('sm')]: {
    '& .image': { minHeight: 340 },
    '& .step': { gridTemplateColumns: '38px 1fr', padding: '19px 0' },
  },
}));

export const StyledDark = styled('section')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: 'clamp(92px,12vw,172px) clamp(20px,4vw,48px)',
  background: '#171915',
  color: '#fff',
  isolation: 'isolate',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -2,
    background: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=86") center/cover',
    opacity: .3,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background: 'linear-gradient(90deg, rgba(15,17,14,.97) 0%, rgba(15,17,14,.83) 55%, rgba(15,17,14,.28) 100%)',
  },
  '& .dark-grid': { display: 'grid', gridTemplateColumns: '150px minmax(0,1.5fr) minmax(300px,.65fr)', gap: 'clamp(30px,6vw,90px)', alignItems: 'start' },
  '& .dark-rule': { width: 74, height: 1, marginTop: 22, background: '#d8c79f' },
  '& h2': { margin: 0, maxWidth: 800, color: '#fff', fontSize: 'clamp(2.7rem,5vw,5.6rem)' },
  '& .dark-copy': { paddingTop: 10 },
  '& .dark-copy p': { color: 'rgba(255,255,255,.7)', fontSize: '1.02rem' },
  '& .dark-copy .MuiButton-root': { marginTop: 25, color: '#fff', borderColor: 'rgba(255,255,255,.45)' },
  [theme.breakpoints.down('lg')]: {
    '& .dark-grid': { gridTemplateColumns: '1fr' },
    '& .dark-rule': { marginTop: 0 },
    '& .dark-copy': { maxWidth: 620 },
  },
  [theme.breakpoints.down('sm')]: {
    '& h2': { fontSize: 'clamp(2.35rem,12vw,3.7rem)' },
  },
}));

export const StyledServiceGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1.35fr) minmax(340px,.65fr)',
  gridTemplateRows: 'repeat(2, minmax(270px, 1fr))',
  gap: 16,
  minHeight: 680,
  '& .service-card': {
    position: 'relative',
    minHeight: 0,
    overflow: 'hidden',
    background: '#20221e',
    color: '#fff',
    isolation: 'isolate',
  },
  '& .service-card--primary': { gridRow: '1 / span 2' },
  '& img': {
    position: 'absolute',
    inset: 0,
    zIndex: -2,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 800ms cubic-bezier(.22,1,.36,1)',
  },
  '& .service-overlay': {
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background: 'linear-gradient(180deg, rgba(12,13,11,.03) 25%, rgba(12,13,11,.83) 100%)',
    transition: 'background 300ms ease',
  },
  '& .service-content': {
    position: 'absolute',
    inset: 'auto 0 0',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 28,
    padding: 'clamp(24px,3vw,44px)',
  },
  '& h3': {
    maxWidth: 560,
    margin: 0,
    color: '#fff',
    fontSize: 'clamp(1.65rem,2.8vw,3.15rem)',
    lineHeight: 1.02,
    letterSpacing: '-.04em',
  },
  '& .service-card:not(.service-card--primary) h3': { fontSize: 'clamp(1.45rem,2vw,2.1rem)' },
  '& p': {
    maxWidth: 530,
    margin: '13px 0 0',
    color: 'rgba(255,255,255,.76)',
    fontSize: '.96rem',
    lineHeight: 1.55,
  },
  '& .service-card:not(.service-card--primary) p': { maxWidth: 420, fontSize: '.88rem' },
  '& .service-arrow': {
    flex: '0 0 auto',
    width: 46,
    height: 46,
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(255,255,255,.5)',
    borderRadius: '50%',
    transition: 'transform 260ms ease, background-color 260ms ease, color 260ms ease',
  },
  '& .service-card:hover img': { transform: 'scale(1.035)' },
  '& .service-card:hover .service-overlay': { background: 'linear-gradient(180deg, rgba(12,13,11,.08) 18%, rgba(12,13,11,.9) 100%)' },
  '& .service-card:hover .service-arrow': { transform: 'translate(3px,-3px)', background: '#fff', color: '#171915' },
  '& .service-card:focus-visible': { outline: `3px solid ${theme.palette.primary.main}`, outlineOffset: 4 },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '520px 330px',
    minHeight: 0,
    '& .service-card--primary': { gridColumn: '1 / -1', gridRow: 'auto' },
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(3, 430px)',
    gap: 12,
    '& .service-card--primary': { gridColumn: 'auto' },
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateRows: 'repeat(3, minmax(350px, 78vw))',
    '& .service-content': { padding: 22, gap: 18 },
    '& .service-arrow': { width: 42, height: 42 },
    '& p': { fontSize: '.88rem' },
    '& h3': { overflowWrap: 'anywhere' },
  },
}));
