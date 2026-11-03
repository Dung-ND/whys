// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The GitHub Pages workflow sets SITE_URL and BASE_PATH (https://dung-nd.github.io + /whys/).
// With a custom domain, set SITE_URL to it and leave BASE_PATH empty.
const site = process.env.SITE_URL || 'https://dung-nd.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [svelte(), mdx(), sitemap()],
  markdown: {
    // No code blocks; Shiki's inline styles would also clash with the CSP below.
    syntaxHighlight: false,
  },
  prefetch: true,
  // Ship all CSS as files: Astro's CSP hashes miss the Svelte styles it would otherwise inline.
  build: { inlineStylesheets: 'never' },
  security: {
    // Content Security Policy, written into each page as a <meta> tag. Only the site's own
    // scripts run: Astro hashes every inline script it outputs. Inline `style="…"` attributes
    // are allowed because figures use them; they cannot run code.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  devToolbar: { enabled: false },
});
