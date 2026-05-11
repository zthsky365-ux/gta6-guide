import Link from 'next/link';
import { guideSections } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function GuideSectionGrid() {
  return (
    <section className="py-16 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Guide Categories</h2>
            <p className="text-gray-400 text-sm">Browse GTA 6 guides by category</p>
          </div>
          <Link
            href="/guides"
            className="flex items-center gap-1 text-[#e94560] hover:text-[#ff6b6b] text-sm font-medium transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guideSections.map((section) => (
            <Link
              key={section.id}
              href={`/guides/${section.id}`}
              className="group p-5 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-3xl block mb-3">{section.icon}</span>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#e94560] transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-500 text-xs">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
