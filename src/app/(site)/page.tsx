import { HomePage } from '@/features/home/HomePage';
import { publicPropertyService } from '@/server/modules/properties';
import type { PublicProperty } from '@/server/modules/properties';
export const dynamic = 'force-dynamic';
export default async function Page() { let featured: PublicProperty[] = []; try { featured = await publicPropertyService.featured(3); } catch (error) { console.error('Featured properties could not be loaded', error); } return <HomePage featured={featured} />; }
