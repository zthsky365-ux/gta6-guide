'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { articleToMarkdown } from '@/lib/content-manager';
import {
  Send,
  Globe,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  Upload,
} from 'lucide-react';

interface PublishPanelProps {
  articles: Article[];
  githubConfig: {
    configured: boolean;
    config: {
      hasToken: boolean;
      hasOwner: boolean;
      hasRepo: boolean;
      owner: string;
      repo: string;
      branch: string;
    };
  };
}

export default function PublishPanel({ articles, githubConfig }: PublishPanelProps) {
  const [publishing, setPublishing] = useState(false);
  const [previewData, setPreviewData] = useState<Array<{
    path: string;
    size: number;
    message: string;
  }> | null>(null);
  const [publishResults, setPublishResults] = useState<Array<{
    path: string;
    success: boolean;
    message: string;
    url?: string;
  }> | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(
    new Set(articles.map((a) => a.slug))
  );

  const handlePreview = async () => {
    try {
      const res = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview' }),
      });
      const data = await res.json();
      if (data.success) {
        setPreviewData(data.files);
      }
    } catch {
      // ignore
    }
  };

  const handlePublish = async () => {
    if (!githubConfig.configured) {
      alert('Please configure GitHub environment variables first');
      return;
    }

    setPublishing(true);
    setPublishResults(null);

    try {
      const filesToPublish = articles
        .filter((a) => selectedArticles.has(a.slug))
        .map((article) => ({
          path: `content/articles/${article.category}/${article.slug}.md`,
          content: articleToMarkdown(article),
          message: `Publish: ${article.title}`,
        }));

      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: filesToPublish,
          triggerBuild: true,
        }),
      });

      const data = await res.json();
      setPublishResults(data.results || []);
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      setPublishing(false);
    }
  };

  const toggleArticle = (slug: string) => {
    const next = new Set(selectedArticles);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    setSelectedArticles(next);
  };

  const toggleAll = () => {
    if (selectedArticles.size === articles.length) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(articles.map((a) => a.slug)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`p-4 rounded-xl border ${
        githubConfig.configured
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-yellow-500/10 border-yellow-500/30'
      }`}>
        <div className="flex items-center gap-2">
          {githubConfig.configured ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          )}
          <span className={`text-sm font-medium ${
            githubConfig.configured ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {githubConfig.configured
              ? `GitHub Configured (${githubConfig.config.owner}/${githubConfig.config.repo})`
              : 'GitHub not configured. Please go to Settings to configure environment variables'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePreview}
          className="flex items-center gap-2 px-4 py-2 bg-[#16213e] hover:bg-[#0f3460] text-white text-sm font-medium rounded-lg transition-colors border border-gray-700"
        >
          <Eye className="w-4 h-4" /> Preview Files
        </button>
        <button
          onClick={handlePublish}
          disabled={!githubConfig.configured || publishing || selectedArticles.size === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#e94560] hover:bg-[#d63851] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          {publishing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {publishing ? 'Publishing...' : `Publish ${selectedArticles.size} Articles to GitHub`}
        </button>
      </div>

      {/* Preview Data */}
      {previewData && (
        <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#e94560]" />
            Preview Publish Files ({previewData.length} files)
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {previewData.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-[#0f3460]/50 text-sm">
                <span className="text-gray-300 truncate">{file.path}</span>
                <span className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish Results */}
      {publishResults && (
        <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
          <h3 className="text-white font-semibold mb-3">Publish Results</h3>
          <div className="space-y-2">
            {publishResults.map((result, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-[#0f3460]/50 text-sm">
                {result.success ? (
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <span className="text-gray-300 truncate">{result.path}</span>
                <span className="text-gray-500 text-xs ml-auto">{result.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Selection */}
      <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#e94560]" />
            Select Articles to Publish
          </h3>
          <button
            onClick={toggleAll}
            className="text-xs text-[#e94560] hover:text-[#ff6b6b] transition-colors"
          >
            {selectedArticles.size === articles.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <div className="space-y-2">
          {articles.map((article) => (
            <label
              key={article.slug}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                selectedArticles.has(article.slug)
                  ? 'bg-[#0f3460] border border-[#e94560]/30'
                  : 'bg-[#0f3460]/30 border border-transparent hover:border-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedArticles.has(article.slug)}
                onChange={() => toggleArticle(article.slug)}
                className="w-4 h-4 rounded accent-[#e94560]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{article.title}</p>
                <p className="text-gray-500 text-xs">
                  {article.category} · {article.date}
                </p>
              </div>
              <span className="text-gray-600 text-xs">
                {(articleToMarkdown(article).length / 1024).toFixed(1)} KB
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Publish Info */}
      <div className="p-4 rounded-xl bg-[#0f3460]/50 border border-[#e94560]/20">
        <h4 className="text-white font-medium mb-2">Publish Notes</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Articles will be published in Markdown format to the content/articles/ directory of the GitHub repository</li>
          <li>• Each article is stored in its corresponding category subdirectory</li>
          <li>• Publishing can trigger automatic GitHub Pages builds</li>
          <li>• Make sure GITHUB_TOKEN and GITHUB_OWNER are configured in .env.local</li>
          <li>• The token needs repository write permissions (repo scope)</li>
        </ul>
      </div>
    </div>
  );
}
