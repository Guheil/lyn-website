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

type CredentialItem = {
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
  credentials: CredentialItem[];
};

const credentialGroups: CredentialGroup[] = [
  {
    id: 'business-records',
    title: 'Business records',
    description:
      'Core business records connected to the group’s registration, local operations, and property services in La Union.',
    credentials: [
      {
        id: 'business-registration',
        title: 'Business Registration',
        issuer: 'Business registration record',
        documentType: 'Registration record',
        layout: 'feature',
        tone: 'ivory',
        verificationNote: 'Reference details are available through the property group.',
      },
      {
        id: 'business-permit',
        title: 'Local Business Permit',
        issuer: 'Local business licensing record',
        documentType: 'Business permit',
        layout: 'standard',
        tone: 'sand',
      },
    ],
  },
  {
    id: 'supporting-records',
    title: 'Training and affiliations',
    description:
      'Training and affiliation records connected to property services, business participation, and continuing professional development.',
    credentials: [
      {
        id: 'training-certificate',
        title: 'Property Services Training Certificate',
        issuer: 'Property services training record',
        documentType: 'Training certificate',
        layout: 'wide',
        tone: 'stone',
        verificationNote: 'Training details are available through the property group.',
      },
      {
        id: 'membership-certificate',
        title: 'Industry Membership Certificate',
        issuer: 'Real estate and business network',
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
  credential: CredentialItem;
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
        <p className="document-status">Business credential</p>
        <h3>{credential.title}</h3>
        <p className="document-summary">
          Maintained as part of the group’s public business and professional record.
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
            <dt>Document reference</dt>
            <dd>Available for review</dd>
          </div>
        </dl>
        <span className="document-watermark">LB</span>
        <span className="document-stamp">Document record</span>
        <small>Public-facing record for business verification.</small>
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
                        Open document <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
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
