import { PropertyCard } from '../PropertyCard';
import { StyledGrid } from './elements';
import type { PropertyGridProps } from './interface';
export function PropertyGrid({ properties }: PropertyGridProps) { return <StyledGrid>{properties.map((property) => <PropertyCard key={property.id} property={property} />)}</StyledGrid>; }
