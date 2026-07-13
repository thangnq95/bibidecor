import { useEffect, useMemo, useRef, useState } from 'react';
import { budgetOptions, filterBudgetIdeas, getBudgetIdeas, getBudgetOption, getIdeaCategoryPage } from './categoryIdeas';
import { FloatingMascot } from './FloatingMascot';
import { BudgetPage, CollectionLandingPage, DetailPage, HomePage, IdeaCategoryPage, NotFoundPage, ProductListPage, ShopTheLookSection, StationeryPage, buildBudgetRangeText, buildBudgetSubtitle } from './pages/bibiPages';
import { Icon } from './components/Icon';
import {
  getCategorySlugFromPath,
  normalizePathname,
  routeForAccessories,
  routeForBudget,
  routeForCategory,
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
import {
  SITE_NAME,
  applySeoMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createImageObjectSchema,
  createOrganizationSchema,
  createLogoSchema,
  createProductSchema,
  createWebPageSchema,
  createWebSiteSchema,
  getSiteOrigin,
  toAbsoluteUrl,
} from './seo';

const ideas = [
  {
    slug: 'goc-hoc-tap-xanh-da-troi-pastel',
    image: '/assets/study-blue.jpg',
    palette: ['#9ec8f8', '#dfeefc', '#f4ebde', '#cfd9cd'],
    accent: 'blue',
    meta: {
      vi: {
        title: 'Góc học tập xanh da trời pastel',
        subtitle: 'Không gian học tập nhẹ nhàng, sáng sủa và rất dễ tập trung.',
        description:
          'Kết hợp tông xanh da trời pastel cùng trắng và gỗ sáng để tạo nên một góc học tập mềm mại, thoáng đãng. Bố cục này phù hợp cho sinh viên, người làm việc tại nhà và những ai thích cảm giác sạch sẽ, sáng mắt.',
        tags: ['Pastel', 'Hàn Quốc', 'Góc học tập', 'Xanh da trời'],
        summary: [
          { label: 'Ước tính chi phí', value: '~1.250.000đ', hint: 'Sáng sủa' },
          { label: 'Số món gợi ý', value: '7 món', hint: 'Gợi ý phù hợp' },
          { label: 'Phong cách', value: 'Hàn Quốc', hint: 'Nhẹ nhàng' },
          { label: 'Cảm hứng', value: 'Pastel', hint: 'Dễ phối' },
        ],
        benefitsTitle: 'Vì sao nên chọn góc học tập này?',
        benefits: [
          'Tông xanh dịu giúp giảm căng thẳng, tạo cảm giác tập trung.',
          'Bố cục gọn gàng, tối ưu diện tích và công năng.',
          'Dễ đổi phụ kiện để làm mới không gian theo mùa.',
        ],
        paletteTitle: 'Mẹo phối màu',
        paletteNote: 'Kết hợp xanh da trời, trắng và gỗ sáng để giữ cảm giác tươi mát, nhẹ nhàng.',
        shoppingTitle: 'Danh sách sản phẩm cần mua',
        shoppingCount: '7 món',
        shoppingCta: 'Xem tất cả 7 sản phẩm',
        shoppingItems: [
          {
            name: 'Bàn học gỗ công nghiệp phủ melamine',
            detail: '120x60x75cm',
            price: '550.000đ',
            shop: 'Shopee',
          },
          {
            name: 'Ghế lưới công thái học màu trắng',
            detail: 'Tựa đầu, xoay 360°',
            price: '420.000đ',
            shop: 'Lazada',
          },
          {
            name: 'Kệ sách đứng 4 tầng màu trắng',
            detail: '60x24x142cm',
            price: '280.000đ',
            shop: 'TikTok Shop',
          },
          {
            name: 'Đèn bàn học LED chống cận',
            detail: '3 chế độ sáng',
            price: '150.000đ',
            shop: 'Shopee',
          },
        ],
      },
      en: {
        title: 'Pastel blue study corner',
        subtitle: 'A calm, bright study space designed for focus.',
        description:
          'Pairing soft sky blue with white and light wood creates a study corner that feels airy, clean, and easy on the eyes. It works well for students, remote workers, and anyone who enjoys a serene workspace.',
        tags: ['Pastel', 'Korean', 'Study corner', 'Sky blue'],
        summary: [
          { label: 'Estimated budget', value: '~1,250,000 VND', hint: 'Bright and airy' },
          { label: 'Suggested items', value: '7 items', hint: 'Curated picks' },
          { label: 'Style', value: 'Korean', hint: 'Soft and neat' },
          { label: 'Mood', value: 'Pastel', hint: 'Easy to mix' },
        ],
        benefitsTitle: 'Why choose this study corner?',
        benefits: [
          'Soft blue tones help reduce tension and support concentration.',
          'Compact layout makes good use of space without feeling crowded.',
          'Easy to refresh with new accessories through the seasons.',
        ],
        paletteTitle: 'Color pairing tip',
        paletteNote: 'Use sky blue, white, and light wood to keep the room crisp and breezy.',
        shoppingTitle: 'Shopping list',
        shoppingCount: '7 items',
        shoppingCta: 'View all 7 products',
        shoppingItems: [
          {
            name: 'Melamine study desk',
            detail: '120x60x75cm',
            price: '550,000 VND',
            shop: 'Shopee',
          },
          {
            name: 'White ergonomic mesh chair',
            detail: 'Headrest, 360° swivel',
            price: '420,000 VND',
            shop: 'Lazada',
          },
          {
            name: '4-tier white bookshelf',
            detail: '60x24x142cm',
            price: '280,000 VND',
            shop: 'TikTok Shop',
          },
          {
            name: 'Anti-glare LED desk lamp',
            detail: '3 lighting modes',
            price: '150,000 VND',
            shop: 'Shopee',
          },
        ],
      },
    },
  },
  {
    slug: 'goc-hoc-tap-hong-cute-cloud',
    image: '/assets/goc-hoc-tap-hong-cute.jpg',
    palette: ['#f4b8c5', '#fff6f3', '#f6efe8', '#8fb178'],
    accent: 'rose',
    meta: {
      vi: {
        title: 'Góc học tập hồng cute có đèn mây',
        subtitle: 'Một góc bàn học trắng hồng, gọn gàng và ngọt nhẹ như studio nhỏ.',
        description:
          'Setup này dùng bàn học trắng làm nền, thêm ghế công thái học hồng, pegboard, hộp lưu trữ và đèn đám mây để tạo một góc học tập vừa dễ thương vừa thực tế. Tông hồng pastel được cân bằng bằng cây xanh, mặt bàn trắng và các khối lưu trữ gọn để không gian vẫn sáng, thoáng và dễ tập trung.',
        tags: ['Hồng pastel', 'Cute', 'Góc học tập', 'Pegboard'],
        summary: [
          { label: 'Ước tính chi phí', value: '~4.258.180đ', hint: 'Full setup' },
          { label: 'Số món gợi ý', value: '10 món', hint: 'Đủ decor' },
          { label: 'Phong cách', value: 'Cute Korean', hint: 'Ngọt nhẹ' },
          { label: 'Cảm hứng', value: 'Cloud desk', hint: 'Sáng ấm' },
        ],
        benefitsTitle: 'Vì sao nên chọn góc học tập này?',
        benefits: [
          'Bàn góc và kệ hai bên giúp tận dụng diện tích tường, hợp phòng nhỏ hoặc góc phòng.',
          'Pegboard giữ bút, giấy note và phụ kiện luôn trong tầm tay mà mặt bàn vẫn thoáng.',
          'Đèn mây, đồng hồ và chậu hoa tạo điểm nhấn mềm mại, giúp góc học tập có cảm giác vui và ấm hơn.',
        ],
        paletteTitle: 'Mẹo phối màu',
        paletteNote: 'Giữ nền trắng kem, thêm hồng phấn cho ghế và hộp lưu trữ, rồi dùng xanh lá từ chậu hoa để cân bằng độ ngọt.',
        shoppingTitle: 'Danh sách sản phẩm cần mua',
        shoppingCount: '10 món',
        shoppingCta: 'Xem tất cả 10 sản phẩm',
        shoppingItems: [
          { name: 'Ghế cong thái học', detail: 'Ghế xoay màu hồng trắng cho góc học tập', price: '352.750đ', shop: 'Shopee', url: 'https://s.shopee.vn/3LPDBtIa93' },
          { name: 'Hộp bút cute', detail: 'Ống bút pastel để gắn bàn hoặc pegboard', price: '78.020đ', shop: 'Shopee', url: 'https://s.shopee.vn/8Knt986ve1' },
          { name: 'Thảm lót sàn', detail: 'Thảm tròn hồng làm mềm khu vực ghế', price: '162.679đ', shop: 'Shopee', url: 'https://s.shopee.vn/4qE0ylRVOU' },
          { name: 'Hộp đựng xếp gọn', detail: 'Hộp lưu trữ nhỏ cho sách vở và giấy note', price: '64.350đ', shop: 'Shopee', url: 'https://s.shopee.vn/3B5mzitrDV' },
          { name: 'Hộp ngăn kéo 2 tầng', detail: 'Ngăn kéo mini để phụ kiện học tập', price: '55.000đ', shop: 'Shopee', url: 'https://s.shopee.vn/3qLTmzDsw6' },
          { name: 'Đồng hồ', detail: 'Đồng hồ báo thức hồng đặt trên kệ', price: '105.000đ', shop: 'Shopee', url: 'https://s.shopee.vn/50XRBA6qeq' },
          { name: 'Chậu hoa', detail: 'Chậu cây/hoa mini làm điểm xanh cho góc bàn', price: '52.018đ', shop: 'Shopee', url: 'https://s.shopee.vn/7AbvlB2fn1' },
          { name: 'Đèn đám mây', detail: 'Đèn ngủ mây ánh ấm đặt trên kệ', price: '59.400đ', shop: 'Shopee', url: 'https://s.shopee.vn/2g9WOvtUXq' },
          { name: 'Tấm gỗ pegboard', detail: 'Bảng treo phụ kiện sau bàn học', price: '183.263đ', shop: 'Shopee', url: 'https://s.shopee.vn/9pcgw8dyuo' },
          { name: 'Bàn học', detail: 'Bàn học góc trắng có kệ lưu trữ hai bên', price: '3.145.700đ', shop: 'Shopee', url: 'https://s.shopee.vn/7KvLxaZhr9' },
        ],
      },
      en: {
        title: 'Cute pink study corner with cloud lamp',
        subtitle: 'A white-and-pink desk setup that feels tidy, sweet, and studio-like.',
        description:
          'This setup uses a white desk as the base, then layers in a pink ergonomic chair, pegboard, storage boxes, and a cloud lamp for a study corner that is both cute and practical. The pastel pink mood is balanced with greenery, white surfaces, and compact storage so the space stays bright and easy to focus in.',
        tags: ['Pastel pink', 'Cute', 'Study corner', 'Pegboard'],
        summary: [
          { label: 'Estimated budget', value: '~4,258,180 VND', hint: 'Full setup' },
          { label: 'Suggested items', value: '10 items', hint: 'Complete decor' },
          { label: 'Style', value: 'Cute Korean', hint: 'Soft and sweet' },
          { label: 'Mood', value: 'Cloud desk', hint: 'Warm light' },
        ],
        benefitsTitle: 'Why choose this study corner?',
        benefits: [
          'The corner desk and side shelving make good use of wall space, especially in compact rooms.',
          'The pegboard keeps pens, notes, and small tools within reach while leaving the desktop clear.',
          'The cloud lamp, clock, and flower pot add soft accents that make the study area feel warmer.',
        ],
        paletteTitle: 'Color pairing tip',
        paletteNote: 'Keep the base cream white, add blush pink through the chair and storage, then use greenery to balance the sweetness.',
        shoppingTitle: 'Shopping list',
        shoppingCount: '10 items',
        shoppingCta: 'View all 10 products',
        shoppingItems: [
          { name: 'Curved ergonomic chair', detail: 'Pink and white swivel chair for a study corner', price: '352,750 VND', shop: 'Shopee', url: 'https://s.shopee.vn/3LPDBtIa93' },
          { name: 'Cute pen holder', detail: 'Pastel pencil cup for the desk or pegboard', price: '78,020 VND', shop: 'Shopee', url: 'https://s.shopee.vn/8Knt986ve1' },
          { name: 'Floor rug', detail: 'Pink round rug to soften the chair area', price: '162,679 VND', shop: 'Shopee', url: 'https://s.shopee.vn/4qE0ylRVOU' },
          { name: 'Foldable storage box', detail: 'Small storage bin for books and notes', price: '64,350 VND', shop: 'Shopee', url: 'https://s.shopee.vn/3B5mzitrDV' },
          { name: '2-tier drawer box', detail: 'Mini drawers for study accessories', price: '55,000 VND', shop: 'Shopee', url: 'https://s.shopee.vn/3qLTmzDsw6' },
          { name: 'Clock', detail: 'Pink alarm clock for the shelf', price: '105,000 VND', shop: 'Shopee', url: 'https://s.shopee.vn/50XRBA6qeq' },
          { name: 'Flower pot', detail: 'Mini plant or flower pot for a green accent', price: '52,018 VND', shop: 'Shopee', url: 'https://s.shopee.vn/7AbvlB2fn1' },
          { name: 'Cloud lamp', detail: 'Warm cloud lamp for the shelf', price: '59,400 VND', shop: 'Shopee', url: 'https://s.shopee.vn/2g9WOvtUXq' },
          { name: 'Wood pegboard', detail: 'Pegboard for accessories behind the desk', price: '183,263 VND', shop: 'Shopee', url: 'https://s.shopee.vn/9pcgw8dyuo' },
          { name: 'Study desk', detail: 'White corner desk with side storage shelves', price: '3,145,700 VND', shop: 'Shopee', url: 'https://s.shopee.vn/7KvLxaZhr9' },
        ],
      },
    },
  },
  {
    slug: 'phong-ngu-hong-nhat-cong-chua',
    image: '/assets/bedroom-pink.jpg',
    palette: ['#f5d9da', '#fdeef1', '#f7efdf', '#e8ddd4'],
    accent: 'rose',
    meta: {
      vi: {
        title: 'Phòng ngủ hồng nhạt công chúa',
        subtitle: 'Ấm áp, ngọt ngào và mềm mại như một giấc mơ buổi sáng.',
        description:
          'Không gian phòng ngủ được làm dịu bằng lớp hồng pastel, ánh sáng ấm và chất liệu vải mềm. Đây là lựa chọn lý tưởng nếu bạn muốn một nơi thư giãn thật nữ tính mà vẫn hiện đại.',
        tags: ['Công chúa', 'Hồng pastel', 'Mềm', 'Ngủ ngon'],
        summary: [
          { label: 'Ước tính chi phí', value: '~2.180.000đ', hint: 'Dịu dàng' },
          { label: 'Số món gợi ý', value: '8 món', hint: 'Gợi ý phù hợp' },
          { label: 'Phong cách', value: 'Romantic', hint: 'Ngọt ngào' },
          { label: 'Cảm hứng', value: 'Cozy', hint: 'Thư giãn' },
        ],
        benefitsTitle: 'Vì sao nên chọn phòng này?',
        benefits: [
          'Màu hồng nhạt mang đến cảm giác yên bình và dễ ngủ hơn.',
          'Chất liệu vải và ánh sáng ấm giúp căn phòng mềm mại, nữ tính.',
          'Dễ mix thêm gối, tranh và đèn để tăng độ ấm cúng.',
        ],
        paletteTitle: 'Mẹo phối màu',
        paletteNote: 'Giữ nền trắng kem, thêm hồng phấn và be nhạt để phòng không bị nặng màu.',
        shoppingTitle: 'Danh sách sản phẩm cần mua',
        shoppingCount: '8 món',
        shoppingCta: 'Xem tất cả 8 sản phẩm',
        shoppingItems: [
          { name: 'Giường bọc nỉ màu hồng', detail: '160x200cm', price: '1.200.000đ', shop: 'Shopee' },
          { name: 'Bàn trang điểm mini', detail: 'Có gương tròn', price: '520.000đ', shop: 'Lazada' },
          { name: 'Đèn ngủ ánh vàng', detail: 'Cường độ dịu', price: '210.000đ', shop: 'TikTok Shop' },
          { name: 'Rèm voan trắng', detail: '1 lớp mềm', price: '248.000đ', shop: 'Shopee' },
        ],
      },
      en: {
        title: 'Soft pink princess bedroom',
        subtitle: 'Warm, sweet, and soft like a morning dream.',
        description:
          'This bedroom is softened by pastel pink layers, warm lighting, and plush materials. It is a perfect choice if you want a feminine retreat that still feels modern and calm.',
        tags: ['Princess', 'Pastel pink', 'Soft', 'Restful'],
        summary: [
          { label: 'Estimated budget', value: '~2,180,000 VND', hint: 'Delicate' },
          { label: 'Suggested items', value: '8 items', hint: 'Curated picks' },
          { label: 'Style', value: 'Romantic', hint: 'Sweet and airy' },
          { label: 'Mood', value: 'Cozy', hint: 'Relaxing' },
        ],
        benefitsTitle: 'Why choose this room?',
        benefits: [
          'Soft pink tones create a peaceful, sleep-friendly atmosphere.',
          'Fabric textures and warm lighting make the room feel gentle and cozy.',
          'Easy to style with pillows, art, and lamps for more comfort.',
        ],
        paletteTitle: 'Color pairing tip',
        paletteNote: 'Keep a creamy base, then add blush pink and soft beige for a balanced look.',
        shoppingTitle: 'Shopping list',
        shoppingCount: '8 items',
        shoppingCta: 'View all 8 products',
        shoppingItems: [
          { name: 'Pink upholstered bed', detail: '160x200cm', price: '1,200,000 VND', shop: 'Shopee' },
          { name: 'Mini vanity table', detail: 'Round mirror included', price: '520,000 VND', shop: 'Lazada' },
          { name: 'Warm yellow bedside lamp', detail: 'Soft brightness', price: '210,000 VND', shop: 'TikTok Shop' },
          { name: 'White voile curtain', detail: 'Single soft layer', price: '248,000 VND', shop: 'Shopee' },
        ],
      },
    },
  },
  {
    slug: 'ban-lam-viec-trang-kem-toi-gian',
    image: '/assets/bookshelf.jpg',
    palette: ['#f4e2c8', '#fbf6ef', '#e7efe7', '#d8e7f4'],
    accent: 'sand',
    meta: {
      vi: {
        title: 'Bàn làm việc trắng kem tối giản',
        subtitle: 'Gọn gàng, tinh tế và dễ giữ cho căn phòng luôn thoáng.',
        description:
          'Một góc làm việc sáng màu với bàn trắng kem, kệ lưu trữ nhẹ và vài điểm nhấn gỗ sáng. Phong cách này phù hợp với ai thích không gian tối giản nhưng vẫn ấm áp và có cảm xúc.',
        tags: ['Minimal', 'Trắng kem', 'Hiện đại', 'Gọn'],
        summary: [
          { label: 'Ước tính chi phí', value: '~1.080.000đ', hint: 'Tối giản' },
          { label: 'Số món gợi ý', value: '6 món', hint: 'Bố trí tiện' },
          { label: 'Phong cách', value: 'Minimal', hint: 'Thanh lịch' },
          { label: 'Cảm hứng', value: 'Warm work', hint: 'Sạch sẽ' },
        ],
        benefitsTitle: 'Vì sao nên chọn góc này?',
        benefits: [
          'Bố cục tinh gọn giúp tập trung tốt hơn khi làm việc.',
          'Tông trắng kem đem lại cảm giác nhẹ mắt và dễ phối đồ.',
          'Lý tưởng cho phòng nhỏ hoặc góc làm việc đa năng.',
        ],
        paletteTitle: 'Mẹo phối màu',
        paletteNote: 'Dùng trắng kem làm nền và thêm xám xanh hoặc be nhạt để tăng độ sâu.',
        shoppingTitle: 'Danh sách sản phẩm cần mua',
        shoppingCount: '6 món',
        shoppingCta: 'Xem tất cả 6 sản phẩm',
        shoppingItems: [
          { name: 'Bàn gỗ phủ trắng kem', detail: '100x50cm', price: '620.000đ', shop: 'Shopee' },
          { name: 'Kệ treo tường 3 tầng', detail: 'Màu gỗ sáng', price: '210.000đ', shop: 'Lazada' },
          { name: 'Ghế xoay lưng lưới', detail: 'Hỗ trợ thắt lưng', price: '390.000đ', shop: 'TikTok Shop' },
          { name: 'Đèn bàn cổ điển', detail: 'Ánh sáng ấm', price: '165.000đ', shop: 'Shopee' },
        ],
      },
      en: {
        title: 'Cream-white minimal desk',
        subtitle: 'Neat, refined, and easy to keep visually light.',
        description:
          'A bright workspace with a cream-white desk, subtle storage, and light wood accents. This style fits anyone who wants a minimal room that still feels warm and welcoming.',
        tags: ['Minimal', 'Cream white', 'Modern', 'Neat'],
        summary: [
          { label: 'Estimated budget', value: '~1,080,000 VND', hint: 'Minimal' },
          { label: 'Suggested items', value: '6 items', hint: 'Efficient layout' },
          { label: 'Style', value: 'Minimal', hint: 'Elegant' },
          { label: 'Mood', value: 'Warm work', hint: 'Clean and calm' },
        ],
        benefitsTitle: 'Why choose this setup?',
        benefits: [
          'A tidy layout helps you stay focused while working.',
          'Cream white keeps the room bright and easy to style.',
          'Great for small rooms or flexible work corners.',
        ],
        paletteTitle: 'Color pairing tip',
        paletteNote: 'Use cream white as the base and add muted blue-gray or soft beige for depth.',
        shoppingTitle: 'Shopping list',
        shoppingCount: '6 items',
        shoppingCta: 'View all 6 products',
        shoppingItems: [
          { name: 'Cream-coated wooden desk', detail: '100x50cm', price: '620,000 VND', shop: 'Shopee' },
          { name: '3-tier wall shelf', detail: 'Light wood finish', price: '210,000 VND', shop: 'Lazada' },
          { name: 'Mesh swivel chair', detail: 'Lumbar support', price: '390,000 VND', shop: 'TikTok Shop' },
          { name: 'Vintage desk lamp', detail: 'Warm light', price: '165,000 VND', shop: 'Shopee' },
        ],
      },
    },
  },
  {
    slug: 'ke-decor-cute-kieu-han',
    image: '/assets/art-supplies.jpg',
    palette: ['#ebe1d1', '#f6f2ea', '#e7f0e3', '#dce8f8'],
    accent: 'sage',
    meta: {
      vi: {
        title: 'Kệ decor cute kiểu Hàn',
        subtitle: 'Nhẹ nhàng, có hơi thở cafe Hàn và rất dễ thương.',
        description:
          'Một chiếc kệ decor với tông sáng, phụ kiện nhỏ xinh và bầu không khí mềm mại. Đây là kiểu setup rất hợp cho phòng trẻ, góc đọc sách hoặc không gian thích sự gọn gàng tinh tế.',
        tags: ['Korean', 'Cute', 'Decor', 'Sáng'],
        summary: [
          { label: 'Ước tính chi phí', value: '~650.000đ', hint: 'Dễ thương' },
          { label: 'Số món gợi ý', value: '5 món', hint: 'Mua dễ' },
          { label: 'Phong cách', value: 'Korean', hint: 'Tinh tế' },
          { label: 'Cảm hứng', value: 'Decor', hint: 'Chill' },
        ],
        benefitsTitle: 'Vì sao nên chọn kệ decor này?',
        benefits: [
          'Tạo điểm nhấn trang trí nhưng không làm không gian rối mắt.',
          'Phù hợp với góc chụp ảnh, góc đọc sách hoặc bàn làm việc nhỏ.',
          'Dễ thay đổi phụ kiện để phù hợp với từng mùa hoặc chủ đề.',
        ],
        paletteTitle: 'Mẹo phối màu',
        paletteNote: 'Dùng trắng, be và xanh nhạt để kệ trông sạch sẽ, sáng và đáng yêu.',
        shoppingTitle: 'Danh sách sản phẩm cần mua',
        shoppingCount: '5 món',
        shoppingCta: 'Xem tất cả 5 sản phẩm',
        shoppingItems: [
          { name: 'Kệ đứng 4 tầng màu trắng', detail: '60x24x142cm', price: '280.000đ', shop: 'TikTok Shop' },
          { name: 'Bộ khay decor mini', detail: '3 món', price: '110.000đ', shop: 'Shopee' },
          { name: 'Bình hoa gốm nhỏ', detail: 'Màu be', price: '120.000đ', shop: 'Lazada' },
          { name: 'Đèn LED để bàn', detail: 'Dây mềm', price: '140.000đ', shop: 'Shopee' },
        ],
      },
      en: {
        title: 'Cute Korean-style display shelf',
        subtitle: 'Soft, cozy, and inspired by a charming Korean cafe vibe.',
        description:
          'A bright display shelf with small cute accessories and a soft atmosphere. This setup works beautifully for reading corners, kids’ spaces, or compact rooms that still want a refined look.',
        tags: ['Korean', 'Cute', 'Decor', 'Bright'],
        summary: [
          { label: 'Estimated budget', value: '~650,000 VND', hint: 'Cute and light' },
          { label: 'Suggested items', value: '5 items', hint: 'Easy to shop' },
          { label: 'Style', value: 'Korean', hint: 'Refined' },
          { label: 'Mood', value: 'Decor', hint: 'Chill' },
        ],
        benefitsTitle: 'Why choose this shelf setup?',
        benefits: [
          'Creates a decorative focal point without visual clutter.',
          'Perfect for photo corners, reading nooks, or compact desks.',
          'Easy to swap accessories for different seasons or themes.',
        ],
        paletteTitle: 'Color pairing tip',
        paletteNote: 'Use white, beige, and light blue to keep the shelf clean, airy, and adorable.',
        shoppingTitle: 'Shopping list',
        shoppingCount: '5 items',
        shoppingCta: 'View all 5 products',
        shoppingItems: [
          { name: '4-tier white shelf', detail: '60x24x142cm', price: '280,000 VND', shop: 'TikTok Shop' },
          { name: 'Mini decor tray set', detail: '3 pieces', price: '110,000 VND', shop: 'Shopee' },
          { name: 'Small ceramic vase', detail: 'Beige finish', price: '120,000 VND', shop: 'Lazada' },
          { name: 'LED desk light', detail: 'Flexible cord', price: '140,000 VND', shop: 'Shopee' },
        ],
      },
    },
  },
];

const shopTheLookRooms = [
  {
    id: 'pastel-bedroom',
    title: 'Pastel Bedroom',
    style: 'Pastel',
    budget: '~2.450.000đ',
    image: '/assets/hero-bg-desktop.jpg',
    accent: 'rose',
    products: [
      { id: 'bed', name: 'Giường ngủ pastel', price: '1.250.000đ', category: 'Bed', thumbnail: '/assets/bedroom-pink.jpg', brand: 'Bì Home', color: 'Hồng phấn', affiliateUrl: '#', hotspotX: 56, hotspotY: 62 },
      { id: 'lamp', name: 'Đèn ngủ mềm ánh', price: '210.000đ', category: 'Lamp', thumbnail: '/assets/art-supplies.jpg', brand: 'Dream Light', color: 'Kem sáng', affiliateUrl: '#', hotspotX: 72, hotspotY: 58 },
      { id: 'desk', name: 'Bàn mini đầu giường', price: '380.000đ', category: 'Desk', thumbnail: '/assets/bookshelf.jpg', brand: 'Soft Wood', color: 'Be nhạt', affiliateUrl: '#', hotspotX: 78, hotspotY: 39 },
      { id: 'chair', name: 'Ghế bọc nỉ cong mềm', price: '420.000đ', category: 'Chair', thumbnail: '/assets/study-blue.jpg', brand: 'Cloud Seat', color: 'Hồng sữa', affiliateUrl: '#', hotspotX: 46, hotspotY: 54 },
      { id: 'shelf', name: 'Kệ treo tường', price: '260.000đ', category: 'Shelf', thumbnail: '/assets/bookshelf.jpg', brand: 'Bì Home', color: 'Trắng kem', affiliateUrl: '#', hotspotX: 86, hotspotY: 28 },
      { id: 'rug', name: 'Thảm mây nhỏ', price: '180.000đ', category: 'Rug', thumbnail: '/assets/bedroom-pink.jpg', brand: 'Cloud Soft', color: 'Hồng nhạt', affiliateUrl: '#', hotspotX: 48, hotspotY: 79 },
      { id: 'plant', name: 'Chậu cây mini', price: '95.000đ', category: 'Plant', thumbnail: '/assets/study-blue.jpg', brand: 'Green Little', color: 'Xanh lá non', affiliateUrl: '#', hotspotX: 87, hotspotY: 69 },
      { id: 'curtain', name: 'Rèm voan mềm', price: '340.000đ', category: 'Curtain', thumbnail: '/assets/hero-bg-mobile.jpg', brand: 'Soft Curtain', color: 'Trắng sương', affiliateUrl: '#', hotspotX: 15, hotspotY: 35 },
      { id: 'mirror', name: 'Gương bo tròn', price: '290.000đ', category: 'Mirror', thumbnail: '/assets/hero-bg-desktop.jpg', brand: 'Roundly', color: 'Trắng kem', affiliateUrl: '#', hotspotX: 26, hotspotY: 41 },
      { id: 'wall-decor', name: 'Tranh tường pastel', price: '160.000đ', category: 'Wall decor', thumbnail: '/assets/art-supplies.jpg', brand: 'Bì Studio', color: 'Xanh hồng', affiliateUrl: '#', hotspotX: 63, hotspotY: 24 },
    ],
  },
  {
    id: 'study-corner',
    title: 'Study Corner',
    style: 'Korean',
    budget: '~1.860.000đ',
    image: '/assets/study-blue.jpg',
    accent: 'blue',
    products: [
      { id: 'desk', name: 'Bàn học sáng màu', price: '620.000đ', category: 'Desk', thumbnail: '/assets/study-blue.jpg', brand: 'Bì Home', color: 'Xanh da trời', affiliateUrl: '#', hotspotX: 56, hotspotY: 68 },
      { id: 'chair', name: 'Ghế lưới trắng', price: '420.000đ', category: 'Chair', thumbnail: '/assets/bookshelf.jpg', brand: 'Cloud Seat', color: 'Trắng', affiliateUrl: '#', hotspotX: 42, hotspotY: 64 },
      { id: 'shelf', name: 'Kệ sách mini', price: '280.000đ', category: 'Shelf', thumbnail: '/assets/bookshelf.jpg', brand: 'Soft Wood', color: 'Gỗ sáng', affiliateUrl: '#', hotspotX: 82, hotspotY: 38 },
      { id: 'lamp', name: 'Đèn bàn chống cận', price: '150.000đ', category: 'Lamp', thumbnail: '/assets/art-supplies.jpg', brand: 'Dream Light', color: 'Trắng', affiliateUrl: '#', hotspotX: 69, hotspotY: 42 },
      { id: 'plant', name: 'Chậu cây nhỏ', price: '88.000đ', category: 'Plant', thumbnail: '/assets/bedroom-pink.jpg', brand: 'Green Little', color: 'Xanh non', affiliateUrl: '#', hotspotX: 88, hotspotY: 63 },
    ],
  },
  {
    id: 'living-room',
    title: 'Living Room',
    style: 'Cozy',
    budget: '~3.320.000đ',
    image: '/assets/hero-bg-mobile.jpg',
    accent: 'sage',
    products: [
      { id: 'sofa', name: 'Sofa mây bồng', price: '1.450.000đ', category: 'Sofa', thumbnail: '/assets/bedroom-pink.jpg', brand: 'Cloud Home', color: 'Kem sáng', affiliateUrl: '#', hotspotX: 35, hotspotY: 67 },
      { id: 'rug', name: 'Thảm tròn pastel', price: '220.000đ', category: 'Rug', thumbnail: '/assets/study-blue.jpg', brand: 'Soft Layer', color: 'Xanh phấn', affiliateUrl: '#', hotspotX: 50, hotspotY: 82 },
      { id: 'lamp', name: 'Đèn sàn hồng', price: '310.000đ', category: 'Lamp', thumbnail: '/assets/art-supplies.jpg', brand: 'Dream Light', color: 'Hồng đào', affiliateUrl: '#', hotspotX: 78, hotspotY: 48 },
      { id: 'plant', name: 'Cây trang trí', price: '120.000đ', category: 'Plant', thumbnail: '/assets/bookshelf.jpg', brand: 'Green Little', color: 'Xanh lá', affiliateUrl: '#', hotspotX: 86, hotspotY: 64 },
      { id: 'wall-decor', name: 'Khung tranh bo mềm', price: '180.000đ', category: 'Wall decor', thumbnail: '/assets/hero-bg-desktop.jpg', brand: 'Bì Studio', color: 'Be nhạt', affiliateUrl: '#', hotspotX: 68, hotspotY: 34 },
    ],
  },
];

const productThemeLabels = {
  bedroom: { vi: 'Phòng ngủ', en: 'Bedroom' },
  study: { vi: 'Góc học tập', en: 'Study corner' },
  desk: { vi: 'Bàn làm việc', en: 'Work desk' },
  shelf: { vi: 'Kệ decor', en: 'Decor shelf' },
};

const PRODUCT_PAGE_SIZE = 10;

function getProductThemeKeyFromIdeaSlug(slug = '') {
  if (slug.includes('goc-hoc-tap')) return 'study';
  if (slug.includes('ban-lam-viec')) return 'desk';
  if (slug.includes('ke-decor')) return 'shelf';
  return 'bedroom';
}

function buildProductCatalog(lang) {
  return ideas.flatMap((idea) => {
    const themeKey = getProductThemeKeyFromIdeaSlug(idea.slug);
    const meta = idea.meta[lang];

    return (meta.shoppingItems || []).map((item, index) => ({
      id: `${idea.slug}-${index}-${item.name}`,
      name: item.name,
      detail: item.detail,
      price: item.price,
      shop: item.shop,
      ideaSlug: idea.slug,
      ideaTitle: meta.title,
      ideaSubtitle: meta.subtitle,
      image: idea.image,
      themeKey,
      themeLabel: productThemeLabels[themeKey]?.[lang] || themeKey,
    }));
  });
}

function buildShopLookRooms(lang) {
  return ideas.slice(0, 3).map((idea) => {
    const meta = idea.meta[lang];
    const products = (meta.shoppingItems || []).map((item, index) => ({
      id: `${idea.slug}-shop-${index}`,
      name: item.name,
      category: item.shop,
      brand: item.shop,
      price: item.price,
      color: Array.isArray(idea.palette) ? `#${String(idea.palette[index % idea.palette.length]).replace('#', '')}` : '',
      thumbnail: idea.image,
      affiliateUrl: '#',
      hotspotX: 20 + index * 18,
      hotspotY: 28 + index * 12,
    }));

    return {
      id: idea.slug,
      title: meta.title,
      image: idea.image,
      products,
    };
  });
}

const copy = {
  vi: {
    metaTitle: 'Bì Bì - Góc nhỏ gom những món xinh xinh cho bạn',
    tagline: 'Cute affiliate picks',
    searchPlaceholder: 'Tìm ý tưởng, món xinh, hoặc danh mục...',
    heroTitle: 'Bì Bì – Góc nhỏ gom những món xinh xinh cho bạn',
    heroSubtitle: 'Decor phòng, mỹ phẩm, văn phòng phẩm và nhiều gợi ý dễ thương mỗi ngày.',
    heroCta: 'Khám phá ngay',
    categoriesTitle: 'Danh mục phổ biến',
    categoriesSub: 'Chạm vào từng danh mục để xem gợi ý phù hợp với vibe bạn thích.',
    budgetTitle: 'Chọn ngân sách',
    budgetSubtitle: 'Chọn một mốc chi tiêu để Bì gợi ý món xinh phù hợp.',
    budgetCta: 'Xem ý tưởng theo ngân sách',
    budgetPageTitle: 'Decor theo ngân sách',
    budgetPageSubtitle: 'Những ý tưởng decor xinh xắn trong ngân sách {budget}.',
    budgetSortLabel: 'Sắp xếp',
    budgetSortOptions: {
      low: 'Giá thấp đến cao',
      high: 'Giá cao đến thấp',
      popular: 'Phổ biến nhất',
      newest: 'Mới nhất',
    },
    budgetEmpty: 'Bì chưa tìm thấy decor phù hợp ngân sách này.',
    budgetEmptyCta: 'Xem ngân sách khác',
    galleryTitle: 'Chất liệu hình ảnh',
    menuLabel: 'Danh mục',
    backLabel: 'Quay lại danh sách',
    saveLabel: 'Lưu bộ sưu tập',
    shareLabel: 'Chia sẻ',
    buyNow: 'Xem nơi mua',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    shopTag: 'Món xinh',
    allProducts: 'Xem món gợi ý',
    browseHint: 'Chạm vào một gợi ý để mở chi tiết phù hợp.',
    productsTitle: 'Khám phá tất cả món xinh',
    productsSubtitle: 'Một danh sách tổng hợp từ decor, mỹ phẩm, văn phòng phẩm, phụ kiện và quà tặng để bạn duyệt nhanh hơn.',
    productsSearch: 'Tìm món xinh, danh mục, nền tảng...',
    productsSectionTitle: 'Danh sách món gợi ý',
    productsSectionSub: 'Chọn một món để mở bộ sưu tập hoặc nơi mua phù hợp.',
    productsFilterAll: 'Tất cả',
    productsFilterHint: 'Lọc theo danh mục',
    language: 'Ngôn ngữ',
    vietnamese: 'VI',
    english: 'EN',
    menuTitle: 'Danh mục',
    navItems: [
      { id: 'home', label: 'Trang chủ', route: '/' },
      { id: 'decor', label: 'Decor', route: routeForDecorHome() },
      { id: 'stationery', label: 'Văn phòng phẩm', route: routeForStationery() },
      { id: 'accessories', label: 'Phụ kiện', route: routeForAccessories() },
      { id: 'gifts', label: 'Quà tặng', route: routeForGifts() },
      { id: 'discover', label: 'Khám phá', route: routeForDiscover() },
      { id: 'favorites', label: 'Yêu thích', route: routeForFavorites() },
    ],
    brandNote: 'Bì Bì',
    brandSub: 'Gợi ý xinh xinh mỗi ngày',
    footer: {
      introTitle: 'Bì Bì là nơi gom những món xinh xinh từ nhiều danh mục.',
      introText:
        'Khám phá decor, văn phòng phẩm, phụ kiện và quà tặng theo vibe dễ thương, sáng sủa và dễ lưu lại.',
      exploreTitle: 'Danh mục',
      exploreItems: ['Decor', 'Văn phòng phẩm', 'Phụ kiện', 'Quà tặng', 'Đồ cute khác'],
      shopTitle: 'Bộ sưu tập',
      shopItems: ['Gợi ý hôm nay', 'Theo ngân sách', 'Theo mood', 'Yêu thích'],
      disclaimer:
        'Bì Bì là website tổng hợp và gợi ý sản phẩm. Khi bạn bấm mua, bạn sẽ được chuyển đến các sàn thương mại điện tử hoặc website đối tác. Giá và tình trạng sản phẩm có thể thay đổi theo từng thời điểm.',
      bottomLeftTitle: 'Bì Bì © 2026',
      bottomLeftText: 'Made with ♡ and a little bit of magic',
    },
    mascot: {
      ariaLabel: 'Mở trợ lý Bì Bì',
      dismissLabel: 'Ẩn gợi ý',
      closeLabel: 'Đóng trợ lý',
      suggestions: [
        'Muốn xem món xinh dưới 100k không?',
        'Bì gợi ý decor, skincare và stationery nè!',
        'Bạn thích vibe pastel hay tối giản?',
        'Thử chọn một mood hôm nay đi nè!',
        'Lưu lại món bạn thích để Bì nhớ nhé!',
      ],
      menuItems: [
        { id: 'featured', label: 'Gợi ý cho tôi' },
        { id: 'products', label: 'Xem món gợi ý' },
        { id: 'categories', label: 'Chọn mood' },
        { id: 'hero', label: 'Về đầu trang' },
        { id: 'trending', label: 'Xem trending' },
      ],
    },
  },
  en: {
    metaTitle: 'Bì Bì - Cute picks across decor and gifts',
    tagline: 'Cute affiliate picks',
    searchPlaceholder: 'Search ideas, cute picks, or categories...',
    heroTitle: 'Bì Bì – A little corner for all the cute picks you love',
    heroSubtitle: 'Decor, stationery and more adorable inspirations every day.',
    heroCta: 'Explore now',
    categoriesTitle: 'Popular categories',
    categoriesSub: 'Tap any category to see picks that match your vibe.',
    budgetTitle: 'Choose a budget',
    budgetSubtitle: 'Pick a spending range and let Bì suggest cute picks that fit your plan.',
    budgetCta: 'View ideas by budget',
    budgetPageTitle: 'Decor by budget',
    budgetPageSubtitle: 'Cute decor ideas within a {budget} budget.',
    budgetSortLabel: 'Sort by',
    budgetSortOptions: {
      low: 'Price: low to high',
      high: 'Price: high to low',
      popular: 'Most popular',
      newest: 'Newest',
    },
    budgetEmpty: 'Bì could not find decor that fits this budget yet.',
    budgetEmptyCta: 'Try another budget',
    galleryTitle: 'Visual materials',
    menuLabel: 'Categories',
    backLabel: 'Back to list',
    saveLabel: 'Save collection',
    shareLabel: 'Share',
    buyNow: 'See where to buy',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    shopTag: 'Cute pick',
    allProducts: 'View cute picks',
    browseHint: 'Tap a pick to open its matching detail.',
    productsTitle: 'Explore all cute picks',
    productsSubtitle: 'A mixed discovery list of decor, stationery, accessories and gifts for quick browsing.',
    productsSearch: 'Search picks, categories, platforms...',
    productsSectionTitle: 'Pick list',
    productsSectionSub: 'Choose a pick to open the matching collection or shop link.',
    productsFilterAll: 'All',
    productsFilterHint: 'Filter by category',
    language: 'Language',
    vietnamese: 'VI',
    english: 'EN',
    menuTitle: 'Categories',
    navItems: [
      { id: 'home', label: 'Home', route: '/' },
      { id: 'decor', label: 'Decor', route: routeForDecorHome() },
      { id: 'stationery', label: 'Stationery', route: routeForStationery() },
      { id: 'accessories', label: 'Accessories', route: routeForAccessories() },
      { id: 'gifts', label: 'Gifts', route: routeForGifts() },
      { id: 'discover', label: 'Explore', route: routeForDiscover() },
      { id: 'favorites', label: 'Saved', route: routeForFavorites() },
    ],
    brandNote: 'Bì Bì',
    brandSub: 'Cute picks every day',
    footer: {
      introTitle: 'Bì Bì collects cute picks across multiple categories.',
      introText:
        'Discover decor, stationery, accessories and gifts with a soft pastel vibe that is easy to save and revisit.',
      exploreTitle: 'Categories',
      exploreItems: ['Decor', 'Stationery', 'Accessories', 'Gifts', 'Cute extras'],
      shopTitle: 'Collections',
      shopItems: ['Today’s picks', 'By budget', 'By mood', 'Saved'],
      disclaimer:
        'Bì Bì is a curated discovery website. When you click buy, you will be redirected to e-commerce platforms or partner websites. Prices and availability may change over time.',
      bottomLeftTitle: 'Bì Bì © 2026',
      bottomLeftText: 'Made with ♡ and a little bit of magic',
    },
    mascot: {
      ariaLabel: 'Open Bì Bì assistant',
      dismissLabel: 'Hide suggestion',
      closeLabel: 'Close assistant',
      suggestions: [
        'Want to see something cute under 100k?',
        'Bì has decor, skincare and stationery picks!',
        'Do you like pastel or minimal vibes?',
        'Try choosing a mood for today!',
        'Save the picks you love and Bì will remember them!',
      ],
      menuItems: [
        { id: 'featured', label: 'Suggest picks' },
        { id: 'products', label: 'View cute picks' },
        { id: 'categories', label: 'Choose a mood' },
        { id: 'hero', label: 'Back to top' },
        { id: 'trending', label: 'See trending' },
      ],
    },
  },
};

const categories = [
  {
    slug: 'decor',
    color: 'blue',
    labelVi: 'Decor',
    labelEn: 'Decor',
    route: routeForDecorHome(),
    iconSrc: '/assets/home-category-decor-home.png',
    descriptionVi: 'Không gian sống xinh xắn',
    descriptionEn: 'Cute home ideas',
  },
  {
    slug: 'stationery',
    color: 'sand',
    labelVi: 'Văn phòng phẩm',
    labelEn: 'Stationery',
    route: routeForStationery(),
    iconSrc: '/assets/home-category-stationery-home.png',
    descriptionVi: 'Sổ, bút và đồ đi học xinh',
    descriptionEn: 'Cute notebooks and pens',
  },
  {
    slug: 'accessories',
    color: 'sage',
    labelVi: 'Phụ kiện',
    labelEn: 'Accessories',
    route: routeForAccessories(),
    iconSrc: '/assets/home-category-accessories-home.png',
    descriptionVi: 'Túi, kẹp tóc và điểm nhấn nhỏ',
    descriptionEn: 'Bags, clips and tiny accents',
  },
  {
    slug: 'gifts',
    color: 'lavender',
    labelVi: 'Quà tặng',
    labelEn: 'Gifts',
    route: routeForGifts(),
    iconSrc: '/assets/home-category-gifts-home.png',
    descriptionVi: 'Quà xinh dưới nhiều ngân sách',
    descriptionEn: 'Cute gifts for every budget',
  },
  {
    slug: 'kham-pha',
    color: 'blue',
    labelVi: 'Đồ cute khác',
    labelEn: 'Cute extras',
    route: routeForDiscover(),
    iconSrc: '/assets/home-category-cute-extras-home.png',
    descriptionVi: 'Những món nhỏ đáng yêu khác',
    descriptionEn: 'More adorable little picks',
  },
];

const affiliatePicks = [
  {
    id: 'pick-decor-study',
    titleVi: 'Set decor bàn học pastel',
    titleEn: 'Pastel study decor set',
    descriptionVi: 'Một góc học tập sáng sủa, dễ tập trung và rất hợp để chụp ảnh.',
    descriptionEn: 'A bright study corner that feels focused and photo-friendly.',
    categoryVi: 'Decor',
    categoryEn: 'Decor',
    priceVi: '~650.000đ',
    priceEn: '~650,000 VND',
    source: 'Shopee',
    route: routeForDecorHome(),
    image: '/assets/study-blue.jpg',
  },
  {
    id: 'pick-stationery-note',
    titleVi: 'Sổ tay mây bồng',
    titleEn: 'Cloudy notebook',
    descriptionVi: 'Trang giấy xinh để ghi chú, lên kế hoạch và lưu lại mood trong ngày.',
    descriptionEn: 'Cute pages for notes, planning and keeping today’s mood.',
    categoryVi: 'Văn phòng phẩm',
    categoryEn: 'Stationery',
    priceVi: '~79.000đ',
    priceEn: '~79,000 VND',
    source: 'TikTok Shop',
    route: routeForStationery(),
    image: '/assets/bookshelf.jpg',
  },
  {
    id: 'pick-accessory-bag',
    titleVi: 'Túi tote thêu chữ cute',
    titleEn: 'Cute embroidered tote',
    descriptionVi: 'Đi học, đi làm hay đi cà phê đều xinh và tiện.',
    descriptionEn: 'A cute tote that works for school, work and coffee runs.',
    categoryVi: 'Phụ kiện',
    categoryEn: 'Accessories',
    priceVi: '~145.000đ',
    priceEn: '~145,000 VND',
    source: 'Shopee',
    route: routeForAccessories(),
    image: '/assets/art-supplies.jpg',
  },
  {
    id: 'pick-gift-box',
    titleVi: 'Hộp quà dưới 100k',
    titleEn: 'Gift box under 100k',
    descriptionVi: 'Một món quà nhỏ nhưng đủ làm người nhận mỉm cười.',
    descriptionEn: 'A tiny gift that still makes someone smile.',
    categoryVi: 'Quà tặng',
    categoryEn: 'Gifts',
    priceVi: '~99.000đ',
    priceEn: '~99,000 VND',
    source: 'Lazada',
    route: routeForGifts(),
    image: '/assets/hero-bg-mobile.jpg',
  },
  {
    id: 'pick-cute-extra',
    titleVi: 'Kẹp tóc ngôi sao pastel',
    titleEn: 'Pastel star hair clip',
    descriptionVi: 'Một chi tiết nhỏ để outfit trông vui mắt hơn ngay lập tức.',
    descriptionEn: 'A tiny detail that instantly makes an outfit feel sweeter.',
    categoryVi: 'Đồ cute khác',
    categoryEn: 'Cute extras',
    priceVi: '~69.000đ',
    priceEn: '~69,000 VND',
    source: 'Shopee',
    route: routeForDiscover(),
    image: '/assets/hero-bg-desktop.jpg',
  },
  {
    id: 'pick-stationery-pen',
    titleVi: 'Set bút highlight mây',
    titleEn: 'Cloud highlight pen set',
    descriptionVi: 'Bộ bút nhẹ màu giúp trang vở sáng xinh và dễ phân loại nội dung.',
    descriptionEn: 'Soft-color pens that keep notes bright and easy to organize.',
    categoryVi: 'Văn phòng phẩm',
    categoryEn: 'Stationery',
    priceVi: '~92.000đ',
    priceEn: '~92,000 VND',
    source: 'TikTok Shop',
    route: routeForStationery(),
    image: '/assets/study-blue.jpg',
  },
  {
    id: 'pick-decor-candle',
    titleVi: 'Nến thơm pastel',
    titleEn: 'Pastel scented candle',
    descriptionVi: 'Một chút hương thơm dịu để góc phòng thêm ấm và thư giãn.',
    descriptionEn: 'A soft scent that makes the room feel warmer and calmer.',
    categoryVi: 'Decor',
    categoryEn: 'Decor',
    priceVi: '~129.000đ',
    priceEn: '~129,000 VND',
    source: 'Shopee',
    route: routeForDecorHome(),
    image: '/assets/hero-bg-desktop.jpg',
  },
  {
    id: 'pick-accessory-ribbon',
    titleVi: 'Kẹp nơ mềm',
    titleEn: 'Soft bow clip',
    descriptionVi: 'Một điểm nhấn nhỏ cho mái tóc hoặc túi xách thêm xinh.',
    descriptionEn: 'A small accent that makes hair or bags look extra sweet.',
    categoryVi: 'Phụ kiện',
    categoryEn: 'Accessories',
    priceVi: '~58.000đ',
    priceEn: '~58,000 VND',
    source: 'Lazada',
    route: routeForAccessories(),
    image: '/assets/footer-bg-mobile.jpg',
  },
];

const tx = (vi, en) => ({ vi, en });
const stationeryImagePool = [
  '/assets/art-supplies.jpg',
  '/assets/study-blue.jpg',
  '/assets/bookshelf.jpg',
  '/assets/products-hero-desktop.jpg',
  '/assets/hero-bg-desktop.jpg',
  '/assets/footer-bg-desktop.jpg',
];

const stationImage = (query) => {
  const key = String(query || '').toLowerCase();
  if (key.includes('planner') || key.includes('notebook') || key.includes('journal') || key.includes('paper')) {
    return '/assets/art-supplies.jpg';
  }
  if (key.includes('study') || key.includes('desk') || key.includes('minimal') || key.includes('office')) {
    return '/assets/study-blue.jpg';
  }
  if (key.includes('sticker') || key.includes('washi') || key.includes('gift') || key.includes('ribbon')) {
    return '/assets/footer-bg-desktop.jpg';
  }
  if (key.includes('organizer') || key.includes('case') || key.includes('clip') || key.includes('pen')) {
    return '/assets/products-hero-desktop.jpg';
  }

  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % stationeryImagePool.length;
  }
  return stationeryImagePool[hash];
};
const shopSearchUrl = (base, query) => `${base}${encodeURIComponent(query)}`;

