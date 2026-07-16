export type Lang = 'vi' | 'en';

export interface LocalizedText<T = string> {
  vi: T;
  en: T;
}

export type RouteHandler = (route: string) => void;

