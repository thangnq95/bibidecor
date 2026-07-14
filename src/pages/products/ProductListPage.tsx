import { useEffect, useMemo, useState } from 'react';
import { routeForSearch } from '../../siteRoutes';
import { Icon } from '../../components/Icon';
import { PRODUCT_PAGE_SIZE, GalleryProductCard, buildDiscoverSections } from '../shared/pageShared';

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
