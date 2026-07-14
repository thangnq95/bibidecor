import { routeForBudget, routeForDiscover } from '../../siteRoutes';
import { Icon } from '../../components/Icon';

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
