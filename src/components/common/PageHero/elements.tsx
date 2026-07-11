'use client';
import { styled } from '@mui/material';
export const StyledHero = styled('section', { shouldForwardProp: (prop) => prop !== 'image' && prop !== 'minHeight' })<{ image: string; minHeight?: number }>(({ image, minHeight = 520, theme }) => ({ minHeight, display: 'flex', alignItems: 'flex-end', background: `linear-gradient(rgba(18,18,16,.22),rgba(18,18,16,.72)), url("${image}") center/cover`, color: '#fff', [theme.breakpoints.down('md')]: { minHeight: 460 } }));
export const StyledHeroInner = styled('div')({ width: '100%', maxWidth: 1440, margin: '0 auto', padding: '110px clamp(20px,4vw,48px) 64px', '& h1': { maxWidth: 1050 }, '& p': { maxWidth: 760, color: 'rgba(255,255,255,.8)', fontSize: 'clamp(1rem,1.3vw,1.14rem)' } });
