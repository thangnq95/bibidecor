import { routeForAccessories, routeForDiscover, routeForFavorites, routeForGifts, routeForStationery } from '../siteRoutes';
import { affiliatePicks } from './homeData';
import { stationeryPageData } from './stationeryData';

export const broadPageConfigs = {
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

export const categorySeoMap: Record<string, any> = {
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
