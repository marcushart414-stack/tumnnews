// src/lib/useSEO.ts
//
// React Router doesn't touch document.title or meta tags when navigating.
// This hook sets title/description, OpenGraph + Twitter tags, a canonical
// link, and an optional JSON-LD structured-data block (e.g. NewsArticle).
//
// LIMITATION: this only updates the DOM after React has rendered. Modern
// Googlebot executes JS and will see it, but social previews (Twitter/X,
// Facebook, iMessage) generally do not execute JS, so they will still show
// a generic card. Fixing that fully requires SSR or prerendering.

import { useEffect } from 'react';

const SITE_NAME = 'Transform U Media Network';
const SITE_URL = 'https://tumnnews.com';
const DEFAULT_DESCRIPTION = 'Transform U Media Network — Urban News Journal, Transform U! Live Show, Kinetic PE MIXX, Warrior Mandate, and TUMN Academy.';

interface SEOOptions {
    image?: string | null;
    path?: string;
    jsonLd?: Record<string, unknown>;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, key);
          document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function useSEO(title: string, description: string = DEFAULT_DESCRIPTION, options: SEOOptions = {}) {
    useEffect(() => {
          const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
          document.title = fullTitle;

                  setMeta('name', 'description', description);
          setMeta('property', 'og:title', fullTitle);
          setMeta('property', 'og:description', description);
          setMeta('property', 'og:type', options.jsonLd ? 'article' : 'website');
          setMeta('name', 'twitter:title', fullTitle);
          setMeta('name', 'twitter:description', description);

                  if (options.image) {
                          setMeta('property', 'og:image', options.image);
                          setMeta('name', 'twitter:image', options.image);
                  }

                  const canonicalUrl = `${SITE_URL}${options.path || window.location.pathname}`;
          let canonical = document.querySelector('link[rel="canonical"]');
          if (!canonical) {
                  canonical = document.createElement('link');
                  canonical.setAttribute('rel', 'canonical');
                  document.head.appendChild(canonical);
          }
          canonical.setAttribute('href', canonicalUrl);
          setMeta('property', 'og:url', canonicalUrl);

                  const existingJsonLd = document.getElementById('seo-jsonld');
          if (existingJsonLd) existingJsonLd.remove();
          if (options.jsonLd) {
                  const script = document.createElement('script');
                  script.id = 'seo-jsonld';
                  script.type = 'application/ld+json';
                  script.textContent = JSON.stringify(options.jsonLd);
                  document.head.appendChild(script);
          }
    }, [title, description, options.image, options.path, options.jsonLd]);
}