const stationeryPageData = {
  hero: {
    title: tx('Văn phòng phẩm xinh xắn cho góc học tập & làm việc', 'Cute stationery for study and work corners'),
    subtitle: tx(
      'Tổng hợp những món stationery dễ thương, tiện dụng và đáng mua: sổ tay, bút, sticker, kẹp giấy, hộp bút, planner và nhiều món nhỏ xinh khác.',
      'A curated mix of cute, practical stationery picks: notebooks, pens, stickers, paper clips, pencil cases, planners and more tiny delights.',
    ),
    cta: tx('Khám phá ngay', 'Explore now'),
    image: stationImage('pastel stationery desk planner notebook'),
    secondaryImage: stationImage('cute stationery flat lay pastel'),
  },
  heroChips: [
    tx('Bàn học pastel', 'Pastel desk'),
    tx('Sổ bút xinh xắn', 'Cute notes'),
    tx('Học tập nhẹ nhàng', 'Soft study mood'),
    tx('Dễ mua, dễ tặng', 'Easy to buy, easy to gift'),
  ],
  quickCategories: [
    { id: 'planner', icon: '📒', label: tx('Sổ tay & Planner', 'Notebooks & planners') },
    { id: 'pen', icon: '🖊️', label: tx('Bút viết cute', 'Cute pens') },
    { id: 'sticker', icon: '🪄', label: tx('Sticker & Washi tape', 'Sticker & washi tape') },
    { id: 'case', icon: '🧸', label: tx('Hộp bút & Túi đựng', 'Pencil cases & pouches') },
    { id: 'clip', icon: '📎', label: tx('Kẹp giấy & Ghi chú', 'Paper clips & notes') },
    { id: 'study', icon: '✏️', label: tx('Dụng cụ học tập', 'Study tools') },
    { id: 'decor', icon: '🪴', label: tx('Đồ decor bàn học', 'Desk decor') },
    { id: 'combo', icon: '🎁', label: tx('Combo stationery', 'Stationery combo') },
  ],
  filters: [
    { id: 'all', label: tx('Tất cả', 'All') },
    { id: 'under-50k', label: tx('Dưới 50k', 'Under 50k') },
    { id: 'under-100k', label: tx('Dưới 100k', 'Under 100k') },
    { id: 'best', label: tx('Best seller', 'Best seller') },
    { id: 'cute', label: tx('Cute nhất', 'Cutest') },
    { id: 'student', label: tx('Dành cho học sinh', 'For students') },
    { id: 'office', label: tx('Dành cho văn phòng', 'For office') },
    { id: 'gift', label: tx('Làm quà tặng', 'Giftable') },
    { id: 'pastel', label: tx('Màu pastel', 'Pastel colors') },
  ],
  vibeTitle: tx('Góc học tập xinh hơn mỗi ngày', 'A cuter study corner every day'),
  vibeSubtitle: tx('Các combo theo vibe để bạn chọn đúng mood rồi đi tiếp đến món hợp nhất.', 'Curated vibes to help you choose the right mood before diving into the matching picks.'),
  vibes: [
    {
      id: 'pastel-study',
      title: tx('Góc học tập pastel', 'Pastel study corner'),
      description: tx('Nhẹ nhàng, sáng sủa và đủ dễ thương để ngồi học lâu hơn một chút.', 'Light, bright and cute enough to make long study sessions feel easier.'),
      image: stationImage('pastel study desk notebook sticker'),
      cta: tx('Xem sản phẩm', 'View products'),
      route: `${routeForSearch()}?q=${encodeURIComponent('stationery pastel study')}`,
    },
    {
      id: 'minimal-work',
      title: tx('Góc làm việc tối giản', 'Minimal work corner'),
      description: tx('Gọn gàng hơn, sạch sẽ hơn và vẫn giữ được vibe mềm mại.', 'Neater, cleaner and still soft enough to feel friendly.'),
      image: stationImage('minimal desk stationery notebook'),
      cta: tx('Xem sản phẩm', 'View products'),
      route: `${routeForSearch()}?q=${encodeURIComponent('minimal stationery desk')}`,
    },
    {
      id: 'journaling-cute',
      title: tx('Góc journaling cute', 'Cute journaling nook'),
      description: tx('Cho những trang sổ đầy sticker, washi tape và ghi chú xinh.', 'For pages full of stickers, washi tape and cute notes.'),
      image: stationImage('journaling sticker washi tape pastel'),
      cta: tx('Xem sản phẩm', 'View products'),
      route: `${routeForSearch()}?q=${encodeURIComponent('journaling stationery')}`,
    },
    {
      id: 'planner',
      title: tx('Góc planner năng suất', 'Productive planner corner'),
      description: tx('Dễ sắp xếp việc học, việc làm và các deadline nhỏ mỗi ngày.', 'Great for organizing school, work and everyday deadlines.'),
      image: stationImage('planner notebook pastel desk'),
      cta: tx('Xem sản phẩm', 'View products'),
      route: `${routeForSearch()}?q=${encodeURIComponent('planner notebook stationery')}`,
    },
    {
      id: 'gift',
      title: tx('Góc quà tặng nhỏ xinh', 'Tiny gift corner'),
      description: tx('Những món nhỏ mà nhìn là muốn gói ngay để tặng.', 'Small picks that feel ready to wrap and gift right away.'),
      image: stationImage('gift stationery pastel ribbon'),
      cta: tx('Xem sản phẩm', 'View products'),
      route: `${routeForSearch()}?q=${encodeURIComponent('stationery gift')}`,
    },
  ],
  productsTitle: tx('Sản phẩm nổi bật', 'Featured picks'),
  productsSubtitle: tx('Card sản phẩm ưu tiên ảnh thực tế, giá tham khảo và nút xem deal gọn gàng.', 'Product cards with real-life photos, reference prices and a clean deal button.'),
  spotlightTitle: tx('Bì Bì gợi ý hôm nay', 'Bì Bì picks today'),
  spotlightSubtitle: tx('Những món đáng mua nhất để bạn chốt nhanh nếu đang cần một vài item tốt.', 'Our most recommended picks if you want a few great items to grab first.'),
  bannerTitle: tx('Một chiếc bàn học xinh có thể làm bạn muốn học hơn một chút.', 'A pretty study desk can make you want to study a little more.'),
  bannerSubtitle: tx('Mở thử đồ decor bàn học để setup góc ngồi của bạn mềm mại hơn.', 'Explore desk decor ideas and make your setup feel a little softer.'),
  bannerCta: tx('Xem đồ decor bàn học', 'View desk decor'),
  bannerRoute: routeForCategory('ban-lam-viec'),
  bannerMascot: '/assets/mascot.png',
  needsTitle: tx('Mua theo nhu cầu', 'Shop by need'),
  needsSubtitle: tx('Chọn đúng mục đích trước khi lướt món để tiết kiệm thời gian hơn.', 'Pick your use case first so browsing feels quicker and more intentional.'),
  needs: [
    {
      id: 'school',
      icon: '🎒',
      title: tx('Đi học', 'For school'),
      description: tx('Những món gọn nhẹ, dễ mang theo và hợp nhịp học tập.', 'Portable picks that fit a student routine.'),
      route: `${routeForSearch()}?q=${encodeURIComponent('stationery học sinh')}`,
    },
    {
      id: 'office',
      icon: '💼',
      title: tx('Đi làm', 'For work'),
      description: tx('Gọn gàng, lịch sự và đủ tiện để làm việc mỗi ngày.', 'Tidy, polished and practical for everyday work.'),
      route: `${routeForSearch()}?q=${encodeURIComponent('stationery office')}`,
    },
    {
      id: 'notes',
      icon: '📝',
      title: tx('Ghi chép hằng ngày', 'Daily notes'),
      description: tx('Sổ, sticky note và bút để ghi chú nhanh hơn.', 'Notebooks, sticky notes and pens for quick note-taking.'),
      route: `${routeForSearch()}?q=${encodeURIComponent('planner notebook')}`,
    },
    {
      id: 'decorate',
      icon: '🎀',
      title: tx('Trang trí sổ', 'Decorate notes'),
      description: tx('Sticker, washi tape và vài món nhỏ để trang vở vui hơn.', 'Stickers, washi tape and little extras to brighten your pages.'),
      route: `${routeForSearch()}?q=${encodeURIComponent('washi tape sticker')}`,
    },
    {
      id: 'gift',
      icon: '🎁',
      title: tx('Làm quà tặng', 'Gift ideas'),
      description: tx('Những món xinh, giá dễ chịu và rất hợp để tặng bạn bè.', 'Cute, affordable picks that make lovely gifts.'),
      route: `${routeForSearch()}?q=${encodeURIComponent('stationery gift')}`,
    },
    {
      id: 'desk',
      icon: '🪑',
      title: tx('Setup bàn học', 'Desk setup'),
      description: tx('Từ đồ dùng đến decor, gom lại thành một góc ngồi hoàn chỉnh.', 'From tools to decor, build a complete little setup.'),
      route: routeForCategory('ban-lam-viec'),
    },
  ],
  seo: tx(
    'Bì Bì tổng hợp các món văn phòng phẩm dễ thương, giá tốt và phù hợp với nhiều nhu cầu như học tập, làm việc, journaling, planner hoặc trang trí góc bàn. Các sản phẩm được chọn lọc từ nhiều sàn thương mại điện tử để bạn dễ tham khảo và mua sắm hơn.',
    'Bì Bì gathers cute stationery picks that feel affordable and useful for school, work, journaling, planning or decorating your desk. The products are curated from multiple marketplaces so you can compare and shop more easily.',
  ),
  seoFacts: [
    { label: tx('Nhu cầu', 'Use cases'), value: tx('Học tập, làm việc, journaling', 'School, work, journaling') },
    { label: tx('Mức giá', 'Price range'), value: tx('Nhiều món dưới 100k', 'Many items under 100k') },
    { label: tx('Nguồn', 'Sources'), value: tx('Shopee, Lazada, TikTok Shop', 'Shopee, Lazada, TikTok Shop') },
    { label: tx('Tone', 'Mood'), value: tx('Pastel, cute, sạch sẽ', 'Pastel, cute and clean') },
  ],
  products: [
    {
      id: 'planner-pastel',
      name: tx('Sổ planner pastel', 'Pastel planner notebook'),
      description: tx('Sổ planner bìa mềm cho lịch học, lịch làm việc và các mục tiêu nhỏ mỗi ngày.', 'A soft-cover planner for classes, work schedules and daily goals.'),
      price: '79.000đ',
      priceValue: 79000,
      source: 'Shopee',
      image: stationImage('pastel planner notebook desk'),
      dealUrl: shopSearchUrl('https://shopee.vn/search?keyword=', 'planner pastel notebook'),
      tags: tx(['Cute', 'Dưới 100k', 'Hot'], ['Cute', 'Under 100k', 'Hot']),
      categories: ['all', 'planner', 'study', 'combo'],
      flags: ['cute', 'best', 'pastel', 'student', 'gift', 'under-100k'],
    },
    {
      id: 'highlight-pen',
      name: tx('Bộ bút highlight', 'Highlight pen set'),
      description: tx('Bộ bút highlight màu nhẹ, dễ chia màu và không gây rối mắt.', 'Soft-color highlighters that keep notes organized without visual clutter.'),
      price: '59.000đ',
      priceValue: 59000,
      source: 'Lazada',
      image: stationImage('pastel highlighter pens desk'),
      dealUrl: shopSearchUrl('https://www.lazada.vn/catalog/?q=', 'highlight pen pastel'),
      tags: tx(['Cute', 'Dưới 100k', 'Pastel'], ['Cute', 'Under 100k', 'Pastel']),
      categories: ['all', 'pen', 'study', 'office'],
      flags: ['cute', 'pastel', 'student', 'office', 'under-100k'],
    },
    {
      id: 'sticker-set',
      name: tx('Sticker trang trí dễ thương', 'Cute sticker set'),
      description: tx('Sticker nhiều chủ đề để trang sổ, planner và hộp bút trông vui hơn.', 'A playful sticker set for decorating planners, notebooks and pencil cases.'),
      price: '35.000đ',
      priceValue: 35000,
      source: 'Shopee',
      image: stationImage('cute sticker washi tape pastel'),
      dealUrl: shopSearchUrl('https://shopee.vn/search?keyword=', 'sticker trang trí cute'),
      tags: tx(['Cute', 'Dưới 50k', 'Hot'], ['Cute', 'Under 50k', 'Hot']),
      categories: ['all', 'sticker', 'journaling', 'gift'],
      flags: ['cute', 'hot', 'gift', 'under-50k', 'pastel'],
    },
    {
      id: 'pencil-case',
      name: tx('Hộp bút trong suốt', 'Clear pencil case'),
      description: tx('Hộp bút nhìn được đồ bên trong, gọn gàng và rất dễ mix đồ.', 'A clear pencil case that keeps everything neat and easy to find.'),
      price: '49.000đ',
      priceValue: 49000,
      source: 'TikTok Shop',
      image: stationImage('clear pencil case stationery pastel'),
      dealUrl: shopSearchUrl('https://www.tiktok.com/search?q=', 'clear pencil case stationery'),
      tags: tx(['Hot', 'Dưới 50k', 'Best seller'], ['Hot', 'Under 50k', 'Best seller']),
      categories: ['all', 'case', 'school', 'office'],
      flags: ['hot', 'best', 'student', 'office', 'under-50k', 'under-100k'],
    },
    {
      id: 'animal-clips',
      name: tx('Kẹp giấy hình thú', 'Animal paper clips'),
      description: tx('Kẹp giấy nhỏ xinh để giữ ghi chú và làm bàn học vui mắt hơn.', 'Tiny paper clips that hold notes and make the desk feel sweeter.'),
      price: '22.000đ',
      priceValue: 22000,
      source: 'Shopee',
      image: stationImage('cute paper clips stationery pastel'),
      dealUrl: shopSearchUrl('https://shopee.vn/search?keyword=', 'kẹp giấy hình thú'),
      tags: tx(['Cute', 'Dưới 50k', 'Hot'], ['Cute', 'Under 50k', 'Hot']),
      categories: ['all', 'clip', 'study', 'gift'],
      flags: ['cute', 'hot', 'gift', 'student', 'under-50k'],
    },
    {
      id: 'weekly-note',
      name: tx('Sổ note weekly pastel', 'Weekly pastel memo pad'),
      description: tx('Tờ note chia tuần để ghi lịch trình, nhiệm vụ và việc cần nhớ nhanh.', 'Weekly memo sheets to capture schedules, tasks and reminders.'),
      price: '69.000đ',
      priceValue: 69000,
      source: 'Lazada',
      image: stationImage('weekly planner notebook pastel'),
      dealUrl: shopSearchUrl('https://www.lazada.vn/catalog/?q=', 'weekly note pastel'),
      tags: tx(['Best seller', 'Cute', 'Dưới 100k'], ['Best seller', 'Cute', 'Under 100k']),
      categories: ['all', 'planner', 'study', 'office', 'combo'],
      flags: ['best', 'cute', 'student', 'office', 'under-100k'],
    },
    {
      id: 'washi-tape',
      name: tx('Bộ washi tape', 'Washi tape set'),
      description: tx('Cuộn washi tape giúp trang sổ và planner có thêm điểm nhấn mềm mại.', 'Washi rolls add soft decorative touches to pages and planners.'),
      price: '45.000đ',
      priceValue: 45000,
      source: 'Shopee',
      image: stationImage('washi tape pastel desk'),
      dealUrl: shopSearchUrl('https://shopee.vn/search?keyword=', 'washi tape pastel'),
      tags: tx(['Cute', 'Best seller', 'Dưới 100k'], ['Cute', 'Best seller', 'Under 100k']),
      categories: ['all', 'sticker', 'journaling', 'gift'],
      flags: ['cute', 'best', 'gift', 'pastel', 'under-50k', 'under-100k'],
    },
    {
      id: 'organizer-tray',
      name: tx('Khay đựng dụng cụ', 'Desk organizer tray'),
      description: tx('Khay để gom bút, kẹp và sticker về một chỗ cho góc bàn gọn hơn.', 'A tray to keep pens, clips and stickers together in one neat place.'),
      price: '89.000đ',
      priceValue: 89000,
      source: 'TikTok Shop',
      image: stationImage('desk organizer pastel stationery'),
      dealUrl: shopSearchUrl('https://www.tiktok.com/search?q=', 'desk organizer pastel stationery'),
      tags: tx(['Hot', 'Best seller', 'Dành cho văn phòng'], ['Hot', 'Best seller', 'For office']),
      categories: ['all', 'decor', 'office', 'study', 'combo'],
      flags: ['hot', 'best', 'office', 'student', 'under-100k'],
    },
    {
      id: 'gel-pen-set',
      name: tx('Bút gel pastel', 'Pastel gel pens'),
      description: tx('Set bút gel màu nhẹ, viết mượt và rất hợp với sổ ghi chép.', 'Smooth-writing gel pens in soft colors for notebooks and journaling.'),
      price: '39.000đ',
      priceValue: 39000,
      source: 'Lazada',
      image: stationImage('pastel gel pens notebook'),
      dealUrl: shopSearchUrl('https://www.lazada.vn/catalog/?q=', 'bút gel pastel'),
      tags: tx(['Cute', 'Dưới 50k', 'Pastel'], ['Cute', 'Under 50k', 'Pastel']),
      categories: ['all', 'pen', 'study', 'school'],
      flags: ['cute', 'pastel', 'student', 'under-50k'],
    },
    {
      id: 'folder-a4',
      name: tx('File folder A4', 'A4 file folder'),
      description: tx('File folder giúp gom giấy tờ, tài liệu và bài tập lại cho ngăn nắp hơn.', 'A file folder keeps handouts, documents and assignments organized.'),
      price: '59.000đ',
      priceValue: 59000,
      source: 'Shopee',
      image: stationImage('a4 file folder pastel stationery'),
      dealUrl: shopSearchUrl('https://shopee.vn/search?keyword=', 'file folder a4 pastel'),
      tags: tx(['Best seller', 'Dành cho văn phòng', 'Dưới 100k'], ['Best seller', 'For office', 'Under 100k']),
      categories: ['all', 'study', 'office', 'combo'],
      flags: ['best', 'office', 'student', 'under-100k'],
    },
  ],
  spotlightProducts: [],
};
stationeryPageData.spotlightProducts = stationeryPageData.products.slice(0, 5);

