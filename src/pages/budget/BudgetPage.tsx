import { useMemo, useState } from 'react';
import { budgetOptions, filterBudgetIdeas, getBudgetOption } from '../../categoryIdeas';
import { Icon } from '../../components/Icon';
import { buildBudgetRangeText, buildBudgetSubtitle } from '../shared/pageShared';

export { buildBudgetRangeText, buildBudgetSubtitle } from '../shared/pageShared';

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
