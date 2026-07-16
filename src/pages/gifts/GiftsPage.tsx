import { Icon } from '../../components/Icon';
import { routeForSearch } from '../../siteRoutes';
import type { GiftsPageProps } from '../../interfaces';
import './GiftsPage.css';

const giftSearch = (query: string) => `${routeForSearch()}?q=${encodeURIComponent(query)}`;

const occasions = [
  { id: 'birthday', title: 'Sinh nhật', text: 'Mang niềm vui đến ngày đặc biệt', image: '/assets/bedroom-pink.jpg', route: giftSearch('quà sinh nhật cute') },
  { id: 'love', title: 'Ngày kỉ niệm', text: 'Gửi yêu thương dịu dàng', image: '/assets/footer-bg-mobile.jpg', route: giftSearch('quà kỉ niệm dễ thương') },
  { id: 'graduation', title: 'Tốt nghiệp', text: 'Chúc mừng hành trình mới', image: '/assets/bookshelf.jpg', route: giftSearch('quà tốt nghiệp cute') },
  { id: 'memory', title: 'Kỷ niệm', text: 'Những khoảnh khắc đáng nhớ', image: '/assets/art-supplies.jpg', route: giftSearch('quà lưu niệm pastel') },
  { id: 'holiday', title: 'Giáng sinh & Tết', text: 'Trao quà - trao ấm áp', image: '/assets/hero-bg-mobile.jpg', route: giftSearch('quà giáng sinh tết cute') },
];

const recipients = [
  { id: 'lover', title: 'Cho người yêu', image: '/assets/bedroom-pink.jpg' },
  { id: 'bestie', title: 'Cho bạn thân', image: '/assets/art-supplies.jpg' },
  { id: 'mom', title: 'Cho mẹ', image: '/assets/footer-bg-desktop.jpg' },
  { id: 'coworker', title: 'Cho đồng nghiệp', image: '/assets/study-blue.jpg' },
  { id: 'teacher', title: 'Cho thầy cô', image: '/assets/products-hero-desktop.jpg' },
  { id: 'kid', title: 'Cho bé', image: '/assets/hero-bg-desktop.jpg' },
];

const products = [
  { id: 'plush-box', badge: 'Hot', title: 'Hộp quà gấu bông Blooming day', price: '159.000đ', image: '/assets/bedroom-pink.jpg' },
  { id: 'mug-set', badge: 'Dưới 300k', title: 'Set quà tặng mug & sóc thỏ', price: '245.000đ', image: '/assets/footer-bg-desktop.jpg' },
  { id: 'flower-box', badge: 'Bán chạy', title: 'Bó hoa len handmade tulip', price: '129.000đ', image: '/assets/art-supplies.jpg' },
  { id: 'cloud-lamp', badge: 'Mới', title: 'Đèn ngủ thỏ đám mây mini', price: '138.000đ', image: '/assets/hero-bg-mobile.jpg' },
  { id: 'pillow-pair', badge: 'Dưới 50k', title: 'Thiệp pop-up 3D cute', price: '45.000đ', image: '/assets/study-blue.jpg' },
  { id: 'secret-box', badge: 'Hot', title: 'Hộp quà secret box bí mật', price: '199.000đ', image: '/assets/products-hero-mobile.jpg' },
];

const combos = [
  { id: 'birthday', title: 'Combo cute cho bạn thân 3 món siêu xinh', price: '199.000đ', oldPrice: '249.000đ', sale: '-20%', image: '/assets/bedroom-pink.jpg' },
  { id: 'bear', title: 'Combo thỏ gấu bông & nến thơm', price: '279.000đ', oldPrice: '349.000đ', sale: '-20%', image: '/assets/footer-bg-desktop.jpg' },
  { id: 'study', title: 'Combo văn phòng nhỏ gọn xinh xắn', price: '159.000đ', oldPrice: '199.000đ', sale: '-20%', image: '/assets/art-supplies.jpg' },
  { id: 'flower', title: 'Combo quà handmade đáng yêu', price: '189.000đ', oldPrice: '259.000đ', sale: '-30%', image: '/assets/hero-bg-desktop.jpg' },
  { id: 'christmas', title: 'Combo giáng sinh ấm áp', price: '313.000đ', oldPrice: '399.000đ', sale: '-20%', image: '/assets/hero-bg-mobile.jpg' },
];

const chips = ['Dưới 50k', 'Dưới 200k', 'Quà handmade', 'Quà hot trend', 'Quà ý nghĩa', 'Quà cute', 'Đóng gói đẹp', 'Mới nhất'];

