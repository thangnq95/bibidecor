import { Icon } from '../../components/Icon';

// Kept for future room-based feature work. Not currently mounted in App.
export function ShopTheLookSection({
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
}: any) {
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

function RoomImage({ room, activeProductId, rippleProductId, onHotspotSelect, onProductHover, onClearProductHover }: any) {
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

function RoomHotspot({ product, active, rippling, onClick, onHover, onHoverEnd }: any) {
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
}: any) {
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

function ProductCard({ lang, product, active, hovered, onActivate, onHover, onHoverEnd }: any) {
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
