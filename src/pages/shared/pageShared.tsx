import { useState } from 'react';

export const PRODUCT_PAGE_SIZE = 10;

function compactText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatBudgetMoney(amount) {
  return `${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
}

export function buildBudgetRangeText(option, lang) {
  if (option.id === 'over-5m') {
    return lang === 'vi' ? 'trên 5.000.000đ' : 'over 5,000,000 VND';
  }

  return lang === 'vi'
    ? `dưới ${formatBudgetMoney(option.maxPrice)}`
    : `up to ${new Intl.NumberFormat('en-US').format(option.maxPrice)} VND`;
}

export function buildBudgetSubtitle(option, lang) {
  if (lang === 'vi') {
    return option.id === 'over-5m'
      ? 'Những ý tưởng decor xinh xắn trong ngân sách trên 5.000.000đ.'
      : `Những ý tưởng decor xinh xắn trong ngân sách dưới ${formatBudgetMoney(option.maxPrice)}.`;
  }

  return option.id === 'over-5m'
    ? 'Cute decor ideas for budgets over 5,000,000 VND.'
    : `Cute decor ideas for budgets up to ${new Intl.NumberFormat('en-US').format(option.maxPrice)} VND.`;
}

export function buildBudgetSeoCopy(option, lang) {
  if (lang === 'vi') {
    return `Bộ sưu tập theo ngân sách ${option.label.vi.toLowerCase()} giúp bạn đi từ một con số cụ thể đến những gợi ý decor thật dễ ứng dụng. Bì Bì ưu tiên các ý tưởng có tổng chi phí rõ ràng, chia theo phong cách mềm mại, tươi sáng và hợp với không gian nhỏ lẫn không gian rộng. Bạn có thể lướt qua từng card để so sánh mức đầu tư, số món cần mua và bấm sang trang chi tiết khi muốn xem kỹ hơn. Đây là cách nhanh nhất để tìm ra một góc phòng vừa đẹp, vừa đúng túi tiền, lại vẫn giữ được vibe pastel dịu dàng của Bì Bì.`;
  }

  return `The ${option.label.en.toLowerCase()} budget collection helps you move from a spending limit to practical decor ideas that are easy to use. Bì Bì prioritizes ideas with clear estimated costs, all wrapped in a soft pastel feel that works for both small and spacious rooms. You can scan each card to compare the investment, item count, and open the detail page whenever you want a closer look. It is a simple way to find a room setup that feels cute, balanced, and friendly to your budget.`;
}

export function buildCategorySeoCopy(page, lang) {
  const title = page?.hero?.title?.[lang] || '';
  const subtitle = compactText(page?.hero?.subtitle?.[lang] || '');
  const totalCards = [page?.featured, ...(page?.sideCards || []), ...(page?.cards || [])].filter(Boolean).length;

  if (lang === 'vi') {
    return `Bộ sưu tập ${title.toLowerCase()} của Bì Bì được tuyển chọn để giữ đúng tinh thần mềm mại, sáng sủa và dễ thương mà bạn đang tìm. Từ những gợi ý nổi bật cho đến các card nhỏ bên dưới, mỗi ý tưởng đều hướng tới một không gian dễ ứng dụng, dễ phối và hợp với nhịp sống hằng ngày. ${subtitle} Với ${totalCards} gợi ý khác nhau, bạn có thể lướt qua, lưu lại hoặc mở chi tiết bất kỳ lúc nào để tìm thêm nguồn cảm hứng cho căn phòng của mình.`;
  }

  return `Bì Bì curates ${title.toLowerCase()} ideas to keep the mood soft, bright, and adorable. From the featured inspiration to the smaller cards below, every setup is designed to feel easy to save, easy to adapt, and friendly for everyday spaces. ${subtitle} With ${totalCards} different ideas, you can browse, save, or open any card when you want a little more inspiration for your room.`;
}

function extractProductPriceValue(value) {
  const digits = String(value || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

function buildProductSearchQuery(lang, key) {
  const queries = {
    all: '',
    trending: '',
    newest: '',
    decor: lang === 'vi' ? 'decor' : 'decor',
    stationery: lang === 'vi' ? 'văn phòng phẩm' : 'stationery',
    accessories: lang === 'vi' ? 'phụ kiện' : 'accessories',
    gifts: lang === 'vi' ? 'quà tặng' : 'gifts',
    cute: lang === 'vi' ? 'cute' : 'cute',
    budget: lang === 'vi' ? '100k' : '100k',
    bibi: lang === 'vi' ? 'bì bì' : 'cute picks',
  };

  return queries[key] || '';
}

function uniqueProducts(products) {
  const seen = new Set();
  return products.filter((product) => {
    if (!product || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function buildSectionItems(products: any[], terms: string[], limit: number, options: any = {}) {
  const base = [...products].sort((left, right) => {
    const leftPrice = extractProductPriceValue(left.price) ?? Number.MAX_SAFE_INTEGER;
    const rightPrice = extractProductPriceValue(right.price) ?? Number.MAX_SAFE_INTEGER;
    if (options.order === 'newest') {
      return (right.orderIndex ?? 0) - (left.orderIndex ?? 0) || leftPrice - rightPrice;
    }
    return (left.orderIndex ?? 0) - (right.orderIndex ?? 0) || leftPrice - rightPrice;
  });

  const ranked = base
    .map((product) => {
      const haystack = `${product.name} ${product.detail} ${product.price} ${product.shop} ${product.category} ${product.categoryLabel}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { product, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      const leftPrice = extractProductPriceValue(left.product.price) ?? Number.MAX_SAFE_INTEGER;
      const rightPrice = extractProductPriceValue(right.product.price) ?? Number.MAX_SAFE_INTEGER;
      if (options.order === 'newest') {
        return (right.product.orderIndex ?? 0) - (left.product.orderIndex ?? 0) || leftPrice - rightPrice;
      }
      return (left.product.orderIndex ?? 0) - (right.product.orderIndex ?? 0) || leftPrice - rightPrice;
    })
    .map(({ product }) => product);

  const fallback = base.filter((product) => !ranked.some((candidate) => candidate.id === product.id));
  return uniqueProducts([...ranked, ...fallback]).slice(0, limit);
}

