import { useEffect, useMemo, useRef, useState } from 'react';
import { budgetOptions, getBudgetIdeas, getIdeaCategoryPage } from './categoryIdeas';
import { FloatingMascot } from './components/floatmascot';
import { AccessoriesPage } from './pages/accessories/AccessoriesPage';
import { BudgetPage } from './pages/budget/BudgetPage';
import { CollectionLandingPage } from './pages/collection/CollectionLandingPage';
import { DetailPage } from './pages/detail/DetailPage';
import { FavoritesPage } from './pages/favorites/FavoritesPage';
import { GiftsPage } from './pages/gifts/GiftsPage';
import { HomePage } from './pages/home/HomePage';
import { IdeaCategoryPage } from './pages/idea-category/IdeaCategoryPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ProductListPage } from './pages/products/ProductListPage';
import { StationeryPage } from './pages/stationery/StationeryPage';
import { Icon } from './components/Icon';
import {
  getCategorySlugFromPath,
  normalizePathname,
  routeForAccessories,
  routeForBudget,
  routeForDecorHome,
  routeForDiscover,
  routeForFavorites,
  routeForGifts,
  routeForIdea,
  routeForNotFound,
  routeForProducts,
  routeForSearch,
  routeForStationery,
} from './siteRoutes';
import { applySeoMetadata } from './seo';
import { ideas } from './data/ideas';
import { copy, categories, affiliatePicks } from './data/homeData';
import { broadPageConfigs } from './data/pageSeoData';
import { PRODUCT_PAGE_SIZE, buildProductCatalog } from './data/productData';
import { stationeryPageData } from './data/stationeryData';
import {
  buildBroadPageSeo,
  buildBudgetSeo,
  buildCategorySeo,
  buildDecorSeo,
  buildDiscoverCatalog,
  buildHomeSeo,
  buildIdeaSeo,
  buildNotFoundSeo,
  buildProductsSeo,
  buildSearchSeo,
} from './services/seo/seo';

const FAVORITE_PRODUCTS_STORAGE_KEY = 'bibidecor-favorite-products';

