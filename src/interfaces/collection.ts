import type { Lang } from './common';

export interface CollectionItem {
  id?: string;
  titleVi?: string;
  titleEn?: string;
  descriptionVi?: string;
  descriptionEn?: string;
  image: string;
  route?: string;
}

export interface CollectionPageConfig {
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  heroImage: string;
  accent: string;
  emptyTitleVi: string;
  emptyTitleEn: string;
  emptyTextVi: string;
  emptyTextEn: string;
  items: CollectionItem[];
}

export interface CollectionLandingPageProps {
  content: any;
  lang: Lang;
  page: CollectionPageConfig;
  onOpenItem: (item: CollectionItem) => void;
  onOpenExplore: () => void;
}

