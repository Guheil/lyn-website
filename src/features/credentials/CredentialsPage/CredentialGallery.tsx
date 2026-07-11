'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { PublicCredential } from '@/server/modules/credentials';
import {
  StyledCredentialGroup,
  StyledCredentialLightbox,
  StyledCredentialLightboxDocument,
  StyledCredentialRegister,
} from './elements';

type Layout = 'feature' | 'standard' | 'wide';
type Tone = 'sand' | 'ivory' | 'stone' | 'warm';
type Item = PublicCredential & { layout: Layout; tone: Tone };

const fallback: PublicCredential[] = [
  { id: 'business-registration', title: 'Business Registration', issuingOrganization: 'Business registration record', category: 'registration', imageUrl: '', altText: 'Business registration record', verificationUrl: '', displayOrder: 1 },
  { id: 'local-permit', title: 'Local Business Permit', issuingOrganization: 'Local business licensing record', category: 'permit', imageUrl: '', altText: 'Local business permit record', verificationUrl: '', displayOrder: 2 },
  { id: 'training', title: 'Property Services Training Certificate', issuingOrganization: 'Property services training record', category: 'certification', imageUrl: '', altText: 'Property services training certificate', verificationUrl: '', displayOrder: 3 },
  { id: 'membership', title: 'Industry Membership Certificate', issuingOrganization: 'Real estate and business network', category: 'membership', imageUrl: '', altText: 'Industry membership certificate', verificationUrl: '', displayOrder: 4 },
];

const categoryNames: Record<PublicCredential['category'], string> = {
  license: 'Licenses',
  registration: 'Registrations',
  permit: 'Permits',
  certification: 'Training and certifications',
  membership: 'Professional affiliations',
  other: 'Other business records',
};
const tones: Tone[] = ['ivory', 'sand', 'stone', 'warm'];

function enrich(rows: PublicCredential[]): Item[] {
  const list = rows.length ? rows : fallback;
  return list.map((row, index) => ({
    ...row,
    layout: index % 3 === 0 ? 'feature' : index % 3 === 2 ? 'wide' : 'standard',
    tone: tones[index % tones.length],
  }));
}

function Visual({ item, lightbox = false }: { item: Item; lightbox?: boolean }) {
  if (item.imageUrl) {
    return (
      <div className={`document-preview document-preview-${item.layout} document-tone-${item.tone}${lightbox ? ' is-lightbox' : ''}`}>
        {/* The document keeps its natural ratio. The source is a protected WebP route shared with the dashboard. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.altText} loading={lightbox ? 'eager' : 'lazy'} />
      </div>
    );
  }

  return (
    <div className={`document-preview document-preview-${item.layout} document-tone-${item.tone}${lightbox ? ' is-lightbox' : ''}`} aria-hidden="true">
      <div className="document-page">
        <div className="document-brand"><span>LB</span><i /></div>
        <p className="document-status">Business credential</p>
        <h3>{item.title}</h3>
        <p className="document-summary">Maintained as part of the group’s public business and professional record.</p>
        <dl>
          <div><dt>Document type</dt><dd>{categoryNames[item.category]}</dd></div>
          <div><dt>Issuing body</dt><dd>{item.issuingOrganization}</dd></div>
          <div><dt>Document reference</dt><dd>Available for review</dd></div>
        </dl>
        <span className="document-watermark">LB</span>
        <span className="document-stamp">Document record</span>
      </div>
    </div>
  );
}

export function CredentialGallery({ items: rows }: { items: PublicCredential[] }) {
  const items = useMemo(() => enrich(rows), [rows]);
  const groups = useMemo(() => Object.entries(items.reduce<Record<string, Item[]>>((accumulator, item) => {
    accumulator[item.category] ??= [];
    accumulator[item.category].push(item);
    return accumulator;
  }, {})), [items]);
  const itemCount = items.length;
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openers = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    setOpen((current) => {
      if (current !== null) window.setTimeout(() => openers.current[current]?.focus(), 0);
      return null;
    });
  }, []);
  const previous = useCallback(() => {
    setOpen((current) => current === null ? current : (current - 1 + itemCount) % itemCount);
  }, [itemCount]);
  const next = useCallback(() => {
    setOpen((current) => current === null ? current : (current + 1) % itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (open === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      else if (event.key === 'Tab') {
        const focusable = dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, close, previous, next]);

  const active = open === null ? null : items[open];

  return (
    <>
      <StyledCredentialRegister>
        {groups.map(([category, group]) => (
          <StyledCredentialGroup key={category}>
            <header>
              <h2>{categoryNames[category as PublicCredential['category']]}</h2>
              <p>Public-facing records presented for business verification and client confidence.</p>
            </header>
            <div className="credential-documents">
              {group.map((item) => {
                const index = items.findIndex((candidate) => candidate.id === item.id);
                return (
                  <figure key={item.id} className={item.layout}>
                    <button
                      ref={(node) => { openers.current[index] = node; }}
                      type="button"
                      className="credential-document-button"
                      onClick={() => setOpen(index)}
                      aria-label={`Enlarge ${item.title}`}
                    >
                      <Visual item={item} />
                    </button>
                    <figcaption>
                      <div><h3>{item.title}</h3><p>{item.issuingOrganization}</p></div>
                      <span className="document-open-cue">Open document <ArrowUpRight size={15} /></span>
                      {item.verificationUrl ? <a href={item.verificationUrl} target="_blank" rel="noopener noreferrer">Verify record <ExternalLink size={14} /></a> : null}
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
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} enlarged view`}
          data-lenis-prevent
          onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
        >
          <button ref={closeRef} type="button" className="close" onClick={close} aria-label="Close enlarged document"><X size={22} /></button>
          <button type="button" className="previous" onClick={previous} aria-label="Previous document"><ChevronLeft size={24} /></button>
          <StyledCredentialLightboxDocument>
            <Visual item={active} lightbox />
            <div className="lightbox-caption">
              <strong>{active.title}</strong>
              <span>{active.issuingOrganization}</span>
              <small>{open! + 1} / {itemCount}</small>
            </div>
          </StyledCredentialLightboxDocument>
          <button type="button" className="next" onClick={next} aria-label="Next document"><ChevronRight size={24} /></button>
        </StyledCredentialLightbox>
      ) : null}
    </>
  );
}
