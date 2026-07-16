import { filterBudgetIdeas, getBudgetOption, getIdeaCategoryPage } from '../../categoryIdeas';
import { buildBudgetRangeText, buildBudgetSubtitle } from '../../pages/budget/BudgetPage';
import { affiliatePicks, copy } from '../../data/homeData';
import { broadPageConfigs, categorySeoMap } from '../../data/pageSeoData';
import { budgetOptions } from '../../data/categoryIdeas';
import {
  routeForBudget,
  routeForCategory,
  routeForDecorHome,
  routeForDiscover,
  routeForIdea,
  routeForNotFound,
  routeForProducts,
  routeForSearch,
} from '../../siteRoutes';
import {
  SITE_NAME,
  createArticleSchema,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createImageObjectSchema,
  createOrganizationSchema,
  createLogoSchema,
  createProductSchema,
  createWebPageSchema,
  createWebSiteSchema,
  getSiteOrigin,
  toAbsoluteUrl,
} from '../../seo';

function compactText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPriceValue(value) {
  const digits = String(value || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

export function buildCategorySeo(categorySlug, lang, categoryPage) {
  const seoCopy = categorySeoMap[categorySlug] || categorySeoMap['kham-pha'];
  const pageName = seoCopy[lang].title;
  const description = compactText(categoryPage?.hero?.subtitle?.[lang] || seoCopy[lang].description);
  const pageUrl = toAbsoluteUrl(routeForCategory(categorySlug));
  const siteUrl = getSiteOrigin();
  const pageTitle = `${pageName} | ${SITE_NAME}`;
  const image = toAbsoluteUrl(categoryPage?.hero?.image || '/assets/hero-bg-desktop.jpg');
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Ý tưởng' : 'Ideas', url: toAbsoluteUrl(routeForCategory('kham-pha')) },
    { name: categoryPage?.hero?.breadcrumb?.[lang]?.[2] || pageName, url: pageUrl },
  ];
  const itemList = [
    categoryPage?.featured,
    ...(categoryPage?.sideCards || []),
    ...(categoryPage?.cards || []),
  ]
    .filter(Boolean)
    .map((item) => ({
      name: item.title?.[lang] || item.title?.vi || item.slug || pageName,
      url: toAbsoluteUrl(routeForIdea(item.relatedSlug || item.slug)),
      description: compactText(item.description?.[lang] || item.description?.vi || ''),
      image: toAbsoluteUrl(item.image),
    }));

  return {
    title: pageTitle,
    description,
    keywords: [
      'Bì Bì',
      pageName,
      categorySlug,
      ...(categoryPage?.hero?.breadcrumb?.[lang] || []).slice(1),
      ...((categoryPage?.featured?.styleTags?.[lang] || []).slice(0, 4)),
    ].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: image,
    imageAlt: pageName,
    pageType: 'website',
    schemas: [
      createWebSiteSchema({
        pageUrl: siteUrl,
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: pageName,
        description,
        pageUrl,
        items: itemList,
        imageUrl: image,
      }),
      createWebPageSchema({
        name: pageName,
        description,
        pageUrl,
        imageUrl: image,
        breadcrumbItems,
      }),
    ],
  };
}

export function buildIdeaSeo(idea, lang) {
  const meta = idea.meta[lang];
  const pageUrl = toAbsoluteUrl(routeForIdea(idea.slug));
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Ý tưởng' : 'Ideas', url: toAbsoluteUrl(routeForCategory('kham-pha')) },
    { name: meta.title, url: pageUrl },
  ];

  return {
    title: `${meta.title} | ${SITE_NAME}`,
    description: compactText(meta.description),
    keywords: [SITE_NAME, meta.title, ...(meta.tags || []), 'decor', 'ý tưởng decor'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(idea.image),
    imageAlt: meta.title,
    pageType: 'article',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description: compactText(meta.description),
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createWebPageSchema({
        name: meta.title,
        description: compactText(meta.description),
        pageUrl,
        imageUrl: toAbsoluteUrl(idea.image),
        breadcrumbItems,
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl(idea.image),
        pageUrl,
        caption: meta.title,
      }),
      createArticleSchema({
        name: meta.title,
        description: compactText(meta.description),
        pageUrl,
        imageUrl: toAbsoluteUrl(idea.image),
        breadcrumbItems,
      }),
    ],
  };
}

