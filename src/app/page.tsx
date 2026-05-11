import HeroSection from '@/components/HeroSection';
import GuideSectionGrid from '@/components/GuideSectionGrid';
import ArticleList from '@/components/ArticleList';
import { sampleArticles, getFeaturedArticles } from '@/lib/data';
import { Gamepad2, Star, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const newsArticles = sampleArticles.filter((a) => a.category === 'news');
  const guideArticles = sampleArticles.filter((a) => a.category === 'guide');

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-[#0f3460] border-y border-[#e94560]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Gamepad2, label: 'Guide Articles', value: '128+' },
              { icon: Star, label: 'Game Rating', value: '4.9/5' },
              { icon: TrendingUp, label: "Today's Views", value: '12.5K' },
              { icon: Users, label: 'Active Players', value: '89.3K' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#e94560]/20">
                  <stat.icon className="w-5 h-5 text-[#e94560]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-[#16213e]/50">
        <ArticleList
          articles={featuredArticles.length > 0 ? sampleArticles : []}
          title="🔥 Featured"
          subtitle="Most popular GTA 6 guide content"
          viewAllHref="/guides"
          variant="mixed"
        />
      </section>

      {/* Guide Sections */}
      <GuideSectionGrid />

      {/* Latest News */}
      <section className="bg-[#16213e]/30">
        <ArticleList
          articles={newsArticles}
          title="📰 Latest News"
          subtitle="GTA 6 latest updates & announcements"
          viewAllHref="/news"
          variant="grid"
        />
      </section>

      {/* Latest Guides */}
      <ArticleList
        articles={guideArticles}
        title="📖 Game Guides"
        subtitle="Comprehensive and detailed game guides"
        viewAllHref="/guides"
        variant="grid"
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0f3460] to-[#e94560]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Enter Vice City?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community for the latest GTA 6 guides, news, and exclusive content. Explore Leonida with players worldwide!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/guides"
              className="px-8 py-3 bg-[#e94560] hover:bg-[#d63851] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#e94560]/30"
            >
              Start Exploring
            </a>
            <a
              href="/admin"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
