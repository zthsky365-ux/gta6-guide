import { sampleArticles } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  const newsArticles = sampleArticles.filter((a) => a.category === 'news');
  const otherArticles = sampleArticles.filter((a) => a.category !== 'news');

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#e94560]" />
            <h1 className="text-3xl font-bold text-white">Game News</h1>
          </div>
          <p className="text-gray-400">GTA 6 latest updates, news & announcements</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {newsArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="vertical" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No news articles yet</p>
            <p className="text-gray-500 text-sm mt-2">Add content via the admin panel</p>
          </div>
        )}

        {/* Other Recent Articles */}
        {otherArticles.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-[#e94560] pl-3">
              Recent Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="vertical" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
