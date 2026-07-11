import { Button, Stack } from '@mui/material';
import type { PropertyFiltersProps } from './interface';

const types = ['All', 'Land', 'House and Lot', 'Residential', 'Commercial', 'Investment Property'];

export function PropertyFilters({ activeType }: PropertyFiltersProps) {
  return (
    <Stack
      direction="row"
      data-lenis-prevent
      sx={{
        width: { xs: '100%', lg: 'auto' },
        flexWrap: { xs: 'nowrap', md: 'wrap' },
        gap: 1,
        overflowX: { xs: 'auto', md: 'visible' },
        pb: { xs: 1, md: 0 },
        scrollSnapType: { xs: 'x proximity', md: 'none' },
        overscrollBehaviorInline: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '& .MuiButton-root': {
          flex: '0 0 auto',
          whiteSpace: 'nowrap',
          scrollSnapAlign: 'start',
          minHeight: 44,
        },
      }}
    >
      {types.map((type) => {
        const active = type === 'All' ? !activeType : activeType === type;
        const href = type === 'All' ? '/properties' : `/properties?type=${encodeURIComponent(type)}`;
        return (
          <Button key={type} href={href} variant={active ? 'contained' : 'outlined'} color="secondary" size="small">
            {type}
          </Button>
        );
      })}
    </Stack>
  );
}