export function buildHomeSeo() {
  const pageUrl = toAbsoluteUrl('/');
  const description =
    'Bì Bì gợi ý decor, mỹ phẩm, văn phòng phẩm, phụ kiện và quà tặng theo phong cách dễ thương, pastel, sáng tạo và dễ lưu lại mỗi ngày.';

  return {
    title: 'Bì Bì - Góc nhỏ gom những món xinh xinh cho bạn',
    description,
    keywords: [
      'Bì Bì',
      'decor phòng ngủ',
      'mỹ phẩm',
      'văn phòng phẩm',
      'phụ kiện',
      'quà tặng',
      'decor góc học tập',
      'ý tưởng dễ thương',
      'affiliate discovery',
    ],
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: 'Bì Bì',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: 'vi-VN',
    schemas: [
      createWebSiteSchema({
        pageUrl,
        description,
        searchUrl: toAbsoluteUrl(`${routeForSearch()}?q={search_term_string}`),
      }),
      createOrganizationSchema({
        pageUrl,
        logoUrl: toAbsoluteUrl('/assets/bibi-logo-circle.png'),
        description,
      }),
      createWebPageSchema({
        name: 'Bì Bì',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        pageUrl,
        caption: 'Bì Bì homepage hero',
      }),
      createLogoSchema({
        logoUrl: toAbsoluteUrl('/assets/bibi-logo-circle.png'),
        pageUrl,
        caption: 'Bì Bì logo',
      }),
    ],
  };
}

export function buildProductsSeo(lang, products) {
  const pageUrl = toAbsoluteUrl(routeForProducts());
  const title = lang === 'vi' ? 'Khám phá tất cả món xinh | Bì Bì' : 'Explore all cute picks | Bì Bì';
  const description =
    lang === 'vi'
      ? 'Khám phá toàn bộ món xinh được Bì Bì tổng hợp từ decor, văn phòng phẩm, phụ kiện và quà tặng.'
      : 'Browse the cute picks curated by Bì Bì across decor, stationery, accessories and gifts.';
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Khám phá' : 'Explore', url: pageUrl },
  ];
  const itemList = products.map((item) => ({
    name: item.name,
    url: toAbsoluteUrl(item.route || pageUrl),
    description: compactText(`${item.detail || item.description || ''} · ${item.category || item.shop || ''}`),
    image: toAbsoluteUrl(item.image),
  }));
  const productSchemas = products.slice(0, 12).map((item) =>
    createProductSchema({
      name: item.name,
      description: compactText(`${item.detail || item.description || ''} · ${item.category || item.shop || ''}`),
      pageUrl: toAbsoluteUrl(item.route || pageUrl),
      imageUrl: toAbsoluteUrl(item.image),
      brand: item.shop,
      price: extractPriceValue(item.price),
      priceCurrency: 'VND',
      sku: item.id,
    }),
  );

  return {
    title,
    description,
    keywords: [
      'Bì Bì',
      lang === 'vi' ? 'món xinh' : 'cute picks',
      lang === 'vi' ? 'danh sách gợi ý' : 'curated picks',
      'decor',
      'mỹ phẩm',
      'văn phòng phẩm',
      'phụ kiện',
      'quà tặng',
      'Shopee',
      'TikTok Shop',
      'Lazada',
    ],
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        pageUrl,
        caption: title,
      }),
      ...productSchemas,
    ],
  };
}