const broadPageConfigs = {
  [routeForStationery()]: {
    titleVi: 'Văn phòng phẩm xinh xắn cho góc học tập & làm việc',
    titleEn: 'Cute stationery for study and work corners',
    subtitleVi: stationeryPageData.seo.vi,
    subtitleEn: stationeryPageData.seo.en,
    heroImage: stationeryPageData.hero.image,
    accent: 'sand',
    emptyTitleVi: 'Chưa có món văn phòng phẩm nào ở đây.',
    emptyTitleEn: 'No stationery picks here yet.',
    emptyTextVi: 'Hãy ghé lại sau để xem thêm các món xinh cho góc học tập.',
    emptyTextEn: 'Come back later for more cute study essentials.',
    items: stationeryPageData.products.map((item) => ({
      titleVi: item.name.vi,
      titleEn: item.name.en,
      descriptionVi: item.description.vi,
      descriptionEn: item.description.en,
      image: item.image,
      route: item.dealUrl,
    })),
  },
  [routeForAccessories()]: {
    titleVi: 'Phụ kiện',
    titleEn: 'Accessories',
    subtitleVi: 'Túi, kẹp tóc, ví nhỏ và những điểm nhấn xinh xắn cho outfit mỗi ngày.',
    subtitleEn: 'Bags, hair clips, wallets and sweet details for everyday outfits.',
    heroImage: '/assets/art-supplies.jpg',
    accent: 'sage',
    emptyTitleVi: 'Chưa có món phụ kiện nào ở đây.',
    emptyTitleEn: 'No accessory picks here yet.',
    emptyTextVi: 'Hãy quay lại sau để xem thêm các gợi ý dễ thương.',
    emptyTextEn: 'Come back soon for more cute accessory picks.',
    items: affiliatePicks.filter((item) => item.route === routeForAccessories()),
  },
  [routeForGifts()]: {
    titleVi: 'Quà tặng',
    titleEn: 'Gifts',
    subtitleVi: 'Quà nhỏ nhưng xinh, hợp để tặng bạn bè, người thương hoặc chính mình.',
    subtitleEn: 'Tiny but lovely gifts for friends, loved ones or yourself.',
    heroImage: '/assets/hero-bg-mobile.jpg',
    accent: 'lavender',
    emptyTitleVi: 'Chưa có món quà tặng nào ở đây.',
    emptyTitleEn: 'No gift picks here yet.',
    emptyTextVi: 'Hãy quay lại sau để xem thêm ý tưởng quà xinh.',
    emptyTextEn: 'Come back later for more lovely gift ideas.',
    items: affiliatePicks.filter((item) => item.route === routeForGifts()),
  },
  [routeForDiscover()]: {
    titleVi: 'Khám phá',
    titleEn: 'Explore',
    subtitleVi: 'Tổng hợp những món xinh từ nhiều danh mục để bạn duyệt nhanh hơn và lưu lại dễ hơn.',
    subtitleEn: 'A mixed collection of cute picks from many categories, ready to browse and save.',
    heroImage: '/assets/hero-bg-desktop.jpg',
    accent: 'blue',
    emptyTitleVi: 'Chưa có món nào trong mục khám phá.',
    emptyTitleEn: 'No picks in explore yet.',
    emptyTextVi: 'Hãy quay lại sau để xem thêm các gợi ý xinh xắn.',
    emptyTextEn: 'Come back soon for more cute discoveries.',
    items: affiliatePicks,
  },
  [routeForFavorites()]: {
    titleVi: 'Yêu thích',
    titleEn: 'Saved',
    subtitleVi: 'Lưu lại những món bạn muốn xem lại sau này và tạo bộ sưu tập riêng của mình.',
    subtitleEn: 'Save the picks you want to revisit later and build your own collection.',
    heroImage: '/assets/footer-bg-desktop.jpg',
    accent: 'rose',
    emptyTitleVi: 'Chưa có món nào được lưu.',
    emptyTitleEn: 'Nothing saved yet.',
    emptyTextVi: 'Bấm tim ở góc phải của mỗi thẻ để lưu món bạn thích nhé.',
    emptyTextEn: 'Tap the heart on any card to save what you love.',
    items: [],
  },
};

