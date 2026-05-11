import { gameInfo } from '@/lib/data';
import { Star, Monitor, Users, Calendar, Building, Gamepad2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e94560]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0f3460]/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e94560]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Hero Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#e94560] text-white text-xs font-bold rounded-full animate-pulse">
                🔥 HOT
              </span>
              <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                Most Anticipated Game of 2026
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#e94560] to-[#ff6b6b] bg-clip-text text-transparent">
                {gameInfo.title}
              </span>
              <br />
              <span className="text-2xl md:text-4xl text-gray-300">{gameInfo.titleEn}</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {gameInfo.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/guides"
                className="px-6 py-3 bg-[#e94560] hover:bg-[#d63851] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#e94560]/30"
              >
                Browse Guides
              </a>
              <a
                href="/news"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
              >
                Latest News
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['Open World', 'Action-Adventure', 'Dual Protagonists', 'Vice City', 'GTA Series'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#0f3460]/80 text-gray-300 text-xs rounded-full border border-[#e94560]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Game Info Card */}
          <div className="bg-[#16213e]/80 backdrop-blur-sm rounded-2xl border border-[#e94560]/20 overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#0f3460] to-[#e94560]/30 relative flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl block mb-2">🎮</span>
                <span className="text-white/60 text-sm">GTA VI</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#16213e] to-transparent h-24" />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold">{gameInfo.rating}</span>
                <span className="text-gray-400 text-sm">/ 5.0</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Gamepad2 className="w-4 h-4 text-[#e94560]" />
                  <span className="text-gray-500">Genre:</span>
                  <span>{gameInfo.genre}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building className="w-4 h-4 text-[#e94560]" />
                  <span className="text-gray-500">Developer:</span>
                  <span>{gameInfo.developer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building className="w-4 h-4 text-[#e94560]" />
                  <span className="text-gray-500">Publisher:</span>
                  <span>{gameInfo.publisher}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Monitor className="w-4 h-4 text-[#e94560]" />
                  <span className="text-gray-500">Platforms:</span>
                  <span>{gameInfo.platforms.join(' / ')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-[#e94560]" />
                  <span className="text-gray-500">Release:</span>
                  <span>{gameInfo.releaseDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700/50">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>123,456 players following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
