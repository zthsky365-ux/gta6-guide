import { useState, useEffect, useCallback } from 'react';
import type { TableOfContentsItem } from '@/types/guide';

/**
 * 管理文章目录的 Hook
 * 监听滚动，高亮当前可见的标题
 */
export function useTableOfContents(toc: TableOfContentsItem[]) {
  const [activeId, setActiveId] = useState<string>('');

  // 监听滚动，更新当前活跃的标题 ID
  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let currentActiveId = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentActiveId = heading.id;
        }
      });

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  // 点击目录项时的平滑滚动
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }, []);

  return { activeId, scrollToHeading };
}

/**
 * 展平嵌套的目录结构（用于渲染）
 */
export function flattenToc(
  items: TableOfContentsItem[],
  result: { id: string; text: string; level: number }[] = []
): { id: string; text: string; level: number }[] {
  items.forEach((item) => {
    result.push({ id: item.id, text: item.text, level: item.level });
    if (item.children && item.children.length > 0) {
      flattenToc(item.children, result);
    }
  });
  return result;
}