export function buildBroadPageSeo(path: string, lang: string, { robots, themeColor, titleOverride, descriptionOverride, pageType = 'website' }: any = {}) {
  const page = broadPageConfigs[path];
  if (!page) return buildHomeSeo();

  const pageUrl = toAbsoluteUrl(path);
  const title = titleOverride || `${page.titleVi || page.titleEn} | ${SITE_NAME}`;
  const description = compactText(descriptionOverride || page.subtitleVi || page.subtitleEn || '');
  const items = page.items || [];
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: page.titleVi || page.titleEn, url: pageUrl },
  ];
  const itemList = items.map((item) => ({
    name: item.titleVi || item.titleEn,
    url: toAbsoluteUrl(item.route || pageUrl),
    description: compactText(item.descriptionVi || item.descriptionEn || ''),
    image: toAbsoluteUrl(item.image),
  }));

  return {
    title: lang === 'vi' ? `${page.titleVi} | ${SITE_NAME}` : `${page.titleEn} | ${SITE_NAME}`,
    description,
    keywords: [SITE_NAME, page.titleVi, page.titleEn, 'affiliate', 'cute picks', 'pastel'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
    imageAlt: page.titleVi || page.titleEn,
    pageType,
    themeColor: themeColor || '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: page.titleVi || page.titleEn,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: page.titleVi || page.titleEn,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

export function buildDecorSeo(lang) {
  const page = getIdeaCategoryPage('kham-pha');
  const pageUrl = toAbsoluteUrl(routeForDecorHome());
  const description = compactText(page.hero.subtitle[lang]);
  const title = lang === 'vi' ? 'Decor | Bì Bì' : 'Decor | Bì Bì';
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Decor' : 'Decor', url: pageUrl },
  ];
  const itemList = [page.featured, ...(page.sideCards || []), ...(page.cards || [])]
    .filter(Boolean)
    .map((item) => ({
      name: item.title?.[lang] || item.slug || 'Decor idea',
      url: toAbsoluteUrl(routeForIdea(item.relatedSlug || item.slug)),
      description: compactText(item.description?.[lang] || ''),
      image: toAbsoluteUrl(item.image),
    }));

  return {
    title,
    description,
    keywords: ['Bì Bì', 'Decor', 'ý tưởng decor', 'pastel', 'trang trí nhà cửa'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
    imageAlt: lang === 'vi' ? 'Decor' : 'Decor',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: lang === 'vi' ? 'Decor' : 'Decor',
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: lang === 'vi' ? 'Decor' : 'Decor',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

export function buildDiscoverCatalog(lang) {
  return affiliatePicks.map((item, index) => ({
    id: item.id,
    name: lang === 'vi' ? item.titleVi : item.titleEn,
    detail: lang === 'vi' ? item.descriptionVi : item.descriptionEn,
    price: lang === 'vi' ? item.priceVi : item.priceEn,
    shop: item.source,
    route: item.route,
    category: lang === 'vi' ? item.categoryVi : item.categoryEn,
    image: item.image,
    categoryLabel: lang === 'vi' ? item.categoryVi : item.categoryEn,
    orderIndex: index,
  }));
}

function formatBudgetMoney(amount) {
  return `${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
}

export function buildBudgetSeo(lang, budgetSlug, budgetIdeas) {
  const option = getBudgetOption(budgetSlug);
  const pageUrl = toAbsoluteUrl(routeForBudget(option.id));
  const budgetText = buildBudgetRangeText(option, lang);
  const subtitle = buildBudgetSubtitle(option, lang);
  const description = compactText(subtitle);
  const filteredIdeas = filterBudgetIdeas(budgetIdeas, option.id);
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: copy[lang].budgetPageTitle, url: pageUrl },
  ];
  const itemList = filteredIdeas.map((item) => ({
    name: item.title,
    url: toAbsoluteUrl(routeForIdea(item.slug)),
    description: compactText(item.description),
    image: toAbsoluteUrl(item.image),
  }));

  return {
    title: `${copy[lang].budgetPageTitle} | ${budgetText} | ${SITE_NAME}`,
    description,
    keywords: [SITE_NAME, copy[lang].budgetPageTitle, budgetText, 'decor', 'ngân sách decor', 'budget decor'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: copy[lang].budgetPageTitle,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: copy[lang].budgetPageTitle,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: copy[lang].budgetPageTitle,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

export function buildSearchSeo(lang, query, products) {
  const pageUrl = toAbsoluteUrl(routeForSearch());
  const normalizedQuery = compactText(query);
  const title = normalizedQuery
    ? `${lang === 'vi' ? 'Kết quả tìm kiếm cho' : 'Search results for'} “${normalizedQuery}” | ${SITE_NAME}`
    : `${lang === 'vi' ? 'Tìm kiếm' : 'Search'} | ${SITE_NAME}`;
  const description = normalizedQuery
    ? lang === 'vi'
      ? `Tìm nhanh các gợi ý xinh xinh phù hợp với từ khóa “${normalizedQuery}” trên Bì Bì.`
      : `Quickly explore cute picks that match “${normalizedQuery}” on Bì Bì.`
    : lang === 'vi'
      ? 'Tìm kiếm các món decor, văn phòng phẩm, phụ kiện và quà tặng dễ thương.'
      : 'Search cute decor, stationery, accessories and gift picks.';
  const matchedProducts = products.filter((item) => {
    if (!normalizedQuery) return true;
    const haystack = `${item.name} ${item.detail} ${item.price} ${item.shop} ${item.category}`.toLowerCase();
    return haystack.includes(normalizedQuery.toLowerCase());
  });
  const itemList = matchedProducts.slice(0, 20).map((item) => ({
    name: item.name,
    url: toAbsoluteUrl(item.route || routeForDiscover()),
    description: compactText(`${item.detail || ''} · ${item.category || ''}`),
    image: toAbsoluteUrl(item.image),
  }));

  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Tìm kiếm' : 'Search', url: pageUrl },
  ];

  return {
    title,
    description,
    keywords: [SITE_NAME, normalizedQuery, 'search', 'cute picks', 'affiliate'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: SITE_NAME,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: 'noindex,follow',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createWebPageSchema({
        name: title,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
      createCollectionPageSchema({
        name: title,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
    ],
  };
}

export function buildNotFoundSeo(lang, path) {
  const pageUrl = toAbsoluteUrl(routeForNotFound());
  const title = lang === 'vi' ? `Không tìm thấy trang | ${SITE_NAME}` : `Page not found | ${SITE_NAME}`;
  const description = lang === 'vi' ? 'Trang bạn tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.' : 'The page you are looking for does not exist or has moved.';

  return {
    title,
    description,
    keywords: [SITE_NAME, '404', 'not found'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: SITE_NAME,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: 'noindex,nofollow',
    schemas: [
      createWebPageSchema({
        name: title,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems: [
          { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
          { name: lang === 'vi' ? '404' : '404', url: pageUrl },
        ],
      }),
    ],
  };
}
