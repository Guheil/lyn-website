import Link from 'next/link';
import { Typography } from '@mui/material';
import { StyledFooter, StyledFooterBottom, StyledFooterGrid } from './elements';

export function SiteFooter() {
  return (
    <StyledFooter>
      <StyledFooterGrid>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Lyn Bactad</Typography>
          <p>Real estate broker/salesperson and owner/manager/CEO of EOFB Realty / J33 INT&apos;L Trading &amp; Dev. Corp.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/about">About</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/services">Services</Link>
          <Link href="/credentials">Credentials</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h3>Property types</h3>
          <Link href="/properties?type=Land">Land</Link>
          <Link href="/properties?type=House%20and%20Lot">House and Lot</Link>
          <Link href="/properties?type=Residential">Residential</Link>
          <Link href="/properties?type=Commercial">Commercial</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p>San Fernando, La Union</p>
          <p>Facebook, Messenger, Email</p>
          <p>Professional real estate assistance in La Union.</p>
        </div>
      </StyledFooterGrid>
      <StyledFooterBottom>
        <span>© {new Date().getFullYear()} Lyn Bactad. All rights reserved.</span>
        <span>Broker-led property assistance.</span>
      </StyledFooterBottom>
    </StyledFooter>
  );
}
