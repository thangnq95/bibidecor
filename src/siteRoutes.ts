export const categorySlugs = [
  'phong-ngu',
  'goc-hoc-tap',
  'phong-khach',
  'nha-bep',
  'ban-lam-viec',
  'phong-tre-em',
  'phong-tro',
  'kham-pha',
];

export const budgetSlugs = ['under-300k', '300k-500k', '500k-1m', '1m-2m', '2m-5m', 'over-5m'];

export const broadPageRoutes = {
  decor: '/decor',
  stationery: '/stationery',
  accessories: '/accessories',
  gifts: '/gifts',
  discover: '/san-pham-goi-y',
  favorites: '/yeu-thich',
  search: '/search',
  notFound: '/404',
};

export const ideaSlugs = [
  'goc-hoc-tap-xanh-da-troi-pastel',
  'goc-hoc-tap-hong-cute-cloud',
  'phong-ngu-hong-nhat-cong-chua',
  'ban-lam-viec-trang-kem-toi-gian',
  'ke-decor-cute-kieu-han',
];

export const routeForCategory = (slug) => `/decor/${slug}`;
export const routeForDecorHome = () => broadPageRoutes.decor;
export const routeForStationery = () => broadPageRoutes.stationery;
export const routeForAccessories = () => broadPageRoutes.accessories;
export const routeForGifts = () => broadPageRoutes.gifts;
export const routeForDiscover = () => broadPageRoutes.discover;
export const routeForFavorites = () => broadPageRoutes.favorites;
export const routeForSearch = () => broadPageRoutes.search;
export const routeForNotFound = () => broadPageRoutes.notFound;
export const routeForIdea = (slug) => `/idea/${slug}`;
export const routeForProducts = () => '/san-pham-goi-y';
export const routeForBudget = (slug) => `/budget/${slug}`;

export const indexableSeoRoutes = [
  '/',
  routeForDecorHome(),
  routeForStationery(),
  routeForAccessories(),
  routeForGifts(),
  routeForDiscover(),
  ...budgetSlugs.map(routeForBudget),
  ...categorySlugs.map(routeForCategory),
  ...ideaSlugs.map(routeForIdea),
];

export const privateSeoRoutes = [
  routeForSearch(),
  routeForFavorites(),
  routeForNotFound(),
  '/wishlist',
  '/cart',
  '/checkout',
  '/payment',
  '/order',
  '/order-tracking',
  '/account',
  '/admin',
];

export const allSeoRoutes = indexableSeoRoutes;

export function normalizePathname(pathname) {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/index.html') return '/';
  if (cleaned.startsWith('/category/')) {
    return cleaned.replace('/category/', '/decor/');
  }
  if (cleaned === '/wishlist') {
    return routeForFavorites();
  }
  return cleaned;
}

export function getCategorySlugFromPath(pathname) {
  const current = normalizePathname(pathname);
  if (current.startsWith('/decor/')) return current.replace('/decor/', '');
  return null;
}
