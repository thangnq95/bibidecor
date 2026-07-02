const DEFAULT_SITE_URL = 'http://127.0.0.1:4173';
export const SITE_NAME = 'Bì Bì';

export function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
}

export function toAbsoluteUrl(path, origin = getSiteOrigin()) {
  if (!path) return origin;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.startsWith('/') ? path : `/${path}`, origin).toString();
}

function upsertMeta(head, attrs, content) {
  const selector = Object.entries(attrs)
    .map(([key, value]) => `[${key}="${String(value).replace(/"/g, '\\"')}"]`)
    .join('');
  let element = head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  if (content !== undefined) {
    element.setAttribute('content', content);
  }
  element.setAttribute('data-bibi-seo', 'true');
  return element;
}

function upsertLink(head, attrs) {
  const selector = Object.entries(attrs)
    .map(([key, value]) => `[${key}="${String(value).replace(/"/g, '\\"')}"]`)
    .join('');
  let element = head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  element.setAttribute('data-bibi-seo', 'true');
  return element;
}

function upsertScript(head, attrs, json) {
  const element = document.createElement('script');
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  element.textContent = JSON.stringify(json);
  element.setAttribute('data-bibi-seo', 'true');
  head.appendChild(element);
  return element;
}

export function createWebSiteSchema({ pageUrl, description, searchUrl }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: pageUrl,
    description,
  };

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: searchUrl,
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

export function createOrganizationSchema({ pageUrl, logoUrl, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: pageUrl,
    logo: logoUrl,
    description,
  };
}

export function createLogoSchema({ logoUrl, pageUrl, caption = SITE_NAME }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: `${SITE_NAME} logo`,
    caption,
    contentUrl: logoUrl,
    url: pageUrl || logoUrl,
  };
}

export function createImageObjectSchema({ imageUrl, pageUrl, caption, name }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: name || caption || SITE_NAME,
    caption,
    contentUrl: imageUrl,
    url: pageUrl || imageUrl,
  };
}

export function createBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createWebPageSchema({ name, description, pageUrl, imageUrl, breadcrumbItems, isPartOf }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: pageUrl,
  };

  if (imageUrl) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      contentUrl: imageUrl,
      url: imageUrl,
    };
  }

  if (breadcrumbItems?.length) {
    schema.breadcrumb = createBreadcrumbSchema(breadcrumbItems);
  }

  if (isPartOf) {
    schema.isPartOf = isPartOf;
  }

  return schema;
}

export function createCollectionPageSchema({ name, description, pageUrl, items, imageUrl }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: pageUrl,
    ...(imageUrl
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            contentUrl: imageUrl,
            url: imageUrl,
          },
        }
      : {}),
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'http://schema.org/ItemListOrderAscending',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: item.name,
          url: item.url,
          description: item.description,
          image: item.image,
        },
      })),
    },
  };
}

export function createItemListSchema({ name, description, pageUrl, items, imageUrl }) {
  return createCollectionPageSchema({ name, description, pageUrl, items, imageUrl });
}

export function createArticleSchema({ name, description, pageUrl, imageUrl, breadcrumbItems }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: name,
    description,
    url: pageUrl,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    mainEntityOfPage: pageUrl,
  };
}

export function createProductSchema({ name, description, pageUrl, imageUrl, brand, price, priceCurrency = 'VND', availability, sku }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: pageUrl,
  };

  if (imageUrl) schema.image = imageUrl;
  if (brand) schema.brand = { '@type': 'Brand', name: brand };
  if (sku) schema.sku = sku;
  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: availability || 'https://schema.org/InStock',
      url: pageUrl,
    };
  }

  return schema;
}

export function createFAQSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function createPersonSchema({ name, pageUrl, imageUrl, jobTitle, description }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: pageUrl,
  };

  if (imageUrl) schema.image = imageUrl;
  if (jobTitle) schema.jobTitle = jobTitle;
  if (description) schema.description = description;

  return schema;
}

export function applySeoMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  imageUrl,
  imageAlt,
  pageType,
  twitterCard = 'summary_large_image',
  schemas = [],
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  themeColor = '#b6d6ff',
  language = 'vi-VN',
}) {
  if (typeof document === 'undefined') return;

  const head = document.head;
  head.querySelectorAll('[data-bibi-seo="true"]').forEach((node) => node.remove());

  document.title = title;

  upsertMeta(head, { name: 'description' }, description);
  if (keywords?.length) {
    upsertMeta(head, { name: 'keywords' }, keywords.join(', '));
  }
  upsertMeta(head, { name: 'author' }, SITE_NAME);
  upsertMeta(head, { name: 'robots' }, robots);
  upsertMeta(head, { name: 'theme-color' }, themeColor);
  upsertMeta(head, { name: 'apple-mobile-web-app-capable' }, 'yes');
  upsertMeta(head, { name: 'apple-mobile-web-app-status-bar-style' }, 'default');
  upsertMeta(head, { name: 'apple-mobile-web-app-title' }, SITE_NAME);
  upsertMeta(head, { name: 'application-name' }, SITE_NAME);
  upsertMeta(head, { name: 'format-detection' }, 'telephone=no, email=no, address=no');
  upsertMeta(head, { 'http-equiv': 'content-language' }, language);

  upsertMeta(head, { property: 'og:site_name' }, SITE_NAME);
  upsertMeta(head, { property: 'og:title' }, title);
  upsertMeta(head, { property: 'og:description' }, description);
  upsertMeta(head, { property: 'og:url' }, canonicalUrl);
  upsertMeta(head, { property: 'og:type' }, pageType);
  upsertMeta(head, { property: 'og:image' }, imageUrl);
  upsertMeta(head, { property: 'og:image:alt' }, imageAlt);
  upsertMeta(head, { property: 'og:locale' }, 'vi_VN');
  upsertMeta(head, { name: 'twitter:card' }, twitterCard);
  upsertMeta(head, { name: 'twitter:title' }, title);
  upsertMeta(head, { name: 'twitter:description' }, description);
  upsertMeta(head, { name: 'twitter:image' }, imageUrl);
  upsertMeta(head, { name: 'twitter:image:alt' }, imageAlt);

  upsertLink(head, { rel: 'canonical', href: canonicalUrl });

  schemas.filter(Boolean).forEach((schema) => {
    upsertScript(
      head,
      {
        type: 'application/ld+json',
      },
      schema,
    );
  });
}
