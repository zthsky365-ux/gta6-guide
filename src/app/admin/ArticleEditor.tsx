'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { ArrowLeft, Save, Eye, Bold, Italic, Heading, List, Link as LinkIcon, Image } from 'lucide-react';

interface ArticleEditorProps {
  article: Article;
  isCreating: boolean;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

export default function ArticleEditor({ article, isCreating, onSave, onCancel }: ArticleEditorProps) {
  const [form, setForm] = useState<Article>({ ...article });
  const [previewMode, setPreviewMode] = useState(false);
  const [tagsInput, setTagsInput] = useState(form.tags.join(', '));

  const categoryLabels: Record<string, string> = {
    news: 'News',
    guide: 'Guide',
    walkthrough: 'Walkthrough',
    tips: 'Tips',
    download: 'Download',
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert('Please enter an article title');
      return;
    }
    if (!form.slug.trim()) {
      form.slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    form.tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    form.readTime = Math.max(1, Math.ceil(form.content.length / 500));
    onSave(form);
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const newContent =
      form.content.substring(0, start) + prefix + selected + suffix + form.content.substring(end);
    setForm({ ...form, content: newContent });
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <div className="bg-[#16213e] border-b border-[#e94560]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-gray-600">|</span>
              <span className="text-white text-sm font-medium">
                {isCreating ? 'New Article' : 'Edit Article'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  previewMode
                    ? 'bg-[#e94560] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye className="w-4 h-4" /> {previewMode ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-1.5 bg-[#e94560] hover:bg-[#d63851] text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Article Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-[#16213e] border border-gray-700 rounded-xl text-white text-xl font-bold focus:outline-none focus:border-[#e94560] placeholder:text-gray-600"
            />

            {/* Slug */}
            <input
              type="text"
              placeholder="URL Slug (auto-generated if empty)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2 bg-[#16213e] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560] placeholder:text-gray-600"
            />

            {/* Toolbar */}
            {!previewMode && (
              <div className="flex items-center gap-1 p-2 bg-[#16213e] rounded-lg border border-gray-700">
                <button onClick={() => insertMarkdown('## ')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Heading">
                  <Heading className="w-4 h-4" />
                </button>
                <button onClick={() => insertMarkdown('**', '**')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button onClick={() => insertMarkdown('*', '*')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <button onClick={() => insertMarkdown('- ')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="List">
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => insertMarkdown('[', '](url)')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Link">
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button onClick={() => insertMarkdown('![alt](', ')')} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Image">
                  <Image className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Content */}
            {previewMode ? (
              <div className="prose-gta p-6 bg-[#16213e] border border-gray-700 rounded-xl min-h-[500px]">
                {form.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
                  if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            ) : (
              <textarea
                id="content-editor"
                placeholder="Write article content in Markdown..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-4 bg-[#16213e] border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#e94560] min-h-[500px] resize-y font-mono placeholder:text-gray-600"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Excerpt */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Excerpt</label>
              <textarea
                placeholder="Article excerpt..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560] resize-none h-20 placeholder:text-gray-600"
              />
            </div>

            {/* Category */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Article['category'] })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Tags</label>
              <input
                type="text"
                placeholder="Tags, separated by commas"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560] placeholder:text-gray-600"
              />
            </div>

            {/* Author */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
              />
            </div>

            {/* Date */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Publish Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
              />
            </div>

            {/* Featured */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#e94560]"
                />
                <span className="text-sm text-gray-300">Featured Article</span>
              </label>
            </div>

            {/* Cover Image */}
            <div className="p-4 rounded-xl bg-[#16213e] border border-transparent">
              <label className="block text-sm text-gray-400 mb-2">Cover Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560] placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
