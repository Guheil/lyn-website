import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button, Stack, Typography } from '@mui/material';
import type { PropertyPaginationProps } from './interface';

function href(page: number, type?: string) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (type) params.set('type', type);
  return `/properties?${params.toString()}`;
}

export function PropertyPagination({ page, totalPages, propertyType }: PropertyPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 1, sm: 2 },
        mt: 5,
        '& .MuiButton-root': { px: { xs: 1.2, sm: 2.75 }, minWidth: 0 },
      }}
    >
      <Button
        href={href(Math.max(1, page - 1), propertyType)}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : 0}
        sx={{ pointerEvents: page <= 1 ? 'none' : 'auto', opacity: page <= 1 ? 0.45 : 1 }}
        startIcon={<ArrowLeft size={17} />}
      >
        Previous
      </Button>
      <Typography color="text.secondary" sx={{ fontSize: { xs: '0.82rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>
        {page} / {totalPages}
      </Typography>
      <Button
        href={href(Math.min(totalPages, page + 1), propertyType)}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : 0}
        sx={{ pointerEvents: page >= totalPages ? 'none' : 'auto', opacity: page >= totalPages ? 0.45 : 1 }}
        endIcon={<ArrowRight size={17} />}
      >
        Next
      </Button>
    </Stack>
  );
}
