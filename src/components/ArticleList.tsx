import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ArticleListProps {
  articles: Article[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  variant?: 'grid' | 'list' | 'mixed';
}

export default function ArticleList({
  articles,
  title,
  subtitle,
  viewAllHref,
  variant = 'grid',
}: ArticleListProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 text-[#e94560] hover:text-[#ff6b6b] text-sm font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {variant === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="vertical" />
            ))}
          </div>
        )}

        {variant === 'list' && (
          <div className="space-y-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="horizontal" />
            ))}
          </div>
        )}

        {variant === 'mixed' && articles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArticleCard article={articles[0]} variant="featured" />
            </div>
            <div className="space-y-3">
              {articles.slice(1, 5).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
