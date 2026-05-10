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
