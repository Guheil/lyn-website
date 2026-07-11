'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/constants/navigation';
import { StyledBrand, StyledBrandMark, StyledBrandText, StyledHeader, StyledHeaderAction, StyledInner, StyledMenuButton, StyledMobilePanel, StyledNav, StyledOverlay } from './elements';
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  return <>
    <StyledHeader><StyledInner>
      <StyledBrand as={Link} href="/" aria-label="Lyn Bactad home"><StyledBrandMark>LB</StyledBrandMark><StyledBrandText><strong>Lyn Bactad</strong><small>Real Estate Broker / Salesperson</small></StyledBrandText></StyledBrand>
      <StyledNav aria-label="Main navigation">{navigationItems.map((item) => <Link key={item.href} href={item.href} data-active={active(item.href)} onClick={() => setOpen(false)}>{item.label}</Link>)}</StyledNav>
      <StyledHeaderAction href="/properties" variant="outlined" color="secondary">View listings</StyledHeaderAction>
      <StyledMenuButton aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={21} /></StyledMenuButton>
    </StyledInner></StyledHeader>
    {open && <><StyledOverlay onClick={() => setOpen(false)} /><StyledMobilePanel role="dialog" aria-modal="true" aria-label="Mobile navigation"><StyledMenuButton sx={{ display: 'inline-flex', justifySelf: 'end' }} aria-label="Close menu" onClick={() => setOpen(false)}><X size={21} /></StyledMenuButton>{navigationItems.map((item) => <Link key={item.href} href={item.href} data-active={active(item.href)} onClick={() => setOpen(false)}>{item.label}</Link>)}<StyledHeaderAction href="/properties" variant="contained" sx={{ display: 'inline-flex', mt: 2 }}>View listings</StyledHeaderAction></StyledMobilePanel></>}
  </>;
}
