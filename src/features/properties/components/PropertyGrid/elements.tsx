'use client';
import { styled } from '@mui/material';
export const StyledGrid = styled('div')(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 18, [theme.breakpoints.down('lg')]: { gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }, [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' } }));
