import type { Lang, LocalizedText } from './common';

export interface BudgetOption {
  id: string;
  label: LocalizedText;
  minPrice: number;
  maxPrice: number;
  path: string;
  color: string;
}

export interface BudgetIdea {
  id: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  totalPrice: number;
  totalPriceLabel: string;
  productCount: number;
  productCountLabel: string;
  roomCategory: string;
  styleTags: string[];
  popularity: number;
  orderIndex: number;
}

export interface BudgetPageProps {
  content: any;
  lang: Lang;
  budgetSlug: string;
  budgetIdeas: BudgetIdea[];
  onOpenIdea: (slug: string) => void;
  onOpenBudget: (slug: string) => void;
}

