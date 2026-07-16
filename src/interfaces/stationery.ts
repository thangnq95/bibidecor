import type { Lang, LocalizedText, RouteHandler } from './common';

export interface StationeryProduct {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: string;
  priceValue: number;
  source: string;
  image: string;
  dealUrl: string;
  tags: LocalizedText<string[]>;
  categories: string[];
  flags: string[];
}

export interface StationeryPageData {
  hero: {
    title: LocalizedText;
    subtitle: LocalizedText;
    cta: LocalizedText;
    image: string;
    secondaryImage: string;
  };
  heroChips: LocalizedText[];
  quickCategories: Array<{ id: string; iconSrc?: string; icon?: string; label: LocalizedText }>;
  filters: Array<{ id: string; label: LocalizedText }>;
  vibeTitle: LocalizedText;
  vibeSubtitle: LocalizedText;
  vibes: Array<{ id: string; title: LocalizedText; description: LocalizedText; image: string; cta: LocalizedText; route: string }>;
  productsTitle: LocalizedText;
  productsSubtitle: LocalizedText;
  spotlightTitle: LocalizedText;
  spotlightSubtitle: LocalizedText;
  needsTitle: LocalizedText;
  needsSubtitle: LocalizedText;
  needs: Array<{ id: string; iconSrc?: string; title: LocalizedText; description: LocalizedText; route: string }>;
  seo: LocalizedText;
  seoFacts: Array<{ label: LocalizedText; value: LocalizedText }>;
  products: StationeryProduct[];
  spotlightProducts: StationeryProduct[];
}

export interface StationeryPageProps {
  content: any;
  lang: Lang;
  pageData: StationeryPageData;
  onOpenRoute: RouteHandler;
}

export interface StationeryProductCardProps {
  lang: Lang;
  product: StationeryProduct;
  saved: boolean;
  onToggleSave: (productId: string) => void;
  onOpenDeal: (url: string) => void;
  variant?: 'grid' | 'spotlight';
}

