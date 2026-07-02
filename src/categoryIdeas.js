const t = (vi, en) => ({ vi, en });

const chip = (id, icon, vi, en) => ({ id, icon, label: t(vi, en) });

const card = ({
  id,
  slug,
  image,
  titleVi,
  titleEn,
  descriptionVi,
  descriptionEn,
  tagsVi,
  tagsEn,
  budgetVi,
  budgetEn,
  countVi,
  countEn,
  relatedSlug,
}) => ({
  id,
  slug,
  image,
  title: t(titleVi, titleEn),
  description: t(descriptionVi, descriptionEn),
  styleTags: t(tagsVi, tagsEn),
  budget: t(budgetVi, budgetEn),
  productCount: t(countVi, countEn),
  relatedSlug,
});

export const budgetOptions = [
  {
    id: 'under-300k',
    label: t('Dưới 300k', 'Under 300k'),
    maxPrice: 300000,
    minPrice: 0,
    path: '/budget/under-300k',
    color: 'blue',
  },
  {
    id: '300k-500k',
    label: t('300k - 500k', '300k - 500k'),
    maxPrice: 500000,
    minPrice: 300000,
    path: '/budget/300k-500k',
    color: 'pink',
  },
  {
    id: '500k-1m',
    label: t('500k - 1 triệu', '500k - 1 million'),
    maxPrice: 1000000,
    minPrice: 500000,
    path: '/budget/500k-1m',
    color: 'green',
  },
  {
    id: '1m-2m',
    label: t('1 - 2 triệu', '1 - 2 million'),
    maxPrice: 2000000,
    minPrice: 1000000,
    path: '/budget/1m-2m',
    color: 'yellow',
  },
  {
    id: '2m-5m',
    label: t('2 - 5 triệu', '2 - 5 million'),
    maxPrice: 5000000,
    minPrice: 2000000,
    path: '/budget/2m-5m',
    color: 'lavender',
  },
  {
    id: 'over-5m',
    label: t('Trên 5 triệu', 'Over 5 million'),
    maxPrice: null,
    minPrice: 5000000,
    path: '/budget/over-5m',
    color: 'purple',
  },
];