const categorySeoMap: Record<string, any> = {
  'phong-ngu': {
    vi: { title: 'Decor phòng ngủ đẹp', description: 'Khám phá các ý tưởng decor phòng ngủ tông xanh da trời, dễ thương và phù hợp cho không gian nhỏ.' },
    en: { title: 'Beautiful bedroom decor ideas', description: 'Explore cute bedroom decor ideas that feel soft, bright, and easy to apply in small spaces.' },
  },
  'goc-hoc-tap': {
    vi: { title: 'Decor góc học tập dễ thương', description: 'Khám phá các ý tưởng decor góc học tập sáng sủa, gọn gàng và tạo cảm hứng học tập mỗi ngày.' },
    en: { title: 'Cute study corner decor', description: 'Discover bright, tidy study corner ideas that keep your workspace inspiring every day.' },
  },
  'phong-khach': {
    vi: { title: 'Decor phòng khách sáng tạo', description: 'Tìm cảm hứng decor phòng khách mềm mại, sáng tươi và phù hợp cho những buổi sum họp ấm cúng.' },
    en: { title: 'Creative living room decor', description: 'Find soft, bright living room ideas that feel welcoming and cozy for everyday living.' },
  },
  'nha-bep': {
    vi: { title: 'Decor nhà bếp xinh xắn', description: 'Gợi ý decor nhà bếp nhỏ xinh, sạch sẽ và tiện lợi để mỗi bữa ăn đều dễ chịu hơn.' },
    en: { title: 'Cute kitchen decor ideas', description: 'Explore compact kitchen decor ideas that stay clean, practical, and adorable.' },
  },
  'ban-lam-viec': {
    vi: { title: 'Decor bàn làm việc tiện lợi', description: 'Khám phá ý tưởng decor bàn làm việc gọn gàng, sáng sủa và giúp bạn tập trung hơn mỗi ngày.' },
    en: { title: 'Functional desk decor ideas', description: 'Explore tidy desk decor ideas that feel bright, practical, and focused.' },
  },
  'phong-tre-em': {
    vi: { title: 'Decor phòng cho trẻ dễ thương', description: 'Gợi ý decor phòng cho trẻ tươi sáng, mềm mại và an toàn với cảm giác đáng yêu mỗi ngày.' },
    en: { title: 'Cute kids room decor', description: 'Discover bright, soft, and adorable kids room decor ideas for everyday comfort.' },
  },
  'phong-tro': {
    vi: { title: 'Decor phòng trọ nhỏ xinh', description: 'Khám phá những ý tưởng decor phòng trọ nhỏ xinh, tiết kiệm diện tích và vẫn rất đáng yêu.' },
    en: { title: 'Cute dorm room decor', description: 'Explore compact dorm room decor ideas that feel charming and space-friendly.' },
  },
  'kham-pha': {
    vi: { title: 'Khám phá ý tưởng decor', description: 'Tổng hợp những ý tưởng decor dễ thương và sáng tạo nhất để bạn bắt đầu từ bất cứ đâu.' },
    en: { title: 'Explore decor inspiration', description: 'A soft collection of cute and creative decor ideas to start from anywhere.' },
  },
};

