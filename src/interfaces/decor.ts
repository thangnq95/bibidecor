import type { Lang, LocalizedText } from './common';

export interface ShoppingItem {
  name: string;
  detail: string;
  price: string;
  shop: string;
  url?: string;
}

export interface IdeaMeta {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  summary: Array<{ label: string; value: string; hint: string }>;
  benefitsTitle: string;
  benefits: string[];
  paletteTitle: string;
  paletteNote: string;
  shoppingTitle: string;
  shoppingCount: string;
  shoppingCta: string;
  shoppingItems: ShoppingItem[];
}

export interface DecorIdea {
  slug: string;
  image: string;
  palette: string[];
  accent: string;
  meta: Record<Lang, IdeaMeta>;
}

export interface DetailPageProps {
  content: any;
  lang: Lang;
  idea: DecorIdea;
  ideas: DecorIdea[];
  onBack: () => void;
  onOpenIdea: (slug: string) => void;
  onOpenProducts: () => void;
  onToggleProductFavorite?: (productId: string) => void;
  isProductFavorite?: (productId: string) => boolean;
}

export interface IdeaCategoryCard {
  id: string;
  slug: string;
  image: string;
  title: LocalizedText;
  description: LocalizedText;
  styleTags: LocalizedText<string[]>;
  budget: LocalizedText;
  productCount: LocalizedText;
  relatedSlug?: string;
}