function parseBudgetAmount(text = '') {
  const digits = String(text).replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

function parseItemCount(text = '') {
  const match = String(text).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

const bedroomPage = {
  theme: 'bedroom',
  navActive: 'ideas',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Phòng ngủ'], ['Home', 'Ideas', 'Bedroom']),
    title: t('Decor phòng ngủ ✨', 'Bedroom decor ✨'),
    subtitle: t(
      'Khám phá những ý tưởng phòng ngủ đẹp,\nbiến không gian nghỉ ngơi thành nơi bạn thật sự yêu thích ✨',
      'Discover beautiful bedroom ideas,\nturning rest spaces into places you truly love ✨',
    ),
    badge: t('⭐ 48 ý tưởng đang chờ bạn khám phá', '⭐ 48 ideas waiting for you'),
    image: '/assets/study-blue.jpg',
  },
  filters: [
    chip('all', '☁️', 'Tất cả', 'All'),
    chip('minimal', '🌿', 'Tối giản', 'Minimal'),
    chip('cute', '🌸', 'Dễ thương', 'Cute'),
    chip('vintage', '📷', 'Vintage', 'Vintage'),
    chip('modern', '🛋', 'Hiện đại', 'Modern'),
    chip('room', '🏠', 'Phòng trọ', 'Studio'),
  ],
  featured: card({
    id: 'bedroom-featured',
    slug: 'phong-ngu-xanh-pastel-diu-mat',
    image: '/assets/study-blue.jpg',
    titleVi: 'Phòng ngủ xanh pastel dịu mát',
    titleEn: 'Soft pastel blue bedroom',
    descriptionVi: 'Không gian nhẹ nhàng với tông xanh pastel, mang lại cảm giác thư giãn tuyệt đối.',
    descriptionEn: 'A gentle space with pastel blue tones for a deeply relaxing feel.',
    tagsVi: ['Tối giản', 'Dễ thương'],
    tagsEn: ['Minimal', 'Cute'],
    budgetVi: 'Khoảng 1.200.000đ',
    budgetEn: 'Around 1,200,000 VND',
    countVi: '8 món cần mua',
    countEn: '8 items needed',
    relatedSlug: 'phong-ngu-xanh-pastel-diu-mat',
  }),
  sideCards: [
    card({
      id: 'bedroom-side-1',
      slug: 'phong-ngu-toi-gian-am-cung',
      image: '/assets/bedroom-pink.jpg',
      titleVi: 'Phòng ngủ tối giản ấm cúng',
      titleEn: 'Cozy minimal bedroom',
      descriptionVi: 'Tông kem nhẹ, đường nét gọn gàng và thật dễ chịu khi nhìn vào.',
      descriptionEn: 'Soft cream tones, clean lines, and a comforting visual mood.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.500.000đ',
      budgetEn: 'Around 1,500,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'phong-ngu-toi-gian-am-cung',
    }),
    card({
      id: 'bedroom-side-2',
      slug: 'phong-ngu-tone-hong-sieu-de-thuong',
      image: '/assets/bedroom-pink.jpg',
      titleVi: 'Phòng ngủ tone hồng siêu dễ thương',
      titleEn: 'Super cute pink bedroom',
      descriptionVi: 'Mềm mại, ngọt ngào và rất hợp với những ai thích sự dịu dàng.',
      descriptionEn: 'Soft, sweet, and perfect for anyone who loves a gentle look.',
      tagsVi: ['Dễ thương'],
      tagsEn: ['Cute'],
      budgetVi: 'Khoảng 1.350.000đ',
      budgetEn: 'Around 1,350,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'phong-ngu-tone-hong-sieu-de-thuong',
    }),
  ],
  cards: [
    card({
      id: 'bedroom-grid-1',
      slug: 'phong-ngu-vintage-ngot-ngao',
      image: '/assets/art-supplies.jpg',
      titleVi: 'Phòng ngủ vintage ngọt ngào',
      titleEn: 'Sweet vintage bedroom',
      descriptionVi: 'Một chút hoài niệm, một chút nữ tính và rất dễ thương.',
      descriptionEn: 'A touch of nostalgia, a touch of femininity, and lots of charm.',
      tagsVi: ['Vintage'],
      tagsEn: ['Vintage'],
      budgetVi: 'Khoảng 1.800.000đ',
      budgetEn: 'Around 1,800,000 VND',
      countVi: '8 món cần mua',
      countEn: '8 items needed',
      relatedSlug: 'phong-ngu-vintage-ngot-ngao',
    }),
    card({
      id: 'bedroom-grid-2',
      slug: 'phong-ngu-hien-dai-sang-trong',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Phòng ngủ hiện đại sang trọng',
      titleEn: 'Modern elegant bedroom',
      descriptionVi: 'Bố cục rõ ràng, ánh sáng sáng sủa và cảm giác cao cấp nhẹ nhàng.',
      descriptionEn: 'Clean layout, bright lighting, and a subtle premium mood.',
      tagsVi: ['Hiện đại'],
      tagsEn: ['Modern'],
      budgetVi: 'Khoảng 2.300.000đ',
      budgetEn: 'Around 2,300,000 VND',
      countVi: '11 món cần mua',
      countEn: '11 items needed',
      relatedSlug: 'phong-ngu-hien-dai-sang-trong',
    }),
    card({
      id: 'bedroom-grid-3',
      slug: 'phong-ngu-toi-gian-voi-cay-xanh',
      image: '/assets/study-blue.jpg',
      titleVi: 'Phòng ngủ tối giản với cây xanh',
      titleEn: 'Minimal bedroom with greenery',
      descriptionVi: 'Nhẹ, thoáng và có thêm chút sức sống từ mảng xanh nhỏ xinh.',
      descriptionEn: 'Light, airy, and refreshed with a little bit of greenery.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.650.000đ',
      budgetEn: 'Around 1,650,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'phong-ngu-toi-gian-voi-cay-xanh',
    }),
  ],
  bottomCta: {
    title: t('Chưa biết bắt đầu từ đâu?', 'Not sure where to begin?'),
    text: t(
      'Để Bì Bì gợi ý cho bạn những ý tưởng phù hợp với ngân sách và sở thích nhé!',
      'Let Bì Bì suggest ideas that match your budget and taste.',
    ),
    button: t('✨ Gợi ý cho mình ngay', '✨ Suggest ideas for me'),
    steps: t(
      ['Chọn phong cách yêu thích', 'Nhập ngân sách dự kiến', 'Nhận ý tưởng phù hợp'],
      ['Choose your favorite style', 'Set a budget range', 'Get matched ideas'],
    ),
    mascotAlt: 'Mascot decor cute',
  },
};

const studyPage = {
  theme: 'study',
  navActive: 'ideas',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Góc học tập'], ['Home', 'Ideas', 'Study corner']),
    title: t('Decor góc học tập ✨', 'Study corner decor ✨'),
    subtitle: t(
      'Góc học tập sáng sủa, gọn gàng và rất dễ tập trung.\nKhám phá cảm hứng để bàn học luôn đáng yêu và nhiều năng lượng.',
      'Bright, tidy, and focused.\nFind inspiration to keep your study space cute and energizing.',
    ),
    badge: t('⭐ 36 ý tưởng đang chờ bạn khám phá', '⭐ 36 ideas waiting for you'),
    image: '/assets/study-blue.jpg',
  },
  filters: [
    chip('all', '☁️', 'Tất cả', 'All'),
    chip('minimal', '🌿', 'Tối giản', 'Minimal'),
    chip('cute', '🌸', 'Dễ thương', 'Cute'),
    chip('light', '📷', 'Sáng nhẹ', 'Bright'),
    chip('smart', '🛋', 'Gọn gàng', 'Neat'),
    chip('room', '🏠', 'Phòng trọ', 'Dorm'),
  ],
  featured: card({
    id: 'study-featured',
    slug: 'goc-hoc-tap-xanh-da-troi-pastel',
    image: '/assets/study-blue.jpg',
    titleVi: 'Góc học tập xanh da trời pastel',
    titleEn: 'Pastel blue study corner',
    descriptionVi: 'Sáng, nhẹ và cực kỳ hợp để ngồi học hoặc làm việc lâu mà không mỏi mắt.',
    descriptionEn: 'Bright, light, and easy on the eyes for long study sessions.',
    tagsVi: ['Tối giản', 'Hàn Quốc'],
    tagsEn: ['Minimal', 'Korean'],
    budgetVi: 'Khoảng 1.250.000đ',
    budgetEn: 'Around 1,250,000 VND',
    countVi: '8 món cần mua',
    countEn: '8 items needed',
    relatedSlug: 'goc-hoc-tap-xanh-da-troi-pastel',
  }),
  sideCards: [
    card({
      id: 'study-side-1',
      slug: 'goc-hoc-tap-am-cung',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Góc học tập ấm cúng',
      titleEn: 'Cozy study corner',
      descriptionVi: 'Đủ ấm áp để làm việc, đủ gọn gàng để không bị xao nhãng.',
      descriptionEn: 'Warm enough to feel cozy, tidy enough to stay focused.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.500.000đ',
      budgetEn: 'Around 1,500,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'goc-hoc-tap-am-cung',
    }),
    card({
      id: 'study-side-2',
      slug: 'goc-hoc-tap-cute-han',
      image: '/assets/art-supplies.jpg',
      titleVi: 'Góc học tập cute kiểu Hàn',
      titleEn: 'Cute Korean study nook',
      descriptionVi: 'Một chút dễ thương để không gian học tập mềm mại hơn.',
      descriptionEn: 'A little cuteness to soften the whole study area.',
      tagsVi: ['Dễ thương'],
      tagsEn: ['Cute'],
      budgetVi: 'Khoảng 1.350.000đ',
      budgetEn: 'Around 1,350,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'goc-hoc-tap-cute-han',
    }),
  ],
  cards: [
    card({
      id: 'study-grid-1',
      slug: 'goc-hoc-tap-vintage-nhe-nhang',
      image: '/assets/bedroom-pink.jpg',
      titleVi: 'Góc học tập vintage nhẹ nhàng',
      titleEn: 'Soft vintage study corner',
      descriptionVi: 'Gợi cảm giác thư thái như một quán cafe nhỏ xinh.',
      descriptionEn: 'Gives the calm feeling of a small, charming cafe.',
      tagsVi: ['Vintage'],
      tagsEn: ['Vintage'],
      budgetVi: 'Khoảng 1.800.000đ',
      budgetEn: 'Around 1,800,000 VND',
      countVi: '8 món cần mua',
      countEn: '8 items needed',
      relatedSlug: 'goc-hoc-tap-vintage-nhe-nhang',
    }),
    card({
      id: 'study-grid-2',
      slug: 'goc-hoc-tap-hien-dai-sang-sua',
      image: '/assets/study-blue.jpg',
      titleVi: 'Góc học tập hiện đại sáng sủa',
      titleEn: 'Modern bright study corner',
      descriptionVi: 'Bố cục tinh gọn, hợp với phòng nhỏ và cách sống tối giản.',
      descriptionEn: 'A minimal setup that works beautifully in compact rooms.',
      tagsVi: ['Hiện đại'],
      tagsEn: ['Modern'],
      budgetVi: 'Khoảng 2.300.000đ',
      budgetEn: 'Around 2,300,000 VND',
      countVi: '11 món cần mua',
      countEn: '11 items needed',
      relatedSlug: 'goc-hoc-tap-hien-dai-sang-sua',
    }),
    card({
      id: 'study-grid-3',
      slug: 'goc-hoc-tap-voi-cay-xanh',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Góc học tập với cây xanh',
      titleEn: 'Study corner with greenery',
      descriptionVi: 'Thêm chút xanh để góc học tập luôn tươi và dễ chịu.',
      descriptionEn: 'Add a touch of green to keep the corner fresh and uplifting.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.650.000đ',
      budgetEn: 'Around 1,650,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'goc-hoc-tap-voi-cay-xanh',
    }),
  ],
  bottomCta: bedroomPage.bottomCta,
};

