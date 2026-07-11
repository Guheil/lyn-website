'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function PropertyError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        px: 'clamp(24px,4vw,48px)',
        py: 'clamp(80px,10vw,140px)',
      }}
    >
      <Stack sx={{ width: '100%', maxWidth: 720, alignItems: 'flex-start', gap: 2.5 }}>
        <Typography variant="h1" sx={{ fontSize: 'clamp(2.7rem,6vw,5.4rem)', lineHeight: 0.98 }}>
          This property could not be displayed.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 580, lineHeight: 1.75 }}>
          The listing may contain incomplete legacy data or the property service may be temporarily unavailable. Try loading it again or return to the property list.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
          <Button variant="contained" color="secondary" startIcon={<RotateCcw size={17} />} onClick={reset}>
            Try again
          </Button>
          <Button component={Link} href="/properties" startIcon={<ArrowLeft size={17} />}>
            Back to properties
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
