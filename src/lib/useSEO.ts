// src/lib/useSEO.ts
//
// React Router doesn't touch document.title or <meta> tags when navigating —
// that's normal for a client-rendered SPA, but it means every page needs to
// set its own title/description or search results and browser tabs all show
// the same generic title. This hook does that without adding a dependency
// like react-helmet-async.
//
// IMPORTANT LIMITATION: this only updates the DOM after the page has already
// loaded and React has rendered. Search engines that execute JavaScript
// (modern Googlebot does) will see the right title/description, but the very
// first HTML response is always the same generic shell — and social media
// link previews (Twitter/X, Facebook, iMessage) generally do NOT execute
// JavaScript, so they'll always show the same generic preview card no matter
// which page is shared. Fixing that properly requires server-side rendering
// or prerendering, which is a bigger change than this hook — flagging it
// rather than pretending this fully solves SEO.

import { useEffect } from 'react';

const SITE_NAME = 'Transform U Media Network';
const DEFAULT_DESCRIPTION = 'Transform U Media Network — Urban News Journal, Transform U! Live Show, Kinetic PE MIXX, Warrior Mandate, and TUMN Academy.';

export function useSEO(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
}