function compactText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPriceValue(value) {
  const digits = String(value || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

function buildCategorySeo(categorySlug, lang, categoryPage) {
  const seoCopy = categorySeoMap[categorySlug] || categorySeoMap['kham-pha'];
  const pageName = seoCopy[lang].title;
  const description = compactText(categoryPage?.hero?.subtitle?.[lang] || seoCopy[lang].description);
  const pageUrl = toAbsoluteUrl(routeForCategory(categorySlug));
  const siteUrl = getSiteOrigin();
  const pageTitle = `${pageName} | ${SITE_NAME}`;
  const image = toAbsoluteUrl(categoryPage?.hero?.image || '/assets/hero-bg-desktop.jpg');
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Ý tưởng' : 'Ideas', url: toAbsoluteUrl(routeForCategory('kham-pha')) },
    { name: categoryPage?.hero?.breadcrumb?.[lang]?.[2] || pageName, url: pageUrl },
  ];
  const itemList = [
    categoryPage?.featured,
    ...(categoryPage?.sideCards || []),
    ...(categoryPage?.cards || []),
  ]
    .filter(Boolean)
    .map((item) => ({
      name: item.title?.[lang] || item.title?.vi || item.slug || pageName,
      url: toAbsoluteUrl(routeForIdea(item.relatedSlug || item.slug)),
      description: compactText(item.description?.[lang] || item.description?.vi || ''),
      image: toAbsoluteUrl(item.image),
    }));

  return {
    title: pageTitle,
    description,
    keywords: [
      'Bì Bì',
      pageName,
      categorySlug,
      ...(categoryPage?.hero?.breadcrumb?.[lang] || []).slice(1),
      ...((categoryPage?.featured?.styleTags?.[lang] || []).slice(0, 4)),
    ].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: image,
    imageAlt: pageName,
    pageType: 'website',
    schemas: [
      createWebSiteSchema({
        pageUrl: siteUrl,
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: pageName,
        description,
        pageUrl,
        items: itemList,
        imageUrl: image,
      }),
      createWebPageSchema({
        name: pageName,
        description,
        pageUrl,
        imageUrl: image,
        breadcrumbItems,
      }),
    ],
  };
}

function buildIdeaSeo(idea, lang) {
  const meta = idea.meta[lang];
  const pageUrl = toAbsoluteUrl(routeForIdea(idea.slug));
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Ý tưởng' : 'Ideas', url: toAbsoluteUrl(routeForCategory('kham-pha')) },
    { name: meta.title, url: pageUrl },
  ];

  return {
    title: `${meta.title} | ${SITE_NAME}`,
    description: compactText(meta.description),
    keywords: [SITE_NAME, meta.title, ...(meta.tags || []), 'decor', 'ý tưởng decor'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(idea.image),
    imageAlt: meta.title,
    pageType: 'article',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description: compactText(meta.description),
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createWebPageSchema({
        name: meta.title,
        description: compactText(meta.description),
        pageUrl,
        imageUrl: toAbsoluteUrl(idea.image),
        breadcrumbItems,
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl(idea.image),
        pageUrl,
        caption: meta.title,
      }),
      createArticleSchema({
        name: meta.title,
        description: compactText(meta.description),
        pageUrl,
        imageUrl: toAbsoluteUrl(idea.image),
        breadcrumbItems,
      }),
    ],
  };
}

