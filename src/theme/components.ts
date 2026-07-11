import type { Components, Theme } from '@mui/material/styles';
export const components: Components<Theme> = {
  MuiCssBaseline: { styleOverrides: { body: { lineHeight: 1.6 } } },
  MuiButton: { styleOverrides: { root: { borderRadius: 0, minHeight: 48, paddingInline: 22, boxShadow: 'none' } } },
  MuiTextField: { defaultProps: { size: 'medium' } },
  MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 0 } } },
};
