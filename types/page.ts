export interface Widget {
  id: number;
  name: string;
  widget_type: string;
  is_active: boolean;
}

export interface PageWidget {
  id: number;
  widget: Widget;
  order: number;
  is_active: boolean;
  config: Record<string, any>;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  meta_description: string;
  is_active: boolean;
  widgets: PageWidget[];
  created_at: string;
  updated_at: string;
}

export interface WidgetHeroBanner {
  title: string;
  subtitle: string;
  background_image: string;
  overlay_opacity: number;
  text_color: string;
}

export interface WidgetTextSection {
  heading: string;
  content: string;
  text_align: 'left' | 'center' | 'right';
}

export interface WidgetStatistic {
  number: string;
  label: string;
  order: number;
}

export interface WidgetFAQItem {
  question: string;
  answer: string;
  order: number;
}

export interface WidgetHTMLContent {
  html_content: string;
  css_classes: string;
}