function buildHomeSeo() {
  const pageUrl = toAbsoluteUrl('/');
  const description =
    'Bì Bì gợi ý decor, mỹ phẩm, văn phòng phẩm, phụ kiện và quà tặng theo phong cách dễ thương, pastel, sáng tạo và dễ lưu lại mỗi ngày.';

  return {
    title: 'Bì Bì - Góc nhỏ gom những món xinh xinh cho bạn',
    description,
    keywords: [
      'Bì Bì',
      'decor phòng ngủ',
      'mỹ phẩm',
      'văn phòng phẩm',
      'phụ kiện',
      'quà tặng',
      'decor góc học tập',
      'ý tưởng dễ thương',
      'affiliate discovery',
    ],
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: 'Bì Bì',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: 'vi-VN',
    schemas: [
      createWebSiteSchema({
        pageUrl,
        description,
        searchUrl: toAbsoluteUrl(`${routeForSearch()}?q={search_term_string}`),
      }),
      createOrganizationSchema({
        pageUrl,
        logoUrl: toAbsoluteUrl('/assets/bibi-logo-circle.png'),
        description,
      }),
      createWebPageSchema({
        name: 'Bì Bì',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        pageUrl,
        caption: 'Bì Bì homepage hero',
      }),
      createLogoSchema({
        logoUrl: toAbsoluteUrl('/assets/bibi-logo-circle.png'),
        pageUrl,
        caption: 'Bì Bì logo',
      }),
    ],
  };
}

