import { Box, Skeleton } from '@mui/material';
export default function Loading(){return <Box sx={{maxWidth:1440,mx:'auto',p:5,display:'grid',gridTemplateColumns:{xs:'1fr',md:'repeat(3,1fr)'},gap:2}}>{Array.from({length:6}).map((_,i)=><Box key={i}><Skeleton variant="rectangular" height={290}/><Skeleton height={42}/><Skeleton height={24}/></Box>)}</Box>}
