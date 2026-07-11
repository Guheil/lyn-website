import { Box, Stack, Typography } from '@mui/material';
import type { SectionHeadingProps } from './interface';

export function SectionHeading({ title, description, label, centered }: SectionHeadingProps) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {label && (
        <Box
          aria-hidden="true"
          sx={{
            width: 72,
            height: '1px',
            mb: 1,
            bgcolor: 'primary.dark',
          }}
        />
      )}
      <Typography variant="h2" sx={{ fontSize: 'clamp(2rem,4.6vw,4.8rem)', maxWidth: 580 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ maxWidth: 720, fontSize: '1.05rem' }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
