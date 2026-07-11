import type { TypographyVariantsOptions } from '@mui/material/styles';

const displayFont = '"Newsreader Variable", Georgia, serif';

export const typography: TypographyVariantsOptions = {
  fontFamily: '"IBM Plex Sans Variable", "IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
  h1: { fontFamily: displayFont, fontWeight: 460, lineHeight: .94, letterSpacing: '-.055em' },
  h2: { fontFamily: displayFont, fontWeight: 470, lineHeight: .98, letterSpacing: '-.045em' },
  h3: { fontWeight: 620, lineHeight: 1.18, letterSpacing: '-.025em' },
  h4: { fontFamily: displayFont, fontWeight: 480, lineHeight: 1.08, letterSpacing: '-.035em' },
  button: { fontWeight: 700, textTransform: 'none', letterSpacing: '-.01em' },
  overline: { fontWeight: 700, letterSpacing: '.15em', fontSize: '.69rem' },
};
