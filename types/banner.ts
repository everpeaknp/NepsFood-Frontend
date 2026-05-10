export interface HeroBanner {
  id: number;
  title: string;
  description: string;
  image: string;
  discount_percentage: number;
  discount_text: string;
  price: string;
  price_text: string;
  button_text: string;
  button_link: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface MarketplaceBanner {
  id: number;
  title: string;
  description: string;
  image: string;
  button_text: string;
  button_link: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface PromoBanner {
  id: number;
  title: string;
  description: string;
  image: string;
  button_text: string;
  button_link: string;
  is_active: boolean;
  created_at: string;
}

export interface ScrollingBanner {
  id: number;
  text: string;
  is_active: boolean;
  created_at: string;
}
