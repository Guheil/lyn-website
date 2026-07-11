'use client';
import { styled } from '@mui/material';
export const StyledSection = styled('section')({ padding: 'clamp(72px,8vw,124px) clamp(20px,4vw,48px)', background: '#fff' });
export const StyledGrid = styled('div')(({ theme }) => ({ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 'clamp(42px,7vw,100px)', alignItems: 'start', '& .details': { display: 'grid', gap: 14, marginTop: 30 }, '& .detail': { paddingTop: 14, borderTop: `1px solid ${theme.palette.divider}` }, '& .detail span': { display: 'block', color: theme.palette.text.secondary }, [theme.breakpoints.down('lg')]: { gridTemplateColumns: '1fr' } }));
