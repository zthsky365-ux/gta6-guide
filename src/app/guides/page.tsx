import { sampleArticles, guideSections } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function GuidesPage() {
  const guideArticles = sampleArticles.filter((a) => a.category === 'guide');

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#e94560]" />
            <h1 className="text-3xl font-bold text-white">Game Guides</h1>
          </div>
          <p className="text-gray-400">Comprehensive GTA 6 guide walkthroughs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guide Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {guideSections.map((section) => (
            <Link
              key={section.id}
              href={`/guides/${section.id}`}
              className="group flex items-center gap-3 p-4 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all hover:-translate-y-0.5"
            >
              <span className="text-2xl">{section.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-[#e94560] transition-colors truncate">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{section.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#e94560] transition-colors" />
            </Link>
          ))}
        </div>

        {/* All Guide Articles */}
        <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-[#e94560] pl-3">
          All Guides
        </h2>
        {guideArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="vertical" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No guide articles yet</p>
            <p className="text-gray-500 text-sm mt-2">Add content via the admin panel</p>
          </div>
        )}
      </div>
    </div>
  );
}
