export interface GameInfo {
  title: string;
  titleEn: string;
  genre: string;
  developer: string;
  publisher: string;
  platforms: string[];
  releaseDate: string;
  description: string;
  coverImage: string;
  rating: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'guide' | 'walkthrough' | 'tips' | 'download';
  tags: string[];
  coverImage: string;
  date: string;
  author: string;
  readTime: number;
  featured?: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface SiteConfig {
  name: string;
  locale: string;
  navItems: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PublishStatus {
  success: boolean;
  message: string;
  url?: string;
}
