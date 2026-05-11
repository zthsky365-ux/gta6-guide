'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/types';
import { sampleArticles } from '@/lib/data';
import ArticleEditor from './ArticleEditor';
import PublishPanel from './PublishPanel';
import {
  LayoutDashboard,
  FileText,
  Send,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  Globe,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

type TabType = 'dashboard' | 'articles' | 'publish' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [githubConfig, setGithubConfig] = useState({
    configured: false,
    config: { hasToken: false, hasOwner: false, hasRepo: false, owner: '', repo: '', branch: 'main' },
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchGithubStatus();
  }, []);

  const fetchGithubStatus = async () => {
    try {
      const res = await fetch('/api/github');
      const data = await res.json();
      setGithubConfig(data);
    } catch {
      // ignore
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categoryLabels: Record<string, string> = {
    news: 'News',
    guide: 'Guide',
    walkthrough: 'Walkthrough',
    tips: 'Tips',
    download: 'Download',
  };

  const handleCreateArticle = () => {
    setIsCreating(true);
    setEditingArticle({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'news',
      tags: [],
      coverImage: '',
      date: new Date().toISOString().split('T')[0],
      author: 'GTA6 Guide Team',
      readTime: 5,
      featured: false,
    });
  };

  const handleSaveArticle = (article: Article) => {
    if (isCreating) {
      setArticles((prev) => [...prev, article]);
      showNotification('success', 'Article created successfully!');
    } else {
      setArticles((prev) =>
        prev.map((a) => (a.slug === article.slug ? article : a))
      );
      showNotification('success', 'Article updated successfully!');
    }
    setEditingArticle(null);
    setIsCreating(false);
  };

  const handleDeleteArticle = (slug: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
      showNotification('info', 'Article deleted');
    }
  };

  const tabs: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'publish', label: 'Publish', icon: Send },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Article Editor
  if (editingArticle) {
    return (
      <ArticleEditor
        article={editingArticle}
        isCreating={isCreating}
        onSave={handleSaveArticle}
        onCancel={() => {
          setEditingArticle(null);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-slide-up">
          {notification.type === 'success' && (
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{notification.message}</span>
            </div>
          )}
          {notification.type === 'error' && (
            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30">
              <XCircle className="w-4 h-4" />
              <span className="text-sm">{notification.message}</span>
            </div>
          )}
          {notification.type === 'info' && (
            <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{notification.message}</span>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#16213e] border-b border-[#e94560]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-[#e94560]" />
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#16213e] p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#e94560] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Articles', value: articles.length, icon: FileText, color: 'text-blue-400' },
                { label: 'Guide Articles', value: articles.filter((a) => a.category === 'guide').length, icon: Edit3, color: 'text-green-400' },
                { label: 'News Articles', value: articles.filter((a) => a.category === 'news').length, icon: Eye, color: 'text-yellow-400' },
                { label: 'GitHub Status', value: githubConfig.configured ? 'Configured' : 'Not Configured', icon: Globe, color: githubConfig.configured ? 'text-green-400' : 'text-red-400' },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-xl bg-[#16213e] border border-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub Config Status */}
            <div className="p-6 rounded-xl bg-[#16213e] border border-[#e94560]/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#e94560]" />
                GitHub Publish Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  {githubConfig.config.hasToken ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm text-gray-300">GITHUB_TOKEN</span>
                </div>
                <div className="flex items-center gap-2">
                  {githubConfig.config.hasOwner ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm text-gray-300">GITHUB_OWNER</span>
                </div>
                <div className="flex items-center gap-2">
                  {githubConfig.config.hasRepo ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm text-gray-300">GITHUB_REPO</span>
                </div>
              </div>
              {!githubConfig.configured && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    Please configure GitHub environment variables in the .env.local file to enable publishing.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Articles */}
            <div className="p-6 rounded-xl bg-[#16213e] border border-transparent">
              <h3 className="text-white font-semibold mb-4">Recent Articles</h3>
              <div className="space-y-3">
                {articles.slice(0, 5).map((article) => (
                  <div key={article.slug} className="flex items-center justify-between p-3 rounded-lg bg-[#0f3460]/50">
                    <div>
                      <h4 className="text-white text-sm font-medium">{article.title}</h4>
                      <p className="text-gray-500 text-xs">{article.date} · {categoryLabels[article.category]}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingArticle(article);
                        setIsCreating(false);
                      }}
                      className="text-gray-400 hover:text-[#e94560] transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#16213e] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                />
              </div>
              <button
                onClick={handleCreateArticle}
                className="flex items-center gap-2 px-4 py-2 bg-[#e94560] hover:bg-[#d63851] text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
            </div>

            {/* Article List */}
            <div className="space-y-2">
              {filteredArticles.map((article) => (
                <div
                  key={article.slug}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#16213e] border border-transparent hover:border-[#e94560]/20 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#e94560]/20 text-[#e94560]">
                        {categoryLabels[article.category]}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-yellow-500/20 text-yellow-400">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">{article.title}</h3>
                    <p className="text-gray-500 text-xs truncate">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={`/article/${article.slug}`}
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        setEditingArticle(article);
                        setIsCreating(false);
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-[#e94560] hover:bg-[#e94560]/10 transition-all"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.slug)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publish Tab */}
        {activeTab === 'publish' && (
          <PublishPanel articles={articles} githubConfig={githubConfig} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[#16213e] border border-transparent">
              <h3 className="text-white font-semibold mb-4">GitHub Publish Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GITHUB_TOKEN</label>
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Generate at GitHub Settings → Developer Settings → Personal Access Tokens
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GITHUB_OWNER</label>
                  <input
                    type="text"
                    placeholder="Your GitHub username"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GITHUB_REPO</label>
                  <input
                    type="text"
                    placeholder="Repository name"
                    defaultValue="gta6-guide"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">GITHUB_BRANCH</label>
                  <input
                    type="text"
                    placeholder="Branch name"
                    defaultValue="main"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    Configuration is saved in the .env.local file in the project root. Restart the dev server after making changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#16213e] border border-transparent">
              <h3 className="text-white font-semibold mb-4">Site Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Site Name</label>
                  <input
                    type="text"
                    defaultValue="GTA VI Guide"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Site URL</label>
                  <input
                    type="text"
                    placeholder="https://yourusername.github.io/gta6-guide"
                    className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Language</label>
                  <select className="w-full px-4 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]">
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
