export interface GiftProduct {
  id: string;
  badge: string;
  title: string;
  price: string;
  image: string;
}

export interface GiftsPageProps {
  onOpenRoute: (route: string) => void;
}

