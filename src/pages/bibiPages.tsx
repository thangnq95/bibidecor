import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { budgetOptions, filterBudgetIdeas, getBudgetOption, getIdeaCategoryPage } from '../categoryIdeas';
import {
  routeForAccessories,
  routeForBudget,
  routeForCategory,
  routeForDecorHome,
  routeForDiscover,
  routeForFavorites,
  routeForGifts,
  routeForIdea,
  routeForNotFound,
  routeForProducts,
  routeForSearch,
  routeForStationery,
} from '../siteRoutes';
import { toAbsoluteUrl } from '../seo';
import { Icon } from '../components/Icon';

const PRODUCT_PAGE_SIZE = 10;

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

function buildDiscoverSections(products, lang) {
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

function GalleryProductCard({ lang, product, onOpenItem, variant = 'grid' }: any) {
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

export function HomePage({
  content,
  lang,
  ideas = [],
  categories = [],
  picks = [],
  shopLookSection,
  heroQuery,
  searchRef,
  onHeroQueryChange,
  onSearchSubmit,
  onOpenIdea,
  onOpenCategory,
  onOpenBudget,
  onOpenPick,
}: any) {
  const todayPicks = picks.slice(0, 6);
  const featuredIdeas = ideas.slice(0, 4);

  return (
    <div className="page-content page-content--home">
      <section className="hero-card glass home-section-anchor" id="home-hero">
        <div className="decor-layer decor-layer--hero" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--far decor-cloud--2" />
          <span className="decor-cloud decor-cloud--near decor-cloud--3" />
          <span className="decor-cloud decor-cloud--near decor-cloud--4" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
          <span className="decor-sparkle decor-sparkle--3" />
        </div>

        <div className="hero-card__copy">
          <h1>{content.heroTitle}</h1>
          <p className="hero-card__subtitle">{content.heroSubtitle}</p>
          <label className="search-bar" htmlFor="hero-search">
            <Icon name="search" />
            <input
              ref={searchRef}
              id="hero-search"
              value={heroQuery}
              onChange={(event) => onHeroQueryChange(event.target.value)}
              placeholder={content.searchPlaceholder}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  onSearchSubmit(heroQuery);
                }
              }}
            />
            <button type="button" className="search-bar__button" onClick={() => onOpenPick(routeForDiscover())}>
              {content.heroCta}
            </button>
          </label>
        </div>
      </section>

      <section className="popular-categories glass home-section-anchor" id="home-categories">
        <div className="popular-categories__head">
          <div>
            <h2>{content.categoriesTitle}</h2>
            <p>{content.categoriesSub}</p>
          </div>
        </div>

        <div className="popular-categories__grid popular-categories__grid--broad">
          {categories.map((category) => (
            <button key={category.slug} type="button" className={`popular-category-card popular-category-card--${category.color}`} onClick={() => onOpenCategory(category.route)}>
              <span className="popular-category-card__icon popular-category-card__icon--broad" aria-hidden="true">
                <img className="popular-category-card__icon-image popular-category-card__icon-image--home" src={category.iconSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </span>
              <span className="popular-category-card__copy">
                <strong className="popular-category-card__label">{lang === 'vi' ? category.labelVi : category.labelEn}</strong>
                <span className="popular-category-card__hint">{lang === 'vi' ? category.descriptionVi : category.descriptionEn}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-today glass home-section-anchor" id="home-today">
        <div className="home-today__head">
          <div>
            <h2>{lang === 'vi' ? 'Gợi ý hôm nay' : 'Today suggestions'}</h2>
            <p>{lang === 'vi' ? 'Một vài món xinh và ý tưởng đang hợp mood để bạn xem nhanh.' : 'A few cute picks and ideas that match today’s mood.'}</p>
          </div>

          <div className="home-today__actions">
            <button type="button" className="section-link section-link--soft" onClick={() => onOpenBudget(routeForBudget('300k-500k'))}>
              {lang === 'vi' ? 'Xem theo ngân sách' : 'Browse by budget'}
            </button>
            <button type="button" className="section-link" onClick={() => onOpenPick(routeForDiscover())}>
              {lang === 'vi' ? 'Xem tất cả' : 'View all'}
            </button>
          </div>
        </div>

        <div className="home-today__grid">
          <div className="home-today__featured">
            {featuredIdeas.map((idea, index) => {
              const meta = idea.meta[lang];
              return (
                <button key={idea.slug} type="button" className={`home-today-card home-today-card--featured home-today-card--${idea.accent}`} onClick={() => onOpenIdea(idea.slug)}>
                  <span className="home-today-card__index">0{index + 1}</span>
                  <img src={idea.image} alt={meta.title} loading="lazy" decoding="async" />
                  <span className="home-today-card__body">
                    <strong>{meta.title}</strong>
                    <span>{meta.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="home-today__picks">
            {todayPicks.map((pick, index) => (
              <button key={pick.id} type="button" className="home-mini-pick" onClick={() => onOpenPick(pick.route)}>
                <span className="home-mini-pick__index">{index + 1}</span>
                <img src={pick.image} alt={lang === 'vi' ? pick.titleVi : pick.titleEn} loading="lazy" decoding="async" />
                <span className="home-mini-pick__copy">
                  <strong>{lang === 'vi' ? pick.titleVi : pick.titleEn}</strong>
                  <span>{lang === 'vi' ? pick.descriptionVi : pick.descriptionEn}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {shopLookSection ? <div className="home-shop-look-wrap home-section-anchor">{shopLookSection}</div> : null}

    </div>
  );
}

export function CollectionLandingPage({ content, lang, page, onOpenItem, onOpenExplore }: any) {
  const pageTitle = lang === 'vi' ? page.titleVi : page.titleEn;
  const pageSubtitle = lang === 'vi' ? page.subtitleVi : page.subtitleEn;
  const pageItems = page.items || [];
  const emptyTitle = lang === 'vi' ? page.emptyTitleVi : page.emptyTitleEn;
  const emptyText = lang === 'vi' ? page.emptyTextVi : page.emptyTextEn;
  const heroImage = page.heroImage || '/assets/hero-bg-desktop.jpg';

  return (
    <div className="page-content page-content--collection">
      <section
        className={`collection-hero glass collection-hero--${page.accent || 'blue'}`}
        style={{ '--collection-hero-image': `url(${toAbsoluteUrl(heroImage)})` } as CSSProperties & Record<string, string>}
      >
        <div className="decor-layer decor-layer--hero" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--near decor-cloud--3" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
        </div>

        <div className="collection-hero__copy">
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
        </div>

        <div className="collection-hero__summary">
          <strong>{pageItems.length ? `${pageItems.length} ${lang === 'vi' ? 'món xinh' : 'cute picks'}` : lang === 'vi' ? '0 món xinh' : '0 cute picks'}</strong>
          <span>{lang === 'vi' ? 'Bộ sưu tập nhỏ xinh' : 'A tiny cute collection'}</span>
        </div>
      </section>

      {pageItems.length ? (
        <section className="collection-grid">
          {pageItems.map((item, index) => (
            <GalleryProductCard key={item.id} lang={lang} product={item} onOpenItem={onOpenItem} variant="grid" />
          ))}
        </section>
      ) : (
        <section className="collection-empty glass">
          <div className="budget-empty__icon">☁️</div>
          <h2>{emptyTitle}</h2>
          <p>{emptyText}</p>
          <button type="button" className="section-link budget-empty__button" onClick={onOpenExplore}>
            {lang === 'vi' ? 'Khám phá thêm' : 'Explore more'}
          </button>
        </section>
      )}

      <section className="section-head section-head--tight seo-copy glass">
        <div>
          <h2>{lang === 'vi' ? 'Giới thiệu bộ sưu tập' : 'About this collection'}</h2>
          <p>{buildCollectionSeoCopy(page, lang)}</p>
        </div>
      </section>
    </div>
  );
}

function stationeryMatchesFilter(product: any, filterId: string) {
  if (filterId === 'all') return true;
  if (filterId === 'under-50k') return (product.priceValue || 0) < 50000;
  if (filterId === 'under-100k') return (product.priceValue || 0) < 100000;
  const flags = product.flags || [];
  return flags.includes(filterId);
}

function stationeryMatchesCategory(product: any, categoryId: string) {
  if (categoryId === 'all') return true;
  return (product.categories || []).includes(categoryId);
}

function StationeryProductCard({ lang, product, saved, onToggleSave, onOpenDeal, variant = 'grid' }: any) {
  const tags = product.tags?.[lang] || [];
  const productName = product.name?.[lang] || product.name || '';

  return (
    <article className={`stationery-product-card glass stationery-product-card--${variant}`}>
      <button
        type="button"
        className="stationery-product-card__save"
        aria-pressed={saved}
        aria-label={lang === 'vi' ? 'Lưu yêu thích' : 'Save to wishlist'}
        onClick={(event) => {
          event.stopPropagation();
          onToggleSave(product.id);
        }}
      >
        <Icon name="heart" />
      </button>

      <button
        type="button"
        className="stationery-product-card__main"
        onClick={() => onOpenDeal(product.dealUrl)}
        aria-label={`${lang === 'vi' ? 'Mở sản phẩm' : 'Open product'}: ${productName}`}
      >
        <div className="stationery-product-card__media">
          <img src={product.image} alt={productName} loading="lazy" decoding="async" />
        </div>

        <div className="stationery-product-card__body">
          <div className="stationery-product-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="stationery-product-card__tag">
                {tag}
              </span>
            ))}
          </div>

          <h3>{productName}</h3>

          <div className="stationery-product-card__meta">
            <strong>{product.price}</strong>
            <span>{product.source}</span>
          </div>

          <span className="stationery-product-card__cta">{lang === 'vi' ? 'Xem sản phẩm' : 'View product'}</span>
        </div>
      </button>
    </article>
  );
}

function StationeryNeedCard({ lang, item, onOpenRoute }: any) {
  return (
    <button type="button" className="stationery-need-card glass" onClick={() => onOpenRoute(item.route)}>
      <span className="stationery-need-card__icon" aria-hidden="true">
        {item.icon}
      </span>
      <div className="stationery-need-card__copy">
        <h3>{item.title[lang]}</h3>
        <p>{item.description[lang]}</p>
      </div>
    </button>
  );
}

function StationeryVibeCard({ lang, item, onOpenRoute }: any) {
  return (
    <article className="stationery-vibe-card glass">
      <img src={item.image} alt={item.title[lang]} loading="lazy" decoding="async" />
      <div className="stationery-vibe-card__body">
        <h3>{item.title[lang]}</h3>
        <p>{item.description[lang]}</p>
        <button type="button" className="section-link section-link--soft" onClick={() => onOpenRoute(item.route)}>
          {item.cta[lang]}
        </button>
      </div>
    </article>
  );
}

export function StationeryPage({ content, lang, pageData, onOpenRoute }: any) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [savedIds, setSavedIds] = useState(() => new Set());
  const productsRef = useRef(null);

  const heroTitle = pageData.hero.title[lang];
  const heroSubtitle = pageData.hero.subtitle[lang];
  const heroCta = pageData.hero.cta[lang];
  const seoText = pageData.seo[lang];

  const visibleProducts = useMemo(
    () =>
      pageData.products.filter(
        (product) => stationeryMatchesCategory(product, activeCategory) && stationeryMatchesFilter(product, activeFilter),
      ),
    [activeCategory, activeFilter, pageData.products],
  );

  const spotlightProducts = useMemo(() => pageData.spotlightProducts || pageData.products.slice(0, 5), [pageData.products, pageData.spotlightProducts]);

  const toggleSaved = (productId) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setCategory = (categoryId) => {
    setActiveCategory(categoryId);
    window.requestAnimationFrame(scrollToProducts);
  };

  const setFilter = (filterId) => {
    setActiveFilter(filterId);
    window.requestAnimationFrame(scrollToProducts);
  };

  return (
    <div className="page-content page-content--stationery">
      <section
        className="stationery-hero glass"
        style={{ '--stationery-hero-image': `url(${pageData.hero.image})` } as CSSProperties & Record<string, string>}
      >
        <div className="decor-layer decor-layer--hero stationery-hero__decor" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--near decor-cloud--3" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
          <span className="decor-sparkle decor-sparkle--3" />
        </div>

        <div className="stationery-hero__copy">
          <span className="eyebrow">{lang === 'vi' ? 'Stationery by Bì Bì' : 'Stationery by Bì Bì'}</span>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>

          <div className="stationery-hero__actions">
            <button type="button" className="primary-button" onClick={scrollToProducts}>
              {heroCta}
            </button>
          </div>

          <div className="stationery-hero__chips">
            {pageData.heroChips.map((chip) => (
              <span key={chip[lang]} className="stationery-hero__chip">
                {chip[lang]}
              </span>
            ))}
          </div>
        </div>

        <div className="stationery-hero__visual">
          <div className="stationery-hero__card stationery-hero__card--main">
            <img src={pageData.hero.image} alt={heroTitle} loading="eager" decoding="async" />
          </div>
          <div className="stationery-hero__card stationery-hero__card--mini">
            <img src={pageData.hero.secondaryImage} alt="" loading="lazy" decoding="async" aria-hidden="true" />
            <div>
              <strong>{lang === 'vi' ? 'Sổ tay · Bút viết · Sticker' : 'Notebook · Pens · Stickers'}</strong>
              <span>{lang === 'vi' ? 'Góc học tập gọn xinh hơn mỗi ngày' : 'A cute, tidy study corner every day'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stationery-quick-grid">
        {pageData.quickCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`stationery-quick-card glass ${activeCategory === item.id ? 'is-active' : ''}`}
            onClick={() => setCategory(item.id)}
          >
            <span className="stationery-quick-card__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="stationery-quick-card__label">{item.label[lang]}</span>
          </button>
        ))}
      </section>

      <section className="stationery-chip-row">
        {pageData.filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`stationery-chip ${activeFilter === item.id ? 'is-active' : ''}`}
            onClick={() => setFilter(item.id)}
          >
            {item.label[lang]}
          </button>
        ))}
      </section>

      <section className="stationery-section glass">
        <div className="stationery-section__head">
          <div>
            <h2>{pageData.vibeTitle[lang]}</h2>
            <p>{pageData.vibeSubtitle[lang]}</p>
          </div>
          <button type="button" className="section-link section-link--soft" onClick={scrollToProducts}>
            {lang === 'vi' ? 'Xem tất cả' : 'View all'}
          </button>
        </div>

        <div className="stationery-vibe-rail">
          {pageData.vibes.map((item) => (
            <StationeryVibeCard key={item.id} lang={lang} item={item} onOpenRoute={onOpenRoute} />
          ))}
        </div>
      </section>

      <section ref={productsRef} className="stationery-section" id="stationery-products">
        <div className="stationery-section__head">
          <div>
            <h2>{pageData.productsTitle[lang]}</h2>
            <p>{pageData.productsSubtitle[lang]}</p>
          </div>
          <div className="stationery-section__count">
            {visibleProducts.length} {lang === 'vi' ? 'món' : 'items'}
          </div>
        </div>

        <div className="stationery-product-grid">
          {visibleProducts.map((product) => (
            <StationeryProductCard
              key={product.id}
              lang={lang}
              product={product}
              saved={savedIds.has(product.id)}
              onToggleSave={toggleSaved}
              onOpenDeal={(url) => window.open(url, '_blank', 'noopener,noreferrer')}
            />
          ))}
        </div>
      </section>

      <section className="stationery-highlight glass">
        <div className="stationery-section__head">
          <div>
            <h2>{pageData.spotlightTitle[lang]}</h2>
            <p>{pageData.spotlightSubtitle[lang]}</p>
          </div>
          <button type="button" className="section-link section-link--soft" onClick={scrollToProducts}>
            {lang === 'vi' ? 'Xem tất cả' : 'View all'}
          </button>
        </div>

        <div className="stationery-highlight__rail">
          {spotlightProducts.map((product, index) => (
            <div key={product.id} className="stationery-highlight-card">
              <span className="stationery-highlight-card__index">0{index + 1}</span>
              <StationeryProductCard
                lang={lang}
                product={product}
                saved={savedIds.has(product.id)}
                onToggleSave={toggleSaved}
                onOpenDeal={(url) => window.open(url, '_blank', 'noopener,noreferrer')}
                variant="spotlight"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="stationery-banner glass">
        <div className="stationery-banner__copy">
          <p className="stationery-banner__eyebrow">{lang === 'vi' ? 'Bì Bì gợi ý hôm nay' : 'Bì Bì’s today pick'}</p>
          <h2>{pageData.bannerTitle[lang]}</h2>
          <p>{pageData.bannerSubtitle[lang]}</p>
          <button type="button" className="section-link stationery-banner__button" onClick={() => onOpenRoute(pageData.bannerRoute)}>
            {pageData.bannerCta[lang]}
          </button>
        </div>

        <div className="stationery-banner__art" aria-hidden="true">
          <img src={pageData.bannerMascot} alt="" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="stationery-section">
        <div className="stationery-section__head">
          <div>
            <h2>{pageData.needsTitle[lang]}</h2>
            <p>{pageData.needsSubtitle[lang]}</p>
          </div>
        </div>

        <div className="stationery-need-grid">
          {pageData.needs.map((item) => (
            <StationeryNeedCard key={item.id} lang={lang} item={item} onOpenRoute={onOpenRoute} />
          ))}
        </div>
      </section>

    </div>
  );
}

export function BudgetPage({ content, lang, budgetSlug, ideas, onOpenIdea, onOpenBudget }: any) {
  const [sortKey, setSortKey] = useState('popular');
  const selectedBudget = getBudgetOption(budgetSlug);
  const budgetText = buildBudgetRangeText(selectedBudget, lang);
  const filteredIdeas = useMemo(() => filterBudgetIdeas(ideas, selectedBudget.id), [ideas, selectedBudget.id]);

  const sortedIdeas = useMemo(() => {
    const list = [...filteredIdeas];
    switch (sortKey) {
      case 'price-asc':
        return list.sort((a, b) => a.totalPrice - b.totalPrice);
      case 'price-desc':
        return list.sort((a, b) => b.totalPrice - a.totalPrice);
      case 'newest':
        return list.sort((a, b) => b.orderIndex - a.orderIndex);
      case 'popular':
      default:
        return list.sort((a, b) => b.popularity - a.popularity);
    }
  }, [filteredIdeas, sortKey]);

  const sortOptions = [
    { value: 'popular', label: content.budgetSortOptions.popular },
    { value: 'newest', label: content.budgetSortOptions.newest },
    { value: 'price-asc', label: content.budgetSortOptions.low },
    { value: 'price-desc', label: content.budgetSortOptions.high },
  ];

  return (
    <div className="page-content page-content--budget">
      <section className="budget-hero glass">
        <div className="decor-layer decor-layer--hero budget-hero__decor" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--near decor-cloud--4" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
        </div>

        <div className="budget-hero__copy">
          <span className="eyebrow">{content.budgetPageTitle}</span>
          <h1>{content.budgetPageTitle}</h1>
          <p>{buildBudgetSubtitle(selectedBudget, lang)}</p>
        </div>

        <div className="budget-hero__summary">
          <span>{lang === 'vi' ? `${sortedIdeas.length} ý tưởng phù hợp` : `${sortedIdeas.length} matching ideas`}</span>
          <strong>{selectedBudget.label[lang]}</strong>
        </div>
      </section>

      <section className="budget-filters glass">
        <div className="budget-filters__chips" role="tablist" aria-label={content.budgetTitle}>
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={option.id === selectedBudget.id}
              className={`budget-filter-chip ${option.id === selectedBudget.id ? 'is-active' : ''}`}
              onClick={() => onOpenBudget(option.id)}
            >
              {option.label[lang]}
            </button>
          ))}
        </div>

        <label className="budget-sort" htmlFor="budget-sort">
          <span>{content.budgetSortLabel}</span>
          <select id="budget-sort" value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="shop-look glass">
        <div className="shop-look__head">
          <div>
            <h2>{lang === 'vi' ? 'Shop the Look' : 'Shop the Look'}</h2>
            <p>{lang === 'vi' ? 'Xem nhanh một bố cục gợi ý từ các món đang hợp ngân sách.' : 'Preview a room-style layout built from picks that fit your budget.'}</p>
          </div>
        </div>

        <div className="shop-look__layout shop-look__layout--budget">
          <div className="shop-look__products">
            {sortedIdeas.slice(0, 3).map((item) => (
              <button key={item.id} type="button" className="product-card glass" onClick={() => onOpenIdea(item.slug)}>
                <div className="product-card__media">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <span className="product-card__theme">{item.roomCategory}</span>
                </div>
                <div className="product-card__body">
                  <div className="product-card__head">
                    <h3>{item.title}</h3>
                    <span className="product-card__idea">{item.totalPriceLabel}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="product-card__footer">
                    <span>{lang === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                    <Icon name="arrow-up-right" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {sortedIdeas.length ? (
        <section className="budget-grid-list">
          {sortedIdeas.map((item) => (
            <BudgetIdeaCard key={item.id} idea={item} lang={lang} onOpenIdea={onOpenIdea} />
          ))}
        </section>
      ) : (
        <section className="budget-empty glass">
          <div className="budget-empty__icon">☁️</div>
          <h2>{content.budgetEmpty}</h2>
          <p>{lang === 'vi' ? 'Hãy thử chọn một mốc ngân sách khác để xem thêm nhiều ý tưởng xinh xắn hơn.' : 'Try another budget range to see more cute decor ideas.'}</p>
          <button type="button" className="section-link budget-empty__button" onClick={() => onOpenBudget(budgetOptions[0].id)}>
            {content.budgetEmptyCta}
          </button>
        </section>
      )}

    </div>
  );
}

function BudgetIdeaCard({ idea, lang, onOpenIdea }: any) {
  return (
    <button type="button" className="budget-card glass" onClick={() => onOpenIdea(idea.slug)}>
      <div className="budget-card__media">
        <img src={idea.image} alt={idea.title} loading="lazy" decoding="async" />
        <span className="budget-card__badge">{idea.roomCategory}</span>
      </div>

      <div className="budget-card__body">
        <div className="budget-card__top">
          <h3>{idea.title}</h3>
          <span className="budget-card__arrow">
            <Icon name="arrow-up-right" />
          </span>
        </div>

        <p>{idea.description}</p>

        <div className="budget-card__meta">
          <div>
            <strong>{idea.totalPriceLabel}</strong>
            <span>{lang === 'vi' ? 'Ước tính tổng' : 'Estimated total'}</span>
          </div>
          <div>
            <strong>{idea.productCountLabel}</strong>
            <span>{lang === 'vi' ? 'Số món' : 'Items'}</span>
          </div>
        </div>

        <div className="budget-card__chips">
          {(idea.styleTags || []).slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <span className="budget-card__cta">{lang === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
      </div>
    </button>
  );
}

export function NotFoundPage({ lang, content, onGoHome, onOpenDiscover }: any) {
  return (
    <div className="page-content page-content--notfound">
      <section className="collection-empty glass">
        <div className="budget-empty__icon">☁️</div>
        <h1>{lang === 'vi' ? 'Bì chưa tìm thấy trang này.' : 'Bì could not find this page.'}</h1>
        <p>
          {lang === 'vi'
            ? 'Trang bạn đang mở có thể đã đổi địa chỉ hoặc không còn tồn tại. Hãy quay về trang chủ hoặc thử khám phá thêm các danh mục xinh xắn khác.'
            : 'This page may have moved or no longer exists. Go back home or keep exploring the cute categories available on Bì Bì.'}
        </p>
        <div className="notfound-actions">
          <button type="button" className="section-link budget-empty__button" onClick={onGoHome}>
            {lang === 'vi' ? 'Về trang chủ' : 'Go home'}
          </button>
          <button type="button" className="section-link budget-empty__button" onClick={onOpenDiscover}>
            {lang === 'vi' ? 'Khám phá món xinh' : 'Explore cute picks'}
          </button>
        </div>
      </section>
    </div>
  );
}

function IdeaCard({ idea, lang, onOpenIdea }: any) {
  const meta = idea.meta[lang];

  return (
    <button type="button" className="idea-card glass" onClick={() => onOpenIdea(idea.slug)}>
      <div className="idea-card__image-wrap">
        <img src={idea.image} alt={meta.title} className="idea-card__image" loading="lazy" decoding="async" />
        <span className="idea-card__fav">
          <Icon name="heart" />
        </span>
      </div>

      <div className="idea-card__body">
        <h3>{meta.title}</h3>
        <p>{meta.subtitle}</p>

        <div className="tag-row">
          {meta.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="idea-card__meta">
          <div>
            <strong>{meta.summary[0].value}</strong>
            <span>{meta.summary[0].hint}</span>
          </div>
          <div>
            <strong>{meta.summary[1].value}</strong>
            <span>{meta.summary[1].hint}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function ProductListPage({
  content,
  lang,
  products,
  onOpenItem,
  initialQuery = '',
  pageTitle,
  pageSubtitle,
}: any) {
  const isSearchMode = Boolean(pageTitle);
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      const haystack = `${product.name} ${product.detail} ${product.price} ${product.shop} ${product.category} ${product.route}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      return matchesSearch;
    });
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCT_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PRODUCT_PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(pageStart, pageStart + PRODUCT_PAGE_SIZE);
  const discoverSections = useMemo(() => buildDiscoverSections(filteredProducts, lang), [filteredProducts, lang]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginationItems = useMemo<Array<number | 'ellipsis-start' | 'ellipsis-end'>>(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [1];
    const left = Math.max(2, safePage - 1);
    const right = Math.min(totalPages - 1, safePage + 1);

    if (left > 2) items.push('ellipsis-start');
    for (let page = left; page <= right; page += 1) {
      items.push(page);
    }
    if (right < totalPages - 1) items.push('ellipsis-end');
    items.push(totalPages);
    return items;
  }, [safePage, totalPages]);

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
  };

  const openSearchResults = (searchQuery: string) => {
    onOpenItem(searchQuery ? `${routeForSearch()}?q=${encodeURIComponent(searchQuery)}` : routeForSearch());
  };

  return (
    <div className="page-content page-content--products">
      <section className={`products-hero glass ${isSearchMode ? 'products-hero--search' : 'products-hero--discover'}`}>
        <div className="decor-layer decor-layer--hero product-page__decor" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--near decor-cloud--3" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
        </div>

        <div className="products-hero__copy">
          <h1>{pageTitle || content.productsTitle}</h1>
          <p>{pageSubtitle || content.productsSubtitle}</p>

          {isSearchMode ? (
            <label className="product-search-bar" htmlFor="product-search">
              <Icon name="search" />
              <input
                id="product-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={content.productsSearch}
                aria-label={content.productsSearch}
              />
            </label>
          ) : null}
        </div>
      </section>

      {!isSearchMode ? (
        <section className="product-search-strip glass">
          <label className="product-search-bar product-search-bar--compact" htmlFor="product-search">
            <Icon name="search" />
            <input
              id="product-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={content.productsSearch}
              aria-label={content.productsSearch}
            />
          </label>
          <button type="button" className="section-link section-link--soft" onClick={() => setQuery('')}>
            {lang === 'vi' ? 'Làm mới' : 'Reset'}
          </button>
        </section>
      ) : null}

      {isSearchMode ? (
        filteredProducts.length ? (
          <>
            <section className="product-toolbar">
              <div>
                <h2>{content.productsSectionTitle}</h2>
                <p>{content.productsSectionSub}</p>
              </div>
              <div className="product-toolbar__count">
                {filteredProducts.length} {lang === 'vi' ? 'món' : 'items'}
              </div>
            </section>

            <section className="product-grid">
              {paginatedProducts.map((product) => (
                <GalleryProductCard key={product.id} lang={lang} product={product} onOpenItem={onOpenItem} variant="grid" />
              ))}
            </section>

            <nav className="product-pagination" aria-label={lang === 'vi' ? 'Phân trang sản phẩm' : 'Product pagination'}>
              <button
                type="button"
                className="product-pagination__arrow"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                aria-label={lang === 'vi' ? 'Trang trước' : 'Previous page'}
              >
                <Icon name="chevron-left" />
              </button>

              <div className="product-pagination__pages">
                {paginationItems.map((item) =>
                  item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                    <span key={item} className="product-pagination__ellipsis" aria-hidden="true">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      className={`product-pagination__page ${safePage === item ? 'is-active' : ''}`}
                      onClick={() => goToPage(item)}
                      aria-current={safePage === item ? 'page' : undefined}
                      aria-label={`${lang === 'vi' ? 'Trang' : 'Page'} ${item}`}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                className="product-pagination__arrow"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                aria-label={lang === 'vi' ? 'Trang sau' : 'Next page'}
              >
                <Icon name="chevron-right" />
              </button>
            </nav>
          </>
        ) : (
          <section className="product-empty glass">
            <h2>{lang === 'vi' ? 'Không tìm thấy món nào phù hợp' : 'No matching picks found'}</h2>
            <p>{lang === 'vi' ? 'Thử đổi từ khóa hoặc xoá tìm kiếm để xem lại toàn bộ gợi ý.' : 'Try another keyword or clear the search to see all picks again.'}</p>
            <button type="button" className="section-link section-link--soft" onClick={() => setQuery('')}>
              {lang === 'vi' ? 'Xoá tìm kiếm' : 'Clear search'}
            </button>
          </section>
        )
      ) : filteredProducts.length ? (
        <div className="product-shelves">
          {discoverSections.map((section) => (
            <section key={section.id} className="product-shelf glass">
              <div className="product-shelf__head">
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <button type="button" className="section-link section-link--soft" onClick={() => openSearchResults(section.action)}>
                  {lang === 'vi' ? 'Xem tất cả' : 'View all'}
                </button>
              </div>

              <div className="product-shelf__rail" role="list" aria-label={section.title}>
                {section.items.map((product) => (
                  <div key={`${section.id}-${product.id}`} role="listitem" className="product-shelf__item">
                    <GalleryProductCard lang={lang} product={product} onOpenItem={onOpenItem} variant="shelf" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <section className="product-empty glass">
          <h2>{lang === 'vi' ? 'Không tìm thấy món nào phù hợp' : 'No matching picks found'}</h2>
          <p>{lang === 'vi' ? 'Thử đổi từ khóa hoặc xoá bộ lọc để xem lại toàn bộ gợi ý.' : 'Try another keyword or reset the search to see all picks again.'}</p>
          <button type="button" className="section-link section-link--soft" onClick={() => setQuery('')}>
            {lang === 'vi' ? 'Xoá tìm kiếm' : 'Clear search'}
          </button>
        </section>
      )}
    </div>
  );
}

export function IdeaCategoryPage({ lang, page, onOpenIdea }: any) {
  const resolvedPage = page || getIdeaCategoryPage('phong-ngu');
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedIds, setLikedIds] = useState(() => new Set());
  const mobileFilters = resolvedPage.filters.filter((filter) => filter.id !== 'room');

  const allCards = [resolvedPage.featured, ...resolvedPage.sideCards, ...resolvedPage.cards];
  const filterNeedles = {
    all: [],
    minimal: ['tối giản', 'minimal', 'gọn'],
    cute: ['dễ thương', 'cute'],
    vintage: ['vintage'],
    modern: ['hiện đại', 'modern'],
    room: ['phòng trọ', 'studio', 'small room', 'góc nhỏ', 'phòng nhỏ'],
    light: ['sáng', 'bright'],
    wood: ['gỗ', 'wood'],
    smart: ['gọn', 'neat'],
  };

  const visibleCards = allCards.filter((item) => {
    if (activeFilter === 'all') return true;
    const haystack = `${item.title[lang]} ${item.description[lang]} ${(item.styleTags[lang] || []).join(' ')}`.toLowerCase();
    return (filterNeedles[activeFilter] || []).some((needle) => haystack.includes(needle));
  });

  const featuredCard = visibleCards[0] || resolvedPage.featured;
  const stackCards = visibleCards.slice(1, 3);
  const gridCards = visibleCards.slice(3);

  const toggleLiked = (id) => {
    setLikedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="page-content page-content--idea">
      <section className="idea-hero glass">
        <div className="decor-layer decor-layer--hero idea-hero__decor" aria-hidden="true">
          <span className="decor-cloud decor-cloud--far decor-cloud--1" />
          <span className="decor-cloud decor-cloud--far decor-cloud--2" />
          <span className="decor-cloud decor-cloud--near decor-cloud--3" />
          <span className="decor-sparkle decor-sparkle--1" />
          <span className="decor-sparkle decor-sparkle--2" />
          <span className="decor-sparkle decor-sparkle--3" />
        </div>

        <div className="idea-hero__copy">
          <h1>{resolvedPage.hero.title[lang]}</h1>
          <p className="idea-hero__subtitle">{resolvedPage.hero.subtitle[lang]}</p>
        </div>
      </section>

      <section className="idea-filter-row">
        <div className="idea-filter-chips">
          {mobileFilters.map((filter) => (
            <button key={filter.id} type="button" className={`idea-chip ${activeFilter === filter.id ? 'is-active' : ''}`} onClick={() => setActiveFilter(filter.id)}>
              <span className="idea-chip__icon">{filter.icon}</span>
              <span>{filter.label[lang]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="idea-board">
        <div className="idea-board__featured">
          <IdeaStoryCard idea={featuredCard} lang={lang} variant="featured" liked={likedIds.has(featuredCard.id)} onToggleLiked={toggleLiked} onOpenIdea={onOpenIdea} />
        </div>

        <div className="idea-board__stack">
          {stackCards.map((item) => (
            <IdeaStoryCard key={item.id} idea={item} lang={lang} variant="stack" liked={likedIds.has(item.id)} onToggleLiked={toggleLiked} onOpenIdea={onOpenIdea} />
          ))}
        </div>
      </section>

      <section className="idea-grid idea-grid--editorial">
        {gridCards.map((item) => (
          <IdeaStoryCard key={item.id} idea={item} lang={lang} variant="grid" liked={likedIds.has(item.id)} onToggleLiked={toggleLiked} onOpenIdea={onOpenIdea} />
        ))}
      </section>

    </div>
  );
}

function IdeaStoryCard({ idea, lang, variant, liked, onToggleLiked, onOpenIdea }: any) {
  const openIdea = () => onOpenIdea(idea.relatedSlug || idea.slug);

  return (
    <article className={`idea-story-card idea-story-card--${variant}`} onClick={openIdea}>
      <button
        type="button"
        className={`idea-story-card__heart ${liked ? 'is-active' : ''}`}
        aria-label={liked ? (lang === 'vi' ? 'Bỏ yêu thích' : 'Remove favorite') : lang === 'vi' ? 'Yêu thích' : 'Favorite'}
        onClick={(event) => {
          event.stopPropagation();
          onToggleLiked(idea.id);
        }}
      >
        <Icon name="heart" />
      </button>

      <div className="idea-story-card__media">
        <img src={idea.image} alt={idea.title[lang]} />
        {variant === 'featured' ? <span className="idea-story-card__badge">✨ {lang === 'vi' ? 'Gợi ý hôm nay' : 'Today pick'}</span> : null}
      </div>

      <div className="idea-story-card__body">
        <div className="idea-story-card__title-row">
          <h3>{idea.title[lang]}</h3>
          <span className="idea-story-card__arrow">
            <Icon name="arrow-up-right" />
          </span>
        </div>

        <p className="idea-story-card__desc">{idea.description[lang]}</p>

        <div className="idea-story-card__tags">
          {(idea.styleTags[lang] || []).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="idea-story-card__meta">
          <div>
            <strong>{idea.budget[lang]}</strong>
            <span>{lang === 'vi' ? 'Khoảng' : 'Budget'}</span>
          </div>
          <div>
            <strong>{idea.productCount[lang]}</strong>
            <span>{lang === 'vi' ? 'Cần mua' : 'Needed'}</span>
          </div>
        </div>

        {variant === 'featured' ? (
          <button type="button" className="idea-story-card__cta" onClick={openIdea}>
            ✨ {lang === 'vi' ? 'Khám phá góc này' : 'Explore this corner'}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function DetailPage({ content, lang, idea, ideas, onBack, onOpenIdea, onOpenProducts }: any) {
  const meta = idea.meta[lang];
  const galleryItems = [idea, ...ideas.filter((item) => item.slug !== idea.slug)].slice(0, 4);

  return (
    <div className="page-content page-content--detail">
      <section className="detail-shell glass">
        <div className="detail-header">
          <button type="button" className="back-link" onClick={onBack}>
            <Icon name="chevron-left" />
            <span>{content.backLabel}</span>
          </button>

          <div className="detail-actions">
            <button type="button" className="ghost-link">
              <Icon name="heart" />
              <span>{content.saveLabel}</span>
            </button>
            <button type="button" className="ghost-link">
              <Icon name="share" />
              <span>{content.shareLabel}</span>
            </button>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-gallery">
            <div className="detail-main-image-wrap">
              <img src={idea.image} alt={meta.title} className="detail-main-image" loading="eager" decoding="async" />
            </div>
            <div className="thumb-row">
              {galleryItems.map((item, index) => (
                <button key={item.slug} type="button" className="thumb-button" onClick={() => onOpenIdea(item.slug)}>
                  <img src={item.image} alt={`${item.meta[lang].title} ${index + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="detail-summary">
            <p className="detail-kicker">
              <Icon name="sparkle" /> {content.shopTag}
            </p>
            <h1>{meta.title}</h1>
            <p className="detail-description">{meta.description}</p>

            <div className="tag-row tag-row--wrap">
              {meta.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="summary-grid">
              {meta.summary.map((item) => (
                <article key={item.label} className="summary-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <em>{item.hint}</em>
                </article>
              ))}
            </div>

            <div className="detail-notes">
              <article className="note-card">
                <h3>{meta.benefitsTitle}</h3>
                <ul>
                  {meta.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </article>

              <article className="palette-card">
                <h3>{meta.paletteTitle}</h3>
                <div className="palette-row">
                  {idea.palette.map((color) => (
                    <span key={color} style={{ background: color }} />
                  ))}
                </div>
                <p>{meta.paletteNote}</p>
              </article>
            </div>
          </div>
        </div>

        <section className="shopping-panel">
          <div className="shopping-panel__head">
            <h3>{meta.shoppingTitle}</h3>
            <span>{meta.shoppingCount}</span>
          </div>

          <div className="shopping-list">
            {meta.shoppingItems.map((item) => (
              <article key={item.name} className="shopping-item">
                <div className="shopping-item__icon" />
                <div className="shopping-item__body">
                  <h4>{item.name}</h4>
                  <p>{item.detail}</p>
                </div>
                <div className="shopping-item__price">{item.price}</div>
                <div className="shopping-item__shop">{item.shop}</div>
                <button type="button" className="buy-button">
                  {content.buyNow}
                </button>
                <button type="button" className="shopping-fav" aria-label={content.saveLabel}>
                  <Icon name="heart" />
                </button>
              </article>
            ))}
          </div>

          <button type="button" className="section-link" onClick={onOpenProducts}>
            {meta.shoppingCta}
          </button>
        </section>

        <section className="related-grid">
          {ideas
            .filter((item) => item.slug !== idea.slug)
            .slice(0, 2)
            .map((item) => (
              <button key={item.slug} type="button" className="related-card glass" onClick={() => onOpenIdea(item.slug)}>
                <img src={item.image} alt={item.meta[lang].title} />
                <div>
                  <h3>{item.meta[lang].title}</h3>
                  <p>{item.meta[lang].subtitle}</p>
                </div>
              </button>
            ))}
        </section>
      </section>
    </div>
  );
}

// Kept for future room-based feature work. Not currently mounted in App.
function ShopTheLookSection({
  lang,
  rooms,
  activeRoom,
  activeProduct,
  previewProduct,
  selectedProductId,
  rippleProductId,
  onRoomSwitch,
  onHotspotSelect,
  onProductActivate,
  onProductHover,
  onClearProductHover,
  onClosePreview,
}: any) {
  const previewVisible = Boolean(previewProduct);

  return (
    <section className="shop-look glass home-section-anchor" id="home-shop-look">
      <div className="shop-look__head">
        <div>
          <h2>{lang === 'vi' ? 'Shop the Look' : 'Shop the Look'}</h2>
          <p>{lang === 'vi' ? 'Khám phá cả căn phòng và chọn từng món đang xuất hiện trong khung cảnh.' : 'Explore a full room and pick every item you see in the scene.'}</p>
        </div>

        <div className="shop-look__rooms" role="tablist" aria-label={lang === 'vi' ? 'Chọn không gian' : 'Choose room'}>
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              role="tab"
              aria-selected={room.id === activeRoom.id}
              className={`shop-look__room-pill ${room.id === activeRoom.id ? 'is-active' : ''}`}
              onClick={() => onRoomSwitch(room.id)}
            >
              {room.title}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-look__layout">
        <RoomImage
          room={activeRoom}
          activeProductId={activeProduct?.id || selectedProductId}
          rippleProductId={rippleProductId}
          onHotspotSelect={onHotspotSelect}
          onProductHover={onProductHover}
          onClearProductHover={onClearProductHover}
        />

        <ProductPanel
          lang={lang}
          room={activeRoom}
          activeProductId={activeProduct?.id || selectedProductId}
          previewProduct={previewProduct}
          previewVisible={previewVisible}
          onProductActivate={onProductActivate}
          onProductHover={onProductHover}
          onClearProductHover={onClearProductHover}
          onClosePreview={onClosePreview}
        />
      </div>
    </section>
  );
}

function RoomImage({ room, activeProductId, rippleProductId, onHotspotSelect, onProductHover, onClearProductHover }: any) {
  return (
    <div className="shop-look__image-shell">
      <div className="shop-look__image-wrap">
        <img className="shop-look__image" src={room.image} alt={room.title} loading="lazy" decoding="async" />
        <div className="shop-look__overlay" aria-hidden="true" />

        {room.products.map((product) => (
          <RoomHotspot
            key={product.id}
            product={product}
            active={product.id === activeProductId}
            rippling={product.id === rippleProductId}
            onClick={() => onHotspotSelect(product.id)}
            onHover={() => onProductHover(product.id)}
            onHoverEnd={onClearProductHover}
          />
        ))}
      </div>
    </div>
  );
}

function RoomHotspot({ product, active, rippling, onClick, onHover, onHoverEnd }: any) {
  return (
    <button
      type="button"
      className={`room-hotspot ${active ? 'is-active' : ''} ${rippling ? 'is-rippling' : ''}`}
      style={{ left: `${product.hotspotX}%`, top: `${product.hotspotY}%` }}
      aria-label={`Open ${product.name}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      onFocus={onHover}
      onBlur={onHoverEnd}
    >
      <span />
    </button>
  );
}

function ProductPanel({
  lang,
  room,
  activeProductId,
  previewProduct,
  previewVisible,
  onProductActivate,
  onProductHover,
  onClearProductHover,
  onClosePreview,
}: any) {
  const selectedProduct = room.products.find((product) => product.id === activeProductId) || room.products[0];

  return (
    <aside className="shop-look__panel">
      <div className={`shop-look__preview ${previewVisible ? 'is-open' : ''}`}>
        <div className="shop-look__preview-head">
          <div>
            <strong>{lang === 'vi' ? 'Xem nhanh' : 'Quick preview'}</strong>
            <span>{room.title}</span>
          </div>
          <button type="button" className="shop-look__preview-close" onClick={onClosePreview} aria-label={lang === 'vi' ? 'Đóng xem nhanh' : 'Close quick preview'}>
            ✕
          </button>
        </div>
        {previewProduct ? (
          <div className="shop-look__preview-body">
            <img src={previewProduct.thumbnail} alt={previewProduct.name} />
            <div>
              <h3>{previewProduct.name}</h3>
              <p>{previewProduct.category}</p>
            </div>
          </div>
        ) : (
          <p className="shop-look__preview-empty">{lang === 'vi' ? 'Chạm hotspot để xem trước món đồ.' : 'Tap a hotspot to preview the item.'}</p>
        )}
      </div>

      <div className="shop-look__products">
        {room.products.map((product) => (
          <ProductCard
            key={product.id}
            lang={lang}
            product={product}
            active={product.id === selectedProduct.id}
            hovered={product.id === activeProductId}
            onActivate={() => onProductActivate(product.id)}
            onHover={() => onProductHover(product.id)}
            onHoverEnd={onClearProductHover}
          />
        ))}
      </div>
    </aside>
  );
}

function ProductCard({ lang, product, active, hovered, onActivate, onHover, onHoverEnd }: any) {
  const handleOpenProduct = () => {
    onActivate();
    if (product.affiliateUrl && product.affiliateUrl !== '#') {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className={`shop-product-card ${active ? 'is-active' : ''} ${hovered ? 'is-hovered' : ''}`} onMouseEnter={onHover} onMouseLeave={onHoverEnd}>
      <button type="button" className="shop-product-card__main" onClick={handleOpenProduct} aria-label={`Open ${product.name}`}>
        <img src={product.thumbnail} alt={product.name} loading="lazy" decoding="async" />
        <div className="shop-product-card__copy">
          <h3>{product.name}</h3>
          <div className="shop-product-card__meta">
            <span>{product.price}</span>
            {product.brand ? <span>{product.brand}</span> : null}
          </div>
          <div className="shop-product-card__tags">
            <span>{product.color}</span>
            <span>{product.category}</span>
          </div>
        </div>
      </button>

      <div className="shop-product-card__actions">
        <button type="button" className="shop-product-card__buy" onClick={() => handleOpenProduct()}>
          {lang === 'vi' ? 'Mua' : 'Buy'}
        </button>
        <button type="button" className="shop-product-card__wish" aria-label="Save to wishlist">
          <Icon name="heart" />
        </button>
      </div>
    </article>
  );
}

export { ShopTheLookSection };
