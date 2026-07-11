'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  StyledCredentialGrid,
  StyledCredentialLightbox,
  StyledCredentialLightboxImage,
} from './elements';

type PlaceholderCredential = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  alt: string;
  layout: 'portrait-large' | 'portrait' | 'landscape';
  verificationNote?: string;
};

const fallbackImage = '/credentials/credential-image-unavailable.jpg';


function CredentialImage({
  credential,
  eager = false,
  lightbox = false,
}: {
  credential: PlaceholderCredential;
  eager?: boolean;
  lightbox?: boolean;
}) {
  const [src, setSrc] = useState(credential.image);
  const width = credential.layout === 'landscape' ? 1600 : 1200;
  const height = credential.layout === 'landscape' ? 1120 : 1600;

  return (
    <Image
      src={src}
      alt={credential.alt}
      width={width}
      height={height}
      sizes={lightbox ? '95vw' : '(max-width: 600px) calc(100vw - 48px), (max-width: 900px) 50vw, 58vw'}
      priority={eager}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setSrc(fallbackImage)}
    />
  );
}

const placeholderCredentials: PlaceholderCredential[] = [
  {
    id: 'professional-license',
    title: 'Professional Real Estate License',
    issuer: 'Issuing organization to be confirmed',
    image: '/credentials/sample-professional-license.jpg',
    alt: 'Sample placeholder for a redacted professional real estate license',
    layout: 'portrait-large',
    verificationNote: 'Official verification link will be added when supplied.',
  },
  {
    id: 'business-registration',
    title: 'Business Registration',
    issuer: 'EOFB Realty / J33 INT’L Trading & Dev. Corp.',
    image: '/credentials/sample-business-registration.jpg',
    alt: 'Sample placeholder for a redacted real estate business registration document',
    layout: 'portrait',
  },
  {
    id: 'training-certificate',
    title: 'Professional Training Certificate',
    issuer: 'Training provider to be confirmed',
    image: '/credentials/sample-training-certificate.jpg',
    alt: 'Sample placeholder for a professional real estate training certificate',
    layout: 'landscape',
    verificationNote: 'Verification details may be shown when available.',
  },
  {
    id: 'membership-certificate',
    title: 'Professional Membership',
    issuer: 'Professional organization to be confirmed',
    image: '/credentials/sample-membership-certificate.jpg',
    alt: 'Sample placeholder for a professional organization membership certificate',
    layout: 'portrait',
  },
];

export function CredentialGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) {
        window.setTimeout(() => openerRefs.current[current]?.focus(), 0);
      }
      return null;
    });
  }, []);

  const previous = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current - 1 + placeholderCredentials.length) % placeholderCredentials.length;
    });
  }, []);

  const next = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + 1) % placeholderCredentials.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close, next, openIndex, previous]);

  const active = openIndex === null ? null : placeholderCredentials[openIndex];

  return (
    <>
      <StyledCredentialGrid>
        {placeholderCredentials.map((credential, index) => (
          <figure key={credential.id} className={credential.layout}>
            <button
              ref={(node) => { openerRefs.current[index] = node; }}
              type="button"
              className="credential-image-button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Enlarge ${credential.title}`}
            >
              <CredentialImage credential={credential} eager={index === 0} />
              <span className="inspect-label">View document</span>
            </button>
            <figcaption>
              <h2>{credential.title}</h2>
              <p>{credential.issuer}</p>
              <span>Sample placeholder. Replace before publishing.</span>
              {credential.verificationNote ? <small>{credential.verificationNote}</small> : null}
            </figcaption>
          </figure>
        ))}
      </StyledCredentialGrid>

      {active ? (
        <StyledCredentialLightbox
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} enlarged view`}
          data-lenis-prevent
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button ref={closeButtonRef} type="button" className="close" onClick={close} aria-label="Close enlarged credential">
            <X size={22} />
          </button>
          <button type="button" className="previous" onClick={previous} aria-label="Previous credential">
            <ChevronLeft size={24} />
          </button>
          <StyledCredentialLightboxImage>
            <CredentialImage key={active.id} credential={active} lightbox />
            <div className="lightbox-caption">
              <strong>{active.title}</strong>
              <span>{active.issuer}</span>
              <small>{openIndex! + 1} / {placeholderCredentials.length}</small>
            </div>
          </StyledCredentialLightboxImage>
          <button type="button" className="next" onClick={next} aria-label="Next credential">
            <ChevronRight size={24} />
          </button>
        </StyledCredentialLightbox>
      ) : null}
    </>
  );
}
