'use client';
import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';
export const theme = createTheme({ palette, typography, components, shape: { borderRadius: 12 }, breakpoints: { values: { xs: 0, sm: 600, md: 840, lg: 1180, xl: 1440 } } });
