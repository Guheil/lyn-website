'use client';
import { styled } from '@mui/material';
export const StyledGallery = styled('div')(({ theme }) => ({ padding: 18, borderRight: `1px solid ${theme.palette.divider}`, [theme.breakpoints.down('lg')]: { borderRight: 0, borderBottom: `1px solid ${theme.palette.divider}` } }));
export const StyledMainImage = styled('div', { shouldForwardProp: (prop) => prop !== 'image' })<{ image: string }>(({ image, theme }) => ({ minHeight: 610, background: `url("${image}") center/cover, #d8d0c2`, [theme.breakpoints.down('md')]: { minHeight: 390 }, [theme.breakpoints.down('sm')]: { minHeight: 300 } }));
export const StyledThumbGrid = styled('div')({ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 10 });
export const StyledThumb = styled('button', { shouldForwardProp: (prop) => prop !== 'image' && prop !== 'active' })<{ image: string; active: boolean }>(({ image, active, theme }) => ({ minHeight: 86, border: `1px solid ${active ? theme.palette.primary.main : 'transparent'}`, padding: 0, background: `url("${image}") center/cover, #d8d0c2`, cursor: 'pointer' }));
