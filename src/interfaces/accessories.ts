export interface AccessoryProduct {
  id: string;
  badge: string;
  title: string;
  price: string;
  image: string;
}

export interface AccessoriesPageProps {
  onOpenRoute: (route: string) => void;
}

