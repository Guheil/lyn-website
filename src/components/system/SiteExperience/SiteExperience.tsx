'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { StyledIntro, StyledIntroContent, StyledIntroCurtain, StyledIntroMark } from './elements';

const INTRO_KEY = 'lyn-bactad-intro-played';

export function SiteExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
    });

    const shouldWaitForIntro = pathname === '/' && document.documentElement.dataset.introSeen !== 'true';
    if (shouldWaitForIntro) lenis.stop();

    const resume = () => lenis.start();
    window.addEventListener('site:intro-complete', resume);

    return () => {
      window.removeEventListener('site:intro-complete', resume);
      lenis.destroy();
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyPlayed = root.dataset.introSeen === 'true';

    if (alreadyPlayed || reducedMotion) {
      root.dataset.introSeen = 'true';
      window.dispatchEvent(new Event('site:intro-complete'));
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_KEY, 'true');
    } catch {
      // The animation still works when session storage is unavailable.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const complete = window.setTimeout(() => {
      root.dataset.introSeen = 'true';
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event('site:intro-complete'));
    }, 1120);

    return () => {
      window.clearTimeout(complete);
      document.body.style.overflow = previousOverflow;
    };
  }, [pathname]);

  return (
    <>
      {pathname === '/' && (
        <StyledIntro className="site-intro" aria-hidden="true">
          <StyledIntroCurtain className="intro-curtain intro-curtain-left" />
          <StyledIntroCurtain className="intro-curtain intro-curtain-right" />
          <StyledIntroContent>
            <StyledIntroMark>LB</StyledIntroMark>
            <span className="intro-line" />
            <div>
              <strong>La Union</strong>
              <span>Real estate, carefully represented</span>
            </div>
          </StyledIntroContent>
        </StyledIntro>
      )}
      {children}
    </>
  );
}