function buildProductsSeo(lang, products) {
  const pageUrl = toAbsoluteUrl(routeForProducts());
  const title = lang === 'vi' ? 'Khám phá tất cả món xinh | Bì Bì' : 'Explore all cute picks | Bì Bì';
  const description =
    lang === 'vi'
      ? 'Khám phá toàn bộ món xinh được Bì Bì tổng hợp từ decor, văn phòng phẩm, phụ kiện và quà tặng.'
      : 'Browse the cute picks curated by Bì Bì across decor, stationery, accessories and gifts.';
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Khám phá' : 'Explore', url: pageUrl },
  ];
  const itemList = products.map((item) => ({
    name: item.name,
    url: toAbsoluteUrl(item.route || pageUrl),
    description: compactText(`${item.detail || item.description || ''} · ${item.category || item.shop || ''}`),
    image: toAbsoluteUrl(item.image),
  }));
  const productSchemas = products.slice(0, 12).map((item) =>
    createProductSchema({
      name: item.name,
      description: compactText(`${item.detail || item.description || ''} · ${item.category || item.shop || ''}`),
      pageUrl: toAbsoluteUrl(item.route || pageUrl),
      imageUrl: toAbsoluteUrl(item.image),
      brand: item.shop,
      price: extractPriceValue(item.price),
      priceCurrency: 'VND',
      sku: item.id,
    }),
  );

  return {
    title,
    description,
    keywords: [
      'Bì Bì',
      lang === 'vi' ? 'món xinh' : 'cute picks',
      lang === 'vi' ? 'danh sách gợi ý' : 'curated picks',
      'decor',
      'mỹ phẩm',
      'văn phòng phẩm',
      'phụ kiện',
      'quà tặng',
      'Shopee',
      'TikTok Shop',
      'Lazada',
    ],
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: lang === 'vi' ? 'Khám phá tất cả món xinh' : 'Explore all cute picks',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
      createImageObjectSchema({
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        pageUrl,
        caption: title,
      }),
      ...productSchemas,
    ],
  };
}

