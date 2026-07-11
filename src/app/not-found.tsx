import { Button, Container, Stack, Typography } from '@mui/material';

export default function NotFound() {
  return <Container maxWidth="md" sx={{ py: 16 }}><Stack spacing={3} sx={{ alignItems: 'flex-start' }}><Typography variant="overline">404</Typography><Typography variant="h1">Page not found.</Typography><Typography color="text.secondary">The page may have moved or the address is incomplete.</Typography><Button href="/" variant="contained">Return home</Button></Stack></Container>;
}