const deskPage = {
  theme: 'desk',
  navActive: 'ideas',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Bàn làm việc'], ['Home', 'Ideas', 'Desk']),
    title: t('Decor bàn làm việc ✨', 'Desk decor ✨'),
    subtitle: t(
      'Một góc làm việc gọn gàng, sáng màu và thật dễ giữ cảm hứng.\nMềm mại nhưng vẫn đủ tập trung cho mọi ngày bận rộn.',
      'A tidy, bright workspace that keeps your inspiration flowing.\nSoft, but focused enough for busy days.',
    ),
    badge: t('⭐ 32 ý tưởng đang chờ bạn khám phá', '⭐ 32 ideas waiting for you'),
    image: '/assets/bookshelf.jpg',
  },
  filters: [
    chip('all', '☁️', 'Tất cả', 'All'),
    chip('minimal', '🌿', 'Tối giản', 'Minimal'),
    chip('cute', '🌸', 'Dễ thương', 'Cute'),
    chip('wood', '📷', 'Gỗ sáng', 'Light wood'),
    chip('modern', '🛋', 'Hiện đại', 'Modern'),
    chip('room', '🏠', 'Phòng nhỏ', 'Small room'),
  ],
  featured: card({
    id: 'desk-featured',
    slug: 'ban-lam-viec-trang-kem-toi-gian',
    image: '/assets/bookshelf.jpg',
    titleVi: 'Bàn làm việc trắng kem tối giản',
    titleEn: 'Cream-white minimal desk',
    descriptionVi: 'Tinh gọn, nhẹ mắt và rất dễ phối với những chi tiết decor nhỏ xinh.',
    descriptionEn: 'Minimal, airy, and easy to pair with cute little decor details.',
    tagsVi: ['Minimal', 'Trắng kem'],
    tagsEn: ['Minimal', 'Cream white'],
    budgetVi: 'Khoảng 1.080.000đ',
    budgetEn: 'Around 1,080,000 VND',
    countVi: '6 món cần mua',
    countEn: '6 items needed',
    relatedSlug: 'ban-lam-viec-trang-kem-toi-gian',
  }),
  sideCards: [
    card({
      id: 'desk-side-1',
      slug: 'ban-lam-viec-mau-go-sang',
      image: '/assets/study-blue.jpg',
      titleVi: 'Bàn làm việc màu gỗ sáng',
      titleEn: 'Light wood desk',
      descriptionVi: 'Ấm hơn một chút nhưng vẫn giữ được cảm giác thoáng.',
      descriptionEn: 'A warmer tone while staying light and airy.',
      tagsVi: ['Gỗ sáng'],
      tagsEn: ['Light wood'],
      budgetVi: 'Khoảng 1.500.000đ',
      budgetEn: 'Around 1,500,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ban-lam-viec-mau-go-sang',
    }),
    card({
      id: 'desk-side-2',
      slug: 'ban-lam-viec-cute-kieu-han',
      image: '/assets/art-supplies.jpg',
      titleVi: 'Bàn làm việc cute kiểu Hàn',
      titleEn: 'Cute Korean desk',
      descriptionVi: 'Nhẹ nhàng, nhỏ xinh và có chút vibe cafe rất dễ thương.',
      descriptionEn: 'Soft, charming, and with a tiny cafe-inspired vibe.',
      tagsVi: ['Dễ thương'],
      tagsEn: ['Cute'],
      budgetVi: 'Khoảng 1.350.000đ',
      budgetEn: 'Around 1,350,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ban-lam-viec-cute-kieu-han',
    }),
  ],
  cards: [
    card({
      id: 'desk-grid-1',
      slug: 'ban-lam-viec-vintage-ngot-ngao',
      image: '/assets/bedroom-pink.jpg',
      titleVi: 'Bàn làm việc vintage ngọt ngào',
      titleEn: 'Sweet vintage desk',
      descriptionVi: 'Một chút retro để góc làm việc mềm mại hơn.',
      descriptionEn: 'A little retro touch to soften the workspace.',
      tagsVi: ['Vintage'],
      tagsEn: ['Vintage'],
      budgetVi: 'Khoảng 1.800.000đ',
      budgetEn: 'Around 1,800,000 VND',
      countVi: '8 món cần mua',
      countEn: '8 items needed',
      relatedSlug: 'ban-lam-viec-vintage-ngot-ngao',
    }),
    card({
      id: 'desk-grid-2',
      slug: 'ban-lam-viec-hien-dai-sang-trong',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Bàn làm việc hiện đại sang trọng',
      titleEn: 'Modern elegant desk',
      descriptionVi: 'Đường nét sạch, ánh sáng đẹp và cảm giác chuyên nghiệp.',
      descriptionEn: 'Clean lines, beautiful light, and a refined feel.',
      tagsVi: ['Hiện đại'],
      tagsEn: ['Modern'],
      budgetVi: 'Khoảng 2.300.000đ',
      budgetEn: 'Around 2,300,000 VND',
      countVi: '11 món cần mua',
      countEn: '11 items needed',
      relatedSlug: 'ban-lam-viec-hien-dai-sang-trong',
    }),
    card({
      id: 'desk-grid-3',
      slug: 'ban-lam-viec-voi-cay-xanh',
      image: '/assets/study-blue.jpg',
      titleVi: 'Bàn làm việc với cây xanh',
      titleEn: 'Desk with greenery',
      descriptionVi: 'Thêm chút sống động để bàn làm việc bớt khô cứng.',
      descriptionEn: 'Add a little life so the desk never feels too rigid.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.650.000đ',
      budgetEn: 'Around 1,650,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ban-lam-viec-voi-cay-xanh',
    }),
  ],
  bottomCta: bedroomPage.bottomCta,
};

