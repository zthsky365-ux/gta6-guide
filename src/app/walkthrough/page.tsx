import { Map, CheckCircle, Clock, Star } from 'lucide-react';
import Link from 'next/link';

export default function WalkthroughPage() {
  const missions = [
    { id: 1, title: 'Prologue: A New Beginning', description: 'First encounter between Lucia and Jason', status: 'available', difficulty: 1 },
    { id: 2, title: 'Chapter 1: First Impressions of Vice City', description: 'Explore Vice City and establish initial connections', status: 'available', difficulty: 2 },
    { id: 3, title: 'Chapter 2: The Underworld', description: 'First steps into the criminal world', status: 'available', difficulty: 3 },
    { id: 4, title: 'Chapter 3: Money & Power', description: 'The starting point of building a business empire', status: 'available', difficulty: 3 },
    { id: 5, title: 'Chapter 4: Betrayal & Revenge', description: 'Face betrayal and seek revenge', status: 'available', difficulty: 4 },
    { id: 6, title: 'Chapter 5: The Final Showdown', description: 'The ultimate choice that determines fate', status: 'available', difficulty: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-8 h-8 text-[#e94560]" />
            <h1 className="text-3xl font-bold text-white">Main Story</h1>
          </div>
          <p className="text-gray-400">Complete GTA 6 main mission walkthrough</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="bg-[#16213e] rounded-xl p-6 mb-8 border border-[#e94560]/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Progress</h2>
            <span className="text-sm text-gray-400">0 / {missions.length} completed</span>
          </div>
          <div className="w-full bg-[#0f3460] rounded-full h-2">
            <div className="bg-[#e94560] h-2 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Mission List */}
        <div className="space-y-3">
          {missions.map((mission) => (
            <Link
              key={mission.id}
              href={`/walkthrough/mission-${mission.id}`}
              className="group flex items-center gap-4 p-4 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0f3460] flex items-center justify-center text-white font-bold">
                {mission.id}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium group-hover:text-[#e94560] transition-colors">
                  {mission.title}
                </h3>
                <p className="text-gray-500 text-sm truncate">{mission.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < mission.difficulty ? 'text-[#e94560] fill-[#e94560]' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">
                  Available
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          More missions coming soon...
        </div>
      </div>
    </div>
  );
}
