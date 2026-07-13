import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const allSeoRoutes = [
  '/',
  '/decor',
  '/stationery',
  '/accessories',
  '/gifts',
  '/san-pham-goi-y',
  '/budget/under-300k',
  '/budget/300k-500k',
  '/budget/500k-1m',
  '/budget/1m-2m',
  '/budget/2m-5m',
  '/budget/over-5m',
  '/decor/phong-ngu',
  '/decor/goc-hoc-tap',
  '/decor/phong-khach',
  '/decor/nha-bep',
  '/decor/ban-lam-viec',
  '/decor/phong-tre-em',
  '/decor/phong-tro',
  '/decor/kham-pha',
  '/idea/goc-hoc-tap-xanh-da-troi-pastel',
  '/idea/phong-ngu-hong-nhat-cong-chua',
  '/idea/ban-lam-viec-trang-kem-toi-gian',
  '/idea/ke-decor-cute-kieu-han',
];

const privateSeoRoutes = ['/search', '/yeu-thich', '/404', '/wishlist', '/cart', '/checkout', '/payment', '/order', '/order-tracking', '/account', '/admin'];

const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://127.0.0.1:4173';
const publicDir = resolve(process.cwd(), 'public');

function toAbsolute(path) {
  return new URL(path, siteUrl).toString();
}

const sitemapEntries = [...new Set(allSeoRoutes)].map((route) => {
  const priority = route === '/' ? '1.0' : route.startsWith('/idea/') ? '0.8' : '0.9';
  return [
    '  <url>',
    `    <loc>${toAbsolute(route)}</loc>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${sitemapEntries.join('\n')}\n` +
  `</urlset>\n`;

const robotsDisallow = [...new Set(privateSeoRoutes)].map((route) => `Disallow: ${route}`).join('\n');
const robotsTxt = `User-agent: *\nAllow: /\n${robotsDisallow}\nSitemap: ${toAbsolute('/sitemap.xml')}\n`;

await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
await writeFile(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8');