const shelfPage = {
  theme: 'shelf',
  navActive: 'ideas',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Kệ decor'], ['Home', 'Ideas', 'Decor shelf']),
    title: t('Decor kệ nhỏ xinh ✨', 'Cute decor shelf ✨'),
    subtitle: t(
      'Một chiếc kệ xinh xắn có thể làm cả căn phòng sáng lên.\nCùng khám phá những cách bày trí nhỏ mà có võ nhé ✨',
      'A cute shelf can brighten an entire room.\nExplore small styling ideas that make a big impact ✨',
    ),
    badge: t('⭐ 28 ý tưởng đang chờ bạn khám phá', '⭐ 28 ideas waiting for you'),
    image: '/assets/art-supplies.jpg',
  },
  filters: [
    chip('all', '☁️', 'Tất cả', 'All'),
    chip('minimal', '🌿', 'Tối giản', 'Minimal'),
    chip('cute', '🌸', 'Dễ thương', 'Cute'),
    chip('vintage', '📷', 'Vintage', 'Vintage'),
    chip('modern', '🛋', 'Hiện đại', 'Modern'),
    chip('room', '🏠', 'Góc nhỏ', 'Nook'),
  ],
  featured: card({
    id: 'shelf-featured',
    slug: 'ke-decor-cute-kieu-han',
    image: '/assets/art-supplies.jpg',
    titleVi: 'Kệ decor cute kiểu Hàn',
    titleEn: 'Cute Korean decor shelf',
    descriptionVi: 'Nhẹ nhàng, sạch sẽ và đủ dễ thương để trở thành điểm nhấn.',
    descriptionEn: 'Soft, neat, and cute enough to become a focal point.',
    tagsVi: ['Korean', 'Cute'],
    tagsEn: ['Korean', 'Cute'],
    budgetVi: 'Khoảng 650.000đ',
    budgetEn: 'Around 650,000 VND',
    countVi: '5 món cần mua',
    countEn: '5 items needed',
    relatedSlug: 'ke-decor-cute-kieu-han',
  }),
  sideCards: [
    card({
      id: 'shelf-side-1',
      slug: 'ke-decor-am-cung',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Kệ decor ấm cúng',
      titleEn: 'Cozy decor shelf',
      descriptionVi: 'Tạo cảm giác mềm mại bằng những món đồ nhỏ có tông ấm.',
      descriptionEn: 'Create softness with a few warm-toned tiny objects.',
      tagsVi: ['Vintage'],
      tagsEn: ['Vintage'],
      budgetVi: 'Khoảng 1.500.000đ',
      budgetEn: 'Around 1,500,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ke-decor-am-cung',
    }),
    card({
      id: 'shelf-side-2',
      slug: 'ke-decor-dien-dan-xanh',
      image: '/assets/study-blue.jpg',
      titleVi: 'Kệ decor điểm xanh',
      titleEn: 'Shelf with blue accents',
      descriptionVi: 'Chỉ cần một chút xanh pastel là kệ đã tươi tắn hơn hẳn.',
      descriptionEn: 'A touch of pastel blue instantly makes the shelf feel fresher.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.350.000đ',
      budgetEn: 'Around 1,350,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ke-decor-dien-dan-xanh',
    }),
  ],
  cards: [
    card({
      id: 'shelf-grid-1',
      slug: 'ke-decor-vintage-nhe-nhang',
      image: '/assets/bedroom-pink.jpg',
      titleVi: 'Kệ decor vintage nhẹ nhàng',
      titleEn: 'Soft vintage shelf',
      descriptionVi: 'Một góc nhỏ có cảm giác hoài niệm nhưng không hề nặng nề.',
      descriptionEn: 'A nostalgic nook that still feels light and airy.',
      tagsVi: ['Vintage'],
      tagsEn: ['Vintage'],
      budgetVi: 'Khoảng 1.800.000đ',
      budgetEn: 'Around 1,800,000 VND',
      countVi: '8 món cần mua',
      countEn: '8 items needed',
      relatedSlug: 'ke-decor-vintage-nhe-nhang',
    }),
    card({
      id: 'shelf-grid-2',
      slug: 'ke-decor-hien-dai-sang-trong',
      image: '/assets/bookshelf.jpg',
      titleVi: 'Kệ decor hiện đại sang trọng',
      titleEn: 'Modern elegant shelf',
      descriptionVi: 'Đường nét gọn, sang mà vẫn giữ được vẻ thân thiện.',
      descriptionEn: 'Clean lines with a polished yet friendly look.',
      tagsVi: ['Hiện đại'],
      tagsEn: ['Modern'],
      budgetVi: 'Khoảng 2.300.000đ',
      budgetEn: 'Around 2,300,000 VND',
      countVi: '11 món cần mua',
      countEn: '11 items needed',
      relatedSlug: 'ke-decor-hien-dai-sang-trong',
    }),
    card({
      id: 'shelf-grid-3',
      slug: 'ke-decor-voi-cay-xanh',
      image: '/assets/study-blue.jpg',
      titleVi: 'Kệ decor với cây xanh',
      titleEn: 'Shelf with greenery',
      descriptionVi: 'Một chút sức sống xanh để góc decor luôn tươi vui.',
      descriptionEn: 'A little green life to keep the decor corner cheerful.',
      tagsVi: ['Tối giản'],
      tagsEn: ['Minimal'],
      budgetVi: 'Khoảng 1.650.000đ',
      budgetEn: 'Around 1,650,000 VND',
      countVi: '9 món cần mua',
      countEn: '9 items needed',
      relatedSlug: 'ke-decor-voi-cay-xanh',
    }),
  ],
  bottomCta: bedroomPage.bottomCta,
};

