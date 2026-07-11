import { Button, Stack } from '@mui/material';
import type { PropertyFiltersProps } from './interface';
const types = ['All','Land','House and Lot','Residential','Commercial','Investment Property'];
export function PropertyFilters({ activeType }: PropertyFiltersProps) { return <Stack direction="row" sx={{flexWrap:'wrap',gap:1}}>{types.map((type) => { const active = type === 'All' ? !activeType : activeType === type; const href = type === 'All' ? '/properties' : `/properties?type=${encodeURIComponent(type)}`; return <Button key={type} href={href} variant={active ? 'contained' : 'outlined'} color="secondary" size="small">{type}</Button>; })}</Stack>; }
