import type { RefObject } from 'react';
import type { Lang } from './common';
import type { DecorIdea } from './decor';

export interface HomeCategory {
  slug: string;
  color: string;
  labelVi: string;
  labelEn: string;
  route: string;
  iconSrc: string;
  descriptionVi: string;
  descriptionEn: string;
}

export interface AffiliatePick {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  categoryVi: string;
  categoryEn: string;
  priceVi: string;
  priceEn: string;
  source: string;
  route: string;
  image: string;
}

export interface HomePageProps {
  content: any;
  lang: Lang;
  ideas: DecorIdea[];
  categories: HomeCategory[];
  picks: AffiliatePick[];
  heroQuery: string;
  searchRef: RefObject<HTMLInputElement>;
  onHeroQueryChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  onOpenIdea: (slug: string) => void;
  onOpenCategory: (route: string) => void;
  onOpenBudget: (slug: string) => void;
  onOpenPick: (route: string) => void;
}