const explorePage = {
  theme: 'explore',
  navActive: 'ideas',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Khám phá'], ['Home', 'Ideas', 'Explore']),
    title: t('Khám phá cảm hứng ✨', 'Explore inspiration ✨'),
    subtitle: t(
      'Tổng hợp những góc decor đáng yêu nhất để bạn bắt đầu từ bất cứ đâu.\nMỗi ý tưởng đều nhẹ nhàng, sáng sủa và dễ áp dụng.',
      'A gentle collection of the cutest decor corners to start from anywhere.\nEvery idea stays bright, soft, and easy to apply.',
    ),
    badge: t('⭐ 52 ý tưởng đang chờ bạn khám phá', '⭐ 52 ideas waiting for you'),
    image: '/assets/hero-bg.jpg',
  },
  filters: [
    chip('all', '☁️', 'Tất cả', 'All'),
    chip('minimal', '🌿', 'Tối giản', 'Minimal'),
    chip('cute', '🌸', 'Dễ thương', 'Cute'),
    chip('vintage', '📷', 'Vintage', 'Vintage'),
    chip('modern', '🛋', 'Hiện đại', 'Modern'),
    chip('room', '🏠', 'Cảm hứng', 'Inspo'),
  ],
  featured: bedroomPage.featured,
  sideCards: [studyPage.featured, deskPage.featured],
  cards: [shelfPage.featured, bedroomPage.cards[1], studyPage.cards[1], deskPage.cards[1]],
  bottomCta: bedroomPage.bottomCta,
};

