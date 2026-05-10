export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  post_count: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image: string | null;
  featured_image_url: string | null;
  category: BlogCategory;
  tags: BlogTag[];
  author: BlogAuthor;
  is_featured: boolean;
  view_count: number;
  reading_time: number;
  comment_count: number;
  published_at: string;
  created_at: string;
  updated_at?: string;
  meta_description?: string;
  meta_keywords?: string;
}

export interface BlogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}

export interface BlogComment {
  id: number;
  post: number;
  user: number | null;
  name: string;
  email: string;
  comment: string;
  author_name: string;
  is_approved: boolean;
  parent: number | null;
  replies: BlogComment[];
  created_at: string;
  updated_at: string;
}
