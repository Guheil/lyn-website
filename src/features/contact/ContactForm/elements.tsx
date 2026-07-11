'use client';
import { styled } from '@mui/material';
export const StyledForm = styled('form')(({ theme }) => ({ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, padding: 'clamp(22px,3vw,36px)', background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, boxShadow: '0 18px 50px rgba(22,20,16,.08)', '& .full': { gridColumn: '1 / -1' }, [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', '& > *': { gridColumn: '1 !important' } } }));
