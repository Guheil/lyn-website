'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  StyledCredentialGroup,
  StyledCredentialLightbox,
  StyledCredentialLightboxDocument,
  StyledCredentialRegister,
} from './elements';

type CredentialLayout = 'feature' | 'standard' | 'wide';
type CredentialTone = 'sand' | 'ivory' | 'stone' | 'warm';

type PlaceholderCredential = {
  id: string;
  title: string;
  issuer: string;
  documentType: string;
  layout: CredentialLayout;
  tone: CredentialTone;
  verificationNote?: string;
};

type CredentialGroup = {
  id: string;
  title: string;
  description: string;
  credentials: PlaceholderCredential[];
};

const credentialGroups: CredentialGroup[] = [
  {
    id: 'business-records',
    title: 'Business records',
    description:
      'Documents that establish the ownership, registration, and lawful operation of the property group.',
    credentials: [
      {
        id: 'business-registration',
        title: 'Business Registration',
        issuer: 'Issuing organization to be confirmed',
        documentType: 'Registration record',
        layout: 'feature',
        tone: 'ivory',
        verificationNote: 'A verification link may be added when the official copy is available.',
      },
      {
        id: 'business-permit',
        title: 'Government Business Permit',
        issuer: 'Local issuing authority to be confirmed',
        documentType: 'Permit or authorization',
        layout: 'standard',
        tone: 'sand',
      },
    ],
  },
  {
    id: 'supporting-records',
    title: 'Training and affiliations',
    description:
      'Supporting records that show relevant training, industry participation, and professional development.',
    credentials: [
      {
        id: 'training-certificate',
        title: 'Property Services Training Certificate',
        issuer: 'Training provider to be confirmed',
        documentType: 'Training certificate',
        layout: 'wide',
        tone: 'stone',
        verificationNote: 'Verification details may be displayed with the final document.',
      },
      {
        id: 'membership-certificate',
        title: 'Business or Industry Membership',
        issuer: 'Professional organization to be confirmed',
        documentType: 'Membership certificate',
        layout: 'standard',
        tone: 'warm',
      },
    ],
  },
];

const credentials = credentialGroups.flatMap((group) => group.credentials);

function CredentialDocumentVisual({
  credential,
  lightbox = false,
}: {
  credential: PlaceholderCredential;
  lightbox?: boolean;
}) {
  return (
    <div
      className={`document-preview document-preview-${credential.layout} document-tone-${credential.tone}${lightbox ? ' is-lightbox' : ''}`}
      aria-hidden="true"
    >
      <div className="document-page">
        <div className="document-brand">
          <span>LB</span>
          <i />
        </div>
        <p className="document-status">Public preview placeholder</p>
        <h3>{credential.title}</h3>
        <p className="document-summary">
          A reviewed and redacted public copy of this document will replace this placeholder.
        </p>
        <dl>
          <div>
            <dt>Document type</dt>
            <dd>{credential.documentType}</dd>
          </div>
          <div>
            <dt>Issuing body</dt>
            <dd>{credential.issuer}</dd>
          </div>
          <div>
            <dt>Public reference</dt>
            <dd>Pending final document review</dd>
          </div>
        </dl>
        <span className="document-watermark">SAMPLE</span>
        <span className="document-stamp">Replace before publishing</span>
        <small>This preview is not an official credential.</small>
      </div>
    </div>
  );
}

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
      return (current - 1 + credentials.length) % credentials.length;
    });
  }, []);

  const next = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + 1) % credentials.length;
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

  const active = openIndex === null ? null : credentials[openIndex];
  return (
    <>
      <StyledCredentialRegister>
        {credentialGroups.map((group) => (
          <StyledCredentialGroup key={group.id}>
            <header>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </header>
            <div className="credential-documents">
              {group.credentials.map((credential) => {
                const index = credentials.findIndex((item) => item.id === credential.id);
                return (
                  <figure key={credential.id} className={credential.layout}>
                    <button
                      ref={(node) => {
                        openerRefs.current[index] = node;
                      }}
                      type="button"
                      className="credential-document-button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Enlarge ${credential.title}`}
                    >
                      <CredentialDocumentVisual credential={credential} />
                    </button>
                    <figcaption>
                      <div>
                        <h3>{credential.title}</h3>
                        <p>{credential.issuer}</p>
                      </div>
                      <span className="document-open-cue">
                        View full document <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                      <small>Sample placeholder. Replace before publishing.</small>
                      {credential.verificationNote ? <em>{credential.verificationNote}</em> : null}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </StyledCredentialGroup>
        ))}
      </StyledCredentialRegister>

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
          <button
            ref={closeButtonRef}
            type="button"
            className="close"
            onClick={close}
            aria-label="Close enlarged credential"
          >
            <X size={22} />
          </button>
          <button type="button" className="previous" onClick={previous} aria-label="Previous credential">
            <ChevronLeft size={24} />
          </button>
          <StyledCredentialLightboxDocument>
            <CredentialDocumentVisual credential={active} lightbox />
            <div className="lightbox-caption">
              <strong>{active.title}</strong>
              <span>{active.issuer}</span>
              <small>
                {openIndex! + 1} / {credentials.length}
              </small>
            </div>
          </StyledCredentialLightboxDocument>
          <button type="button" className="next" onClick={next} aria-label="Next credential">
            <ChevronRight size={24} />
          </button>
        </StyledCredentialLightbox>
      ) : null}
    </>
  );
}
