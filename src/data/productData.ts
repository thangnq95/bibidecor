import { ideas } from './ideas';

export const productThemeLabels = {
  bedroom: { vi: 'Phòng ngủ', en: 'Bedroom' },
  study: { vi: 'Góc học tập', en: 'Study corner' },
  desk: { vi: 'Bàn làm việc', en: 'Work desk' },
  shelf: { vi: 'Kệ decor', en: 'Decor shelf' },
};

export const PRODUCT_PAGE_SIZE = 10;

export function getProductThemeKeyFromIdeaSlug(slug = '') {
  if (slug.includes('goc-hoc-tap')) return 'study';
  if (slug.includes('ban-lam-viec')) return 'desk';
  if (slug.includes('ke-decor')) return 'shelf';
  return 'bedroom';
}

export function buildProductCatalog(lang) {
  return ideas.flatMap((idea) => {
    const themeKey = getProductThemeKeyFromIdeaSlug(idea.slug);
    const meta = idea.meta[lang];

    return (meta.shoppingItems || []).map((item, index) => ({
      id: `${idea.slug}-${index}-${item.name}`,
      name: item.name,
      detail: item.detail,
      price: item.price,
      shop: item.shop,
      ideaSlug: idea.slug,
      ideaTitle: meta.title,
      ideaSubtitle: meta.subtitle,
      image: idea.image,
      themeKey,
      themeLabel: productThemeLabels[themeKey]?.[lang] || themeKey,
    }));
  });
}