const cloneCategoryPage = (basePage, overrides = {}) => ({
  ...basePage,
  ...overrides,
  hero: {
    ...basePage.hero,
    ...(overrides.hero || {}),
  },
  filters: overrides.filters || basePage.filters,
  featured: overrides.featured || basePage.featured,
  sideCards: overrides.sideCards || basePage.sideCards,
  cards: overrides.cards || basePage.cards,
  bottomCta: overrides.bottomCta || basePage.bottomCta,
});

const livingRoomPage = cloneCategoryPage(explorePage, {
  theme: 'living',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Phòng khách'], ['Home', 'Ideas', 'Living room']),
    title: t('Decor phòng khách ✨', 'Living room decor ✨'),
    subtitle: t(
      'Khám phá những ý tưởng phòng khách mềm mại, sáng sủa và ấm cúng để không gian sum họp luôn dễ chịu.',
      'Discover soft, bright, and cozy living room ideas that make everyday gathering spaces feel welcoming.',
    ),
    badge: t('⭐ 38 ý tưởng đang chờ bạn khám phá', '⭐ 38 ideas waiting for you'),
  },
});

const kitchenPage = cloneCategoryPage(shelfPage, {
  theme: 'kitchen',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Nhà bếp'], ['Home', 'Ideas', 'Kitchen']),
    title: t('Decor nhà bếp ✨', 'Kitchen decor ✨'),
    subtitle: t(
      'Gợi ý decor nhà bếp nhỏ xinh, sạch sẽ và tiện lợi để mỗi bữa ăn đều nhẹ nhàng hơn.',
      'Cute, clean, and practical kitchen decor ideas that make mealtime feel more pleasant.',
    ),
    badge: t('⭐ 34 ý tưởng đang chờ bạn khám phá', '⭐ 34 ideas waiting for you'),
  },
  featured: shelfPage.featured,
  sideCards: [shelfPage.sideCards[0], shelfPage.cards[0]],
  cards: [shelfPage.cards[1], shelfPage.cards[2], bedroomPage.cards[2], studyPage.cards[2]],
});