export function buildDiscoverSections(products, lang) {
  const under100k = lang === 'vi' ? 'dưới 100k' : 'under 100k';
  const budgetProducts = products.filter((product) => {
    const price = extractProductPriceValue(product.price);
    return price != null && price <= 100000;
  });
  return [
    {
      id: 'trending',
      title: lang === 'vi' ? 'Đang được yêu thích' : 'Popular now',
      description: lang === 'vi' ? 'Những món dễ lưu, dễ phối và rất hợp vibe Bì Bì.' : 'A soft mix of easy-to-save picks that fit the Bì Bì vibe.',
      action: buildProductSearchQuery(lang, 'all'),
      items: buildSectionItems(products, ['cute', 'pastel', 'decor', 'phụ kiện', 'stationery', 'quà'], 5),
    },
    {
      id: 'newest',
      title: lang === 'vi' ? 'Mới cập nhật' : 'Fresh finds',
      description: lang === 'vi' ? 'Các gợi ý vừa được gom lại để bạn xem nhanh hơn.' : 'Recently added picks gathered into one soft shelf.',
      action: buildProductSearchQuery(lang, 'newest'),
      items: buildSectionItems(products, ['mới', 'new', 'fresh'], 5, { order: 'newest' }),
    },
    {
      id: 'decor',
      title: lang === 'vi' ? 'Decor nổi bật' : 'Decor highlights',
      description: lang === 'vi' ? 'Những món làm góc phòng mềm hơn, xinh hơn.' : 'Cute accents that make a room feel softer and brighter.',
      action: buildProductSearchQuery(lang, 'decor'),
      items: buildSectionItems(products, ['decor', 'trang trí', 'room', 'candle'], 5),
    },
    {
      id: 'stationery',
      title: lang === 'vi' ? 'Văn phòng phẩm đáng mua' : 'Stationery picks',
      description: lang === 'vi' ? 'Sổ tay, bút, sticker và vài món nhỏ rất dễ yêu.' : 'Notebooks, pens, stickers and tiny tools worth saving.',
      action: buildProductSearchQuery(lang, 'stationery'),
      items: buildSectionItems(products, ['văn phòng phẩm', 'stationery', 'notebook', 'sổ', 'bút', 'sticker'], 5),
    },
    {
      id: 'accessories',
      title: lang === 'vi' ? 'Phụ kiện nổi bật' : 'Accessory highlights',
      description: lang === 'vi' ? 'Túi, kẹp tóc, và chi tiết nhỏ làm outfit sáng hơn.' : 'Bags, clips and tiny accents that brighten an outfit.',
      action: buildProductSearchQuery(lang, 'accessories'),
      items: buildSectionItems(products, ['phụ kiện', 'accessories', 'tote', 'clip', 'kẹp', 'bag'], 5),
    },
    {
      id: 'gifts',
      title: lang === 'vi' ? 'Quà tặng dưới 100k' : 'Gifts under 100k',
      description: lang === 'vi' ? 'Những món nhỏ xinh, dễ chọn và dễ tặng.' : 'Small gifts that feel cute, easy and thoughtful.',
      action: buildProductSearchQuery(lang, 'budget'),
      items: buildSectionItems(budgetProducts.length ? budgetProducts : products, ['100k', '99', '79', '58', under100k, 'quà'], 5),
    },
    {
      id: 'cute',
      title: lang === 'vi' ? 'Cute Picks' : 'Cute Picks',
      description: lang === 'vi' ? 'Tông pastel, nhẹ nhàng và rất hợp để lưu lại.' : 'Soft pastel picks that are easy to save for later.',
      action: buildProductSearchQuery(lang, 'cute'),
      items: buildSectionItems(products, ['cute', 'pastel', 'cloud', 'soft', 'mây'], 5),
    },
    {
      id: 'bibi',
      title: lang === 'vi' ? 'Bì Bì gợi ý' : 'Bì Bì picks',
      description: lang === 'vi' ? 'Một nhóm món cân bằng giữa xinh, tiện và dễ mua.' : 'A balanced mix of cute, practical and easy-to-buy picks.',
      action: buildProductSearchQuery(lang, 'bibi'),
      items: buildSectionItems(products, ['bì bì', 'cute', 'decor', 'stationery', 'phụ kiện', 'quà'], 5, { order: 'newest' }),
    },
  ].map((section) => ({
    ...section,
    items: uniqueProducts(section.items),
  }));
}

