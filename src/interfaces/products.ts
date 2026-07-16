import type { Lang } from './common';

export interface ProductCatalogItem {
  id: string;
  name: string;
  detail: string;
  price: string;
  shop: string;
  ideaSlug: string;
  ideaTitle: string;
  ideaSubtitle: string;
  image: string;
  themeKey: string;
  themeLabel: string;
}

export interface ProductListPageProps {
  content: any;
  lang: Lang;
  products: ProductCatalogItem[];
  currentPage: number;
  onOpenProduct: (product: ProductCatalogItem) => void;
  onPageChange: (page: number) => void;
}

