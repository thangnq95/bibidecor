import { useState } from 'react';
import { getIdeaCategoryPage } from '../../categoryIdeas';
import { Breadcrumb } from '../../components/breadcrumb';
import { Icon } from '../../components/Icon';
import './IdeaCategoryPage.css';

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
          <Breadcrumb items={resolvedPage.hero.breadcrumb?.[lang] || []} />
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
