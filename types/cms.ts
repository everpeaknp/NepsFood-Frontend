export interface Feature {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  text: string;
  rating: number;
  order: number;
  is_active: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
}

export interface Vendor {
  id: number;
  name: string;
  logo: string;
  order: number;
  is_active: boolean;
}

export interface Store {
  id: number;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
}

export interface SiteSettings {
  site_name?: string;
  site_logo?: string;
  site_logo_footer?: string;
  address?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface FooterLink {
  id: number;
  title: string;
  final_url: string;
  open_in_new_tab?: boolean;
  order?: number;
}

export interface FooterColumn {
  id: number;
  title: string;
  order?: number;
  links: FooterLink[];
}

export interface NavigationMenu {
  id: number;
  title: string;
  final_url: string;
  open_in_new_tab?: boolean;
  order?: number;
}