function getIdeaFromPath(pathname) {
  const current = normalizePathname(pathname);
  if (current === '/') return ideas[0];
  const slug = current.replace('/idea/', '');
  return ideas.find((idea) => idea.slug === slug) || ideas[0];
}
function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'vi';
    const saved = window.localStorage.getItem('bibidecor-lang');
    return saved === 'en' ? 'en' : 'vi';
  });
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    if (typeof window === 'undefined') return new Set();

    try {
      const saved = JSON.parse(window.localStorage.getItem(FAVORITE_PRODUCTS_STORAGE_KEY) || '[]');
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroQuery, setHeroQuery] = useState('');
  const [pendingMascotTarget, setPendingMascotTarget] = useState(null);
  const [locationTick, setLocationTick] = useState(0);
  const [path, setPath] = useState(() => (typeof window === 'undefined' ? '/' : normalizePathname(window.location.pathname)));
  const heroSearchRef = useRef(null);
  const topbarSearchRef = useRef(null);

  const content = copy[lang];
  const isHome = path === '/';
  const isDecorHome = path === routeForDecorHome();
  const isSearchPage = path === routeForSearch();
  const isDetailPage = path.startsWith('/idea/');
  const isCategoryPage = path.startsWith('/decor/');
  const isStationeryPage = path === routeForStationery();
  const isAccessoriesPage = path === routeForAccessories();
  const isDiscoverPage = path === routeForDiscover() || path === routeForProducts();
  const isGiftsPage = path === routeForGifts();
  const isFavoritesPage = path === routeForFavorites();
  const isNotFoundPage = path === routeForNotFound();
  const isBudgetPage = path.startsWith('/budget/');
  const budgetSlug = path.replace('/budget/', '') || budgetOptions[0].id;
  const currentSearchQuery = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('q') || '';
  }, [path, locationTick]);
  const currentIdea = isDetailPage ? getIdeaFromPath(path) : null;
  const categorySlug = getCategorySlugFromPath(path);
  const categoryPage = isDecorHome ? getIdeaCategoryPage('kham-pha') : isCategoryPage ? getIdeaCategoryPage(categorySlug || '') : null;
  const discoverCatalog = useMemo(() => buildDiscoverCatalog(lang), [lang]);
  const favoriteProducts = useMemo(
    () =>
      ideas.flatMap((ideaItem) => {
        const meta = ideaItem.meta[lang];
        return (meta.shoppingItems || [])
          .map((item, index) => ({
            id: `${ideaItem.slug}::${index}`,
            name: item.name,
            detail: item.detail,
            price: item.price,
            shop: item.shop,
            image: ideaItem.image,
            route: item.url || routeForIdea(ideaItem.slug),
            category: meta.title,
            categoryLabel: lang === 'vi' ? 'Sản phẩm yêu thích' : 'Saved product',
            orderIndex: index,
          }))
          .filter((item) => favoriteProductIds.has(item.id));
      }),
    [favoriteProductIds, lang],
  );
  const favoritesPage = useMemo(
    () => ({
      ...broadPageConfigs[routeForFavorites()],
      items: favoriteProducts,
    }),
    [favoriteProducts],
  );
  const budgetIdeas = useMemo(() => getBudgetIdeas(lang), [lang]);
  const isKnownPath =
    isHome ||
    isDecorHome ||
    isSearchPage ||
    isDetailPage ||
    isCategoryPage ||
    isAccessoriesPage ||
    isDiscoverPage ||
    isGiftsPage ||
    isFavoritesPage ||
    Boolean(broadPageConfigs[path]) ||
    isBudgetPage ||
    isNotFoundPage;
  const shouldShowNotFound = !isKnownPath;

  useEffect(() => {
    if (!shouldShowNotFound || isNotFoundPage || typeof window === 'undefined') return;
    window.history.replaceState({}, '', routeForNotFound());
    setPath(routeForNotFound());
    setLocationTick((value) => value + 1);
  }, [isNotFoundPage, shouldShowNotFound]);

  const seoData = useMemo(() => {
    if (isHome) return buildHomeSeo();
    if (isDecorHome) return buildDecorSeo(lang);
    if (isCategoryPage) return buildCategorySeo(categorySlug || 'kham-pha', lang, categoryPage);
    if (isStationeryPage) return buildBroadPageSeo(routeForStationery(), lang);
    if (isAccessoriesPage) return buildBroadPageSeo(routeForAccessories(), lang);
    if (isSearchPage) return buildSearchSeo(lang, currentSearchQuery, discoverCatalog);
    if (isDiscoverPage) return buildProductsSeo(lang, discoverCatalog);
    if (isGiftsPage) return buildBroadPageSeo(routeForGifts(), lang);
    if (isFavoritesPage) return buildBroadPageSeo(path, lang, { robots: 'noindex,follow', titleOverride: lang === 'vi' ? 'Yêu thích | Bì Bì' : 'Saved | Bì Bì' });
    if (broadPageConfigs[path]) return buildBroadPageSeo(path, lang);
    if (isBudgetPage) return buildBudgetSeo(lang, path.replace('/budget/', '') || budgetOptions[0].id, budgetIdeas);
    if (isDetailPage) return buildIdeaSeo(currentIdea || ideas[0], lang);
    if (isNotFoundPage) return buildNotFoundSeo(lang, path);
    return buildNotFoundSeo(lang, path);
  }, [budgetIdeas, categorySlug, categoryPage, currentIdea, currentSearchQuery, discoverCatalog, isAccessoriesPage, isBudgetPage, isCategoryPage, isDecorHome, isDiscoverPage, isFavoritesPage, isGiftsPage, isHome, isNotFoundPage, isSearchPage, isStationeryPage, lang, path]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('bibidecor-lang', lang);
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FAVORITE_PRODUCTS_STORAGE_KEY, JSON.stringify([...favoriteProductIds]));
  }, [favoriteProductIds]);

  useEffect(() => {
    applySeoMetadata(seoData);
  }, [seoData]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const timeout = window.setTimeout(() => {
      topbarSearchRef.current?.focus();
      topbarSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [searchOpen]);

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePathname(window.location.pathname));
      setLocationTick((value) => value + 1);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path]);

  useEffect(() => {
    if (!pendingMascotTarget || !isHome) return undefined;

    const targetMap = {
      hero: 'home-hero',
      categories: 'home-categories',
      featured: 'home-featured',
      trending: 'home-featured',
    };
    const targetId = targetMap[pendingMascotTarget];
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (pendingMascotTarget === 'hero') {
          heroSearchRef.current?.focus();
        }
      });
    }

    setPendingMascotTarget(null);
    return undefined;
  }, [isHome, pendingMascotTarget]);

  const switchLanguage = () => setLang((value) => (value === 'vi' ? 'en' : 'vi'));

  const navigate = (to) => {
    const url = new URL(to, window.location.origin);
    const next = normalizePathname(url.pathname);
    const nextUrl = `${next}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, '', nextUrl);
      setPath(next);
      setLocationTick((value) => value + 1);
    }
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const openItemRoute = (route) => {
    if (/^https?:\/\//i.test(String(route || ''))) {
      window.open(route, '_blank', 'noopener,noreferrer');
      return;
    }

    navigate(route);
  };

  const submitSearch = (value) => {
    const normalized = compactText(value);
    navigate(normalized ? `${routeForSearch()}?q=${encodeURIComponent(normalized)}` : routeForSearch());
  };

  const toggleFavoriteProduct = (productId) => {
    setFavoriteProductIds((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((value) => !value);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleMascotAction = (action) => {
    setMenuOpen(false);

    if (action === 'products') {
      navigate(routeForDiscover());
      return;
    }

    const target = action === 'hero' ? 'hero' : action === 'categories' ? 'categories' : 'featured';
    if (isHome) {
      const targetId = target === 'hero' ? 'home-hero' : target === 'categories' ? 'home-categories' : 'home-featured';
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (target === 'hero') {
          window.setTimeout(() => heroSearchRef.current?.focus(), 350);
        }
      }
      return;
    }

    setPendingMascotTarget(target);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <Header
        content={content}
        lang={lang}
        currentPath={path}
        menuOpen={menuOpen}
        searchOpen={searchOpen}
        searchQuery={heroQuery}
        searchInputRef={topbarSearchRef}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onToggleSearch={handleSearch}
        onCloseSearch={() => setSearchOpen(false)}
        onSwitchLanguage={switchLanguage}
        onNavigateHome={handleNavigateHome}
        onNavigate={navigate}
        onSearchQueryChange={setHeroQuery}
        onSearchSubmit={submitSearch}
        onOpenSaved={() => navigate(routeForFavorites())}
      />

      <main className={`page-shell ${isCategoryPage ? 'page-shell--idea' : ''} ${isStationeryPage ? 'page-shell--stationery' : ''}`}>
        <div className="ambient ambient-left" />
        <div className="ambient ambient-right" />

        {isHome ? (
          <>
            <HomePage
              content={content}
              lang={lang}
              ideas={ideas}
              categories={categories}
              picks={affiliatePicks}
              heroQuery={heroQuery}
              searchRef={heroSearchRef}
              onHeroQueryChange={setHeroQuery}
              onSearchSubmit={submitSearch}
              onOpenIdea={(slug) => navigate(routeForIdea(slug))}
              onOpenCategory={(route) => navigate(route)}
              onOpenBudget={(slug) => navigate(routeForBudget(slug))}
              onOpenPick={(route) => navigate(route)}
            />
          </>
        ) : isDecorHome || isCategoryPage ? (
          <IdeaCategoryPage
            content={content}
            lang={lang}
            page={categoryPage || getIdeaCategoryPage('kham-pha')}
            onOpenIdea={(slug) => navigate(routeForIdea(slug))}
          />
        ) : isStationeryPage ? (
          <StationeryPage
            content={content}
            lang={lang}
            pageData={stationeryPageData}
            onOpenRoute={(route) => navigate(route)}
          />
        ) : isAccessoriesPage ? (
          <AccessoriesPage onOpenRoute={openItemRoute} />
        ) : isSearchPage ? (
          <ProductListPage
            content={content}
            lang={lang}
            products={discoverCatalog}
            initialQuery={currentSearchQuery}
            pageTitle={lang === 'vi' ? 'Kết quả tìm kiếm' : 'Search results'}
            pageSubtitle={
              currentSearchQuery
                ? lang === 'vi'
                  ? `Các món xinh phù hợp với “${currentSearchQuery}”.`
                  : `Cute picks matching “${currentSearchQuery}”.`
                : content.productsSubtitle
            }
            onOpenItem={openItemRoute}
          />
        ) : isDiscoverPage ? (
          <ProductListPage
            content={content}
            lang={lang}
            products={discoverCatalog}
            onOpenItem={openItemRoute}
          />
        ) : isGiftsPage ? (
          <GiftsPage onOpenRoute={openItemRoute} />
        ) : isFavoritesPage ? (
          <FavoritesPage
            content={content}
            lang={lang}
            page={favoritesPage}
            onOpenItem={openItemRoute}
            onOpenExplore={() => navigate(routeForDiscover())}
          />
        ) : broadPageConfigs[path] ? (
          <CollectionLandingPage
            content={content}
            lang={lang}
            page={broadPageConfigs[path]}
            onOpenItem={openItemRoute}
            onOpenExplore={() => navigate(routeForDiscover())}
          />
        ) : isBudgetPage ? (
          <BudgetPage
            content={content}
            lang={lang}
            budgetSlug={budgetSlug || budgetOptions[0].id}
            ideas={budgetIdeas}
            onOpenIdea={(slug) => navigate(routeForIdea(slug))}
            onOpenBudget={(slug) => navigate(routeForBudget(slug))}
          />
        ) : isNotFoundPage || shouldShowNotFound ? (
          <NotFoundPage
            lang={lang}
            content={content}
            onGoHome={handleNavigateHome}
            onOpenDiscover={() => navigate(routeForDiscover())}
          />
        ) : (
          <DetailPage
            content={content}
            lang={lang}
            idea={currentIdea || ideas[0]}
            ideas={ideas}
            onBack={() => navigate('/')}
            onOpenIdea={(slug) => navigate(routeForIdea(slug))}
            onOpenProducts={() => navigate(routeForDiscover())}
            onToggleProductFavorite={toggleFavoriteProduct}
            isProductFavorite={(productId) => favoriteProductIds.has(productId)}
          />
        )}

        <Footer content={content.footer} lang={lang} />

        <FloatingMascot
          mascotSrc="/assets/mascot.png"
          suggestions={content.mascot.suggestions}
          menuItems={content.mascot.menuItems}
          defaultOpen
          ariaLabel={content.mascot.ariaLabel}
          backToTopLabel={lang === 'vi' ? 'Về đầu trang' : 'Back to top'}
          dismissLabel={content.mascot.dismissLabel}
          closeLabel={content.mascot.closeLabel}
          currentPath={path}
          onAction={handleMascotAction}
        />
      </main>

      <MobileMenu
        content={content}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(slug) => navigate(slug)}
      />
    </div>
  );
}

function Header(props) {
  const {
    content,
    lang,
    currentPath,
    menuOpen,
    searchOpen,
    searchQuery,
    searchInputRef,
    onToggleMenu,
    onToggleSearch,
    onCloseSearch,
    onSwitchLanguage,
    onNavigateHome,
    onNavigate,
    onSearchQueryChange,
    onSearchSubmit,
    onOpenSaved,
  } = props;

  return (
    <header className="topbar glass">
      <div className="topbar__inner">
        <button className="icon-btn mobile-only mobile-menu-trigger" type="button" onClick={onToggleMenu} aria-label={menuOpen ? content.closeMenu : content.openMenu}>
          <Icon name="menu" />
        </button>

        <button className="brand" type="button" onClick={onNavigateHome}>
          <span className="brand-mark">
            <img className="brand-logo" src="/assets/bibi-logo-transparent.png" alt="Bì Bì logo" width="1254" height="1254" loading="eager" decoding="async" />
          </span>
          <span className="brand-copy">
            <strong className="brand-name">Bì Bì</strong>
            <span className="brand-sub">{content.brandSub}</span>
          </span>
        </button>

        <nav className="desktop-nav" aria-label={content.menuLabel}>
          {content.navItems.map((item) => {
            const route = item.route;
            const isActive =
              currentPath === route ||
              (route === routeForDecorHome() && currentPath.startsWith('/decor/')) ||
              (route === routeForDiscover() && (currentPath === routeForProducts() || currentPath === routeForDiscover()));
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => onNavigate(route)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="top-actions">
          <button type="button" className="icon-btn topbar-saved-button" onClick={onOpenSaved} aria-label={content.saveLabel}>
            <Icon name="heart" />
          </button>

          <button
            className={`icon-btn ${searchOpen ? 'is-active' : ''}`}
            type="button"
            onClick={onToggleSearch}
            aria-label={lang === 'vi' ? 'Tìm kiếm' : 'Search'}
            aria-expanded={searchOpen}
          >
            <Icon name="search" />
          </button>

          <button className="lang-toggle" type="button" onClick={onSwitchLanguage} aria-label={content.language}>
            <span className={lang === 'vi' ? 'is-selected' : ''}>{content.vietnamese}</span>
            <span className={lang === 'en' ? 'is-selected' : ''}>{content.english}</span>
          </button>
        </div>
      </div>

      <div className={`topbar-search ${searchOpen ? 'is-open' : ''}`}>
        <div className="topbar-search__inner glass">
          <Icon name="search" />
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder={content.searchPlaceholder}
            aria-label={content.searchPlaceholder}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                onSearchSubmit(searchQuery);
              }
            }}
          />
          <button
            type="button"
            className="topbar-search__close"
            onClick={onCloseSearch}
            aria-label={lang === 'vi' ? 'Đóng tìm kiếm' : 'Close search'}
          >
            <Icon name="close" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ content, lang }) {
  const exploreItems = content.exploreItems;
  const shopItems = content.shopItems;

  return (
    <footer className="footer-card glass">
      <div className="decor-layer decor-layer--footer" aria-hidden="true">
        <span className="decor-cloud decor-cloud--far decor-cloud--5" />
        <span className="decor-cloud decor-cloud--near decor-cloud--6" />
        <span className="decor-sparkle decor-sparkle--4" />
        <span className="decor-sparkle decor-sparkle--5" />
        <span className="decor-sparkle decor-sparkle--6" />
      </div>

      <div className="footer-content">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="brand-mark brand-mark--footer">
              <img className="brand-logo" src="/assets/bibi-logo-transparent.png" alt="Bì Bì logo" width="1254" height="1254" loading="eager" decoding="async" />
            </span>
            <div className="footer-brand-copy">
              <strong>Bì Bì</strong>
              <span>{content.bottomLeftTitle}</span>
            </div>
          </div>

          <h2>{content.introTitle}</h2>
          <p>{content.introText}</p>
        </div>

        <div className="footer-columns">
          <section className="footer-column">
            <h3>{content.exploreTitle}</h3>
            <ul>
              {exploreItems.map((item) => (
                <li key={item}>
                  <span className="footer-bullet">✧</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-column">
            <h3>{content.shopTitle}</h3>
            <ul>
              {shopItems.map((item) => (
                <li key={item}>
                  <span className="footer-bullet">✧</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="footer-disclaimer">{content.disclaimer}</p>

      <div className="footer-bottom">
        <div className="footer-bottom__left">
          <strong>{content.bottomLeftTitle}</strong>
          <span>{content.bottomLeftText}</span>
        </div>

        <div className="footer-bottom__socials" aria-label={lang === 'vi' ? 'Mạng xã hội' : 'Social links'}>
          <button type="button" className="footer-social-pill footer-social-pill--instagram" aria-label="Instagram">
            <Icon name="instagram" />
          </button>
          <button type="button" className="footer-social-pill footer-social-pill--tiktok" aria-label="TikTok">
            <Icon name="tiktok" />
          </button>
          <button type="button" className="footer-social-pill footer-social-pill--facebook" aria-label="Facebook">
            <Icon name="facebook" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function MobileMenu({ content, open, onClose, onNavigate }) {
  if (!open) return null;

  return (
    <div className="mobile-menu-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="mobile-menu-sheet glass" onClick={(event) => event.stopPropagation()}>
        <div className="mobile-menu-sheet__top">
          <button type="button" className="icon-btn" onClick={onClose} aria-label={content.closeMenu}>
          <Icon name="close" />
        </button>
      </div>

      <button type="button" className="mobile-menu-products-button" onClick={() => onNavigate(routeForProducts())}>
        {content.allProducts}
      </button>

      <div className="mobile-menu-grid">
          {content.navItems.map((item) => {
            const route = item.route;
            return (
              <button key={item.id} type="button" className="mobile-menu-item" onClick={() => onNavigate(route)}>
                {item.label}
              </button>
            );
          })}
      </div>
    </div>
  </div>
  );
}

export default App;