export function GiftsPage({ onOpenRoute }: GiftsPageProps) {
  return (
    <div className="page-content page-content--gifts">
      <section className="gift-hero glass">
        <div className="gift-hero__copy">
          <p className="gift-kicker">Bì Bì gift shop</p>
          <h1>Món quà nhỏ gửi trao yêu thương</h1>
          <p>Từ quà sinh nhật, lễ tốt nghiệp đến những món quà bất ngờ dành tặng người thương. Xinh xắn - ý nghĩa - dễ thương hết nấc.</p>
          <button type="button" className="gift-primary" onClick={() => onOpenRoute(giftSearch('quà tặng cute'))}>
            Tìm quà ngay
            <Icon name="arrow-up-right" />
          </button>
        </div>

        <div className="gift-hero__scene" aria-hidden="true">
          <div className="gift-box gift-box--large">
            <img src="/assets/mascot.png" alt="" />
          </div>
          <div className="gift-present gift-present--pink" />
          <div className="gift-present gift-present--blue" />
          <div className="gift-present gift-present--cream" />
          <span className="gift-spark gift-spark--one">♡</span>
          <span className="gift-spark gift-spark--two">✦</span>
          <span className="gift-spark gift-spark--three">✧</span>
        </div>
      </section>

      <section className="gift-category-strip glass" aria-label="Danh mục quà tặng">
        {[
          ['🎁', 'Sinh nhật'],
          ['♡', 'Tặng người yêu'],
          ['🎓', 'Tốt nghiệp'],
          ['🎂', 'Kỷ niệm'],
          ['💐', 'Phụ nữ'],
          ['🧸', 'Cho bạn bè'],
          ['💼', 'Cho đồng nghiệp'],
          ['🗓', 'Các dịp đặc biệt'],
        ].map(([icon, label]) => (
          <button key={label} type="button" className="gift-category-tile" onClick={() => onOpenRoute(giftSearch(label))}>
            <span>{icon}</span>
            <strong>{label}</strong>
          </button>
        ))}
      </section>

      <section className="gift-chip-row" aria-label="Bộ lọc quà tặng">
        {chips.map((chip) => (
          <button key={chip} type="button" onClick={() => onOpenRoute(giftSearch(chip))}>
            {chip}
          </button>
        ))}
      </section>

      <GiftSection title="Chọn quà theo dịp" action="Xem tất cả" onAction={() => onOpenRoute(giftSearch('quà tặng theo dịp'))}>
        <div className="gift-occasion-grid">
          {occasions.map((item) => (
            <button key={item.id} type="button" className="gift-occasion-card" onClick={() => onOpenRoute(item.route)}>
              <img src={item.image} alt="" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
                <em>Xem quà</em>
              </span>
            </button>
          ))}
        </div>
      </GiftSection>

      <GiftSection title="Gợi ý quà theo người nhận" action="Xem tất cả" onAction={() => onOpenRoute(giftSearch('quà tặng theo người nhận'))}>
        <div className="gift-recipient-grid">
          {recipients.map((item) => (
            <button key={item.id} type="button" className="gift-recipient-card" onClick={() => onOpenRoute(giftSearch(item.title))}>
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>
                <Icon name="heart" />
              </span>
            </button>
          ))}
        </div>
      </GiftSection>

      <GiftSection title="Quà tặng nổi bật" action="Xem tất cả sản phẩm" onAction={() => onOpenRoute(giftSearch('quà tặng nổi bật'))}>
        <div className="gift-product-grid">
          {products.map((item) => (
            <GiftProductCard key={item.id} item={item} onOpenRoute={onOpenRoute} />
          ))}
        </div>
      </GiftSection>

      <section className="gift-wrap-banner glass">
        <img src="/assets/mascot.png" alt="" />
        <div>
          <h2>Gói quà xinh - Trao là ghi điểm!</h2>
          <p>Dịch vụ gói quà và thiệp viết tay miễn phí tại Bì Bì.</p>
        </div>
        <button type="button" className="gift-primary gift-primary--light" onClick={() => onOpenRoute(giftSearch('gói quà thiệp viết tay'))}>
          Xem hướng dẫn
          <Icon name="arrow-up-right" />
        </button>
      </section>

      <GiftSection title="Combo quà tặng - Tiết kiệm hơn" action="Xem tất cả combo" onAction={() => onOpenRoute(giftSearch('combo quà tặng'))}>
        <div className="gift-combo-grid">
          {combos.map((item) => (
            <button key={item.id} type="button" className="gift-combo-card" onClick={() => onOpenRoute(giftSearch(item.title))}>
              <span className="gift-combo-card__sale">{item.sale}</span>
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>
                <em>{item.price}</em>
                <del>{item.oldPrice}</del>
              </span>
            </button>
          ))}
        </div>
      </GiftSection>

    </div>
  );
}

function GiftSection({ title, action, onAction, children }: any) {
  return (
    <section className="gift-section">
      <div className="gift-section__head">
        <h2>{title}</h2>
        <button type="button" onClick={onAction}>
          {action}
          <Icon name="arrow-up-right" />
        </button>
      </div>
      {children}
    </section>
  );
}

function GiftProductCard({ item, onOpenRoute }: any) {
  return (
    <article className="gift-product-card">
      <button type="button" className="gift-product-card__heart" aria-label="Lưu yêu thích">
        <Icon name="heart" />
      </button>
      <span className="gift-product-card__badge">{item.badge}</span>
      <button type="button" className="gift-product-card__main" onClick={() => onOpenRoute(giftSearch(item.title))}>
        <img src={item.image} alt="" />
        <strong>{item.title}</strong>
        <em>{item.price}</em>
        <span>
          Xem deal
          <Icon name="arrow-up-right" />
        </span>
      </button>
    </article>
  );
}