export function GalleryProductCard({ lang, product, onOpenItem, variant = 'grid' }: any) {
  const [imageReady, setImageReady] = useState(false);
  const compact = variant === 'shelf';
  const categoryLabel = product.categoryLabel || product.category;
  const cardClassName = `product-card glass ${variant === 'shelf' ? 'product-card--shelf' : 'product-card--search'}`;

  return (
    <article className={cardClassName}>
      <button
        type="button"
        className="product-card__main"
        onClick={() => onOpenItem(product.route)}
        aria-label={`${product.name} - ${lang === 'vi' ? 'Mở chi tiết sản phẩm' : 'Open product details'}`}
      >
        <div className="product-card__media">
          <div className={`product-card__media-frame ${imageReady ? 'is-loaded' : ''}`}>
            {!imageReady && <span className="product-card__skeleton" aria-hidden="true" />}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageReady(true)}
              onError={() => setImageReady(true)}
            />
          </div>
          <span className="product-card__theme">{categoryLabel}</span>
        </div>

        <div className="product-card__body">
          <div className="product-card__head">
            <h3>{product.name}</h3>
            {!compact && product.detail ? <p>{product.detail}</p> : null}
          </div>

          <div className="product-card__meta">
            <strong>{product.price}</strong>
            <span>{product.shop}</span>
          </div>

          <div className="product-card__footer">
            <span className="product-card__tag">{categoryLabel}</span>
            <span className="product-card__cta">{lang === 'vi' ? 'Xem sản phẩm →' : 'View item →'}</span>
          </div>
        </div>
      </button>
    </article>
  );
}

export function buildCollectionSeoCopy(page: any, lang: 'vi' | 'en' | string) {
  const title = page?.titleVi || page?.titleEn || '';
  const subtitle = compactText(page?.subtitleVi || page?.subtitleEn || '');
  const totalItems = page?.items?.length || 0;

  if (lang === 'vi') {
    return `Trang ${title.toLowerCase()} của Bì Bì là nơi gom lại những món xinh theo cùng một cảm hứng để bạn dễ duyệt và dễ lưu hơn. Nội dung được chọn theo vibe nhẹ nhàng, tông màu pastel và trải nghiệm affiliate tiện lợi, nên bạn chỉ cần mở ra là có thể xem nhanh, so sánh và bấm sang nơi mua phù hợp khi cần. ${subtitle} Hiện tại bộ sưu tập có ${totalItems} gợi ý để bạn khám phá và quay lại bất cứ lúc nào khi muốn tìm thêm món hợp gu.`;
  }

  return `Bì Bì’s ${title.toLowerCase()} page gathers cute picks under one shared mood so you can browse and save them more easily. The collection is curated with a soft pastel feel and an affiliate-friendly experience, so you can scan ideas quickly, compare them, and jump to the right shop when needed. ${subtitle} Right now the collection includes ${totalItems} picks to explore whenever you want a little more inspiration.`;
}
