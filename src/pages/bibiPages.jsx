import { useEffect, useMemo, useState } from 'react';
import { budgetOptions, filterBudgetIdeas, getBudgetOption, getIdeaCategoryPage } from '../categoryIdeas';
import {
  routeForAccessories,
  routeForBeauty,
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

export function buildProductListSeoCopy(lang) {
  if (lang === 'vi') {
    return 'Trang khám phá của Bì Bì gom những món xinh từ nhiều danh mục khác nhau để bạn duyệt nhanh hơn mà không phải nhảy qua quá nhiều trang. Các thẻ nội dung được sắp xếp theo hướng dễ đọc, dễ lưu và dễ mở sang nơi mua khi bạn đã chọn được món hợp gu. Từ decor, mỹ phẩm, văn phòng phẩm đến phụ kiện và quà tặng, mỗi gợi ý đều được chọn để giữ đúng tinh thần dễ thương, sáng sủa và mềm mại của thương hiệu Bì Bì. Nếu bạn đang tìm một nơi tổng hợp nhẹ nhàng thay vì một cửa hàng trực tuyến thông thường, đây chính là điểm bắt đầu rất phù hợp.';
  }

  return 'The discover page brings together cute picks from multiple categories so you can browse faster without jumping between too many pages. The cards are arranged to stay easy to scan, easy to save, and easy to open on the shop side once you are ready to buy. From decor and beauty to stationery, accessories and gifts, every pick is curated to keep the soft, bright, and adorable Bì Bì vibe. If you want a gentle affiliate discovery space instead of a traditional storefront, this is a great place to begin.';
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

export function buildCollectionSeoCopy(page, lang) {
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
  heroQuery,
  searchRef,
  onHeroQueryChange,
  onSearchSubmit,
  onOpenIdea,
  onOpenCategory,
  onOpenBudget,
  onOpenPick,
}) {
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

    </div>
  );
}

export function CollectionLandingPage({ content, lang, page, onOpenItem, onOpenExplore }) {
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
        style={{ '--collection-hero-image': `url(${toAbsoluteUrl(heroImage)})` }}
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
            <HomePickCard key={item.id} pick={item} lang={lang} index={index} onOpenPick={onOpenItem} />
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

export function BudgetPage({ content, lang, budgetSlug, ideas, onOpenIdea, onOpenBudget }) {
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

      <section className="section-head section-head--tight seo-copy glass">
        <div>
          <h2>{lang === 'vi' ? 'Mẹo chọn theo ngân sách' : 'Budget picking tips'}</h2>
          <p>{buildBudgetSeoCopy(selectedBudget, lang)}</p>
        </div>
      </section>
    </div>
  );
}

function BudgetIdeaCard({ idea, lang, onOpenIdea }) {
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

export function NotFoundPage({ lang, content, onGoHome, onOpenDiscover }) {
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

function IdeaCard({ idea, lang, onOpenIdea }) {
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
}) {
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

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items = [1];
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

  const goToPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
  };

  return (
    <div className="page-content page-content--products">
      <section className="products-hero glass">
        <div className="products-hero__copy">
          <h1>{pageTitle || content.productsTitle}</h1>
          <p>{pageSubtitle || content.productsSubtitle}</p>

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
        </div>
      </section>

      <section className="product-toolbar">
        <div>
          <h2>{content.productsSectionTitle}</h2>
          <p>{content.productsSectionSub}</p>
        </div>
      </section>

      <section className="product-grid">
        {paginatedProducts.map((product) => (
          <button key={product.id} type="button" className="product-card glass" onClick={() => onOpenItem(product.route)}>
            <div className="product-card__media">
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              <span className="product-card__theme">{product.category}</span>
            </div>

            <div className="product-card__body">
              <div className="product-card__head">
                <h3>{product.name}</h3>
                <span className="product-card__idea">{product.shop}</span>
              </div>
              <p>{product.detail}</p>

              <div className="product-card__meta">
                <strong>{product.price}</strong>
                <span>{product.category}</span>
              </div>

              <div className="product-card__footer">
                <span>{lang === 'vi' ? 'Xem nơi mua' : 'See where to buy'}</span>
                <Icon name="arrow-up-right" />
              </div>
            </div>
          </button>
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

      <section className="section-head section-head--tight seo-copy glass">
        <div>
          <h2>{lang === 'vi' ? 'Vài dòng về trang khám phá' : 'A note about the discover page'}</h2>
          <p>{buildProductListSeoCopy(lang)}</p>
        </div>
      </section>
    </div>
  );
}

export function IdeaCategoryPage({ lang, page, onOpenIdea }) {
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

function IdeaStoryCard({ idea, lang, variant, liked, onToggleLiked, onOpenIdea }) {
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

export function DetailPage({ content, lang, idea, ideas, onBack, onOpenIdea, onOpenProducts }) {
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
}) {
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

function RoomImage({ room, activeProductId, rippleProductId, onHotspotSelect, onProductHover, onClearProductHover }) {
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

function RoomHotspot({ product, active, rippling, onClick, onHover, onHoverEnd }) {
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
}) {
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

function ProductCard({ lang, product, active, hovered, onActivate, onHover, onHoverEnd }) {
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
