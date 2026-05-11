import Link from 'next/link';
import { Gamepad2, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] border-t border-[#e94560]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-[#e94560]" />
              <span className="text-lg font-bold text-white">GTA VI Guide</span>
            </Link>
            <p className="text-gray-400 text-sm">
              The most comprehensive GTA6 guide website, providing the latest news, detailed walkthroughs, and game database.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/news" className="hover:text-[#e94560] transition-colors">Latest News</Link></li>
              <li><Link href="/guides" className="hover:text-[#e94560] transition-colors">Game Guides</Link></li>
              <li><Link href="/walkthrough" className="hover:text-[#e94560] transition-colors">Walkthrough</Link></li>
              <li><Link href="/database" className="hover:text-[#e94560] transition-colors">Game Database</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/downloads" className="hover:text-[#e94560] transition-colors">Downloads</Link></li>
              <li><Link href="/guides/vehicles" className="hover:text-[#e94560] transition-colors">Vehicle Catalog</Link></li>
              <li><Link href="/guides/weapons" className="hover:text-[#e94560] transition-colors">Weapon Catalog</Link></li>
              <li><Link href="/guides/achievements" className="hover:text-[#e94560] transition-colors">Achievements</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e94560] transition-colors flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GTA VI Guide. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#e94560]" /> for GTA fans
          </p>
        </div>
      </div>
    </footer>
  );
}
