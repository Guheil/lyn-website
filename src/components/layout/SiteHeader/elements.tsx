'use client';

import { Box, Button, IconButton, styled } from '@mui/material';

export const StyledHeader = styled('header')(({ theme }) => ({
  '--header-fg': '#ffffff',
  '--header-muted': 'rgba(255,255,255,.68)',
  '--header-border': 'rgba(255,255,255,.32)',
  position: 'sticky',
  top: 0,
  zIndex: 50,
  height: 78,
  marginBottom: 0,
  color: 'var(--header-fg)',
  background: 'transparent',
  borderBottom: '1px solid transparent',
  transition: 'background-color 280ms ease, border-color 280ms ease, color 220ms ease, box-shadow 280ms ease',
  '&[data-home="true"]': {
    position: 'fixed',
    insetInline: 0,
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: { height: 70 },
  '&[data-solid="true"]': {
    '--header-fg': theme.palette.text.primary,
    '--header-muted': theme.palette.text.secondary,
    '--header-border': theme.palette.divider,
    background: 'rgba(251,250,247,.96)',
    borderBottomColor: theme.palette.divider,
    boxShadow: '0 10px 34px rgba(18,18,16,.045)',
    backdropFilter: 'blur(14px)',
  },
}));

export const StyledInner = styled('div')(({ theme }) => ({
  width: 'calc(100% - clamp(40px,8vw,96px))',
  maxWidth: 1440,
  minHeight: 78,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 40px)',
    minHeight: 70,
    gap: 12,
  },
}));

export const StyledBrand = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  flexShrink: 0,
  color: 'var(--header-fg)',
});

export const StyledBrandMark = styled('span')(({ theme }) => ({
  width: 42,
  height: 42,
  border: '1px solid var(--header-border)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--header-fg)',
  fontSize: '.79rem',
  fontWeight: 800,
  letterSpacing: '.08em',
  transition: 'border-color 220ms ease, color 220ms ease',
  [theme.breakpoints.down('sm')]: { width: 38, height: 38, fontSize: '.72rem' },
}));

export const StyledBrandText = styled('span')(({ theme }) => ({
  display: 'grid',
  lineHeight: 1.15,
  '& strong': { fontSize: '.96rem', letterSpacing: '-.01em' },
  '& small': { color: 'var(--header-muted)', fontSize: '.72rem', transition: 'color 220ms ease' },
  [theme.breakpoints.down('sm')]: { '& small': { display: 'none' } },
}));

export const StyledNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'clamp(18px,2vw,34px)',
  color: 'var(--header-muted)',
  fontSize: '.88rem',
  flex: 1,
  '& a': {
    position: 'relative',
    paddingBlock: 29,
    transition: 'color 180ms ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 21,
      height: 1,
      background: 'var(--header-fg)',
      transform: 'scaleX(0)',
      transformOrigin: 'right',
      transition: 'transform 240ms cubic-bezier(.22,1,.36,1)',
    },
    '&:hover': { color: 'var(--header-fg)' },
    '&:hover::after, &[data-active="true"]::after': { transform: 'scaleX(1)', transformOrigin: 'left' },
    '&[data-active="true"]': { color: 'var(--header-fg)' },
  },
  [theme.breakpoints.down('md')]: { display: 'none' },
}));

export const StyledHeaderAction = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  color: 'var(--header-fg)',
  borderColor: 'var(--header-border)',
  background: 'transparent',
  '&:hover': {
    borderColor: 'var(--header-fg)',
    background: 'var(--header-fg)',
    color: theme.palette.background.default,
  },
  [theme.breakpoints.down('md')]: { display: 'none' },
}));

export const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: 'var(--header-fg)',
  border: '1px solid var(--header-border)',
  borderRadius: 0,
  transition: 'color 220ms ease, border-color 220ms ease',
  minWidth: 44,
  minHeight: 44,
  [theme.breakpoints.down('md')]: { display: 'inline-flex' },
}));

export const StyledOverlay = styled(Box)({
  position: 'fixed',
  inset: 0,
  zIndex: 60,
  background: 'rgba(17,17,15,.42)',
  backdropFilter: 'blur(5px)',
});

export const StyledMobilePanel = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 70,
  top: 0,
  right: 0,
  bottom: 0,
  width: 'min(92vw,430px)',
  background: '#f6f2e9',
  padding: 'max(20px, env(safe-area-inset-top)) 24px max(24px, env(safe-area-inset-bottom))',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  boxShadow: '-24px 0 70px rgba(18,18,16,.18)',
  animation: 'slideIn 320ms cubic-bezier(.22,1,.36,1) both',
  '@keyframes slideIn': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
  '& .mobile-head': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 22,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    fontSize: '.75rem',
    letterSpacing: '.14em',
    textTransform: 'uppercase',
  },
  '& .mobile-head button': {
    display: 'inline-flex',
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
  },
  '& .mobile-links': { display: 'grid', marginBlock: 22 },
  '& .mobile-links a': {
    minHeight: 64,
    display: 'grid',
    gridTemplateColumns: '38px 1fr',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: 'clamp(1.3rem,5vw,1.65rem)',
    letterSpacing: '-.03em',
  },
  '& .mobile-links a span': { color: theme.palette.text.secondary, fontSize: '.68rem', letterSpacing: '.08em' },
  '& .mobile-links a[data-active="true"]': { color: theme.palette.primary.dark },
  '& > a.MuiButton-root': {
    display: 'inline-flex',
    marginTop: 'auto',
    background: theme.palette.secondary.main,
    color: '#fff',
  },
  '& .mobile-note': { margin: '14px 0 0', color: theme.palette.text.secondary, fontSize: '.78rem' },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingInline: 20,
  },
}));
