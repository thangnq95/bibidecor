import { type CSSProperties, useMemo, useRef, useState } from 'react';
import { Icon } from '../../components/Icon';

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
