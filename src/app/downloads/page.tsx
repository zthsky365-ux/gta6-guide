import { Download, FileText, Save, Wrench, Monitor } from 'lucide-react';

export default function DownloadsPage() {
  const categories = [
    { icon: FileText, title: 'Game Saves', description: 'Perfect saves, progress saves', count: 0 },
    { icon: Save, title: 'Game Patches', description: 'Update patches, hotfixes', count: 0 },
    { icon: Wrench, title: 'Game Tools', description: 'Trainers, utility tools', count: 0 },
    { icon: Monitor, title: 'Game Videos', description: 'Walkthrough videos, guide videos', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-8 h-8 text-[#e94560]" />
            <h1 className="text-3xl font-bold text-white">Downloads</h1>
          </div>
          <p className="text-gray-400">GTA 6 game resource downloads</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all text-center"
            >
              <cat.icon className="w-10 h-10 text-[#e94560] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">{cat.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{cat.description}</p>
              <span className="px-3 py-1 bg-[#0f3460] text-gray-400 text-xs rounded-full">
                {cat.count} files
              </span>
            </div>
          ))}
        </div>

        <div className="text-center py-16">
          <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Downloads coming soon</p>
          <p className="text-gray-500 text-sm mt-2">Game saves, tools and more will be available after launch</p>
        </div>
      </div>
    </div>
  );
}
