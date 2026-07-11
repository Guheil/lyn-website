'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import {
  StyledIntro,
  StyledIntroIdentity,
  StyledIntroPanel,
  StyledIntroStage,
} from './elements';

const INTRO_DURATION_MS = 1500;

const introImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=84',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=84',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=84',
];

export function SiteExperience({ children }: { children: ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
    });

    if (!reducedMotion) lenis.stop();

    const resume = () => lenis.start();
    window.addEventListener('site:intro-complete', resume);

    return () => {
      window.removeEventListener('site:intro-complete', resume);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      const completeImmediately = window.setTimeout(() => {
        root.dataset.introSeen = 'true';
        setShowIntro(false);
        window.dispatchEvent(new Event('site:intro-complete'));
      }, 0);
      return () => window.clearTimeout(completeImmediately);
    }

    root.dataset.introSeen = 'false';
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const complete = window.setTimeout(() => {
      root.dataset.introSeen = 'true';
      document.body.style.overflow = previousOverflow;
      setShowIntro(false);
      window.dispatchEvent(new Event('site:intro-complete'));
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(complete);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <>
      {showIntro && (
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
