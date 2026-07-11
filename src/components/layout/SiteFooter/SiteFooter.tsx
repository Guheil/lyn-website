import Link from 'next/link';
import { StyledFooter, StyledFooterBottom, StyledFooterGrid, StyledFooterLogo } from './elements';

export function SiteFooter() {
  return (
    <StyledFooter>
      <StyledFooterGrid>
        <div>
          <StyledFooterLogo
            src="/brand/lyn-bactad-logo-on-dark.png"
            alt="Lyn Bactad La Union Real Estate"
            width={1400}
            height={338}
            loading="lazy"
          />
          <p>
            Real estate listings, assigned broker coordination, property inquiries, and marketing support across La Union.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/about">About the group</Link>
          <Link href="/properties">La Union properties</Link>
          <Link href="/services">Real estate services</Link>
          <Link href="/credentials">Business credentials</Link>
          <Link href="/contact">Contact a broker</Link>
        </div>
        <div>
          <h3>Property types</h3>
          <Link href="/properties?type=Land">Land in La Union</Link>
          <Link href="/properties?type=House%20and%20Lot">House and lot</Link>
          <Link href="/properties?type=Residential">Residential properties</Link>
          <Link href="/properties?type=Commercial">Commercial properties</Link>
        </div>
        <div>
          <h3>Service area</h3>
          <p>San Fernando City and communities across La Union, Philippines.</p>
          <p>Property inquiries are routed to an assigned or appropriate broker.</p>
        </div>
      </StyledFooterGrid>
      <StyledFooterBottom>
        <span>© {new Date().getFullYear()} Lyn Bactad Property Group. All rights reserved.</span>
        <span>La Union real estate and property services.</span>
      </StyledFooterBottom>
    </StyledFooter>
  );
}
