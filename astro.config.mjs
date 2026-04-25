// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogworms.co.uk',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/sitemap') &&
        !page.includes('/404') &&
        !page.includes('/llms.txt'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-GB',
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          ar: 'ar-SA',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/blog/eurofighter-typhoon-cost-price': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-generation-4th-5th': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-model-variants': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-operators-countries': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-specs-speed-range-weapons': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-vs-f-16': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-vs-f-35': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-vs-gripen': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-vs-rafale': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
    '/blog/eurofighter-typhoon-which-country-built-it': '/blog/eurofighter-typhoon-cost-generation-countries-comparison',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