const kidsRoomPage = cloneCategoryPage(studyPage, {
  theme: 'kids',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Phòng trẻ em'], ['Home', 'Ideas', 'Kids room']),
    title: t('Decor phòng trẻ em ✨', 'Kids room decor ✨'),
    subtitle: t(
      'Những ý tưởng phòng trẻ em tươi sáng, mềm mại và đáng yêu để tạo cảm giác vui tươi mỗi ngày.',
      'Bright, soft, and adorable kids room ideas that bring a cheerful mood every day.',
    ),
    badge: t('⭐ 30 ý tưởng đang chờ bạn khám phá', '⭐ 30 ideas waiting for you'),
  },
  featured: studyPage.featured,
  sideCards: [studyPage.sideCards[0], studyPage.cards[2]],
  cards: [studyPage.cards[0], studyPage.cards[1], bedroomPage.cards[0], shelfPage.cards[2]],
});

const dormRoomPage = cloneCategoryPage(deskPage, {
  theme: 'dorm',
  hero: {
    breadcrumb: t(['Trang chủ', 'Ý tưởng', 'Phòng trọ'], ['Home', 'Ideas', 'Dorm room']),
    title: t('Decor phòng trọ ✨', 'Dorm room decor ✨'),
    subtitle: t(
      'Khám phá những ý tưởng decor phòng trọ nhỏ xinh, tiết kiệm diện tích và vẫn thật dễ thương.',
      'Explore compact dorm room decor ideas that stay charming, space-friendly, and cute.',
    ),
    badge: t('⭐ 28 ý tưởng đang chờ bạn khám phá', '⭐ 28 ideas waiting for you'),
  },
  featured: deskPage.featured,
  sideCards: [deskPage.sideCards[0], shelfPage.sideCards[1]],
  cards: [deskPage.cards[0], deskPage.cards[1], shelfPage.cards[0], bedroomPage.cards[2]],
});

