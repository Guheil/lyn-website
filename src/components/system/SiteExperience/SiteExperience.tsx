'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import {
  StyledIntro,
  StyledIntroIdentity,
  StyledIntroPanel,
  StyledIntroStage,
} from './elements';

const INTRO_KEY = 'lyn-bactad-intro-played';
const INTRO_DURATION_MS = 1420;

const introImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=84',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=84',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=84',
];

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
      // The transition still completes when session storage is unavailable.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const complete = window.setTimeout(() => {
      root.dataset.introSeen = 'true';
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event('site:intro-complete'));
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(complete);
      document.body.style.overflow = previousOverflow;
    };
  }, [pathname]);

  return (
    <>
      {pathname === '/' && (
        <StyledIntro className="site-intro" aria-hidden="true">
          <StyledIntroStage>
            {introImages.map((image, index) => (
              <StyledIntroPanel
                key={image}
                image={image}
                className={`intro-image intro-image-${index + 1}`}
              />
            ))}

            <StyledIntroIdentity>
              <strong>Lyn Bactad</strong>
              <span aria-hidden="true" />
            </StyledIntroIdentity>
          </StyledIntroStage>
        </StyledIntro>
      )}
      {children}
    </>
  );
}
