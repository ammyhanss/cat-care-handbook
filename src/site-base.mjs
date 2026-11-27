/** Site base used by Astro and by root-relative diagram URLs. */
export const SITE_BASE = '/cat-care-handbook';

/**
 * Prefix a root-relative URL with the GitHub Pages base.
 * Absolute URLs, protocol-relative URLs, and paths that already include the base are unchanged.
 * Relative paths are left unchanged; the content checker rejects them.
 */
export function withSiteBase(src, base = SITE_BASE) {
  if (typeof src !== 'string' || src.length === 0) return src;
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return src;
  if (src.startsWith('//')) return src;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (!prefix.startsWith('/')) return src;
  if (src === prefix || src.startsWith(`${prefix}/`)) return src;
  if (src.startsWith('/')) return `${prefix}${src}`;
  return src;
}