const themePages = {
  bedroom: bedroomPage,
  study: studyPage,
  desk: deskPage,
  shelf: shelfPage,
  living: livingRoomPage,
  kitchen: kitchenPage,
  kids: kidsRoomPage,
  dorm: dormRoomPage,
  explore: explorePage,
};

export function inferCategoryTheme(slug = '') {
  if (slug.includes('goc-hoc-tap')) return 'study';
  if (slug.includes('phong-khach')) return 'living';
  if (slug.includes('nha-bep')) return 'kitchen';
  if (slug.includes('ban-lam-viec')) return 'desk';
  if (slug.includes('phong-tre-em')) return 'kids';
  if (slug.includes('phong-tro')) return 'dorm';
  if (slug.includes('ke-decor')) return 'shelf';
  if (slug.includes('kham-pha')) return 'explore';
  if (slug.includes('khac')) return 'explore';
  return 'bedroom';
}

export function getIdeaCategoryPage(slug) {
  return themePages[inferCategoryTheme(slug)];
}

const budgetThemeLabels = {
  bedroom: t('Phòng ngủ', 'Bedroom'),
  study: t('Góc học tập', 'Study corner'),
  desk: t('Bàn làm việc', 'Work desk'),
  shelf: t('Kệ decor', 'Decor shelf'),
  living: t('Phòng khách', 'Living room'),
  kitchen: t('Nhà bếp', 'Kitchen'),
  kids: t('Phòng trẻ em', 'Kids room'),
  dorm: t('Phòng trọ', 'Dorm room'),
  explore: t('Khám phá', 'Explore'),
};

const budgetSourcePages = [
  bedroomPage,
  studyPage,
  deskPage,
  shelfPage,
  livingRoomPage,
  kitchenPage,
  kidsRoomPage,
  dormRoomPage,
  explorePage,
];

export function getBudgetOption(slug) {
  return budgetOptions.find((option) => option.id === slug) || budgetOptions[0];
}

export function filterBudgetIdeas(items, budgetSlug) {
  const option = getBudgetOption(budgetSlug);
  return items.filter((item) => {
    if (option.id === 'over-5m') return item.totalPrice > option.minPrice;
    return item.totalPrice <= option.maxPrice;
  });
}

export function getBudgetIdeas(lang) {
  const seen = new Set();
  const items = [];

  budgetSourcePages.forEach((page, pageIndex) => {
    const themeKey = page.theme || inferCategoryTheme(page.hero?.title?.vi || '');
    const themeLabel = budgetThemeLabels[themeKey] || budgetThemeLabels.explore;
    const cards = [page.featured, ...(page.sideCards || []), ...(page.cards || [])];

    cards.forEach((item, cardIndex) => {
      const sourceSlug = item.relatedSlug || item.slug;
      if (!sourceSlug || seen.has(sourceSlug)) return;
      seen.add(sourceSlug);

      const title = item.title?.[lang] || item.title?.vi || item.slug;
      const description = item.description?.[lang] || item.description?.vi || '';
      const budgetText = item.budget?.[lang] || item.budget?.vi || '';
      const totalPrice = parseBudgetAmount(budgetText);
      const productCountText = item.productCount?.[lang] || item.productCount?.vi || '';
      const productCount = parseItemCount(productCountText);
      const styleTags = item.styleTags?.[lang] || item.styleTags?.vi || [];

      items.push({
        id: `${themeKey}-${sourceSlug}`,
        slug: sourceSlug,
        image: item.image,
        title,
        description,
        totalPrice,
        totalPriceLabel: budgetText,
        productCount,
        productCountLabel: productCountText,
        roomCategory: themeLabel[lang],
        styleTags,
        popularity: 1000 - (pageIndex * 100 + cardIndex * 10),
        orderIndex: pageIndex * 10 + cardIndex,
      });
    });
  });

  return items;
}