function buildBroadPageSeo(path: string, lang: string, { robots, themeColor, titleOverride, descriptionOverride, pageType = 'website' }: any = {}) {
  const page = broadPageConfigs[path];
  if (!page) return buildHomeSeo();

  const pageUrl = toAbsoluteUrl(path);
  const title = titleOverride || `${page.titleVi || page.titleEn} | ${SITE_NAME}`;
  const description = compactText(descriptionOverride || page.subtitleVi || page.subtitleEn || '');
  const items = page.items || [];
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: page.titleVi || page.titleEn, url: pageUrl },
  ];
  const itemList = items.map((item) => ({
    name: item.titleVi || item.titleEn,
    url: toAbsoluteUrl(item.route || pageUrl),
    description: compactText(item.descriptionVi || item.descriptionEn || ''),
    image: toAbsoluteUrl(item.image),
  }));

  return {
    title: lang === 'vi' ? `${page.titleVi} | ${SITE_NAME}` : `${page.titleEn} | ${SITE_NAME}`,
    description,
    keywords: [SITE_NAME, page.titleVi, page.titleEn, 'affiliate', 'cute picks', 'pastel'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
    imageAlt: page.titleVi || page.titleEn,
    pageType,
    themeColor: themeColor || '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: page.titleVi || page.titleEn,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: page.titleVi || page.titleEn,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl(page.heroImage || '/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

function buildDecorSeo(lang) {
  const page = getIdeaCategoryPage('kham-pha');
  const pageUrl = toAbsoluteUrl(routeForDecorHome());
  const description = compactText(page.hero.subtitle[lang]);
  const title = lang === 'vi' ? 'Decor | Bì Bì' : 'Decor | Bì Bì';
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Decor' : 'Decor', url: pageUrl },
  ];
  const itemList = [page.featured, ...(page.sideCards || []), ...(page.cards || [])]
    .filter(Boolean)
    .map((item) => ({
      name: item.title?.[lang] || item.slug || 'Decor idea',
      url: toAbsoluteUrl(routeForIdea(item.relatedSlug || item.slug)),
      description: compactText(item.description?.[lang] || ''),
      image: toAbsoluteUrl(item.image),
    }));

  return {
    title,
    description,
    keywords: ['Bì Bì', 'Decor', 'ý tưởng decor', 'pastel', 'trang trí nhà cửa'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
    imageAlt: lang === 'vi' ? 'Decor' : 'Decor',
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: lang === 'vi' ? 'Decor' : 'Decor',
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: lang === 'vi' ? 'Decor' : 'Decor',
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl(page.hero.image || '/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

function buildDiscoverCatalog(lang) {
  return affiliatePicks.map((item, index) => ({
    id: item.id,
    name: lang === 'vi' ? item.titleVi : item.titleEn,
    detail: lang === 'vi' ? item.descriptionVi : item.descriptionEn,
    price: lang === 'vi' ? item.priceVi : item.priceEn,
    shop: item.source,
    route: item.route,
    category: lang === 'vi' ? item.categoryVi : item.categoryEn,
    image: item.image,
    categoryLabel: lang === 'vi' ? item.categoryVi : item.categoryEn,
    orderIndex: index,
  }));
}

function formatBudgetMoney(amount) {
  return `${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
}

function buildBudgetSeo(lang, budgetSlug, budgetIdeas) {
  const option = getBudgetOption(budgetSlug);
  const pageUrl = toAbsoluteUrl(routeForBudget(option.id));
  const budgetText = buildBudgetRangeText(option, lang);
  const subtitle = buildBudgetSubtitle(option, lang);
  const description = compactText(subtitle);
  const filteredIdeas = filterBudgetIdeas(budgetIdeas, option.id);
  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: copy[lang].budgetPageTitle, url: pageUrl },
  ];
  const itemList = filteredIdeas.map((item) => ({
    name: item.title,
    url: toAbsoluteUrl(routeForIdea(item.slug)),
    description: compactText(item.description),
    image: toAbsoluteUrl(item.image),
  }));

  return {
    title: `${copy[lang].budgetPageTitle} | ${budgetText} | ${SITE_NAME}`,
    description,
    keywords: [SITE_NAME, copy[lang].budgetPageTitle, budgetText, 'decor', 'ngân sách decor', 'budget decor'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: copy[lang].budgetPageTitle,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createCollectionPageSchema({
        name: copy[lang].budgetPageTitle,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
      createWebPageSchema({
        name: copy[lang].budgetPageTitle,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
    ],
  };
}

function buildSearchSeo(lang, query, products) {
  const pageUrl = toAbsoluteUrl(routeForSearch());
  const normalizedQuery = compactText(query);
  const title = normalizedQuery
    ? `${lang === 'vi' ? 'Kết quả tìm kiếm cho' : 'Search results for'} “${normalizedQuery}” | ${SITE_NAME}`
    : `${lang === 'vi' ? 'Tìm kiếm' : 'Search'} | ${SITE_NAME}`;
  const description = normalizedQuery
    ? lang === 'vi'
      ? `Tìm nhanh các gợi ý xinh xinh phù hợp với từ khóa “${normalizedQuery}” trên Bì Bì.`
      : `Quickly explore cute picks that match “${normalizedQuery}” on Bì Bì.`
    : lang === 'vi'
      ? 'Tìm kiếm các món decor, văn phòng phẩm, phụ kiện và quà tặng dễ thương.'
      : 'Search cute decor, stationery, accessories and gift picks.';
  const matchedProducts = products.filter((item) => {
    if (!normalizedQuery) return true;
    const haystack = `${item.name} ${item.detail} ${item.price} ${item.shop} ${item.category}`.toLowerCase();
    return haystack.includes(normalizedQuery.toLowerCase());
  });
  const itemList = matchedProducts.slice(0, 20).map((item) => ({
    name: item.name,
    url: toAbsoluteUrl(item.route || routeForDiscover()),
    description: compactText(`${item.detail || ''} · ${item.category || ''}`),
    image: toAbsoluteUrl(item.image),
  }));

  const breadcrumbItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
    { name: lang === 'vi' ? 'Tìm kiếm' : 'Search', url: pageUrl },
  ];

  return {
    title,
    description,
    keywords: [SITE_NAME, normalizedQuery, 'search', 'cute picks', 'affiliate'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: SITE_NAME,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: 'noindex,follow',
    schemas: [
      createWebSiteSchema({
        pageUrl: getSiteOrigin(),
        description,
      }),
      createBreadcrumbSchema(breadcrumbItems),
      createWebPageSchema({
        name: title,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems,
      }),
      createCollectionPageSchema({
        name: title,
        description,
        pageUrl,
        items: itemList,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
      }),
    ],
  };
}

function buildNotFoundSeo(lang, path) {
  const pageUrl = toAbsoluteUrl(routeForNotFound());
  const title = lang === 'vi' ? `Không tìm thấy trang | ${SITE_NAME}` : `Page not found | ${SITE_NAME}`;
  const description = lang === 'vi' ? 'Trang bạn tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.' : 'The page you are looking for does not exist or has moved.';

  return {
    title,
    description,
    keywords: [SITE_NAME, '404', 'not found'].filter(Boolean),
    canonicalUrl: pageUrl,
    imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
    imageAlt: SITE_NAME,
    pageType: 'website',
    themeColor: '#b6d6ff',
    language: lang === 'vi' ? 'vi-VN' : 'en-US',
    robots: 'noindex,nofollow',
    schemas: [
      createWebPageSchema({
        name: title,
        description,
        pageUrl,
        imageUrl: toAbsoluteUrl('/assets/hero-bg-desktop.jpg'),
        breadcrumbItems: [
          { name: lang === 'vi' ? 'Trang chủ' : 'Home', url: toAbsoluteUrl('/') },
          { name: lang === 'vi' ? '404' : '404', url: pageUrl },
        ],
      }),
    ],
  };
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroQuery, setHeroQuery] = useState('');
  const [pendingMascotTarget, setPendingMascotTarget] = useState(null);
  const [locationTick, setLocationTick] = useState(0);
  const [activeShopRoomId, setActiveShopRoomId] = useState(null);
  const [activeShopProductId, setActiveShopProductId] = useState(null);
  const [previewShopProductId, setPreviewShopProductId] = useState(null);
  const [rippleShopProductId, setRippleShopProductId] = useState(null);
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
  const isDiscoverPage = path === routeForDiscover() || path === routeForProducts();
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
  const shopLookRooms = useMemo(() => buildShopLookRooms(lang), [lang]);
  const activeShopRoom = useMemo(() => shopLookRooms.find((room) => room.id === activeShopRoomId) || shopLookRooms[0], [activeShopRoomId, shopLookRooms]);
  const activeShopProduct = useMemo(() => activeShopRoom?.products.find((product) => product.id === activeShopProductId) || activeShopRoom?.products[0] || null, [activeShopProductId, activeShopRoom]);
  const previewShopProduct = useMemo(() => activeShopRoom?.products.find((product) => product.id === previewShopProductId) || null, [activeShopRoom, previewShopProductId]);
  const budgetIdeas = useMemo(() => getBudgetIdeas(lang), [lang]);
  useEffect(() => {
    if (!shopLookRooms.length) return;
    if (!activeShopRoomId || !shopLookRooms.some((room) => room.id === activeShopRoomId)) {
      setActiveShopRoomId(shopLookRooms[0].id);
    }
  }, [activeShopRoomId, shopLookRooms]);

  useEffect(() => {
    if (!activeShopRoom?.products.length) return;
    if (!activeShopProductId || !activeShopRoom.products.some((product) => product.id === activeShopProductId)) {
      setActiveShopProductId(activeShopRoom.products[0].id);
    }
  }, [activeShopProductId, activeShopRoom]);
  const isKnownPath =
    isHome ||
    isDecorHome ||
    isSearchPage ||
    isDetailPage ||
    isCategoryPage ||
    isDiscoverPage ||
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
    if (isSearchPage) return buildSearchSeo(lang, currentSearchQuery, discoverCatalog);
    if (isDiscoverPage) return buildProductsSeo(lang, discoverCatalog);
    if (isFavoritesPage) return buildBroadPageSeo(path, lang, { robots: 'noindex,follow', titleOverride: lang === 'vi' ? 'Yêu thích | Bì Bì' : 'Saved | Bì Bì' });
    if (broadPageConfigs[path]) return buildBroadPageSeo(path, lang);
    if (isBudgetPage) return buildBudgetSeo(lang, path.replace('/budget/', '') || budgetOptions[0].id, budgetIdeas);
    if (isDetailPage) return buildIdeaSeo(currentIdea || ideas[0], lang);
    if (isNotFoundPage) return buildNotFoundSeo(lang, path);
    return buildNotFoundSeo(lang, path);
  }, [budgetIdeas, categorySlug, categoryPage, currentIdea, currentSearchQuery, discoverCatalog, isBudgetPage, isCategoryPage, isDecorHome, isDiscoverPage, isFavoritesPage, isHome, isNotFoundPage, isSearchPage, isStationeryPage, lang, path]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('bibidecor-lang', lang);
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
  }, [lang]);

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

  const submitSearch = (value) => {
    const normalized = compactText(value);
    navigate(normalized ? `${routeForSearch()}?q=${encodeURIComponent(normalized)}` : routeForSearch());
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

  const handleShopRoomSwitch = (roomId) => {
    setActiveShopRoomId(roomId);
    setActiveShopProductId(null);
    setPreviewShopProductId(null);
    setRippleShopProductId(null);
  };

  const handleShopHotspotSelect = (productId) => {
    setActiveShopProductId(productId);
    setPreviewShopProductId(productId);
    setRippleShopProductId(productId);
    window.setTimeout(() => setRippleShopProductId((current) => (current === productId ? null : current)), 400);
  };

  const handleShopProductActivate = (productId) => {
    setActiveShopProductId(productId);
    setPreviewShopProductId(productId);
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
              shopLookSection={
                <ShopTheLookSection
                  lang={lang}
                  rooms={shopLookRooms}
                  activeRoom={activeShopRoom}
                  activeProduct={activeShopProduct}
                  previewProduct={previewShopProduct}
                  selectedProductId={activeShopProduct?.id || null}
                  rippleProductId={rippleShopProductId}
                  onRoomSwitch={handleShopRoomSwitch}
                  onHotspotSelect={handleShopHotspotSelect}
                  onProductActivate={handleShopProductActivate}
                  onProductHover={setPreviewShopProductId}
                  onClearProductHover={() => setPreviewShopProductId(null)}
                  onClosePreview={() => setPreviewShopProductId(null)}
                />
              }
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
            onOpenItem={(route) => navigate(route)}
          />
        ) : isDiscoverPage ? (
          <ProductListPage
            content={content}
            lang={lang}
            products={discoverCatalog}
            onOpenItem={(route) => navigate(route)}
          />
        ) : isFavoritesPage ? (
          <CollectionLandingPage
            content={content}
            lang={lang}
            page={broadPageConfigs[routeForFavorites()]}
            onOpenItem={(route) => navigate(route)}
            onOpenExplore={() => navigate(routeForDiscover())}
          />
        ) : broadPageConfigs[path] ? (
          <CollectionLandingPage
            content={content}
            lang={lang}
            page={broadPageConfigs[path]}
            onOpenItem={(route) => navigate(route)}
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
