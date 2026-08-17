// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Fully static output. There is no server, no database and no analytics on
// answers — see /methodologie. Responses are political opinions, which are
// Article 9 special-category data under the GDPR, so the only safe design is
// one where they never leave the browser.
export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
