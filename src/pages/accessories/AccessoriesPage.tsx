import { Icon } from '../../components/Icon';
import { routeForSearch } from '../../siteRoutes';
import type { AccessoriesPageProps } from '../../interfaces';
import './AccessoriesPage.css';

const accessorySearch = (query: string) => `${routeForSearch()}?q=${encodeURIComponent(query)}`;

const categories = [
  ['💍', 'Trang sức'],
  ['🌸', 'Kẹp tóc & Cột tóc'],
  ['👜', 'Túi xách & Ví'],
  ['📱', 'Phụ kiện điện thoại'],
  ['🕶️', 'Mắt kính'],
  ['⌚', 'Đồng hồ'],
  ['👒', 'Mũ & Nón'],
  ['🧸', 'Phụ kiện khác'],
];

const chips = ['Dưới 50k', 'Dưới 100k', 'Best seller', 'Hot trend', 'Phong cách Hàn', 'Minimalist', 'Vintage', 'Cute', 'Y2K', 'Quà tặng'];

const vibes = [
  { id: 'korean', title: 'Phong cách Hàn Quốc', text: 'Nhẹ nhàng, nữ tính', image: '/assets/bedroom-pink.jpg' },
  { id: 'minimal', title: 'Minimalist', text: 'Tối giản, thanh lịch', image: '/assets/footer-bg-desktop.jpg' },
  { id: 'y2k', title: 'Y2K - Cá tính', text: 'Trendy, nổi bật', image: '/assets/art-supplies.jpg' },
  { id: 'vintage', title: 'Vintage nhẹ nhàng', text: 'Cổ điển, tinh tế', image: '/assets/bookshelf.jpg' },
  { id: 'cute', title: 'Cute - Ngọt ngào', text: 'Dễ thương, đáng yêu', image: '/assets/hero-bg-mobile.jpg' },
];

const products = [
  { id: 'necklace', badge: 'Hot', title: 'Dây chuyền mặt nơ đính đá xinh xắn', price: '89.000đ', image: '/assets/footer-bg-desktop.jpg' },
  { id: 'hair-clips', badge: 'Best seller', title: 'Set 5 kẹp tóc nơ voan phong cách Hàn', price: '39.000đ', image: '/assets/bedroom-pink.jpg' },
  { id: 'phone-strap', badge: 'Dưới 50k', title: 'Dây treo điện thoại charm cute', price: '29.000đ', image: '/assets/art-supplies.jpg' },
  { id: 'sunglasses', badge: 'Hot', title: 'Mắt kính oval tròng UV400', price: '99.000đ', image: '/assets/hero-bg-desktop.jpg' },
  { id: 'mini-bag', badge: 'Dưới 100k', title: 'Túi xách mini phối nơ kèm charm', price: '89.000đ', image: '/assets/hero-bg-mobile.jpg' },
  { id: 'watch', badge: 'Best seller', title: 'Đồng hồ nữ dây da mặt vuông', price: '129.000đ', image: '/assets/products-hero-desktop.jpg' },
];

const needs = [
  ['🎒', 'Đi học'],
  ['💻', 'Đi làm'],
  ['📷', 'Đi chơi'],
  ['🧳', 'Du lịch'],
  ['🎁', 'Quà tặng'],
  ['📸', 'Chụp ảnh sống ảo'],
];

export function AccessoriesPage({ onOpenRoute }: AccessoriesPageProps) {
  return (
    <div className="page-content page-content--accessories">
      <section className="accessory-hero glass">
        <div className="accessory-hero__copy">
          <p className="accessory-kicker">Bì Bì accessories</p>
          <h1>Phụ kiện xinh xắn</h1>
          <h2>Nâng tầm phong cách mỗi ngày</h2>
          <p>Từ trang sức, kẹp tóc, túi xách nhỏ đến phụ kiện điện thoại, mắt kính... tất cả đều siêu cute và hợp trend.</p>
          <button type="button" className="accessory-primary" onClick={() => onOpenRoute(accessorySearch('phụ kiện cute'))}>
            Khám phá ngay
            <Icon name="arrow-up-right" />
          </button>
        </div>

        <div className="accessory-hero__scene" aria-hidden="true">
          <div className="accessory-headphone" />
          <div className="accessory-phone">
            <img src="/assets/mascot.png" alt="" />
          </div>
          <div className="accessory-bag" />
          <div className="accessory-sunglasses" />
          <span className="accessory-bead accessory-bead--one" />
          <span className="accessory-bead accessory-bead--two" />
          <span className="accessory-spark accessory-spark--one">✦</span>
          <span className="accessory-spark accessory-spark--two">♡</span>
          <span className="accessory-spark accessory-spark--three">✧</span>
        </div>
      </section>

      <section className="accessory-category-strip glass">
        {categories.map(([icon, label]) => (
          <button key={label} type="button" className="accessory-category-tile" onClick={() => onOpenRoute(accessorySearch(label))}>
            <span>{icon}</span>
            <strong>{label}</strong>
          </button>
        ))}
      </section>

      <section className="accessory-chip-row">
        {chips.map((chip) => (
          <button key={chip} type="button" onClick={() => onOpenRoute(accessorySearch(chip))}>
            {chip}
          </button>
        ))}
      </section>

      <AccessorySection title="Phụ kiện theo vibe" action="Xem tất cả" onAction={() => onOpenRoute(accessorySearch('phụ kiện theo vibe'))}>
        <div className="accessory-vibe-grid">
          {vibes.map((item) => (
            <button key={item.id} type="button" className="accessory-vibe-card" onClick={() => onOpenRoute(accessorySearch(item.title))}>
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>{item.text}</span>
              <em>Xem ngay</em>
            </button>
          ))}
        </div>
      </AccessorySection>

      <AccessorySection title="Phụ kiện nổi bật" action="Xem tất cả sản phẩm" onAction={() => onOpenRoute(accessorySearch('phụ kiện nổi bật'))}>
        <div className="accessory-product-grid">
          {products.map((item) => (
            <AccessoryProductCard key={item.id} item={item} onOpenRoute={onOpenRoute} />
          ))}
        </div>
      </AccessorySection>

      <AccessorySection title="Mua phụ kiện theo nhu cầu" action="Xem tất cả" onAction={() => onOpenRoute(accessorySearch('mua phụ kiện'))}>
        <div className="accessory-need-grid">
          {needs.map(([icon, label]) => (
            <button key={label} type="button" className="accessory-need-card" onClick={() => onOpenRoute(accessorySearch(label))}>
              <span>{icon}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>
      </AccessorySection>
    </div>
  );
}

function AccessorySection({ title, action, onAction, children }: any) {
  return (
    <section className="accessory-section">
      <div className="accessory-section__head">
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

function AccessoryProductCard({ item, onOpenRoute }: any) {
  return (
    <article className="accessory-product-card">
      <button type="button" className="accessory-product-card__heart" aria-label="Lưu yêu thích">
        <Icon name="heart" />
      </button>
      <span className="accessory-product-card__badge">{item.badge}</span>
      <button type="button" className="accessory-product-card__main" onClick={() => onOpenRoute(accessorySearch(item.title))}>
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
