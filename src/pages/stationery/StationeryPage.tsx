import { type CSSProperties, useMemo, useRef, useState } from 'react';
import { Icon } from '../../components/Icon';
import type { StationeryPageProps, StationeryProduct, StationeryProductCardProps } from '../../interfaces';
import './StationeryPage.css';

function stationeryMatchesFilter(product: StationeryProduct, filterId: string) {
  if (filterId === 'all') return true;
  if (filterId === 'under-50k') return (product.priceValue || 0) < 50000;
  if (filterId === 'under-100k') return (product.priceValue || 0) < 100000;
  const flags = product.flags || [];
  return flags.includes(filterId);
}

function stationeryMatchesCategory(product: StationeryProduct, categoryId: string) {
  if (categoryId === 'all') return true;
  return (product.categories || []).includes(categoryId);
}

function StationeryProductCard({ lang, product, saved, onToggleSave, onOpenDeal, variant = 'grid' }: StationeryProductCardProps) {
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

export function StationeryPage({ content, lang, pageData, onOpenRoute }: StationeryPageProps) {
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
        style={
          {
            '--stationery-hero-image': 'url(/assets/stationery-hero-desktop.jpg)',
            '--stationery-hero-image-mobile': 'url(/assets/stationery-hero-mobile.jpg)',
          } as CSSProperties & Record<string, string>
        }
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

        <div className="stationery-hero__visual" aria-hidden="true" />
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
              {item.iconSrc ? <img src={item.iconSrc} alt="" loading="lazy" decoding="async" /> : item.icon}
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

    </div>
  );
}
