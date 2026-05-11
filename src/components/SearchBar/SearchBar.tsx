import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { GuideMeta } from '@/types/guide';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onResults?: (results: GuideMeta[]) => void;
  className?: string;
}

export default function SearchBar({ onResults, className }: SearchBarProps) {
  const { t } = useTranslation('common');
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);

      if (searchQuery.length < 2) {
        onResults?.([]);
        return;
      }

      try {
        // 动态导入所有 Markdown 文件的元数据
        const modules = import.meta.glob('../../content/guides/**/*.md', {
          query: '?raw',
          import: 'default',
        });

        const results: GuideMeta[] = [];

        for (const path in modules) {
          const rawContent = (await modules[path]()) as string;
          const { data, content } = parseFrontMatter(rawContent);

          if (matchesSearch(data, content, searchQuery)) {
            results.push({
              slug: (data.slug as string) || extractSlugFromPath(path),
              title: (data.title as string) || 'Untitled',
              description: (data.description as string) || '',
              date: (data.date as string) || new Date().toISOString().split('T')[0],
              tags: (data.tags as string[]) || [],
              category: (data.category as string) || 'uncategorized',
              lang: (data.lang as 'zh' | 'en') || 'zh',
            });
          }
        }

        onResults?.(results);
      } catch (error) {
        console.error('Search error:', error);
      }
    },
    [onResults]
  );

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.inputWrapper}>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t('search')}
          className={styles.input}
          aria-label={t('search')}
        />

        {query && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setQuery('');
              handleSearch('');
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function parseFrontMatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: rawContent };

  const data: Record<string, unknown> = {};
  const frontMatter = match[1];
  const content = match[2];

  // 简单的 YAML 解析（用于 front matter）
  frontMatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: unknown = line.slice(colonIndex + 1).trim();

      // 移除引号
      value = (value as string).replace(/^["']|["']$/g, '');

      // 处理数组
      if ((value as string).startsWith('[') && (value as string).endsWith(']')) {
        value = (value as string)
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''));
      }

      data[key] = value;
    }
  });

  return { data, content };
}

function matchesSearch(
  data: Record<string, unknown>,
  content: string,
  query: string
): boolean {
  const lowerQuery = query.toLowerCase();

  // 搜索标题
  if (String(data.title || '').toLowerCase().includes(lowerQuery)) return true;

  // 搜索描述
  if (String(data.description || '').toLowerCase().includes(lowerQuery)) return true;

  // 搜索标签
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  if (tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) return true;

  // 搜索内容
  if (content.toLowerCase().includes(lowerQuery)) return true;

  return false;
}

function extractSlugFromPath(path: string): string {
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, '');
}
