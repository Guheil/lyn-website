'use client';

import { styled } from '@mui/material';

export const StyledLegalHeader = styled('header')(({ theme }) => ({
  background: '#20201e',
  color: '#fff',
  padding: 'clamp(88px, 12vw, 156px) 0 clamp(54px, 7vw, 92px)',
  '& .inner': { width: 'calc(100% - clamp(40px, 8vw, 96px))', maxWidth: 1440, margin: '0 auto' },
  '& h1': { maxWidth: 820, color: '#fff', fontSize: 'clamp(3rem, 7vw, 6.5rem)', overflowWrap: 'anywhere' },
  '& p': { maxWidth: 680, marginTop: 22, color: 'rgba(255,255,255,.78)', fontSize: 'clamp(1rem, 1.35vw, 1.15rem)' },
  [theme.breakpoints.down('sm')]: { '& h1': { fontSize: 'clamp(2.75rem, 14vw, 4rem)' } },
}));

export const StyledLegalContent = styled('article')(({ theme }) => ({
  width: 'calc(100% - clamp(40px, 8vw, 96px))', maxWidth: 920, margin: '0 auto', padding: 'clamp(54px, 8vw, 106px) 0 clamp(76px, 10vw, 132px)',
  '& .updated': { display: 'block', marginBottom: 'clamp(42px, 6vw, 72px)', color: theme.palette.text.secondary, fontSize: '.9rem' },
  '& section + section': { marginTop: 'clamp(38px, 5vw, 60px)', paddingTop: 'clamp(38px, 5vw, 60px)', borderTop: `1px solid ${theme.palette.divider}` },
  '& h2': { fontSize: 'clamp(1.75rem, 3vw, 2.45rem)', marginBottom: 16, textWrap: 'balance' },
  '& p, & li': { color: theme.palette.text.secondary, fontSize: '1rem', lineHeight: 1.78 },
  '& p + p': { marginTop: 14 }, '& ul': { margin: '14px 0 0', paddingLeft: 24 }, '& li + li': { marginTop: 8 },
  '& a': { color: theme.palette.primary.dark, fontWeight: 700, textDecorationThickness: '1px', textUnderlineOffset: '3px' },
}));
