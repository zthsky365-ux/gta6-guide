import { getArticleBySlug, sampleArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let inList = false;
  let tableRows: string[][] = [];
  let inTable = false;
  let tableHeader = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`}>
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-wrapper-${elements.length}`} className="overflow-x-auto my-4">
          <table>
            {tableRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) =>
                  rowIdx === 0 ? (
                    <th key={cellIdx}>{cell}</th>
                  ) : (
                    <td key={cellIdx}>{cell}</td>
                  )
                )}
              </tr>
            ))}
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
      tableHeader = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Image syntax: ![alt](url)
    if (line.trim().startsWith('![')) {
      flushList();
      flushTable();
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        elements.push(
          <figure key={`img-${elements.length}`} className="my-6">
            <img
              src={match[2]}
              alt={match[1]}
              className="w-full rounded-lg border border-gray-700/30"
              loading="lazy"
            />
            {match[1] && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {match[1]}
              </figcaption>
            )}
          </figure>
        );
      }
      i++;
      continue;
    }

    // Video embed syntax: [video:TYPE:ID] or [video:youtube:VIDEO_ID] or [video:bilibili:BVID]
    if (line.trim().startsWith('[video:')) {
      flushList();
      flushTable();
      const match = line.match(/\[video:(\w+):([^\]]+)\]/);
      if (match) {
        const platform = match[1];
        const videoId = match[2];
        if (platform === 'youtube') {
          elements.push(
            <div key={`video-${elements.length}`} className="my-6 aspect-video rounded-lg overflow-hidden border border-gray-700/30">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          );
        } else if (platform === 'bilibili') {
          elements.push(
            <div key={`video-${elements.length}`} className="my-6 aspect-video rounded-lg overflow-hidden border border-gray-700/30">
              <iframe
                src={`https://player.bilibili.com/player.html?bvid=${videoId}&autoplay=0`}
                title="Video"
                allowFullScreen
                className="w-full h-full"
                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
              />
            </div>
          );
        }
      }
      i++;
      continue;
    }

    // Table syntax: | header | header |
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      // Skip separator line like |---|---|
      if (line.match(/^\|[\s\-:|]+\|$/)) {
        tableHeader = true;
        i++;
        continue;
      }
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeader = false;
      }
      tableRows.push(cells);
      i++;
      continue;
    }

    // Flush table if we're no longer in a table
    if (inTable && !line.trim().startsWith('|')) {
      flushTable();
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={elements.length}>{line.replace('# ', '')}</h1>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={elements.length}>{line.replace('## ', '')}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={elements.length}>{line.replace('### ', '')}</h3>);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${elements.length}`}>
          {line.replace('> ', '')}
        </blockquote>
      );
      i++;
      continue;
    }

    // List items
    if (line.startsWith('- ')) {
      inList = true;
      listItems.push(line.replace('- ', ''));
      i++;
      continue;
    }

    // Flush list if we're no longer in a list
    if (inList && !line.startsWith('- ')) {
      flushList();
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Regular paragraph - handle inline bold and links
    const processedLine = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    elements.push(<p key={elements.length} dangerouslySetInnerHTML={{ __html: processedLine }} />);
    i++;
  }

  flushList();
  flushTable();

  return elements;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    news: '资讯',
    guide: '攻略',
    walkthrough: '流程',
    tips: '技巧',
    download: '下载',
  };

  const relatedArticles = sampleArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>

          <div className="mb-4">
            <span className="px-3 py-1 bg-[#e94560]/20 text-[#e94560] text-xs font-medium rounded-full">
              {categoryLabels[article.category]}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {article.readTime} 分钟
            </span>
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 bg-[#0f3460] text-gray-400 text-xs rounded-full"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose-gta">
          {renderContent(article.content)}
        </div>

        {/* Source attribution */}
        <div className="mt-8 p-4 rounded-lg bg-[#16213e]/50 border border-gray-700/30">
          <p className="text-sm text-gray-400">
            📖 本文内容参考自游民星空等游戏媒体，仅供参考。实际游戏内容以官方发布为准。
          </p>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="group p-4 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/30 transition-all"
                >
                  <h4 className="text-sm font-medium text-white group-hover:text-[#e94560] transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
