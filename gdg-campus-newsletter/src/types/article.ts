export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  images: ArticleImage[];
  featured?: boolean;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
}