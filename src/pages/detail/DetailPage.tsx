import { Icon } from '../../components/Icon';

export function DetailPage({
  content,
  lang,
  idea,
  ideas,
  onBack,
  onOpenIdea,
  onOpenProducts,
  onToggleProductFavorite,
  isProductFavorite,
}: any) {
  const meta = idea.meta[lang];
  const getShoppingItemId = (index) => `${idea.slug}::${index}`;

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
          </div>

          <div className="detail-summary">
            <p className="detail-kicker">
              <Icon name="sparkle" /> {content.shopTag}
            </p>
            <h1>{meta.title}</h1>
            <p className="detail-description">{meta.description}</p>

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
            <div>
              <h3>{meta.shoppingTitle}</h3>
              <p className="shopping-panel__desc">
                {lang === 'vi' ? 'Giá sản phẩm có thể thay đổi tuỳ từng thời điểm.' : 'Product prices may change over time.'}
              </p>
            </div>
            <span>{meta.shoppingCount}</span>
          </div>

          <div className="shopping-list">
            {meta.shoppingItems.map((item, index) => {
              const productId = getShoppingItemId(index);
              const saved = Boolean(isProductFavorite?.(productId));

              return (
                <article key={item.name} className="shopping-item">
                  <div className="shopping-item__icon" />
                  <div className="shopping-item__body">
                    <h4>{item.name}</h4>
                    <p>{item.detail}</p>
                  </div>
                  <div className="shopping-item__price">{item.price}</div>
                  <div className="shopping-item__shop">{item.shop}</div>
                  <button
                    type="button"
                    className="buy-button"
                    onClick={() => {
                      if (item.url) {
                        window.open(item.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {content.buyNow}
                  </button>
                  <button
                    type="button"
                    className={`shopping-fav ${saved ? 'is-active' : ''}`}
                    aria-label={content.saveLabel}
                    aria-pressed={saved}
                    onClick={() => onToggleProductFavorite?.(productId)}
                  >
                    <Icon name="heart" />
                  </button>
                </article>
              );
            })}
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
