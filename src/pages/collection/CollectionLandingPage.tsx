import { type CSSProperties } from 'react';
import { toAbsoluteUrl } from '../../seo';
import { GalleryProductCard } from '../shared/pageShared';

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

    </div>
  );
}
