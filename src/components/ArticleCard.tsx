import Link from 'next/link';
import { Article } from '@/lib/types';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'horizontal' | 'vertical' | 'featured';
}

export default function ArticleCard({ article, variant = 'vertical' }: ArticleCardProps) {
  const categoryLabels: Record<string, string> = {
    news: 'News',
    guide: 'Guide',
    walkthrough: 'Walkthrough',
    tips: 'Tips',
    download: 'Download',
  };

  const categoryColors: Record<string, string> = {
    news: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    guide: 'bg-green-500/20 text-green-400 border-green-500/30',
    walkthrough: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    tips: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    download: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  if (variant === 'featured') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-[#16213e] border border-[#e94560]/20 hover:border-[#e94560]/50 transition-all duration-300"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-[#0f3460] to-[#e94560]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-20">🎮</span>
          </div>
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-white group-hover:text-[#e94560] transition-colors mb-2">
            {article.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime} min
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group flex gap-4 p-4 rounded-xl bg-[#16213e]/50 border border-transparent hover:border-[#e94560]/30 hover:bg-[#16213e] transition-all duration-300"
      >
        <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gradient-to-br from-[#0f3460] to-[#e94560]/20 flex items-center justify-center">
          <span className="text-2xl opacity-40">🎮</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white group-hover:text-[#e94560] transition-colors line-clamp-2 mb-1">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {article.readTime}min
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block overflow-hidden rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all duration-300"
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-[#0f3460] to-[#e94560]/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-20">🎮</span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${categoryColors[article.category]}`}>
            {categoryLabels[article.category]}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#e94560] transition-colors line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {article.readTime}min
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#e94560] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
