'use client';

import { useEffect } from 'react';

export function PropertyViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `property-view:${slug}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, '1');
    } catch {
      // Tracking can continue even when browser storage is unavailable.
    }

    void fetch('/api/analytics/property-view', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true,
    });
  }, [slug]);

  return null;
}
