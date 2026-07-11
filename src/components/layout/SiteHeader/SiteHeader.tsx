'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/constants/navigation';
import {
  StyledBrand,
  StyledBrandMark,
  StyledBrandText,
  StyledHeader,
  StyledHeaderAction,
  StyledInner,
  StyledMenuButton,
  StyledMobilePanel,
  StyledNav,
  StyledOverlay,
} from './elements';

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (!isHome) return;

    const updateHeaderState = () => setHasScrolled(window.scrollY >= 1);
    const initialFrame = window.requestAnimationFrame(updateHeaderState);
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, [isHome, pathname]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <StyledHeader className="site-header" data-home={isHome} data-solid={!isHome || hasScrolled || open}>
        <StyledInner>
          <StyledBrand as={Link} href="/" aria-label="Lyn Bactad home">
            <StyledBrandMark>LB</StyledBrandMark>
            <StyledBrandText>
              <strong>Lyn Bactad</strong>
              <small>La Union Real Estate</small>
            </StyledBrandText>
          </StyledBrand>

          <StyledNav aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} data-active={active(item.href)}>
                {item.label}
              </Link>
            ))}
          </StyledNav>

          <StyledHeaderAction href="/properties" variant="outlined">Explore properties</StyledHeaderAction>
          <StyledMenuButton
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={21} />
          </StyledMenuButton>
        </StyledInner>
      </StyledHeader>

      {open && (
        <>
          <StyledOverlay onClick={() => setOpen(false)} />
          <StyledMobilePanel
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            data-lenis-prevent
          >
            <div className="mobile-head">
              <span>Navigation</span>
              <StyledMenuButton aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={21} />
              </StyledMenuButton>
            </div>
            <div className="mobile-links">
              {navigationItems.map((item, index) => (
                <Link key={item.href} href={item.href} data-active={active(item.href)} onClick={() => setOpen(false)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              ))}
            </div>
            <StyledHeaderAction href="/properties" variant="contained" onClick={() => setOpen(false)}>
              Explore properties
            </StyledHeaderAction>
            <p className="mobile-note">Broker-led property assistance in La Union.</p>
          </StyledMobilePanel>
        </>
      )}
    </>
  );
}
