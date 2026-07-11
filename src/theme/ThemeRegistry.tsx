'use client';
import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { theme } from './theme';
export function ThemeRegistry({ children }: { children: ReactNode }) {
  return <AppRouterCacheProvider options={{ key: 'real-estado' }}><ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider></AppRouterCacheProvider>;
}
