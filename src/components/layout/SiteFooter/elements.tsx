'use client';
import { styled } from '@mui/material';

export const StyledFooter = styled('footer')(({ theme }) => ({
  background: '#11110f',
  color: '#fff',
  padding: '64px 0 24px',
  [theme.breakpoints.down('sm')]: { paddingTop: 52 },
}));

export const StyledFooterGrid = styled('div')(({ theme }) => ({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1.4fr repeat(3,1fr)',
  gap: 40,
  '& p, & a': { color: 'rgba(255,255,255,.66)' },
  '& a': { display: 'block', marginTop: 9, '&:hover': { color: '#fff' } },
  '& h3': { fontSize: '1rem', margin: '0 0 16px' },
  [theme.breakpoints.down('lg')]: { gridTemplateColumns: 'repeat(2,1fr)' },
  [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 30 },
}));

export const StyledFooterLogo = styled('img')(({ theme }) => ({
  display: 'block',
  width: 'min(285px, 100%)',
  height: 'auto',
  marginBottom: 18,
  [theme.breakpoints.down('sm')]: { width: 238 },
}));

export const StyledFooterBottom = styled('div')(({ theme }) => ({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  margin: '48px auto 0',
  padding: '18px 0 0',
  borderTop: '1px solid rgba(255,255,255,.12)',
  display: 'flex',
  justifyContent: 'space-between',
  color: 'rgba(255,255,255,.56)',
  fontSize: '.86rem',
  gap: 16,
  '& nav': { display: 'flex', flexWrap: 'wrap', gap: 18 },
  '& a': { color: 'inherit', textDecoration: 'none', '&:hover': { color: '#fff' } },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    marginTop: 36,
    paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
  },
}));
