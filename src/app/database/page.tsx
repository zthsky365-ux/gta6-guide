import { Database, Car, Crosshair, Home, Trophy, Map, Users } from 'lucide-react';
import Link from 'next/link';

export default function DatabasePage() {
  const categories = [
    { icon: Car, title: 'Vehicle Catalog', description: 'All vehicle stats, unlock methods & customization', count: '200+', href: '/database/vehicles' },
    { icon: Crosshair, title: 'Weapon Catalog', description: 'All weapon stats, unlocks & upgrade guides', count: '50+', href: '/database/weapons' },
    { icon: Home, title: 'Properties', description: 'All real estate, business investments & returns', count: '30+', href: '/database/properties' },
    { icon: Trophy, title: 'Achievements', description: 'All achievement unlock conditions & guides', count: '80+', href: '/database/achievements' },
    { icon: Map, title: 'Map Markers', description: 'All collectibles & easter egg locations', count: '100+', href: '/database/map' },
    { icon: Users, title: 'NPC Catalog', description: 'Key NPC locations, quests & relationships', count: '60+', href: '/database/npcs' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-[#e94560]" />
            <h1 className="text-3xl font-bold text-white">Game Database</h1>
          </div>
          <p className="text-gray-400">Complete GTA 6 game database</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group p-6 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <cat.icon className="w-10 h-10 text-[#e94560]" />
                <span className="px-2 py-0.5 bg-[#e94560]/20 text-[#e94560] text-xs font-medium rounded">
                  {cat.count}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#e94560] transition-colors">
                {cat.title}
              </h3>
              <p className="text-gray-400 text-sm">{cat.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-[#0f3460]/50 border border-[#e94560]/20 text-center">
          <Database className="w-12 h-12 text-[#e94560] mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Database Updating Continuously</h3>
          <p className="text-gray-400 text-sm">Complete data will be added after the game launches</p>
        </div>
      </div>
    </div>
  );
}
